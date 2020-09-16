var Wejscie = {
	ini: function(dane) {
		document.onkeydown = function(event) {
			Wejscie.zadania.nacisniety[event.keyCode] = true;
		}
		
		document.onkeyup = function(event) {
			Wejscie.zadania.nacisniety[event.keyCode] = false;
		}
	},
	
	aktualizacja: function(dane) {
		var koko = dane.obiekty.koko;
		
		if(Wejscie.zadania.Nacisnieto(39)) {
			koko.kierunek = "prawo";
			
			if(koko.pedY == 0) {
				koko.obecnyStan = koko.stan.poruszanie;
			} else {
				if(koko.x < dane.canvas.fgCanvas.width/2 || dane.obiekty.mapa.x <= dane.canvas.fgCanvas.width-dane.obiekty.mapa.w) {
					koko.x += koko.pedX;
				} else {
					dane.obiekty.mapa.x -= koko.pedX;
					for( var i = 0; i<dane.obiekty.tabelaScian.length; i++) {
						dane.obiekty.tabelaScian[i].x -= koko.pedX;
					}
					for( var i = 0; i<dane.obiekty.tabelaPotworow.length; i++) {
						dane.obiekty.tabelaPotworow[i].x -= koko.pedX;
					}
					for( var i = 0; i<dane.obiekty.tabelaBananow.length; i++) {
						dane.obiekty.tabelaBananow[i].x -= koko.pedX;
					}
					for( var i = 0; i<dane.obiekty.tabelaKisci.length; i++) {
						dane.obiekty.tabelaKisci[i].x -= koko.pedX;
					}
					for( var i = 0; i<dane.obiekty.tabelaMam.length; i++) {
						dane.obiekty.tabelaMam[i].x -= koko.pedX;
					}
				}
			}
		}
		if(Wejscie.zadania.Nacisnieto(37)) {
			koko.kierunek = "lewo";
			
			if(koko.pedY == 0) {
				koko.obecnyStan = koko.stan.poruszanie;
			} else {
				if(koko.x > dane.canvas.fgCanvas.width/2 || dane.obiekty.mapa.x >= 0) {
					koko.x -= koko.pedX;
				} else {
					dane.obiekty.mapa.x += koko.pedX;
					for( var i = 0; i<dane.obiekty.tabelaScian.length; i++) {
						dane.obiekty.tabelaScian[i].x += koko.pedX;
					}
					for( var i = 0; i<dane.obiekty.tabelaPotworow.length; i++) {
						dane.obiekty.tabelaPotworow[i].x += koko.pedX;
					}
					for( var i = 0; i<dane.obiekty.tabelaBananow.length; i++) {
						dane.obiekty.tabelaBananow[i].x += koko.pedX;
					}
					for( var i = 0; i<dane.obiekty.tabelaKisci.length; i++) {
						dane.obiekty.tabelaKisci[i].x += koko.pedX;
					}
					for( var i = 0; i<dane.obiekty.tabelaMam.length; i++) {
						dane.obiekty.tabelaMam[i].x += koko.pedX;
					}
				}
			}
		}
		if(Wejscie.zadania.Nacisnieto(32)) {
			koko.obecnyStan = koko.stan.skakanie;
		}
	},
	
	zadania: {
		nacisniety: {},
		
		Nacisnieto: function(kod) {
			return Wejscie.zadania.nacisniety[kod];
		}
	}
}