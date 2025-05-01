const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const port = 5000;
const app = express();
app.use(express.json());

// Configure CORS for a specific origin
const corsOptions = {
  origin: 'https://wallet-x-frontend.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you need to handle cookies or authorization headers
  optionsSuccessStatus: 204, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true })); // middleware jisse body dikhe
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transaction', require('./routes/transaction'));

main().catch(err => console.log(err));

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect('mongodb+srv://apurbaKoley:8oqrAjOaOPdbumcG@cluster0.1ykbjea.mongodb.net/WalletX');

  console.log("we are connected");
}

app.get("/", (req, res) => {
  res.send("Backend working lol");
});

app.get('/test', (req, res) => {
  res.send("deployment test working");
});

app.listen(port, () => {
  console.log(`Server running successfully at https://wallet-x-backend.vercel.app/`);
});

module.exports = app;