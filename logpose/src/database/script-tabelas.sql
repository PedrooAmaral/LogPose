CREATE DATABASE logpose;
USE logpose;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE frutas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sagas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  options_json JSON NOT NULL,
  answer_index INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL,
  feita_em DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

INSERT INTO frutas (name, type, description) VALUES
('Gomu Gomu no Mi', 'Paramecia', 'Fruta que torna o corpo de Luffy elástico.');

INSERT INTO sagas (title, description) VALUES
('East Blue', 'Saga inicial onde Luffy monta sua tripulação.');

INSERT INTO quiz_questions (question, options_json, answer_index) VALUES
('Quem é o capitão dos Chapéus de Palha?', JSON_ARRAY('Luffy','Zoro','Sanji'), 0),
('Qual fruta Luffy comeu?', JSON_ARRAY('Gomu Gomu','Mera Mera','Hana Hana'), 0),
('Em qual saga Robin se junta à tripulação?', JSON_ARRAY('Alabasta','Enies Lobby','Dressrosa'), 1),
('Quem construiu o Thousand Sunny?', JSON_ARRAY('Franky','Usopp','Chopper'), 0),
('Qual o sonho de Zoro?', JSON_ARRAY('Ser Rei dos Piratas','Ser melhor espadachim','Ser médico'), 1);
