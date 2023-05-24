import express from "express";
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import logger from 'morgan'
import * as Sentry2 from '@sentry/node';
import { RewriteFrames } from "@sentry/integrations";
import axios from "axios";
import { ProfilingIntegration } from "@sentry/profiling-node";
import morgan from "morgan"


const app = express()
const server = express()
const env = "dev"

Sentry.init({
    // enabled: false,
    // release: 1.0,
    debug: true,
    // defaultIntegrations: false,
    dsn: 'https://c29bb6e733b14ec69187aac9d121f592@o1407376.ingest.sentry.io/4504039154974720',
    release: "2.9898",
    maxValueLength: 500,
    tracePropagationTargets: ['127'],
    sampleRate: env == "production" ? 1 : 1,
    
    // tracesSampler(samplingContext) {
    //     // console.log("SAMPLE", samplingContext)
    //     return 1
    // },

//     ignoreErrors: [
//         "e",
//         "error",
//         "erro2",
//         "error.com"
// ],

    beforeSend(event, hint) {
    //    const exception = hint.originalException
        console.log("ERROR FOUND")
        // console.log(event)
        // console.log("message", event.message)
        return event
    },

    integrations: [
        new Sentry.Integrations.Http({ 
            tracing: true,
         }),
        new ProfilingIntegration(),
        // new Tracing.Integrations.GraphQL(),
        new Tracing.Integrations.Express({
            app: server,
        }),
    ],
    // integrations: function (integrations) {
    //     return integrations.filter(function (integration) {
    //         return integration.name !== "Context"
    //     })
    // },

    integrations:[new Sentry.Integrations.Context({
        device: false,
    }), 
        ],
    // beforeBreadcrumb(breadcrumb, hint){
    //     console.log(breadcrumb)
    //     Sentry.captureMessage(breadcrumb.message)
    //     return breadcrumb
    //   },

    profilesSampleRate:  1.0,
    // tracesSampler: (samplingContext) => {
    //     console.log("sample",samplingContext)
    //     // console.log("request", request)
    //     // let sample = 0
    //     // console.log("CONTEXT", samplingContext)
    //     // console.log("REQUEST", samplingContext.transactionContext.metadata.request.socket.server)
    //     return 1
    // },
    tracesSampleRate: 1.0,
    // beforeSendTransaction(event) {
    //     console.log("------")
    //     console.log("BEFORESENDTRANSACTION", event)


    //     // console.log(event.start_timestamp)
    //     // event.timestamp = 1675550000

    //     return event
    // }
});



// Sentry.setExtra("ext", {
//     params: "auth",
//     request: "testing"
// })
// console.log(Sentry.getCurrentHub().getClient()._options.integrations)

Sentry.setContext("character", {
    name: "Mighty Fighter",
    age: 19,
    params: "auth",

    attack_type: "melee",
  });

Sentry.setExtra("test", {
    name: "testing",
    params: "auth"
})

Sentry.setTag("TransactionTag", "ewthef")
app.use(logger('tiny'))


app.use(morgan("combined"))

app.use(Sentry.Handlers.tracingHandler());
// app.use(Sentry.Handlers.requestHandler());

Sentry.configureScope(scope => {
    scope.addAttachment({
        filename: "testAttachment.txt",
        data: "someContent"
    })
})

Sentry.configureScope(scope => {
    scope.setTags({
        test: "tag1",
        test2: "tag2"
    })
})

app.get("/apicall", function mainHandler(req, res) {
    let varOne
    let varTwo
    axios.get("http://127.0.0.1:8000/api/food")
    .then((result) => {
        console.log(result.data)
        varOne = result.data.message
    })
    .catch(err => {
        res.send("ERROR")
        console.log(err)
        Sentry.captureException(new Error(err))
    })
    axios.get("http://localhost:4000/apicall2")
    .then((result) => {
        console.log(result.data)
        varTwo = result.data.message
        console.log("varONE", varOne, "VAR2", varTwo)
        res.send(varOne)
    })
    .catch(err => {
        res.send("ERror")
        console.log(err)
    })
})

app.get("/apicall2", function mainHandler(req, res) {
    res.send(["one", "two", "three"])
})


Sentry.setUser({id: "[BigInt: 59]"})
// console.log(Sentry.getCurrentHub().getScope())
app.get('/start2', function mainHandler(req,res) {
    const transaction = Sentry.startTransaction()
    res.send("done")
})

app.get('/editscope', function mainHandler(req, res) {
    console.log(Sentry.getCurrentHub().getScope()._span.spanRecorder._maxlen)
    res.send("done")
})

