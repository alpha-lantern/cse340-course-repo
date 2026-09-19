import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

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
    const title = `Project Details:`;

    res.render('project', { title, description: project.description, project, categories });
};

export { showProjectsPage, showProjectDetailsPage };