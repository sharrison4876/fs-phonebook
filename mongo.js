const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://sharrison4876:${password}@samcluster.7wk8i53.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=SamCluster`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  important: Boolean
})

const Person = mongoose.model('Person', personSchema)

/*
const note = new Note({
  content: 'Mongoose makes things easier',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/



Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })

