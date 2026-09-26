import { getAllCategories, getCategoriesByProjectId, getCategoryById, updateCategoryAssignments } from '../models/categories.js';
import { getProjectDetails, getProjectsByCategoryId } from '../models/projects.js';

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

const showAssignCategoriesForm = async(req, res) => {
    const projectId = req.params.id;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = "Assign Categories to Project";
    const description = "Assign Categories to Project";

    res.render('assign-categories', { title, description, projectId, projectDetails, categories, assignedCategories })
};

const processAssignCategoriesForm = async(req, res) => {
    const projectId = req.params.id;
    // Retrieve selected categories as an array
    const categoryIds = req.body.categoryIds || [];
    const categoryIdsArray = Array.isArray(categoryIds) ? categoryIds : [categoryIds];

    await updateCategoryAssignments(projectId, categoryIdsArray);
    // Set a success flash message
    req.flash('success', 'Categories added successfully!');
    res.redirect(`/project/${projectId}`);
}

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };