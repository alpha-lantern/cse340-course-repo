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
} 

// Retrieve the specified number of upcoming projects using a SQL JOIN
async function getUpcomingProjects(number_of_projects) {
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
}
 
// Retrieve a single project's details by its ID using a JOIN
async function getProjectDetails(id) {
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
}

export { getAllProjects,
getUpcomingProjects,
getProjectDetails };