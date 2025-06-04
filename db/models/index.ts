import { model } from 'mongoose'

import { exerciseModel } from './exercise'

const Exercise = model('Exercise', exerciseModel)

export default { Exercise }
