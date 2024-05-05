const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000);

const cors = require('cors');
app.use(cors());

// imported the router from routes/index.js and making its default as /api/v1
const rootRouter = require('/routes/index');
app.use('/api/v1', rootRouter);


