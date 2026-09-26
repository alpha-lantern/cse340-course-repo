import { addCategory, getAllCategories, getCategoriesByProjectId, getCategoryById, updateCategory, updateCategoryAssignments } from '../models/categories.js';
import { getProjectDetails, getProjectsByCategoryId } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

// Define validation and sanitization rules for organization form
// Define validation rules for organization form
const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min:3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters')
];

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

const showNewCategoryForm = async(req, res) => {
    const title = "Add a New Category";
    const description = "Add a new service project category";

    res.render('new-category', { title, description });
};

const processNewCategoryForm = async(req, res) => {
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new organization form
        return res.redirect('/new-category');
    }
    const { name } = req.body;
    await addCategory(name);

    // Set a success flash message
    req.flash('success', 'Category added successfully!');
    res.redirect(`/categories`);
};

const showEditCategoryForm = async(req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const title = "Edit Category";
    const description = "Edit service project category";

    res.render('edit-category', { category, title, description });
};

const processEditCategoryForm = async(req, res) => {
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new organization form
        return res.redirect('/edit-category' + req.params.id);
    }
    const categoryId = req.params.id;
    const { name } = req.body;
    const updatedCategoryId = await updateCategory(categoryId, name);

    // Set a success flash message
    req.flash('success', 'Category updated successfully!');
    res.redirect(`/category/${categoryId}`);
};

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, categoryValidation, showEditCategoryForm, processEditCategoryForm };