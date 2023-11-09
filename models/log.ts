import app = require("teem");

interface LogDia {
    total: number;
    entrada: number;
    dia: string;
}

interface LogPlacaDia {
    total: number;
    placa: string;
    dia: string;
}

class Log {
    public static async listarPorDia(dataInicial: string, dataFinal: string): Promise<LogDia[]> {
		let dados: LogDia[];

		dataInicial += " 00:00:00";
		dataFinal += " 23:59:59";

		await app.sql.connect(async (sql) => {
			dados = await sql.query(`
                SELECT count(entrada) total, entrada, date(data) dt, date_format(data, '%d/%m') dia
                FROM log
                WHERE data BETWEEN '2023-11-01 00:00:00' AND '2023-11-03 23:59:59'
                GROUP BY entrada, dt, dia
                ORDER BY dt, entrada
            `, [ dataInicial, dataFinal ])
		});

		return dados;
    }

    public static async listarPorPlacaDia(dataInicial: string, dataFinal: string, placa: string): Promise<LogPlacaDia[]> {
		let dados: LogPlacaDia[];

		dataInicial += " 00:00:00";
		dataFinal += " 23:59:59";

		await app.sql.connect(async (sql) => {
			dados = await sql.query(`
                SELECT count(placa) total, placa, date(data) dt, date_format(data, '%d/%m') dia
                FROM log
                WHERE data BETWEEN ? AND ? AND placa = ?
                GROUP BY placa, dt, dia
                ORDER BY dt;
            `, [ dataInicial, dataFinal, placa ])
		});

		return dados;
    }
}

export = Log;
