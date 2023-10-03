import express from "express";
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import logger from 'morgan'
import * as Sentry2 from '@sentry/node';
import { RewriteFrames } from "@sentry/integrations";
import axios from "axios";
// import { ProfilingIntegration } from "@sentry/profiling-node";
import morgan from "morgan"
import { makeid, return10 } from "./randoms.js";
import fs from "fs";
import {request} from 'gaxios'



const app = express()
const server = express()
const env = "dev"



Sentry.init({
    // enabled: false,
    // release: 1.0,
    debug: true,
    // defaultIntegrations: false,
    dsn: 'https://c29bb6e733b14ec69187aac9d121f592@o1407376.ingest.sentry.io/4504039154974720',
    maxValueLength: 500,
    // environment: "GroupTest",
    // includeLocalVariables: true,
    // dist: "2",
    // tracePropagationTargets: ['127'],
    // sampleRate: env == "production" ? 1 : 1,
    release: "hello555522222",
    sendDefaultPii: true,

    // sampleRate: 0,
    // environment: "GroupTest",
    // initialScope: {
    //     transaction: "TEST",
    //     tags: {
    //         transaction: "[FILTERED]"
    //     }
    // },
    // defaultIntegrations: true,

//     ignoreErrors: [
//         "e",
//         "error",
//         "erro2",
//         "error.com"
// ],

    beforeSend(event, hint) {

        // console.log(event.exception.values[0].stacktrace)
        // console.log(event)
        // event.contexts.newContext = {testkey: "testValue"}
        // console.log(event)
        // console.log(event)
        // delete event.transaction
        // delete event.tags.transaction
        // event.contexts.event = {event}
        // console.log(event)
        // console.log(event.level);
        // if (event.level == "error") {
        //   Sentry.showReportDialog({ eventId: event.event_id });
        // }
        // console.log(event.request.headers)
        // console.log(event.exception.values[0].stacktrace)
        return event
    },
    enableTracing: true,
    tracesSampleRate: 1,
    // integrations: function (integrations) {
    //         // integrations will be all default integrations
    //         return integrations.filter((integration) => 
    //         integration.name !== "OnUncaughtException" 
    //         && integration.name !== "OnUnhandledRejection"
    //         );
    // },
    integrations: [
        new Sentry.Integrations.Http({ 
            tracing: true,
         }),
        // new ProfilingIntegration({
        
        // }),
        // new Tracing.Integrations.GraphQL(),
        new Tracing.Integrations.Express({
            app: server,
        }),



        new Sentry.Integrations.LocalVariables({
            captureAllExceptions: true,
        }),


    ],

    // beforeBreadcrumb(breadcrumb, hint){
    //     console.log(breadcrumb)
    //     Sentry.captureMessage(breadcrumb.message)
    //     return breadcrumb
    //   },
    // profilesSampler(samplingContext) {
    //     console.log("Profile", samplingContext)
    //     return 1
    // },
    // profilesSampleRate:  1.0,
    tracesSampler: (samplingContext) => {
        
        // console.log("request", request)
        // let sample = 0
        // console.log("CONTEXT", samplingContext)
        // console.log("REQUEST", samplingContext.transactionContext.metadata.request.socket.server)
        return 1
    },
    // tracesSampleRate: 1.0,
    beforeSendTransaction(event) {
        // console.log("------")

        // if(event.transaction == "GET /Transaction"){
        //     return null
        // }
        // // event.transaction = "NFSEFJDJDSFJFD"
        // console.log(event.transaction)
        console.log("event", event.measurements)
        // event.user = {
        //     id: "123455",
        //     ip_address: "33.12.2.4",
        //     email: "fra@gmail.com",
        //     geo: {
        //         country_code: "usa",
        //         city: "baltimore"
        //     }
        // }

        // console.log("after", event.user)

        return event
    }
});

// console.log(Sentry.getCurrentHub().getClient()._integrations)
Sentry.setTag("hi", "hello")




// const res = await request({
//   url: 'https://www.googleapis.cosdfsfdm/discovery/v1/apis/',
// });

// console.log(res)


// Sentry.addBreadcrumb({
//     // category: "auth",
//     message: "Authenticated user password",
//     level: "info",
//   });


Sentry.addBreadcrumb({
    message: "hello testing custom breadcrumb",
    level: "info",
  });
// Sentry.setExtra("ext", {
//     params: "auth",
//     request: "testing"
// })
// console.log(Sentry.getCurrentHub().getClient()._options.integrations)

Sentry.setContext("unreal", {
    crash_type: "Ensure",
  });

Sentry.setExtra("test", {
    name: "testing",
    params: "auth"
})

const client = Sentry.getCurrentHub().getClient();

// lifecycle hook to capture an event

// if (client) {
//   client.on('beforeEnvelope', (envelope) => console.log(envelope));
// }
app.use(morgan("combined"))

app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.requestHandler());

