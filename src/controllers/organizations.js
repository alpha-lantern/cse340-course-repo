import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    // console.log('Retrieved organizations:', organizations);
    const title = 'Our Partner Organizations';
    const description = 'Discover our network of partner organizations';

    res.render('organizations', { title, description, organizations });
};

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = "Partner Organization Profile";
    const description = organizationDetails ? organizationDetails.description : 'No description available for this organization.';

    res.render('organization', { title, description, organizationDetails, projects });
};

export { showOrganizationsPage, showOrganizationDetailsPage };