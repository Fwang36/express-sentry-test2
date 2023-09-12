import framesArray from './event.js'
import makeid from './randoms.js'
import * as Sentry from "@sentry/node"



export function makeFrames() {

      // console.log(Sentry.getCurrentHub().getClient()._options)
    for (let i = 0; i < 50; i++) {

        let id = makeid()
        Sentry.getCurrentHub().getClient()._options.release = id

        console.log(Sentry.getCurrentHub().getClient()._options.release)
        Sentry.captureException(new Error("test"))
    }
    console.timeEnd('Execution Time');
}

