import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  const { url } = req.body;

  // Check if the URL is valid
  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    // Get video info and format
    const videoInfo = await ytdl.getInfo(url);
    const downloadFormat = ytdl.chooseFormat(videoInfo.formats, { quality: 'highestvideo' });
    
    // Return the download URL
    res.status(200).json({ downloadUrl: downloadFormat.url });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process the video' });
  }
}
