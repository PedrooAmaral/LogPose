
create database logpose;
use logpose;

create table  usuarios (
  id int auto_increment primary key,
  nome varchar(100) not null,
  email varchar(150) not null unique,
  senha varchar(255) not null,
  criado_em datetime default current_timestamp
);

create table  frutas (
  id int auto_increment primary key,
  nome varchar(100) not null,
  categoria enum('Paramecia','Zoan','Logia') not null,
  descricao text,
  imagem_url varchar(255),
  criado_em datetime default current_timestamp
);

create table  sagas (
  id int auto_increment primary key,
  titulo varchar(150) not null,
  descricao text,
  imagem_url varchar(255),
  criado_em datetime default current_timestamp
);

create table  quiz_questions (
  id int auto_increment primary key,
  pergunta text not null,
  opcoes_json json not null,
  indice_resposta tinyint not null,
  criado_em datetime default current_timestamp
);

create table  quiz_results (
  id int auto_increment primary key,
  user_id int not null,
  score int not null,
  total_perguntas int not null,
  feito_em datetime default current_timestamp,
  foreign key (user_id) references usuarios(id) on delete cascade
);

insert into frutas (nome, categoria, descricao, imagem_url) values
  ('Gomu Gomu no Mi','Paramecia','Fruta que torna o corpo de Luffy elástico.','assets/frutas/gomu_gomu.jpg'),
  ('Mera Mera no Mi','Logia','Fruta que concede ao usuário poderes de fogo.','assets/frutas/mera_mera.jpg');

insert into sagas (titulo, descricao, imagem_url) values
  ('East Blue','Saga inicial onde Luffy percorre o East Blue e monta sua tripulação.','assets/sagas/east_blue.jpg'),
  ('Alabasta','Saga em que a tripulação enfrenta Crocodile em Alabasta.','assets/sagas/alabasta.jpg');

insert into quiz_questions (pergunta, opcoes_json, indice_resposta) values
  ('Quem comeu a Gomu Gomu no Mi?', json_array('Luffy','Zoro','Usopp','Nami'), 0),
  ('Qual dessas frutas é do tipo Logia?', json_array('Mera Mera','Gomu Gomu','Hito Hito','Supa Supa'), 0);
