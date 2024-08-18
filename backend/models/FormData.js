const mongoose = require ('mongoose');

const FormDataSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
      }
 
})

const FormDataModel = mongoose.model('log_reg_form', FormDataSchema);

module.exports = FormDataModel;
