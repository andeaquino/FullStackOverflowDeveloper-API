import connection from "../database";

interface CreateQuestion {
    question: string;
    student: string;
    group: string;
    tags: string;
}

interface Question extends Omit<CreateQuestion, 'group'> {
    id: number;
    answered: boolean;
    submitAt: string;
    answeredAt?: string;
    answeredBy?: string;
    answer?: string;
}

async function createQuestion(questionInfo: CreateQuestion): Promise<number> {
    const { question, student, group, tags } = questionInfo;

    const result = await connection.query(`
        INSERT INTO questions (question, student, class, tags, submitAt) VALUES ($1, $2, $3, $4, NOW()) RETURNING id`,
        [question, student, group, tags]
    );

    return result.rows[0].id;
}

export {createQuestion}