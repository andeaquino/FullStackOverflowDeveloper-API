import connection from '../database';

interface CreateUser {
    name: string;
    group: string;
}

interface User extends Omit<CreateUser, 'group'> {
    id: number;
    class: string;
}

async function findById(id: number): Promise<User> {
  const result = await connection.query('SELECT * FROM users WHERE id=$1', [id]);

  return result.rows[0];
}

async function createUser(user: CreateUser): Promise<User> {
  const { name, group } = user;
  const result = await connection.query(
    'INSERT INTO users (name, class) VALUES ($1, $2) RETURNING *',
    [name, group],
  );

  return result.rows[0];
}

export { findById, createUser };
