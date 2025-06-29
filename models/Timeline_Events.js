import mongoose from 'mongoose';

const timeline_events_schema = new mongoose.Schema({
    title : String ,
    date : Date ,
    description : String ,
    image: String ,
    isFirst : Boolean
});

const Timeline_events = mongoose.model('Timeline_events',timeline_events_schema);

export default Timeline_events;