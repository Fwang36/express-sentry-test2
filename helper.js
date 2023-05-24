import framesArray from './event.js'
import makeid from './randoms.js'
import * as Sentry from "@sentry/node"

Sentry.init({
    dsn: "https://7f5b04050807491093212080d322e8b2@o1407376.ingest.sentry.io/4504935171489792",
    release: "1"
})



export default function makeFrames() {

      // console.log(Sentry.getCurrentHub().getClient()._options)
    for (let i = 0; i < 50; i++) {

        let id = makeid()
        Sentry.getCurrentHub().getClient()._options.release = id

        console.log(Sentry.getCurrentHub().getClient()._options.release)
        Sentry.captureException(new Error("test"))
    }
    console.timeEnd('Execution Time');
}

console.log(makeFrames())
