import mongoose from 'mongoose'


const User = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // lastName: {
  //   type: String,
  //   required: true
  // },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  bloodType: {
    type: String,
    required: true
  },
  refresh_token: {
    type: String,
    require: false
  }
})

export default mongoose.model('User', User)




