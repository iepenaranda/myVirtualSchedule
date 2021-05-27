// The reminder will be stored in the DB
const mongoose = require("mongoose");

// Making of the reminder's Schema that will be used in the DB
const reminderSchema = new mongoose.Schema({
    userId: String,
    name: String,
    description: String,
    date: { type: Date,
        default: Date.now},
});

// Making of the reminder's collection in the DB
const Reminder = mongoose.model("reminder", reminderSchema);

// Module's export
module.exports = Reminder;