var Poruszanie = {
	aktualizacja: function(dane) {
		Poruszanie.zadania.Koko(dane);
		Poruszanie.zadania.Potwor(dane);
	},
	
	zadania: {
		Koko:function(dane) {
			dane.obiekty.koko.obecnyStan.ruch(dane);
		},
		
		Potwor: function(dane) {
			dane.obiekty.tabelaPotworow.forEach(function(p) {
				p.obecnyStan.ruch(dane);
			});
		}
	}
}