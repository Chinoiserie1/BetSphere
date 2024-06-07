import pool from "./db";

// Function to create the table
const createWhitelistedUrlTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS whitelistedUrl (
      id SERIAL PRIMARY KEY,
      url VARCHAR(255) NOT NULL UNIQUE,
      description VARCHAR(255),
      added_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status BOOLEAN DEFAULT TRUE
    );
  `;

  try {
    await pool.query(query);
    console.log('Table "whitelistedUrl" created successfully.');
  } catch (err) {
    console.error('Error creating table "whitelistedUrl":', err);
  }
};

// Function to insert initial values
const insertInitialValues = async () => {
  const initialValues = [
    { url: "https://example.com", description: "Example website" },
    {
      url: "https://another-example.com",
      description: "Another example website",
    },
  ];

  const query = `
    INSERT INTO whitelistedUrl (url, description)
    VALUES ($1, $2)
    ON CONFLICT (url) DO NOTHING;
  `;

  try {
    for (const value of initialValues) {
      await pool.query(query, [value.url, value.description]);
    }
    console.log('Initial values inserted into "whitelistedUrl" successfully.');
  } catch (err) {
    console.error('Error inserting initial values into "whitelistedUrl":', err);
  }
};

// Function to initialize the database
const initializeDatabase = async () => {
  await createWhitelistedUrlTable();
  await insertInitialValues();
};

// Call the initialize function
initializeDatabase().catch((err) =>
  console.error("Database initialization failed:", err)
);
