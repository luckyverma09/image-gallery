//pages/api/upload.js
import cloudinary from '../../lib/cloudinary';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { file, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    try {
      const uploadedImage = await cloudinary.uploader.upload(file, {
        folder: userId,
      });

      res.status(200).json(uploadedImage);
    } catch (err) {
      console.error('Image upload failed:', err);
      res.status(500).json({ error: 'Image upload failed', details: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
