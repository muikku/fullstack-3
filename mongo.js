const mongoose = require('mongoose')
const url = 'mongodb://anon:anon117DB@ds153778.mlab.com:53778/fullstackdb'

const params = process.argv.filter((element, index) => index > 1)

const Name1 = params.filter(e => isNaN(parseInt(e))).join(' ')
const Number1 = params.filter(e => !isNaN(parseInt(e))).join()

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: Number
})


const person = new Person({
    name: Name1,
    number: Number1
}) 


if(params.length === 0){
    Person
    .find({})
    .then(result => {
        console.log('puhelinluettelo:')
        result.forEach(Person => {
            console.log(Person.name, Person.number)
        })
        mongoose.connection.close()
    })
} else {


    person
    .save()
    .then(result => {
        console.log('lisätään henkilö ', person.name, 'numbero', person.number, 'luetteloon')
        mongoose.connection.close()
    })

}








module.exports = Person






