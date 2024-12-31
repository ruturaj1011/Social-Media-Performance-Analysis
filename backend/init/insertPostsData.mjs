import { v4 as uuidv4 } from 'uuid';
import { Client } from 'cassandra-driver';  // Importing Astra DB client

// Astra DB credentials and client setup
const client = new Client({
  cloud: {
    secureConnectBundle: "C:\\Users\\rutur\\OneDrive\\Desktop\\SuperMindHackathonAssignment\\secure-connect-social-media-performance.zip", 
  },
  credentials: { username: 'OjAFPrPddfjXJNYyqKQzJQEi', password: 'Sev7eTFQnkm,6FJUzSMZCUbZSa6uUfgxIusoN+6O0ewZNkHB5qKrUZMIcZHCd_jJoKdkUt8zOwOZRk_n6kMFCl6,KA0SOdZj1z5dghxpkLtxLjIKZCpU7PGg1g7SLCv+' },
  keyspace: 'default_keyspace', 
});

// Function to generate random post data
const generateRandomPostData = (num) => {
  const types = ['carousel', 'reel', 'static_image'];
  const titles = [
    'Amazing nature shots!',
    'Latest tech news',
    'Food that will blow your mind',
    'Top 5 travel destinations',
    'How to grow your social media',
    'Breaking news in sports',
    'Cute cat videos',
    'Photography tips and tricks',
    'Best workout routines',
    'DIY home projects'
  ];
  const tagsList = [
    ['nature', 'landscape', 'photography'],
    ['technology', 'gadgets', 'news'],
    ['food', 'recipes', 'cooking'],
    ['travel', 'adventure', 'explore'],
    ['fitness', 'health', 'workout'],
    ['sports', 'news', 'highlights'],
    ['animals', 'pets', 'cute'],
    ['home', 'DIY', 'projects'],
  ];

  const posts = [];

  for (let i = 0; i < num; i++) {
    const post = {
      post_id: uuidv4(),  // Generates a unique post ID
      user_id: uuidv4(),  // Generates a random user ID
      title: titles[Math.floor(Math.random() * titles.length)],  // Random title from the list
      type: types[Math.floor(Math.random() * types.length)],  // Random post type
      created_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),  // Random timestamp in the past
      tags: tagsList[Math.floor(Math.random() * tagsList.length)],  // Random tags from the list
      likes: Math.floor(Math.random() * 1000),  // Random likes between 0 and 999
      shares: Math.floor(Math.random() * 500),  // Random shares between 0 and 499
      comments: Math.floor(Math.random() * 300),  // Random comments between 0 and 299
    };

    posts.push(post);
  }

  return posts;
};

// Function to insert posts data into the database
const insertPostsData = async (posts) => {
  try {

    const queryToEmpty = "TRUNCATE posts";
    await client.execute(queryToEmpty);

    const queryToInsert = 'INSERT INTO posts (post_id, user_id, title, type, created_at, tags, likes, shares, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    // Loop through each post and insert into the database
    for (const post of posts) {

      const { post_id, user_id, title, type, created_at, tags, likes, shares, comments } = post;

      // Execute the query with the post data
      await client.execute(queryToInsert, [post_id, user_id, title, type, created_at, tags, likes, shares, comments], { prepare: true });

      console.log(`Inserted post with ID: ${post_id}`);
    }
  } catch (err) {
    console.error('Error inserting data into Astra DB:', err);
  }

};

// Generate 50 posts and insert them into the database
const posts = generateRandomPostData(50);  // Generate 50 posts

// Insert the generated posts into Astra DB
insertPostsData(posts)
  .then(() => {
    console.log('Data insertion complete!');
  })
  .catch((err) => {
    console.error('Error during data insertion:', err);
  })
  .finally(() => {
    client.shutdown();  // Shutdown the client connection after the operation
  });

export default posts;
