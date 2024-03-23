import express from 'express';


const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, URL Shortener! fdfd' );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
