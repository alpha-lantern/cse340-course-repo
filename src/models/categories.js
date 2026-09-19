import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, name 
        FROM public.category
        ORDER BY name;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getCategoryById = async(categoryId) => {
    const query = `
        SELECT name
        FROM category
        WHERE category_id = $1;
    `;
    
    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);
    // Return the first row of the result set, or null if no rows are found
    return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async(projectId) => {
    const query = `
        SELECT 
            sp.project_id,
            sp.title,
            c.category_id,
            c.name
        FROM service_projects sp
        INNER JOIN project_categories pc 
            ON sp.project_id = pc.project_id
        INNER JOIN category c 
            ON pc.category_id = c.category_id
        WHERE sp.project_id = $1;
    `;
    
    const queryParams = [projectId];
    const result = await db.query(query, queryParams);
    // Return all rows of the result set, or null if no rows are found
    return result.rows;
};

export {getAllCategories, getCategoryById, getCategoriesByProjectId}  