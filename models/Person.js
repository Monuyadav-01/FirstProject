const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    }
    ,
    work: {
        type: String,
        enum: ['manager', 'chef', 'waiter'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

personSchema.pre('save', async function (next) {
    const person = this

    if(!person.isModified('password')) return next()
    try {
        // hash password genrate 
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(person.password, salt)
        person.password = hashPassword
        next()
    } catch (error) {
        return next(err)
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (error) {
        throw error
    }
}

const Person = mongoose.model("Person", personSchema)

module.exports = Person