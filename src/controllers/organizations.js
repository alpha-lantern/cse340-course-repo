import { getAllOrganizations } from '../models/organizations.js';

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    // console.log('Retrieved organizations:', organizations);

    const title = 'Our Partner Organizations';
    const description = 'Discover our network of partner organizations';
    res.render('organizations', { title, description, organizations });
};

export { showOrganizationsPage };