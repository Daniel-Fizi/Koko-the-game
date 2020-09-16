var Fizyka = {
	aktualizacja: function(dane) {
		Fizyka.zadania.Grawitacja(dane.obiekty.koko);
		if(!dane.obiekty.koko.momentSmierci) Fizyka.zadania.WykrywanieKolizji(dane);
		Fizyka.zadania.Smierc(dane);
		
		dane.obiekty.tabelaPotworow.forEach(function(p) {
			Fizyka.zadania.Grawitacja(p);
			Fizyka.zadania.WykrywanieKolizji2(dane, p);
		});
	},
	
	zadania: {
		Grawitacja: function(obiekt) {
			if(!obiekt.momentSmierci) obiekt.obecnyStan = obiekt.stan.skakanie;
			obiekt.pedY+=1;
			obiekt.y+=obiekt.pedY;
		},
		
		WykrywanieKolizji: function(dane) {
			var koko = dane.obiekty.koko;
			
			var WykrywanieKolizji = function(obiekt) {
				if(koko.x < obiekt.x + obiekt.w &&
				    koko.x + koko.w > obiekt.x &&
				    koko.y < obiekt.y + obiekt.h &&
				    koko.y +koko.h > obiekt.y) {
						Fizyka.zadania.Kolizja(dane, obiekt);
				}
			};
			
			dane.obiekty.tabelaScian.forEach(function(sciana) {
				WykrywanieKolizji(sciana);
			});
			
			dane.obiekty.tabelaPotworow.forEach(function(potwor) {
				WykrywanieKolizji(potwor);
			});
			dane.obiekty.tabelaBananow.forEach(function(banan) {
				WykrywanieKolizji(banan);
			});
			dane.obiekty.tabelaKisci.forEach(function(kisc) {
				WykrywanieKolizji(kisc);
			});
			dane.obiekty.tabelaMam.forEach(function(kisc) {
				WykrywanieKolizji(kisc);
			});
		},
		
		WykrywanieKolizji2: function(dane, p) {
			var WykrywanieKolizji2 = function(obiekt) {
				if(p.x < obiekt.x + obiekt.w && p.x + p.w > obiekt.x && p.y < obiekt.y + obiekt.h && p.y + p.h > obiekt.y) {
					Fizyka.zadania.Kolizja2(obiekt, p);
				}
			};
			
			dane.obiekty.tabelaScian.forEach(function(sciana) {
				WykrywanieKolizji2(sciana);
			});
		},
		
		Kolizja: function(dane, obiekt) {
			var koko = dane.obiekty.koko;
			
			if(obiekt.typ === "sciana") {
				if(koko.y+koko.h>obiekt.y && koko.x+koko.w > obiekt.x+10 && koko.x < obiekt.x+obiekt.w-10 && koko.pedY >= 0) {
					koko.obecnyStan = koko.stan.stanie;
					koko.y = obiekt.y - koko.h;
					koko.pedY = 0;
				}
				
				if(koko.x + koko.w > obiekt.x +16 && koko.x < obiekt.x + obiekt.w - 16 && koko.y > obiekt.y) {
					koko.y = obiekt.y + obiekt.h;
					koko.pedY = 1;
				}
				
				if(koko.x < obiekt.x && koko.y + koko.h > obiekt.y && koko.y < obiekt.y + obiekt.h) {
					koko.x = obiekt.x - koko.w;
				}
				
				if(koko.x > obiekt.x && koko.y + koko.h > obiekt.y && koko.y < obiekt.y + obiekt.h) {
					koko.x = obiekt.x + obiekt.w;
				}
			} else if(obiekt.typ === "potwor") {
				var p = obiekt;
				if(koko.y+koko.h>=p.y && koko.x+koko.w>p.x+10 && koko.x<p.x+p.w-10 && koko.pedY >= 0) {
					var nrPotwora = dane.obiekty.tabelaPotworow.indexOf(p);
					dane.obiekty.tabelaPotworow.splice(nrPotwora, 1);
					koko.obecnyStan = koko.stan.skakanie;
					koko.pedY = -10.5;
					const sound = new Audio("audio/zuk.mp3");
							sound.play();
				}
				
				if(koko.x<p.x && koko.y>= p.y) {
					koko.obecnyStan = koko.stan.smierc;
					koko.pedY = -20.5;
					koko.momentSmierci = true;
					const sound = new Audio("audio/smierc.mp3");
							sound.play();
					setTimeout(function() {
						Smierc.wywolanie(dane);
					}, 750);
				}
				
				if(koko.x>p.x && koko.y>= p.y) {
					koko.obecnyStan = koko.stan.smierc;
					koko.pedY = -20.5;
					koko.momentSmierci = true;
					const sound = new Audio("audio/smierc.mp3");
							sound.play();
					setTimeout(function() {
						Smierc.wywolanie(dane);
					}, 750);
				}
			}
			else if(obiekt.typ === "banan") {
				var p = obiekt;
				if(koko.y+koko.h>=p.y && koko.x+koko.w>p.x+10 && koko.x<p.x+p.w-10 && koko.pedY >= 0) {
					var nrBanana = dane.obiekty.tabelaBananow.indexOf(p);
					dane.obiekty.tabelaBananow.splice(nrBanana, 1);
					koko.punkty ++;
					const sound = new Audio("audio/banan.mp3");
					sound.play();
					
					
					if(koko.punkty == 25 || koko.punkty == 50 || koko.punkty == 75 || koko.punkty == 100)
					{
						const sound = new Audio("audio/lu.mp3");
						sound.play();
						koko.zycia++;
					
					}
					
					
				}
			}
			else if(obiekt.typ === "kisc") {
				var p = obiekt;
				if(koko.y+koko.h>=p.y && koko.x+koko.w>p.x+10 && koko.x<p.x+p.w-10 && koko.pedY >= 0) {
					var nrKisci = dane.obiekty.tabelaKisci.indexOf(p);
					dane.obiekty.tabelaKisci.splice(nrKisci, 1);
					for( i=0 ; i<5 ; i++)
					{
					koko.punkty ++;
					const sound = new Audio("audio/banan.mp3");
							sound.play();
					
					if(koko.punkty == 25 || koko.punkty == 50 || koko.punkty == 75 || koko.punkty == 100)
					{
						const sound = new Audio("audio/lu.mp3");
					sound.play();
						koko.zycia++;
					
					}
					
					}
					
					
				}
				
			}
			else if(obiekt.typ === "mama") {
				var p = obiekt;
				if(koko.y+koko.h>=p.y && koko.x+koko.w>p.x+10 && koko.x<p.x+p.w-10 && koko.pedY >= 0) {
					
					
					window.location.href='lvl3.html';
					koko.punkty
					koko.zycia
				}
				
			}
		},
		
		Kolizja2: function(obiekt, p) {
			if(obiekt.typ === "sciana") {
				if(p.y + p.h > obiekt.y && p.x + p.w > obiekt.x + 10 && p.x < obiekt.x + obiekt.w - 10 && p.pedY >= 0) {
					p.obecnyStan = p.stan.poruszanie;
					p.y = obiekt.y - p.h;
					p.pedY = 0;
				}
				if(p.x < obiekt.x && p.y + p.h > obiekt.y && p.y < obiekt.y + obiekt.h) {
					p.x = obiekt.x - p.w;
					p.kierunek = "lewo";
				}
				if(p.x > obiekt.x && p.y + p.h > obiekt.y && p.y < obiekt.y + obiekt.h) {
					p.x = obiekt.x + obiekt.w;
					p.kierunek = "prawo";
				}
			}
		},
		
		Smierc: function(dane) {
			if(dane.obiekty.koko.y > 624) Smierc.wywolanie(dane);
		}
		
	}
}