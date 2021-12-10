CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"class" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"question" TEXT NOT NULL,
	"student" TEXT NOT NULL,
	"class" TEXT NOT NULL,
	"tags" TEXT NOT NULL,
	"answer_id" integer,
	"submitAt" DATE NOT NULL,
	CONSTRAINT "questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "answer" (
	"id" serial NOT NULL,
	"answeredAt" DATE NOT NULL,
	"user_id" integer NOT NULL,
	"answer" TEXT NOT NULL,
	CONSTRAINT "answer_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("answer_id") REFERENCES "answer"("id");

ALTER TABLE "answer" ADD CONSTRAINT "answer_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
