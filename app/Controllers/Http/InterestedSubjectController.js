'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with interestedsubjects
 */

/** @type {import('@adonisjs/framework/src/Env')} */

const axios = require('axios');
const Cloudnary = use('App/Services/Cloudnary');
const Database = use('Database');
const Env = use('Env')
const InterestedSubject = use('App/Models/InterestedSubject');
const Twitter = require('twitter');

class InterestedSubjectController {
  /**
   * Show a list of all interestedsubjects.
   * GET interestedsubjects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    return await Database
      .table('interested_subjects')
      .where('user_id', auth.user.id);
  }

  /**
   * Create/save a new interestedsubject.
   * POST interestedsubjects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {    
    try {
      const { subject, description} = request.all();
        let cloudnaryResponse;
         if(request.file('file')) {
            cloudnaryResponse = await Cloudnary.upload(request.file('file'));
          //  return response.json(cloudnaryResponse);
         }
         const interestedSubject = await InterestedSubject.create({
             user_id: auth.user.id,
             interested_name: subject,
             description: description,
             image_url: cloudnaryResponse.url
           });
           return response.status(200).json({status: true, data: interestedSubject});
    } catch (error) {
      return response.status(500).json({status: false, error: error.message });
    }
  }

  /**
   * Display a single interestedsubject.
   * GET interestedsubjects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view, auth }) {
    const subject = await InterestedSubject.findOrFail(params.id)

    // const youtubeResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=
    // ${Env.get('YOUTUBE_KEY')}&q=${subject.interested_name}&part=snippet&order=date`)
    const redditResponse = await axios.get(`https://www.reddit.com/r/${subject.interested_name}/top.json?limit=5&raw_json=1&sort=new`);

    const twitterClient = new Twitter({
      consumer_key: Env.get('TWITTER_CONSUMER_KEY'),
      consumer_secret: Env.get('TWITTER_CONSUMER_SECRET'),
      access_token_key: Env.get('TWITTER_TOKEN_KEY'),
      access_token_secret: Env.get('TWITTER_TOKEN_SECRET'),
    });
    
    const twitterParams = { q : subject.interested_name, result_type:'mixed', count:'5' };
    const twitterResponse = await twitterClient.get('search/tweets.json', twitterParams)

    
    // const youtube = youtubeResponse.data.items
    const reddit = redditResponse.data.data.children;
    const twitter = twitterResponse.statuses;

    return { reddit, twitter};

  }

  /**
   * Update interestedsubject details.
   * PUT or PATCH interestedsubjects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a interestedsubject with id.
   * DELETE interestedsubjects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = InterestedSubjectController
