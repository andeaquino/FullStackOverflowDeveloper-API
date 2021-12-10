import connection from "../database";

interface CreateUser {
    name: string;
    class: string;
}

interface User extends CreateUser {
    id: number;
}

async function findById(id: number): Promise<User> {
    const result = await connection.query(`SELECT * FROM users WHERE id=$1`, [id]);

    return result.rows[0];
}

async function createUser(user: CreateUser): Promise<User> {
    const result = await connection.query(
        `INSERT INTO users (name, class) VALUES ($1, $2) RETURNING *`,
        [user.name, user.class]
    );

    return result.rows[0];
}

export { findById, createUser };