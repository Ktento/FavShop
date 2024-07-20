/*
const express = require("express");
const app = express();
const port = 3001;

// jsonの受け取り
app.use(express.json());

// cors対策
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(cors({
  origin: 'http://localhost:3000', // 許可するオリジンを指定
  methods: 'GET,POST,PUT,DELETE', // 許可するHTTPメソッドを指定
  allowedHeaders: 'Content-Type,Authorization', // 許可するリクエストヘッダーを指定
})
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// postの処理
app.post("/", function (req, res) {
  try {
    res.json(req.body); // jsonで返却
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
*/