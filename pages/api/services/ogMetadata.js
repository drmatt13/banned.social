import colors from 'colors'
import ogs from 'open-graph-scraper'

export default async (req, res) => {

  const { url } = req.body;

  try {
    const og = await ogs({ url, onlyGetOpenGraphInfo: true })
    console.log(og.error)
    res.json({ success: true, ogMetadata: og.result })
  } catch (error) {
    console.error("Failed to fetch og metadata".bold.red)
    res.json({ success: false })
  }


}