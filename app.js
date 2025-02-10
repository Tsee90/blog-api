const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
const args = process.argv.slice(2);
const envArg = args.find((arg) => arg.startsWith('--env='));
const environment = envArg ? envArg.split('=')[1] : 'development';
dotenv.config({ path: `.env.${environment}` });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./src/routes/userRouter');
app.use('/users', userRouter);
const postRouter = require('./src/routes/postRouter');
app.use('/posts', postRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Blog API - listening on port ${PORT}!`);
});
