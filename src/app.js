
const app = require('express')();

app.get('/', (req, res) => {
  res.json({
    message:"hola nube"
  });
});


app.listen(3000,() => {
  console.log("server vivo")
});