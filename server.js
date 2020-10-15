const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose')

const app = express();

/*origin özelliğinde verilen adresteki uygulama ile bu uygulamanın  arasında 
veri alışverişi kontrolü yapmak için cors kullanılır.*/
var corsOptions = {
    origin: "http://localhost:3000" 
};
app.use(cors(corsOptions));

/*uygulamaya gelen request'leri ayrıştırıp kullanmak için body-parser yapısı
kullanılır.*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//veritabanı bağlantısı kuruluyor.
mongoose.connect('mongodb://localhost:27017/carDB', 
{useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false},(err)=>{
    err ? console.log(err): console.log("bağlantı başarılı.");
});

//basit bir route
app.get("/", (req, res) => {
    res.send("anasayfa")
}); 

//route'lar import ediliyor.
const router = require('./routes/routes')
app.use("/cars/",router)

//uygulamanın çalışacağı port ayarlanıyor.
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`uygulama ${PORT} portunda çalışıyor...`);
}); 