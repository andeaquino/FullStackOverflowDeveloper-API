import connection from '../database';

interface User {
  name: string;
  answers: number;
}

async function findTopUsers(): Promise<User[]> {
  const result = await connection.query(`
    SELECT users.name, COUNT(questions."answeredBy") AS answers
    FROM questions
    JOIN users
    ON users.id = questions."answeredBy"
    GROUP BY users.name
    ORDER BY answers DESC
    LIMIT 10
  `);

  return result.rows;
}

export { findTopUsers };
