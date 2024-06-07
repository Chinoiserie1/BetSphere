import pool from "../utils/db";

interface WhitelistedUrl {
  url: string;
  description?: string;
}

export const addWhitelistedUrl = async ({
  url,
  description,
}: WhitelistedUrl) => {
  const query = `
    INSERT INTO whitelistedUrl (url, description)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [url, description];

  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error('Error inserting URL into "whitelistedUrl":', err);
    throw err;
  }
};

export const getWhitelistedUrls = async () => {
  const query = `
    SELECT * FROM whitelistedUrl;
  `;

  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error('Error getting URLs from "whitelistedUrl":', err);
    throw err;
  }
};

export const isUrlWhitelisted = async (url: string) => {
  const query = `
    SELECT * FROM whitelistedUrl
    WHERE url = $1;
  `;
  const values = [url];

  try {
    const res = await pool.query(query, values);
    return res.rows.length > 0;
  } catch (err) {
    console.error('Error checking URL in "whitelistedUrl":', err);
    throw err;
  }
};
