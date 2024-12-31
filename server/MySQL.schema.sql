-- Crear la base de datos
CREATE DATABASE ecommerce;

-- Usar la base de datos (en PostgreSQL, necesitas conectarte manualmente después de crearla)
\c ecommerce

-- Crear tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,          -- Clave primaria con incremento automático
    name VARCHAR(255),              -- Nombre del usuario
    email VARCHAR(255) UNIQUE NOT NULL, -- Email único y obligatorio
    password VARCHAR(255)           -- Contraseña
);

-- Crear tabla de productos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,          -- Clave primaria con incremento automático
    name VARCHAR(255),              -- Nombre del producto
    price INT,                      -- Precio del producto
    cant INT,                       -- Cantidad disponible
    img VARCHAR(255)                -- URL de la imagen
);

-- Crear tabla de tareas (todos)
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,          -- Clave primaria con incremento automático
    title VARCHAR(255),             -- Título de la tarea
    completed BOOLEAN DEFAULT false, -- Estado de la tarea (por defecto: no completada)
    user_id INT NOT NULL,           -- Relación con la tabla de usuarios
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE -- Borrado en cascada
);

-- Crear tabla de tareas compartidas
CREATE TABLE shared_todos (
    id SERIAL PRIMARY KEY,          -- Clave primaria con incremento automático
    todo_id INT,                    -- Relación con la tabla de tareas
    user_id INT,                    -- Usuario que comparte la tarea
    shared_with_id INT,             -- Usuario con quien se comparte la tarea
    FOREIGN KEY (todo_id) REFERENCES todos (id) ON DELETE CASCADE, -- Borrado en cascada
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE, -- Borrado en cascada
    FOREIGN KEY (shared_with_id) REFERENCES users (id) ON DELETE CASCADE -- Borrado en cascada
);

-- Insertar dos usuarios en la tabla users
INSERT INTO users (name, email, password) VALUES ('beto', 'user1@example.com', 'password1');
INSERT INTO users (name, email, password) VALUES ('max', 'user2@example.com', 'password2');

-- Insertar tareas en la tabla todos asociadas al primer usuario
INSERT INTO todos (title, user_id)
VALUES
('Lista de desarrollo profesional', 1),
('Actualizar el currículum vitae.', 1),
('Crear o mejorar el perfil en LinkedIn.', 1),
('Hacer un curso corto en línea.', 1),
('Buscar 3 ofertas de trabajo interesantes.', 1),
('Leer un artículo sobre tendencias de la industria.', 1),
('Practicar respuestas para entrevistas comunes.', 1),
('Mejorar una habilidad técnica.', 1),
('Solicitar feedback a un compañero o mentor.', 1),
('Organizar las tareas de la semana laboral.', 1),
('Aprender a usar una nueva herramienta o software.', 1);

-- Compartir la tarea 1 del usuario 1 con el usuario 2
INSERT INTO shared_todos (todo_id, user_id, shared_with_id)
VALUES (1, 1, 2);

-- Obtener tareas (incluidas las compartidas) por usuario
-- Cambia [user_id] por el ID del usuario que quieres consultar
SELECT todos.*, shared_todos.shared_with_id
FROM todos
LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
WHERE todos.user_id = [user_id] OR shared_todos.shared_with_id = [user_id];

-- Ejemplo: Obtener tareas del usuario con ID 2
SELECT todos.*, shared_todos.shared_with_id
FROM todos
LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
WHERE todos.user_id = 2 OR shared_todos.shared_with_id = 2;
