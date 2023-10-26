CREATE DATABASE IF NOT EXISTS track DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;
USE track;

CREATE TABLE log (
  id_log int NOT NULL AUTO_INCREMENT,
  placa varchar(7) NOT NULL,
  entrada tinyint NOT NULL,
  data datetime NOT NULL,
  PRIMARY KEY (id_log),
  INDEX id_pessoa_ix (placa, data),
  INDEX data_ix (data)
);
