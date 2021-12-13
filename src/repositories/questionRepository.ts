import connection from '../database';

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
  const {
    question, student, group, tags,
  } = questionInfo;

  const result = await connection.query(
    `
        INSERT INTO questions (question, student, class, tags, answered, "submitAt") VALUES ($1, $2, $3, $4, false, NOW()) RETURNING id`,
    [question, student, group, tags],
  );

  return result.rows[0].id;
}

async function isQuestionAnswered(id: number): Promise<boolean> {
  const result = await connection.query(
    `
        SELECT * FROM questions WHERE id = $1`,
    [id],
  );

  if (result.rows[0].answered) {
    return true;
  }
  return false;
}

async function findQuestionByID(id: number): Promise<Question> {
  const isAnswered = await isQuestionAnswered(id);
  if (isAnswered) {
    const result = await connection.query(
      `
            SELECT
            questions.*,
            users.name AS "answeredBy"
            FROM questions
            JOIN users
            ON users.id = questions."answeredBy"
            WHERE questions.id = $1`,
      [id],
    );
    return result.rows[0];
  }

  const result = await connection.query(
    `
        SELECT
        id,
        question,
        student,
        class,
        tags,
        answered,
        "submitAt"
        FROM questions WHERE id = $1`,
    [id],
  );
  return result.rows[0];
}

async function answerQuestion(userId: number, questionId: number, answer: string) {
  await connection.query(
    `
        UPDATE questions SET
        answered = true,
        "answeredAt" = NOW(),
        "answeredBy" = $1,
        answer = $2
        WHERE id = $3`,
    [userId, answer, questionId],
  );
}

async function findClearQuestions(): Promise<Question[]> {
  const result = await connection.query(`
        SELECT
        id,
        question,
        student,
        class,
        tags,
        answered,
        "submitAt"
        FROM questions WHERE answered = false`);

  return result.rows;
}

export {
  createQuestion, findQuestionByID, answerQuestion, findClearQuestions,
};
