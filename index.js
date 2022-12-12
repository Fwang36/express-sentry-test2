import express from "express";
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import logger from 'morgan'

const app = express()
const server = express()
Sentry.init({
    release: 1.0,
    debug: true,
    dsn: 'https://c29bb6e733b14ec69187aac9d121f592@o1407376.ingest.sentry.io/4504039154974720',
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({
            app: server,
        }),
    ],
    beforeSend(event) {


        if (event.exception.values[0].mechanism.type == "onuncaughtexception") {
            console.log(event)
            Sentry.configureScope(function(scope) {
                scope.setLevel("warning")
                return event
            })
        }
        return event
    },

    tracesSampleRate: 1,
    // tracesSampler: samplingContext => {
    //     console.log(samplingContext.transactionContext.metadata.request)
    //     return 1
    // },

    beforeSendTransaction(event) {
        // console.log(event)
        return event
    }
});

Sentry.setTag("server-name", "test222ing2")

app.use(logger('tiny'))
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());



app.get('/', function mainHandler(req, res) {
    const transaction = Sentry.getCurrentHub()
        .getScope()
        .getTransaction();

    if (transaction) {
        // console.log(transaction.transaction.transaction)
        // transaction.spanRecorder._maxlen = 1205

        // for (let i = 0; i < 600; i++) {

        //     let span = transaction.startChild({
        //         op: "encode",
        //         description: "parseAvatarImages",
        //     });

        //     span.finish();

        //     let span2 = transaction.startChild({
        //         op: "span2Test",
        //         description: "testing 2nd span"
        //     })
        //     span2.finish();
        // }

        // transaction.spanRecorder.spans = transaction.spanRecorder.spans.filter(span => span.op != "encode")

    }    
    res.send('Hello Worldfdd')
});


app.get('/debug', function rootHandler(req,res) {
    throw new Error("Error222")
})

app.get('/testing', function mainHandler(req, res) {

    console.log("getHub", Sentry.getCurrentHub().getScope()._tags['server-name'])
    //     // scope.setTag("page_locale", "de-at");

    Sentry.configureScope(scope => {
        console.log("configure", scope._tags)
    })

})

app.get('/crash', function mainHandler(req, res) {
    Ounasfhuasdf()
})
app.use(Sentry.Handlers.errorHandler());
app.listen(4000, () => console.log('Listening on port 4000!'));
