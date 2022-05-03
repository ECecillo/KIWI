'use strict'

import Youtube from '../src/youtube-web-api'

const API_KEY = `${process.env.GOOGLE_API_KEY_DEV}`

const youtube = new Youtube()

export default async function handler(req, res) {
  console.debug(req)
  const videoId = req.query.id
  //youtube.setApiKey(API_KEY);
  try {
    const data = await youtube.getVideo(videoId, {
      part: 'snippet',
      key: API_KEY,
    })
    return res.status(200).json(data.body)
  } catch (error) {
    return res.status(404).json(error, { text: 'FUCK OFF' })
  }
}
