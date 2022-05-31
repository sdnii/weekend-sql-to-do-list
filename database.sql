CREATE TABLE tasks(
	"id" SERIAL PRIMARY KEY,
	"description" varchar(256),
	"complete" boolean DEFAULT false
);

-- CRUD tests
INSERT INTO tasks ( description ) VALUES ( 'complete to do list' );
SELECT * FROM tasks;
UPDATE tasks SET complete=true WHERE id=1;
DELETE FROM tasks WHERE id=1;