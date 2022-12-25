import express from 'express';

const app = express();

app.listen(9000, () => {
  // eslint-disable-next-line no-console
  console.log('listening  to port 9000');
});
