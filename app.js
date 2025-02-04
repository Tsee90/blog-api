const express = require('express');
const app = express();

const dotenv = require('dotenv');
const args = process.argv.slice(2);
const envArg = args.find((arg) => arg.startsWith('--env='));
const environment = envArg ? envArg.split('=')[1] : 'development';
dotenv.config({ path: `.env.${environment}` });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const indexRouter = require('./src/routes/indexRouter');
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Blog API - listening on port ${PORT}!`);
});
