-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Service Projects Table
-- ========================================
CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    location TEXT,
    project_date DATE,
    CONSTRAINT fk_organization 
        FOREIGN KEY (organization_id) 
        REFERENCES organization (organization_id) 
        ON DELETE CASCADE
);

-- ========================================
-- Category Table
-- ========================================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================================
-- Project Categories Table
-- ========================================
CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_project 
        FOREIGN KEY (project_id) 
        REFERENCES service_projects (project_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_category 
        FOREIGN KEY (category_id) 
        REFERENCES category (category_id) 
        ON DELETE CASCADE
);

-- ========================================
-- Insert sample data: Organization
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename) 
VALUES 
    (
        'BrightFuture Builders', 
        'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 
        'info@brightfuturebuilders.org', 
        'brightfuture-logo.png'
    ),
    (
        'GreenHarvest Growers', 
        'An urban farming collective promoting food sustainability and education in local neighborhoods.', 
        'contact@greenharvest.org', 
        'greenharvest-logo.png'
    ),
    (
        'UnityServe Volunteers', 
        'A volunteer coordination group supporting local charities and service initiatives.', 
        'hello@unityserve.org', 
        'unityserve-logo.png'
    );

-- ========================================
-- Insert sample data: Service Projects
-- ========================================
INSERT INTO service_projects (organization_id, title, description, location, project_date)
VALUES
    -- BrightFuture Builders (Organization ID: 1)
    (
        1, 
        'Community Center Roof Repair', 
        'Repairing and reinforcing the roof structure of the downtown community center using eco-friendly materials.', 
        '123 Main St, Downtown', 
        '2026-10-10'
    ),
    (
        1, 
        'Solar Panel Installation at Local School', 
        'Installing a solar array to lower energy costs for Oakridge Elementary School.', 
        '456 Oak Ave, Westside', 
        '2026-11-15'
    ),
    (
        1, 
        'Accessible Ramp Construction', 
        'Building ADA-compliant wheelchair access ramps for low-income senior citizens.', 
        '789 Pine Rd, Eastside', 
        '2027-01-02'
    ),
    (
        1, 
        'Park Bench & Playground Renovation', 
        'Refurbishing worn-out wooden benches and replacing playground equipment with recycled materials.', 
        'Riverside Park, North District', 
        '2027-01-20'
    ),
    (
        1, 
        'Energy Efficiency Home Upgrades', 
        'Weatherizing and insulating homes for low-income families ahead of winter.', 
        '101 Maple St, South District', 
        '2027-02-11'
    ),

    -- GreenHarvest Growers (Organization ID: 2)
    (
        2, 
        'Spring Urban Garden Prep', 
        'Preparing soil beds, planting seasonal vegetables, and setting up irrigation for the community plot.', 
        'Community Plot 4, Central Park', 
        '2026-10-28'
    ),
    (
        2, 
        'Composting Workshop & Setup', 
        'Teaching residents how to compost household waste and building community bin stations.', 
        '552 Elm St, Neighborhood Hub', 
        '2026-11-18'
    ),
    (
        2, 
        'Rooftop Farm Expansion', 
        'Setting up hydroponic planter boxes on the local youth center rooftop.', 
        '889 Broadway, Rooftop Level', 
        '2026-11-22'
    ),
    (
        2, 
        'School Food Forest Planting', 
        'Planting fruit trees and perennial berry bushes in school courtyards for student education.', 
        '303 Cedar St, Middle School', 
        '2027-01-14'
    ),
    (
        2, 
        'Harvest Festival & Produce Drive', 
        'Harvesting summer yields and distributing fresh produce directly to local food banks.', 
        'Market Square, Downtown', 
        '2027-03-30'
    ),

    -- UnityServe Volunteers (Organization ID: 3)
    (
        3, 
        'Downtown Food Pantry Distribution', 
        'Sorting, packing, and handing out grocery boxes to families in need.', 
        '12 Shelter Way, Downtown', 
        '2026-10-05'
    ),
    (
        3, 
        'Senior Citizen Tech Support Day', 
        'Pairing youth volunteers with seniors to teach smartphone and computer basics.', 
        'Golden Years Center, 44 Lake Rd', 
        '2026-10-26'
    ),
    (
        3, 
        'Riverbank Cleanup Initiative', 
        'Removing litter, plastics, and debris along the 3-mile stretch of the local riverbank.', 
        'Greenway Riverbank Trail', 
        '2026-11-09'
    ),
    (
        3, 
        'Back-to-School Backpack Drive', 
        'Collecting, organizing, and distributing backpacks filled with school supplies to students.', 
        'Civic Center Assembly Hall', 
        '2026-11-25'
    ),
    (
        3, 
        'Animal Shelter Supply & Grooming Day', 
        'Assisting shelter staff with bath routines, cage cleaning, and organizing donated supplies.', 
        '900 Humane Way, Eastside', 
        '2026-12-12'
    );


-- ========================================
-- Insert sample data: Categories
-- ========================================

INSERT INTO category (name)
VALUES
    ('Construction & Housing'),
    ('Environment & Sustainability'),
    ('Education & Youth'),
    ('Community & Social Services');

INSERT INTO project_categories (project_id, category_id)
VALUES
    -- BrightFuture Builders Projects (IDs 1-5)
    (1, 1), -- Roof Repair -> Construction & Housing
    (2, 1), -- Solar Panel Installation -> Construction & Housing
    (2, 2), -- Solar Panel Installation -> Environment & Sustainability
    (3, 1), -- Accessible Ramp Construction -> Construction & Housing
    (3, 4), -- Accessible Ramp Construction -> Community & Social Services
    (4, 1), -- Park Bench & Playground Renovation -> Construction & Housing
    (4, 4), -- Park Bench & Playground Renovation -> Community & Social Services
    (5, 1), -- Energy Efficiency Home Upgrades -> Construction & Housing
    (5, 2), -- Energy Efficiency Home Upgrades -> Environment & Sustainability

    -- GreenHarvest Growers Projects (IDs 6-10)
    (6, 2), -- Spring Urban Garden Prep -> Environment & Sustainability
    (7, 2), -- Composting Workshop -> Environment & Sustainability
    (7, 3), -- Composting Workshop -> Education & Youth
    (8, 2), -- Rooftop Farm Expansion -> Environment & Sustainability
    (9, 2), -- School Food Forest Planting -> Environment & Sustainability
    (9, 3), -- School Food Forest Planting -> Education & Youth
    (10, 2), -- Harvest Festival & Produce Drive -> Environment & Sustainability
    (10, 4), -- Harvest Festival & Produce Drive -> Community & Social Services

    -- UnityServe Volunteers Projects (IDs 11-15)
    (11, 4), -- Downtown Food Pantry Distribution -> Community & Social Services
    (12, 3), -- Senior Citizen Tech Support Day -> Education & Youth
    (12, 4), -- Senior Citizen Tech Support Day -> Community & Social Services
    (13, 2), -- Riverbank Cleanup Initiative -> Environment & Sustainability
    (14, 3), -- Back-to-School Backpack Drive -> Education & Youth
    (14, 4), -- Back-to-School Backpack Drive -> Community & Social Services
    (15, 4); -- Animal Shelter Supply & Grooming Day -> Community & Social Services