create database logpose;
use logpose;

create table if not exists usuario (
    id_usuario int primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) unique not null,
    senha varchar(50) not null,
    data_cadastro datetime default current_timestamp
);

create table resposta (
    id_resposta int primary key auto_increment,
    fk_usuario int,
    questao int not null,
    acertou boolean,
    foreign key (fk_usuario) references usuario(id_usuario)
);

create table pontuacao (
    id_pontuacao int primary key auto_increment,
    fk_usuario int,
    acertos int,
    erros int,
    data_quiz datetime default current_timestamp,
    foreign key (fk_usuario) references usuario(id_usuario)
);
