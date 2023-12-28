const express = require("express")
const redis = require("redis")
const { promisify } = require("util")

const app = express()
const client = redis.createClient({
    host: "redis-server",
    port: 6379,
})

const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)

app.get("/", async (req, res) => {
    try {
        const visits = await getAsync("visits")
        let realVisit

        if (visits !== null) {
            realVisit = parseInt(visits)
        } else {
            realVisit = 0
            await setAsync("visits", realVisit)
        }

        realVisit++
        await setAsync("visits", realVisit)

        console.log({ realVisit })
        res.send(`Number of Visits are: ${realVisit}`)
        // process.exit(1000)
    } catch (error) {
        console.error(error)
        res.status(500).send("Error occurred")
    }
})

app.listen(8081, () => {
    console.log(`Listening on port 8081`)
})
