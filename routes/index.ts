import app = require("teem");
import Log = require("../models/log");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		let hoje = new Date();

		let mesFinal = hoje.getMonth() + 1;
		let diaFinal = hoje.getDate();

		let semanaPassada = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000);

		let mesInicial = semanaPassada.getMonth() + 1;
		let diaInicial = semanaPassada.getDate();

		let opcoes = {
			anoInicial: semanaPassada.getFullYear(),
			mesInicial: (mesInicial < 10 ? "0" + mesInicial : mesInicial),
			diaInicial: (diaInicial < 10 ? "0" + diaInicial : diaInicial),

			anoFinal: hoje.getFullYear(),
			mesFinal: (mesFinal < 10 ? "0" + mesFinal : mesFinal),
			diaFinal: (diaFinal < 10 ? "0" + diaFinal : diaFinal)
		};

		res.render("index/index", opcoes);
	}

	public async placa(req: app.Request, res: app.Response) {
		let hoje = new Date();

		let mes = hoje.getMonth() + 1;
		let dia = hoje.getDate();

		let opcoes = {
			titulo: "Relatório por Placa",

			ano: hoje.getFullYear(),
			mes: (mes < 10 ? "0" + mes : mes),
			dia: (dia < 10 ? "0" + dia : dia)
		};

		res.render("index/placa", opcoes);
	}

	public async sobre(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Sobre"
		};

		res.render("index/sobre", opcoes);
	}

	public async obterDadosPorDia(req: app.Request, res: app.Response) {
		let dados = await Log.listarPorDia(req.query.dataInicial as string, req.query.dataFinal as string);

		res.json(dados);
	}

	public async obterDadosPorDiaPlaca(req: app.Request, res: app.Response) {
		let dados = await Log.listarPorPlacaDia(req.query.dataInicial as string, req.query.dataFinal as string, req.query.placa as string);

		res.json(dados);
	}
}

export = IndexRoute;
