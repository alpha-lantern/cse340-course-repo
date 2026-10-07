import express from 'express';

// Single pages
import { showHomePage } from './controllers/index.js';
import { testErrorPage } from './controllers/errors.js';
// Detail pages
// Categories
import { categoryValidation, processAssignCategoriesForm, processNewCategoryForm, showAssignCategoriesForm, showCategoriesPage, showCategoryDetailsPage, showNewCategoryForm, showEditCategoryForm, processEditCategoryForm } from './controllers/categories.js';
// Projects
import { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm, processSignupForProject, processRemoveSignupFromProject } from './controllers/projects.js';
// Organizations
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';
// User Registration and Authentication
import { processLoginForm, processLogout, processUserRegistrationForm, requireLogin, showDashboard, showLoginForm, showUserRegistrationForm, requireRole, showUsersPage } from './controllers/users.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Route for new organization page
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

// Route for edit organization page
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
// Route to handle edit organization form submission
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Route to handle project volunteer signup
router.post('/project/:id/volunteer', requireLogin, processSignupForProject);
router.post('/project/:id/remove-volunteer', requireLogin, processRemoveSignupFromProject);

// Route to handle new project page
router.get('/new-project', requireRole('admin'), showNewProjectForm);
// Route to handle new project form submission
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
// Routes to handle the edit project form
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

// Routes to assign categories to project
router.get('/project/:id/assign-categories', requireRole('admin'), showAssignCategoriesForm);
router.post('/project/:id/assign-categories', requireRole('admin'), processAssignCategoriesForm);

// Routes to add categories
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
// Routes to edit categories
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

// User registration form
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// Login and logout routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Dashboard route
router.get('/dashboard', requireLogin, showDashboard);

// Users page route
router.get('/users', requireRole('admin'), showUsersPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;