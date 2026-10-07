import { getUpcomingProjects, getProjectDetails, createProject, updateProject, signupForProject, removeSignupForProject, getSignupProjectsByUserId } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';
import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { body, validationResult } from 'express-validator';

// Define validation and sanitization rules for organization form
// Define validation rules for organization form
const projectValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Project name must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required')
        .isLength({ max: 1000 })
        .withMessage('Project description cannot exceed 1000 characters'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Location is required')
        .isLength({ max: 200 })
        .withMessage('Project location cannot exceed 200 characters'),
    body('date')
        .notEmpty()
        .withMessage('Date is required')
        .isISO8601()
        .withMessage('Date must be a valid date format')
        .custom((value) => {
                const inputDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                // No past dates
                if (inputDate < today) {
                    throw new Error('Project date cannot earlier than today');
                }

                // Limit to 2 year in the future
                const maxDate = new Date();
                maxDate.setFullYear(today.getFullYear() + 2);

                if (inputDate > maxDate) {
                    throw new Error('Date cannot be more than 2 years in the future');
                }
                return true;
            }
        ),
    body('organizationId')
        .notEmpty()
        .withMessage('Organization is required')
        .isInt().withMessage('Organization must be a valid integer')
];

const NUMBER_OF_UPCOMING_PROJECTS = 5;
// Controller function to handle the request for upcoming projects
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    // console.log('Retrieved projects:', projects);

    const title = 'Upcoming Service Projects';
    const description = 'Explore our range of service projects';
    res.render('projects', { title, description, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    const categories = await getCategoriesByProjectId(projectId);
    // console.log('Retrieved project details:', project);
    const title = `Service Project: ${project.title}`;
    let isAlreadySignedUp = false;

    if (req.session && req.session.user) {
        isAlreadySignedUp = await validateVolunteerForProject(req.session, projectId);
        if (isAlreadySignedUp) {
            req.flash('info', 'You are volunteering for this project');
        }
    }

    res.render('project', { title, description: project.description, project, categories, isAlreadySignedUp });
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add a New Service Project';
    const description = 'Add your service projects so more people know about it and get involved';

    res.render('new-project', { title, description, organizations });
};

const processNewProjectForm = async (req, res) => {
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect('/new-project');
    }

    const { organizationId, title, description, location, date } = req.body;
    try {
        // Create the new project in the database
        const projectId = await createProject(title, description, location, date, organizationId);
        // Set a success flash message
        req.flash('success', 'Project added successfully!');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.log('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
};

const showEditProjectForm = async(req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const hostOrganization = await getOrganizationDetails(projectDetails.organization_id);
    const organizations = await getAllOrganizations();
    const title = `Edit ${projectDetails.title}`;
    const description = projectDetails ? projectDetails.description : 'No description available for this project.';

    res.render('edit-project', { title, description, projectId, projectDetails, organizations, hostOrganization });
};

const processEditProjectForm  = async(req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new organization form
        return res.redirect('/edit-project/' + req.params.id);
    }
    
    const projectId = req.params.id;
    const { title, description, location, date, organizationId } = req.body;

    await updateProject(projectId, organizationId, title, description, location, date);
    // Set a success flash message
    req.flash('success', 'Service Project updated successfully!');
    res.redirect(`/project/${projectId}`);
};

const processSignupForProject = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.id;
    try {
        const signupId = await signupForProject(userId, projectId);
        
        req.flash('success', 'You have successfully volunteered for this project!');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error signing up for project:', error);
        req.flash('error', 'An error occurred while signing up for the project. Please try again.');
        res.redirect(`/project/${projectId}`);
    }
};

const processRemoveSignupFromProject = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.id;

    try {
        await removeSignupForProject(userId, projectId);
        req.flash('success', 'You have successfully removed your signup for this project.');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error removing signup for project:', error);
        req.flash('error', 'An error occurred while removing your signup for the project. Please try again.');
        res.redirect(`/project/${projectId}`);
    }
};

const validateVolunteerForProject = async (session, projectId) => {
    const userId = session.user.user_id;

    const signedUpProjects = await getSignupProjectsByUserId(userId);
    const isAlreadySignedUp = signedUpProjects.some(project => project.project_id === parseInt(projectId));

    return isAlreadySignedUp;
};

export { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm, processSignupForProject, processRemoveSignupFromProject };