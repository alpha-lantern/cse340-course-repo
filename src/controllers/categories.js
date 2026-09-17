import { getAllCategories } from '../models/categories.js';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    // console.log('Retrieved categories:', categories);

    const title = 'Service Project Categories';
    const description = 'Browse service projects by category';
    
    // Render the categories page with the retrieved data
    res.render('categories', { title, description, categories });
};

export { showCategoriesPage };