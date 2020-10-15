const Car = require('../models/Car')

var router = require ('express').Router()

  //veritabanına yeni bir veri kaydetmek için:
  router.post("/",(req,res)=>{
    Car.create({
      brand: req.body.brand,
      color: req.body.color,
      productionYear: req.body.productionYear
   },(err)=>{
       if(err){
        res.status(400).send("veri kaydedilirken bir hata oluştu.")
       }
       else{
           res.status(200).send("veri başarıyla kaydedildi.")
       }
   })
  })

  //tüm verileri almak için:
  router.get("/",(req,res)=>{
    Car.find({}).then(data=>{
      res.send(data)
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "veriler alınırken bir hata oluştu."
    });
  });
  })



  //belirtilen id'deki veriyi almak için:
  router.get("/:id",(req, res) => {
    const id = req.params.id;
  
    Car.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Veri bulunamadı." });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "veri alınırken bir hata oluştu"});
    });
  })

  //belirtilen id'deki veriyi güncellemek için:
  router.put("/:id",(req, res) => {
    if(!req.body){
      return res.status(400).send({
        message: "boş alanları doldurunuz!"
      })
    }
  
    const id = req.params.id;
    Car.findByIdAndUpdate(id, req.body,{useFindAndModify: false})
    .then(data=>{
      if(!data){
        res.status(404).send( {
          message: "güncellenecek veri bulunamadı."
        })
      }
      else{
        res.send({ message: "veri başarıyla güncellendi." });
      }
    })
    .catch(err=>{
      res.status(500).send({
        message: "veri güncellenirken bir hata oluştu."
      });
    })
  })

  //belirtilen id'deki veriyi silmek için:
  router.delete("/:id",(req, res) => {
    const id = req.params.id;
  
    Car.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `id=${id}' id'sine sahip element silinemedi.`
          });
        } else {
          res.send({
            message: "veri silindi!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "şu id'ye sahip veril silinemedi" + id
        });
      });
  })

  //veritabanındaki tüm verileri silmek için:
  router.delete("/",(req, res) => {
    Car.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} veri silindi!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "veritabanındaki tüm veriler silinirken bir hata oluştu."
      });
    });
  })

module.exports = router; 