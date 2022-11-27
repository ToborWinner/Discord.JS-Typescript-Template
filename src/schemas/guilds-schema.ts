'use strict';
import mongoose, { Schema } from "mongoose";

const reqString = {
    type: String,
    required: true
}

const reqNumber = {
    type: Number,
    required: true
}

const Count = new Schema({
    id: reqString,
    count: reqNumber
})

const schema = new Schema({
    guildId: reqString,
    prefix: String,
    lastAdded: Date
})

const name = "guilds"

export default mongoose.models[name] || mongoose.model(name, schema)