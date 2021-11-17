const express = require('express')
const userRouter = require('./routes/users.routes')
const rankingRouter = require('./routes/ranking.routes')
const countriesRouter = require('./routes/countries.routes')
const publicServantRouter = require('./routes/publicservant.routes')
// require('dotenv').config();

const PORT = 8000

const app = express()
const cors = require("cors")

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use('/api', userRouter, rankingRouter, countriesRouter, publicServantRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT} `))