const mongoose = require('mongoose');


// habit schema
const HabitSchema = new mongoose.Schema({
    
        Habit: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        statuses: [
        {
        date: { type: Date, default: Date.now },
        status: { type: String, enum: ['Done', 'NotDone', 'None'] },
        },
      ],
        });
    

const Habit = mongoose.model('Habits', HabitSchema);
module.exports = Habit;