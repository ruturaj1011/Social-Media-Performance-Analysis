
import express from 'express';
import { connectDB, getDB } from './db/connectDb.mjs';
import { getAvgMetrics } from './db/getAvgMetrics.js';


const app = express();
app.use(express.json());

// Api to get Avg of posts data
app.get('/api/analyze', async (req, res) => {

    const { post_type } = req.query;

    if (!post_type) {
      return res.status(400).json({ error: 'Post type is required' }); // Ensure return to stop further execution
    }

    try {

      const db = getDB();

        // getting Avg of posts from DB using this function
      const metrics = await getAvgMetrics(db, post_type);   

      if (!metrics) {
        return res.status(404).json({ message: `No data found for post type: ${post_type}` });
      }

      const { avg_likes, avg_shares, avg_comments } = metrics;
      return res.json({ post_type, avg_likes, avg_shares, avg_comments });

    } catch (error) {

      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }

});
  


// Start the server after connecting to the database
(async () => {

  await connectDB();

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
})();