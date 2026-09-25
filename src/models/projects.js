import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT 
            sp.project_id,
            sp.title,
            sp.project_date,
            sp.location,
            o.name AS organization_name
        FROM service_projects sp
        INNER JOIN organization o 
            ON sp.organization_id = o.organization_id
        ORDER BY sp.project_date ASC;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM service_projects
        WHERE organization_id = $1
        ORDER BY project_date;
    `;
      
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

// Retrieve the specified number of upcoming projects using a SQL JOIN
const getUpcomingProjects = async(number_of_projects) => {
    const query = `
        SELECT 
            p.project_id, p.title, p.description, p.project_date, p.location,
            p.organization_id, o.name AS organization_name
        FROM service_projects p
        JOIN organization o 
            ON p.organization_id = o.organization_id
        WHERE p.project_date >= CURRENT_DATE
        ORDER BY p.project_date ASC
        LIMIT $1
    `;
    const result = await db.query(query, [number_of_projects]);
    return result.rows;
};
 
// Retrieve a single project's details by its ID using a JOIN
const getProjectDetails = async(id) => {
    const query = `
        SELECT
            p.project_id, p.title, p.description, p.project_date, p.location,
            p.organization_id, o.name AS organization_name
        FROM service_projects p
        JOIN organization o 
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
};

const getProjectsByCategoryId = async(categoryId) => {
    const query = `
        SELECT 
            sp.project_id,
            sp.project_date,
            sp.title,
            c.category_id,
            c.name
        FROM service_projects sp
        INNER JOIN project_categories pc 
            ON sp.project_id = pc.project_id
        INNER JOIN category c 
            ON pc.category_id = c.category_id
        WHERE c.category_id = $1;
    `;
    
    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);
    // Return all rows of the result set, or null if no rows are found
    return result.rows;
};

const createProject = async(title, description, location, date, organizationId) => {
    const query = `
        INSERT INTO service_projects (title, description, location, project_date, organization_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);
    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};

export { getAllProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails, 
    getProjectsByCategoryId, 
    createProject };