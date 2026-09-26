import express from 'express';

// Single pages
import { showHomePage } from './controllers/index.js';
import { testErrorPage } from './controllers/errors.js';
// Detail pages using query parameters
// Categories
import { processAssignCategoriesForm, showAssignCategoriesForm, showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
// Projects
import { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
// Organizations
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route for edit organization page
router.get('/edit-organization/:id', showEditOrganizationForm);
// Route to handle edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Route to handle new project page
router.get('/new-project', showNewProjectForm);
// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);
// Routes to handle the edit project form
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// Routes to assign categories to project
router.get('/project/:id/assign-categories', showAssignCategoriesForm);
router.post('/project/:id/assign-categories', processAssignCategoriesForm);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;