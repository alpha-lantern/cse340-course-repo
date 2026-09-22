import { getAllCategories, getCategoryById } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    // console.log('Retrieved categories:', categories);

    const title = 'Service Project Categories';
    const description = 'Browse service projects by category';
    
    // Render the categories page with the retrieved data
    res.render('categories', { title, description, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = "Projects for Category: ";
    const description = category ? `Now all the projects for ${category.name}` : 'No such category found.';

    // console.log(category);
    // console.log(projects);

    res.render('category', { title, description, category, projects });

};

export { showCategoriesPage, showCategoryDetailsPage };