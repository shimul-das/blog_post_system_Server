const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Connection URI
const uri = `mongodb+srv://Shimul1321:1315418698@cluster0.haa7u0w.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with the specified API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to the MongoDB database
async function connectDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

// Call the connectDatabase function
connectDatabase();

// Parse JSON request bodies
// app.use(bodyParser.json());
// const bodyParser = require('body-parser');

// Set the limit to handle larger payloads
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

// Enable CORS
app.use(cors());

// Define a Blog schema (this will be specific to your application)
// ...

// Create Blog Controller
// Create Blog Controller
app.post('/api/blogs', async (req, res) => {
    console.log(req.body)
    try {
      const { title, category, author, location, description, images } = req.body;
  
      if (!title || !category || !author || !location || !description || !images) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all fields!!',
        });
      }
  
      // Example of inserting data using MongoDB driver
      const db = client.db('TestBlogPost');
      const blogsCollection = db.collection('blogs');
  
      const result = await blogsCollection.insertOne({
        title,
        category,
        author,
        location,
        description,
        images,
      });
  
      console.log('Inserted blog with ID:', result.insertedId);
  
      return res.status(201).json({
        success: true,
        message: 'Blog Created!!',
        newBlog: {
          title,
          category,
          author,
          location,
          description,
          images,
        },
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  });

app.get('/', (req, res) => {
    res.send('Pranayama is sitting')
  })

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
