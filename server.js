import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

// Define dirname and filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
  * Configure Express middleware
  */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

/**
  * Routes
  */
app.get('/', async (req, res) => {
    const title = 'Home';
    const description = 'Welcome to the CSE 340 Service Network';
    res.render('home', { title, description });
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    // console.log('Retrieved organizations:', organizations);

    const title = 'Our Partner Organizations';
    const description = 'Discover our network of partner organizations';
    res.render('organizations', { title, description, organizations });
});

app.get('/projects', async (req, res) => {
    const projects = await getAllProjects();
    // console.log('Retrieved projects:', projects);

    const title = 'Service Projects';
    const description = 'Explore our range of service projects';
    res.render('projects', { title, description, projects });
});

app.get('/categories', async (req, res) => {
    const categories = await getAllCategories();
    // console.log('Retrieved categories:', categories);

    const title = 'Service Project Categories';
    const description = 'Browse service projects by category';
    res.render('categories', { title, description, categories });
});

app.listen(PORT, async () => {
    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});