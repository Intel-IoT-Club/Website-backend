const mongoose = require('mongoose');

const timeline_events_schema = new mongoose.Schema({
    title : String ,
    date : Date ,
    description : String ,
    image: String ,
    isFirst : Boolean
});

module.exports = mongoose.model('Timeline_events',timeline_events_schema);