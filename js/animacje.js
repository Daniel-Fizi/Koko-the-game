var Animacje = {
	aktualizacja: function(dane) {
		Animacje.zadania.Niebo(dane);
		Animacje.zadania.Koko(dane);
		Animacje.zadania.Potwor(dane);
	},
	
	zadania: {
		Niebo: function(dane) {
			dane.obiekty.niebo.x -=1;
			
			if(dane.obiekty.niebo.x < -1440) {
				dane.obiekty.niebo.x = 0;
			}
		},
		
		Koko: function(dane) {
			dane.obiekty.koko.obecnyStan.animacja(dane);
		},
		
		Potwor: function(dane) {
			dane.obiekty.tabelaPotworow.forEach(function(p) {
				p.obecnyStan.animacja(dane);
			});
		}
	}
}