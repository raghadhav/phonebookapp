
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
 
 console.log('connecting to', url)
  
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })  
  const personSchema = new mongoose.Schema({
    name: {
      type:String,
      minlength: 3,
      required: true,
      unique: true
    },
    number: {
      type: Number,
      min: [10000000, 'Too few numbers'],
      required: true
    } 
  })
  
  // these next steps is for removing the ._v id from printing to the frontend
  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Person', personSchema)
