const express = require('express');
const apiRouter = require('./routes');
const app = express();
//const cfg = require('./config');

app.use(express.json());
app.use('/DayZMySqlFramework', apiRouter);

app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is listening to port: ${process.env.PORT || '3000'}`);
    //cfg.read();
});