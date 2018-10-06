const mongoose = require('mongoose')

if( process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url)

const Schema = mongoose.Schema


const personSchema = new Schema({
  name: { type: String, required: true },
  number: Number
})

personSchema.path('name').validate(
  function(value) {
    const self = this
    return self.constructor.findOne({ name: value }).exec()
      .then(function(name){
        if(name) {
          if(self.id === name.if){
            console.log(1)
            return true
          }
          console.log(2)
          return false
        }
        console.log(3)
        return true
      })
      .catch(function(err){
        console.log('nyt tuli virhe')
        throw err
      })
  }, 'name: {VALUE} already taken, try another name'
)


personSchema.statics.format = function(Person) {
  return({ name: Person.name, number: Person.number, id: Person._id })
}


const Person = mongoose.model('Person', personSchema)




module.exports = Person






