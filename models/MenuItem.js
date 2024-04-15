const mongoose = require('mongoose')

const menuItemSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required : true
    },
    taste: {
        type: String,
        enum :["spicy" , "salty" , "sweet"]
    },
    is_drink: {
        type: Boolean,
        default : false
    },
    ingredients: {
        type: [String],
        default : []
    },
    number_sales: {
        type: Number,
        default : 0
    }

})

const MenuItem = mongoose.model("MenuItem", menuItemSchema)

module.exports = MenuItem