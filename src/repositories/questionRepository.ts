import connection from "../database";

interface CreateQuestion {
    question: string;
    student: string;
    group: string;
    tags: string;
}

interface Question extends Omit<CreateQuestion, 'group'> {
    id: number;
    class: string;
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

async function findQuestionByID(id: number): Promise<Question> {
    const result = await connection.query(`
        SELECT
        questions.*,
        answers."answeredAt",
        answers.answer,
        users.name AS "answeredBy"
        FROM questions
        JOIN answers
            ON answers.id = questions.answer_id
        JOIN users
            ON users.id = answers.user_id
        WHERE questions.id=$1`,
        [id]
    );

    if (result.rows[0].answer_id) {
        result.rows[0].answered = true;
    } else {
        result.rows[0].answered = false;
    }

    return result.rows[0];
}

async function getClearQuestions(): Promise<Question[]> {
    const result = await connection.query(`SELECT * FROM questions WHERE answer_id=null`);

    return result.rows;
}

export { createQuestion, findQuestionByID, getClearQuestions };