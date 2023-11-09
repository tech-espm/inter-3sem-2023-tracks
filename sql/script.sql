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

-- Movimentações por dia
SELECT count(entrada) total, entrada, date(data) dt, date_format(data, '%d/%m') dia
FROM log
WHERE data BETWEEN '2023-11-01 00:00:00' AND '2023-11-03 23:59:59'
GROUP BY entrada, dt, dia
ORDER BY dt, entrada;

-- Total por dia e placa
SELECT count(placa) total, placa, date(data) dt, date_format(data, '%d/%m') dia
FROM log
WHERE data BETWEEN '2023-11-01 00:00:00' AND '2023-11-03 23:59:59' AND placa = 'abc1234'
GROUP BY placa, dt, dia
ORDER BY dt;
