const mongoose=require('mongoose')
const CarSchema =new mongoose.Schema({
  brand: String,
  color: String,
  productionYear: Number
},
/*mongoose'un timestamps özelliği sayesinde post'un ne zaman 
oluşturulup ne zaman güncellendiği otomatik olarak kaydedilir..*/
{ timestamps: true }) 

module.exports= mongoose.model('Car',CarSchema);