// console.log("HUB", Sentry.getCurrentHub())
// console.log("SCOPE",Sentry.getCurrentHub().getScope())

// console.log("CLIENT",Sentry.getCurrentHub().getClient())

Sentry.withScope(function (scope) {
    scope.setTag("LOCALTAG", "LOCALVALUE")
    // Sentry.captureException(new Error("test?"))
    app.use(Sentry.Handlers.errorHandler());

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

app.get('/', function mainHandler(req, res) {
    const transaction = Sentry.getCurrentHub().getScope().getTransaction()

    if (transaction) {

        console.log("transFound", transaction)
        transaction.op = "test"
        console.log("after", transaction)
        res.send("hi2")
    }
    res.send('hi')
});



app.get('/gaxios', async function mainHandler(req,respppp) {
    const res = request({
        url: 'https://www.googlesdgjhsdkjfsdy/v1/apis/',
    });

    res.send("gaxios")
})


app.get('/e6', async function mainHandler(req, res) {
    throw new Error("e6 error")
    res.send("hi")
})

app.get('/e7', async function mainHandler(req, res) {
    throw new Error("testing integrations")
    res.send("e7")
})

app.get('/e8', async function mainHandler(req, res) {
    throw new Error("hello")

})


app.get('/debug', function rootHandler(req,res) {

    try {

        const test1 = "hello"

        hi(test1)
    } catch(e) {
        new File(e, "error.txt", {
            type: "text/plain",
        })

        Sentry.captureException(e)

        res.send("hi")
    }
})
})

app.get('/newError', async function mainHandler(req,res) {
    Sentry.captureException(new Error(error))
    res.send("hello")
})

app.get('/cron', async function mainHandler(req, res) {
    const checkInId = Sentry.captureCheckIn({
        monitorSlug: "nodecrons",
        status: "in_progress",
      });
      

        console.log("cron task done")

            
        Sentry.captureCheckIn({
          checkInId,
          monitorSlug: "nodecrons",
          status: "ok",
        });
    

    

      

 

        //  Sentry.captureCheckIn({
        //     checkInId,
        //     monitorSlug: "nodecrons",
        //     status: "error",
        //   });
          res.send("done")
     

})

app.get('/attach', function mainHandler(req, res) {
    Sentry.configureScope(scope => {
        scope.addAttachment({
            filename: "testAttachment.txt",
            data: "someContent"
        })
        Sentry.captureMessage("Testing")
        res.send("hello")
    })
})

app.get('/throw', (req, res) => {
    throw new Error("thrown")
    res.send("thrown")
})


app.get('/e4', (req, res) => {
    const variable222 = "hello"
    const testProfileGithubError = () => {
        console.log("Inside Test FUNCTION")
        Sentry.captureException(new Error("testingg"))
        res.send("done")
    }

    testProfileGithubError()
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

app.get('/Transaction', async function mainHandler(req, res) {
    if (Sentry.getCurrentHub().getScope().getTransaction()){
        Sentry.getCurrentHub().getScope().getTransaction().finish()
    }
    const transaction = Sentry.startTransaction({name: "hello"})
    Sentry.getCurrentHub().configureScope((scope) => scope.setSpan(transaction));
    transaction.setMeasurement("memoryUsed", 123, "byte");
    transaction.setMeasurement("ui.footerComponent.render", 1.3, "second");
    transaction.setMeasurement("localStorageRead", 4);
    transaction.setMeasurement("localStorage_Read", 10);
    transaction.setMeasurement("localStorage.Read_time", 11230);
    transaction.setMeasurement("localStorage.Read", 1123333);
    transaction.setMeasurement("localStorage.Read.hello.jordan", 1123333);

    await fetch("https://http.cat/200")
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.error(error)
        Sentry.captureException(error)
    })
    // const transSpan = Sentry.startTransaction({name: "TESTSPAN"})

    // Sentry.getCurrentHub().configureScope(scope => scope.setSpan(transSpan));
    
    const span = transaction.startChild({
        data: {
            // transSpan
        },
        op: 'auth',
        description: `59d74293-5def-4384-bfa4-c604a0687bb2`,
    });

     span.finish()
     transaction.finish()
     try{

         Sentry.captureException(new Error("test span error"))
     } finally {

        //  transaction.setStatus("internal_error")
         transaction.finish()
     }
    // transSpan.finish()
   
    res.send("done")
})

app.get('/T2', function mainHandler(req,res) {
    const transaction = Sentry.startTransaction({
        name:"index.TestTransaction",
        sampled: true,
        // trimEnd: true
    })



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

app.get("/context", function mainHandler(req,res) {
    console.log(Sentry.getCurrentHub().getScope()._contexts)
    res.send("done")
})

app.get("/testError", function mainHandler(req, res) {
    Sentry.captureException(new Error("testingDsn"))
    res.send("done")
})


app.use(Sentry.Handlers.errorHandler());
app.listen(4000, () => console.log('Listening on port 4000!'));
