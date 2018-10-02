const mongoose = require('mongoose')
const url = 'mongodb://anon:anon117DB@ds153778.mlab.com:53778/fullstackdb'

mongoose.connect(url)

const Schema = mongoose.Schema

const personSchema = new Schema({name: String, number: Number})



personSchema.statics.format = function(Person) {
    return({name: Person.name, number: Person.number, id: Person._id})
}

const Person = mongoose.model('Person', personSchema)




module.exports = Person






