import express from "express";
import * as Sentry from '@sentry/node';
import logger from 'morgan'
import * as Sentry2 from '@sentry/node';
import { RewriteFrames } from "@sentry/integrations";
import axios from "axios";
import cors from "cors"
import { ProfilingIntegration } from "@sentry/profiling-node";
import morgan from "morgan"
import { makeid, return10 } from "./randoms.js";
import fs from "fs";
import {request} from 'gaxios'


// const Sentry = require("@sentry/node")
const app = express()
const server = express()
app.use(cors())

function generateRandomSixDigit() {
    return Math.floor(100000 + Math.random() * 900000);
  }



Sentry.init({
    // enabled: false,
    // release: 1.0,
    debug: true,
    // defaultIntegrations: false,
    dsn: 'https://c29bb6e733b14ec69187aac9d121f592@o1407376.ingest.sentry.io/4504039154974720',
    maxValueLength: 500,
    // environment: "GroupTest",
    // includeLocalVariables: true,
    dist: "2",
    // attachStacktrace: true,
    // tracePropagationTargets: ['127'],
    // sampleRate: env == "production" ? 1 : 1,
    release: "testDeployEmail",
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
        console.log("sent error")
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
        new ProfilingIntegration({
        
        }),
        // new Tracing.Integrations.GraphQL(),
        new Sentry.Integrations.Express({
            server: app,
        }),
        new Sentry.Integrations.Mysql({

        }),

        new RewriteFrames({
            iteratee: (frame) => {
                // console.log("------")
                // console.log(frame)
                // console.log(frame)
                // let newFile = frame.filename.replace(/\//g, "\\")
                // console.log(newFile)
                // frame.filename = newFile
                return frame
            }
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
    profilesSampleRate:  1.0,
    tracesSampler: (samplingContext) => {
        // console.log(samplingContext)

        // if (!samplingContext.parentSampled) {
        //     return 1
        // }
        // // console.log("SAMPLINGCONTEXT", samplingContext)
        // // console.log(samplingContext.request.headers['user-agent'])
        // return 0
        return 1
    },
    
    // tracesSampleRate: 1.0,
    beforeSendTransaction(event) {
        
        // console.log("------")
        // console.log(event.contexts.trace.trace_id)

        // console.log(event.contexts.trace.trace_id)
        // if(event.transaction == "GET /Transaction"){
        //     return null
        // }
        // // event.transaction = "NFSEFJDJDSFJFD"
        // console.log(event.transaction)
        // event.user = {
        //     id: "123455",
        //     ip_address: "33.12.2.4",
        //     email: "fra@gmail.com",
        //     geo: {
        //         country_code: "usa",
        //         city: "baltimore"
        //     }
        // }
        // console.log(event)
        // console.log("after", event.user)

        return event
    }
});

// console.log(Sentry.getCurrentHub().getClient()._integrations)


console.log("new Env", process.env.newENV)
console.log("newENV2", process.env.newENV2)
console.log("-----")
// const res = await request({
//   url: 'https://www.googleapis.cosdfsfdm/discovery/v1/apis/',
// });

// console.log(res)

// Sentry.addBreadcrumb({
//     // category: "auth",
//     message: "Authenticated user password",
//     level: "info",
//   });
Sentry.setUser({
    username: "testing"
})

Sentry.setContext("newContext", {
    testingContext: null,
    testingContext2: "hello",
    testingAuth: "password",
    testingAuth2: null
}),

Sentry.setExtra("newContext", {
    testingContext: null,
    // testingContext2: "hello",
    // testingAuth: "password",
    testingAuth2: null
}),

Sentry.setExtra("TestingExtra", "Tesintgafdkjasd")

Sentry.setExtra("TestingExtra2", "auth")

Sentry.setExtra("TestingExtra3", null)


Sentry.setExtra("newContext2", {
    // testingContext: null,
    testingAuth2: null
}),

Sentry.addBreadcrumb({
    message: "hello testing custom breadcrumb",
    level: "info",
  });

  Sentry.addBreadcrumb({
    category: "auth",
    message: "Authenticated user ",
    level: "info",
      });

      Sentry.addBreadcrumb({
        category: "auth",
        message: "Authenticated user222222 ",
        level: "info",
        data: {auth: "auth", 
        url: "auth",
        new: "auth"
    }
          });


app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.requestHandler());


const expensiveFunction = () => {
    return console.log("helloede")
}
// console.log("HUB", Sentry.getCurrentHub())
// console.log("SCOPE",Sentry.getCurrentHub().getScope())

// console.log("CLIENT",Sentry.getCurrentHub().getClient())
// Sentry.withScope(function (scope) {
//     // group errors together based on their request and response
//     scope.setFingerprint(["method", "path", "String(err.statusCode)"]);
//     Sentry.captureException(new Error("testing custom fingerprint"));
//   });

const obj1 = {
    data: 'abc',

    };

const map1 = new Map();
map1.set('a', 1);

// throw map1;
console.log(map1)

app.get("/map", function mainHandler(req,res) {
    Sentry.captureException(new Error(map1))
    Sentry.captureMessage(map1)
    res.send(map1.entries())
})

app.get("/message", function mainHandler(req,res) {

    const scope = Sentry.getCurrentHub().getScope();
    const parentSpan = scope.getSpan();
    
    console.log(parentSpan.spanRecorder)

    const span = parentSpan?.startChild({
        description: "SELECT * FROM usertable",
        op: 'db',
        origin: 'auto.db.postgres',
        'db.system': 'postgres'
      });


      span.end()
      console.log(parentSpan.spanRecorder)

    Sentry.captureMessage("testing")
    res.send("message done")
})

// app.get("/debug", async (req, res) => {

//     const scope = Sentry.getCurrentHub().getScope();
//     const parentSpan = scope.getSpan();
//     console.log("BEFORE DATABASE", parentSpan.spanRecorder)

//     try {
//       const result = await db.query("SELECT * FROM usertable");

//       console.log("AFTER DATABASE", parentSpan.spanRecorder)  

//       res.json(result.rows);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//     }
// });


app.get("/object", function mainHandler(req,res) {

    console.log(obj1)

    Sentry.captureException(obj1)

    Sentry.captureException(new Error(obj1))

    res.send("done")
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

app.get('/', function mainHandler(req, res) {

    res.send('hi')
});



app.get('/gaxios', async function mainHandler(req,respppp) {
    Sentry.withScope(function (scope) {
        // group errors together based on their request and response
        scope.setFingerprint(["method", "path", "String(err.statusCode)"]);
        Sentry.captureException(new Error("testing custom fingerprint"));
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

app.get('/e9', async function mainHandler(req, res) {
    throw new Error("hello9")

})

app.get('/e10', async function mainHandler(req, res) {
    throw new Error("hello10")

})


app.get('/e11', async function mainHandler(req, res) {
    throw new Error("hello11")

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

app.get('/testMessage', function mainHandler(req, res) {
    Sentry.captureMessage(`This is a test: SW${generateRandomSixDigit()}`)
    res.send("done")
})


app.get('/newError', function mainHandler(req,res) {
    Sentry.captureException(new Error("testing"), {
        tags: {
            http_status_code: "500",
            http_status_code2: 400,
        }
    })
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

    async function throwErrorAsync(){
        return Promise.reject(new Error());
    }
        
    const error = Promise.all([throwErrorAsync(), throwErrorAsync()]).catch((error) => Sentry.captureException(error))
})

Sentry.spanCont

app.get('/Transaction', async function mainHandler(req, res) {
    if (Sentry.getCurrentHub().getScope().getTransaction()){

        console.log(Sentry.getCurrentHub().getScope().getTransaction())
        const transaction = Sentry.getCurrentHub().getScope().getTransaction()

        // Sentry.getCurrentHub().getScope().getTransaction().transaction._name = "nameChange2"
        transaction.setName("nameChange4")
        console.log(transaction)
        // Sentry.getCurrentHub().getScope().getTransaction().finish()
    }
    // const result = Sentry.startSpan({ name: "Important Function" }, () => {
    //     return expensiveFunction();
    //   });


    // console.log(result)

            // const transSpan = Sentry.startTransaction({name: "TESTSPAN"})
            // transaction.setMeasurement("memoryUsed", Math.floor(Math.random() * 100) + 1, "byte");
            // transaction.setMeasurement("ui.footerComponent.render", Math.floor(Math.random() * 100) + 1, "second");
            // transaction.setMeasurement("localStorageRead", Math.floor(Math.random() * 100) + 1);
            // transaction.setMeasurement("localStorage_Read", 10);
            // transaction.setMeasurement("localStorage.Read_time", 11230);
            // transaction.setMeasurement("localStorage.Read", 1123333);
            // transaction.setMeasurement("localStorage.Read.hello.jordan", 1123333);

    // Sentry.getCurrentHub().configureScope(scope => scope.setSpan(transSpan));
    
    // const span = transaction.startChild({
    //     data: {
    //         // transSpan
    //     },
    //     op: 'auth',
    //     description: `59d74293-5def-4384-bfa4-c604a0687bb2`,
    // });

    //  span.finish()
    //  transaction.finish()
    //  try{

    //      Sentry.captureException(new Error("test span error"))
    //  } finally {

    //     //  transaction.setStatus("internal_error")
    //     //  transaction.finish()
    //  }
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

app.get('/envError', function mainHandler(req, res) {
    Sentry.captureException(new Error("test env"))
    res.send("env error")
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
