const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
// Create Schema
const EventSchema = new Schema({
  userProfile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  eventImg: {
    type: String,
    trim: true,
    default:
      "https://res.cloudinary.com/namninja/image/upload/v1555809657/dzpmw1hbngbmv9u5qb0i.png"
  },
  eventName: {
    type: String,
    trim: true,
    required: true
  },
  eventDate: {
    type: Date,
    trim: true,
    required: true
  },
  eventVenue: {
    type: String,
    trim: true,
    required: false
  },
  eventAddress: {
    type: String,
    trim: true,
    required: true
  },
  eventAddress2: {
    type: String,
    trim: true,
    required: false
  },
  eventCity: {
    type: String,
    trim: true,
    required: true
  },
  eventState: {
    type: String,
    trim: true,
    required: true
  },
  normalizedCity: {
    type: String,
    trim: true,
    required: true
  },
  normalizedState: {
    type: String,
    trim: true,
    required: true
  },
  eventZip: {
    type: String,
    trim: true,
    required: false
  },
  eventCost: {
    type: String,
    required: false
  },
  eventStart: {
    type: String,
    required: false
  },
  eventEnd: {
    type: String,
    required: false
  },
  eventDetails: {
    type: String,
    required: false
  }
});

EventSchema.pre("find", function(next) {
  this.populate("user");
  next();
});

EventSchema.pre("findOne", function(next) {
  this.populate("user");
  next();
});
EventSchema.methods.serialize = function() {
  return {
    id: this._id,
    eventImg: this.eventImg,
    eventName: this.eventName,
    eventDate: moment(this.eventDate).format("ddd, MMM DD, YYYY"),
    eventVenue: this.eventVenue,
    eventAddress: this.eventAddress,
    eventAddress2: this.eventAddress2,
    eventCity: this.eventCity,
    eventState: this.eventState,
    eventZip: this.eventZip,
    eventCost: this.eventCost,
    eventStart: this.eventStart,
    eventEnd: this.eventEnd,
    eventDetails: this.eventDetails
  };
};
module.exports = mongoose.model("Event", EventSchema);
