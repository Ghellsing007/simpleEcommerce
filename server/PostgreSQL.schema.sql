CREATE DATABASE todolist;

USE todolist;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
);

CREATE TABLE products(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price INT,
    cant INT,
    img VARCHAR(255)
);


CREATE TABLE todos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE shared_todos  (
    id INT AUTO_INCREMENT PRIMARY KEY,
    todo_id INT,
    user_id INT,
    shared_with_id INT,
    FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE
);

-- DROP TABLE ********; --- = a borrar tabla
-- DESCRIBE = decribe las tablas


-- insert two users into the users table -- 

INSERT INTO users (name, email, password) VALUES ('beto', 'user1@example.com', 'password1');
INSERT INTO users (name, email, password) VALUES ('max', 'user2@example.com', 'password2');


-- insert todos into the todos tables, associated with the first user -- 

INSERT INTO todos (title, user_id)
VALUES
("Lista de desarrollo profesional", 1),
("Actualizar el currículum vitae.", 1),
("Crear o mejorar el perfil en LinkedIn.", 1),
("Hacer un curso corto en línea.", 1),
("Buscar 3 ofertas de trabajo interesantes.", 1),
("Leer un artículo sobre tendencias de la industria.", 1),
("Practicar respuestas para entrevistas comunes.", 1),
("Mejorar una habilidad técnica.", 1),
("Solicitar feedback a un compañero o mentor.", 1),
("Organizar las tareas de la semana laboral.", 1),
("Aprender a usar una nueva herramienta o software.", 1);


--insert share todo 1 of user 1 with user 2 --

INSERT INTO shared_todos (todo_id, user_id, shared_with_id)
VALUES  (1, 1, 2);


-- get todos incluiding shared todos by id --

SELECT todos.*, shared_todos.shared_with_id
FROM todos
LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
WHERE todos.user_id = [user_id] OR shared_todos.shared_with_id = [user_id]; 




'SELECT todos.*, shared_todos.shared_with_id
FROM todos
LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
WHERE todos.user_id = 2 OR shared_todos.shared_with_id = 2;  ' 





