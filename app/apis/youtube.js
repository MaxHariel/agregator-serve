const axios = require('axios')

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

const KEY = Env.get('YOUTUBE_KEY');

console.log("KEY ", KEY)
module.exports = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY
  }
});