app.get('/flush', function mainHandler(req, res) {
    Sentry.flush()
    res.send("done")
})
app.get('/', function mainHandler(req, res) {
    // const transaction = Sentry.getCurrentHub().getScope().getTransaction()

    // if (transaction) {
    //     console.log("transFound", transaction)
    //     transaction.op = "test"
    //     console.log("after", transaction)
    //     res.send("hi2")
    // }
    res.send('hi')
});

app.get('/get', function mainHandler(req,res) {
    app.get('/test', function mainHandler(req, res) {
        res.send("the")
    })
})

app.get('/synthetic', function mainHandler(req, res) {
    Sentry.captureException(new Error("hey testing", {
        message: "testingsahdahsjkdashj"
    }))
    console.log(env)
    res.send("done")
})

app.get('/debug', function rootHandler(req,res) {

    Sentry.setTag("server-sdsdname", "teing2")

    // throw new Error("Error222")
    throw new Error("testAlert")
})

app.get("/seed", function mainHandler(req, res) {
    Sentry.captureMessage("testMessage")
    res.send("dont")
})

app.get('/close-sentry', (req, res) => {
    Sentry.close()
    res.send("sentry has closed")
})
app.get('/e4', (req, res) => {

    Sentry.captureException(new Error("testingg"))
    res.send("done")
})

app.get("/e3", (req, res) => {
    const test = "test"

    
    throw new Error("error.com")
})
app.get('/testing', function mainHandler(req, res) {

    // console.log("getHub", Sentry.getCurrentHub().getScope()._tags['server-name'])
    //     // scope.setTag("page_locale", "de-at");

    // Sentry.configureScope(scope => {
    //     console.log("configure", scope._tags)
    // })

})

// app.use(Sentry.Handlers.errorHandler());


app.post('/t3', (req, res) => {
    try{
        res.send("capture")
        Sentry.captureException(new Error('Crash'));

    } catch(error) {

        Sentry.captureException(error)
    }
})



app.get('/crash', function mainHandler(req, res) {
    Ounasfhuasdf()
})
// app.use(function onError(err, req, res, next) {
//     // The error id is attached to `res.sentry` to be returned
//     // and optionally displayed to the user for support.
//     res.statusCode = 500;
//     res.end(res.sentry + "\n");
//   });

  
app.get("/message", function mainHandler(req,res) {
    Sentry.captureMessage("testingMesage")
    res.send("hello")
})

app.get('/ret', function mainHandler(req,res) {
    
    console.log(Sentry.getCurrentHub().getScope().getTransaction())
    // console.log(Sentry.getCurrentHub().getScope()._tags)
});

app.get('/pro', function mainHandler(req, res) {

    const promise2 = new Promise((resolve, reject) => {
        setTimeout(reject(new Error("fail")), 100);
    });
    console.log(promise2)
})

app.get('/Transaction', function mainHandler(req, res) {
    const transaction = Sentry.getCurrentHub().getScope().getTransaction()
    const transSpan = Sentry.startTransaction({name: "TESTSPAN"})

    Sentry.getCurrentHub().configureScope(scope => scope.setSpan(transSpan));
    
    const span = transaction.startChild({
        data: {
            transSpan
        },
        op: 'task',
        description: `processing shopping cart result`,
    });
    span.finish()
    
    transSpan.finish()
    console.log(span)
    transaction.finish()
   
    res.send("done")
})

app.get('/T2', function mainHandler(req,res) {
    const transaction = Sentry.startTransaction({
        name:"index.TestTransaction",
        sampled: true,
        startTimestamp: (1676060157916/1000)-864000,
        // trimEnd: true
    })
    const span = transaction.startChild({
        op: "time",
        startTimestamp: (1676060157916/1000)-86400,
        endTimestamp: (1676060157916/1000)+86400
    })
    span.finish()
    transaction.finish()
    res.send("t2 done")
})

app.get('/axios', function mainHandler(req, res) {
    axios.get("/sdsd")
    .catch((error) => {
        // console.log("REQ", error.request)
        // console.log("RES", error.response)
        Sentry.captureException(error)
    })

    res.send("done")
})

app.get('/resSend', function mainHandler(req,res) {

})

app.get('/resError', function mainHandler(req,res) {
    try {
        testError()
    } catch (error) {
        Sentry.captureException(error)
        res.sendStatus(500)
    }
})






app.use(Sentry.Handlers.errorHandler());
app.listen(4000, () => console.log('Listening on port 4000!'));
