var Obiekty = 
{
	ini: function(dane) 
	{
		var niebo = 
		{
			obraz: new Obiekty.zadania.Obraz(dane.grafika, 0, 416,1920, 416),
			x: 0,
			y: 0,
			w: 2880,
			h: 624
		};
		
		var mapa =
		{
			obraz: new Obiekty.zadania.Obraz(dane.grafika, 0, 0, 8640, 416),
			x: 0,
			y: 0,
			w: 12960,
			h: 624
		};
		
		var koko = new Obiekty.zadania.Koko(dane.grafika,0,0,48,48);        //[x,y,szerokosc,wysokosc]
	
	var sciany = [[0,528,4320,96]];
							  
	var potwory = [[912,480]];
	
	var banany = [[528,3000]];
	
	var kiscie = [[528,500]];
	
	var mamy = [[500,408]];
	
	

		
		dane.obiekty = {};
		
		dane.obiekty.niebo = niebo;
		dane.obiekty.mapa = mapa;
		dane.obiekty.koko = koko;
		dane.obiekty.tabelaScian = [];
		dane.obiekty.tabelaPotworow = [];
		dane.obiekty.tabelaBananow = [];
		dane.obiekty.tabelaKisci = [];
		dane.obiekty.tabelaMam = [];
		
		sciany.forEach(function(z)
		{
			dane.obiekty.tabelaScian.push(new Obiekty.zadania.Sciana(z[0],z[1],z[2],z[3]));
		});
		
		potwory.forEach(function(p) 
		{  
			dane.obiekty.tabelaPotworow.push(new Obiekty.zadania.Potwor(dane.grafika, p[0], p[1], 48, 48));
		});
		
		banany.forEach(function(p)
		{
			dane.obiekty.tabelaBananow.push(new Obiekty.zadania.Banan(dane.grafika, p[0], p[1], 48 ,48));
		});
		
		kiscie.forEach(function(p)
		{
			dane.obiekty.tabelaKisci.push(new Obiekty.zadania.Kisc(dane.grafika, p[0], p[1], 48, 48));
		});
		mamy.forEach(function(p)
		{
			dane.obiekty.tabelaMam.push(new Obiekty.zadania.Mama(dane.grafika, p[0], p[1], 128, 128));
		});
	},
	
	zadania: {
		Obraz: function(img, x, y, w, h)
		{
			this.img = img;
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
		}, 
		
		Koko: function(img,x,y,w,h) 
		{
			var wnetrze = this;
			console.log(wnetrze);
			this.obraz=new Obiekty.zadania.Obraz(img,2176,448,32,32);
			this.animacja = 
			{
				poruszaniePrawo: 
				{
					klatka: [new Obiekty.zadania.Obraz(img,1856,448,32,32),new Obiekty.zadania.Obraz(img,1792,448,32,32),
								  new Obiekty.zadania.Obraz(img,1856,448,32,32),new Obiekty.zadania.Obraz(img,1920,448,32,32)],
					obecnaKlatka: 0		  
				},
				poruszanieLewo: 
				{
					klatka: [new Obiekty.zadania.Obraz(img,1856,512,32,32),new Obiekty.zadania.Obraz(img,1792,512,32,32),
								  new Obiekty.zadania.Obraz(img,1856,512,32,32),new Obiekty.zadania.Obraz(img,1920,512,32,32)],
					obecnaKlatka: 0	
				},
				staniePrawo: new Obiekty.zadania.Obraz(img,2176,448,32,32),
				stanieLewo: new Obiekty.zadania.Obraz(img,2176,512,32,32),
				skokPrawo:	new Obiekty.zadania.Obraz(img,2048,448,32,32),
				skokLewo:	new Obiekty.zadania.Obraz(img,2048,512,32,32),
				smierc: new Obiekty.zadania.Obraz(img,2112,448,32,32),
			}
			this.stan = 
			{
				skakanie: 
				{
					ruch: function(dane)
					{
						if(wnetrze.pedY == 0) 
						{
							wnetrze.pedY -= 17.5;
							const sound = new Audio("audio/skok.mp3");
							sound.play();
						}
					},
					
					animacja: function(dane) 
					{
						if(wnetrze.kierunek == "prawo") 
						{
							wnetrze.obraz = wnetrze.animacja.skokPrawo;
						} else {								
							wnetrze.obraz = wnetrze.animacja.skokLewo;	
						}
					}
				},
				stanie:
				{
					ruch: function(dane) 
					{
						return;
					},
					
					animacja: function(dane) 
					{
						if(wnetrze.kierunek == "prawo")
						{
							wnetrze.obraz = wnetrze.animacja.staniePrawo;
						} else 
						{
							wnetrze.obraz = wnetrze.animacja.stanieLewo;
						}
					}
				},
				poruszanie: {
					ruch: function(dane) {
						if(wnetrze.kierunek==="prawo") {
							if(wnetrze.x < dane.canvas.fgCanvas.width/2 || dane.obiekty.mapa.x <= dane.canvas.fgCanvas.width-dane.obiekty.mapa.w) {
								wnetrze.x += wnetrze.pedX;
							} else {
								dane.obiekty.mapa.x -= wnetrze.pedX;
								for( var i = 0; i<dane.obiekty.tabelaScian.length; i++) {
									dane.obiekty.tabelaScian[i].x -= wnetrze.pedX;
								}
								for( var i = 0; i<dane.obiekty.tabelaPotworow.length; i++) {
									dane.obiekty.tabelaPotworow[i].x -= wnetrze.pedX;
								}
								for( var i = 0; i<dane.obiekty.tabelaBananow.length; i++) {
									dane.obiekty.tabelaBananow[i].x -= wnetrze.pedX;
								}
								for( var i = 0; i<dane.obiekty.tabelaKisci.length; i++) {
									dane.obiekty.tabelaKisci[i].x -= wnetrze.pedX;
								}
								for( var i = 0; i<dane.obiekty.tabelaMam.length; i++) {
									dane.obiekty.tabelaMam[i].x -= wnetrze.pedX;
								}
								
							}
						} else {
							if(wnetrze.x > dane.canvas.fgCanvas.width/2 || dane.obiekty.mapa.x >= 0) {
								wnetrze.x -= wnetrze.pedX;
							} else {
								dane.obiekty.mapa.x += wnetrze.pedX;
								for( var i = 0; i<dane.obiekty.tabelaScian.length; i++) {
									dane.obiekty.tabelaScian[i].x += wnetrze.pedX;
								}
								for( var i = 0; i<dane.obiekty.tabelaPotworow.length; i++) {
									dane.obiekty.tabelaPotworow[i].x += wnetrze.pedX;
								}
								for( var i = 0; i<dane.obiekty.tabelaBananow.length; i++) {
									dane.obiekty.tabelaBananow[i].x += wnetrze.pedX;
								}
								for( var i = 0; i<dane.obiekty.tabelaKisci.length; i++) {
									dane.obiekty.tabelaKisci[i].x += wnetrze.pedX;
								}
								for( var i = 0; i<dane.obiekty.tabelaMam.length; i++) {
									dane.obiekty.tabelaMam[i].x += wnetrze.pedX;
								}
							}
						}
					},
					animacja: function(dane) {
						if(wnetrze.kierunek === "prawo") {
							if(dane.nrKlatki % 5 == 0) {
								wnetrze.obraz = wnetrze.animacja.poruszaniePrawo.klatka[wnetrze.animacja.poruszaniePrawo.obecnaKlatka];
								wnetrze.animacja.poruszaniePrawo.obecnaKlatka++;
							}
							
							if(wnetrze.animacja.poruszaniePrawo.obecnaKlatka>3) {
								wnetrze.animacja.poruszaniePrawo.obecnaKlatka=0;
							}
						} else {
							if(dane.nrKlatki % 5 == 0) {
								wnetrze.obraz = wnetrze.animacja.poruszanieLewo.klatka[wnetrze.animacja.poruszanieLewo.obecnaKlatka];
								wnetrze.animacja.poruszanieLewo.obecnaKlatka++;
							}
							
							if(wnetrze.animacja.poruszanieLewo.obecnaKlatka>3) {
								wnetrze.animacja.poruszanieLewo.obecnaKlatka=0;
							}
						}
					}
				},
				smierc:
				{
					ruch: function(dane){
						wnetrze.pedX = 0;
					},
					animacja: function(dane){
						wnetrze.obraz = wnetrze.animacja.smierc;
					},
				}
			};
			this.obecnyStan = wnetrze.stan.stanie;
			this.kierunek = "prawo";
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.pedY = 1;
			this.pedX = 4;
			this.zycia = 3;
			this.momentSmierci = false;
			this.punkty = 0;
		}, 
		Mama: function(img , x ,y,w,h)
		{
			var wnetrze = this;
			
			this.obraz = new Obiekty.zadania.Obraz(img,1632,576,64,64)
			
			this.kierunek = "prawo";
			this.pedY= 0;
			this.pedX= 0;
			this.typ = "mama";
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
		},
		
		
		
		Kisc: function(img , x ,y,w,h)
		{
			var wnetrze = this;
			
			this.obraz = new Obiekty.zadania.Obraz(img,1632,512,64,32)
			
			this.kierunek = "prawo";
			this.pedY= 0;
			this.pedX= 0;
			this.typ = "kisc";
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
		},
		
		Banan: function(img , x, y, w, h)
		{
			var wnetrze = this;
			
			this.obraz = new Obiekty.zadania.Obraz(img,1728,512,32,32)
	
			this.kierunek = "prawo";
			this.pedY= 0;
			this.pedX= 0;
			this.typ = "banan";
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
		},
		
		Potwor: function(img, x, y, w, h)
		{
			var wnetrze= this;
			
		this.obraz=new Obiekty.zadania.Obraz(img,1792,576,32,32)
			this.animacja=
			{
				poruszanie:
				{
					klatka: [new Obiekty.zadania.Obraz(img, 1792, 576,32,32),
								new Obiekty.zadania.Obraz(img, 1856, 576,32,32),
								new Obiekty.zadania.Obraz(img, 1920, 576,32,32),
								new Obiekty.zadania.Obraz(img, 1984, 576,32,32)],
					obecnaKlatka: 0
				},
				skok: new Obiekty.zadania.Obraz(img, 1792, 576,32,32)
			};
			this.stan=
			{
				poruszanie:
				{
					ruch: function(dane)
					{
						if(wnetrze.kierunek==="prawo")
						{
							wnetrze.x+=wnetrze.pedX;
							
						}
						else
						{
							wnetrze.x -= wnetrze.pedX;
						}
					},
					animacja: function(dane)
					{
						if(dane.nrKlatki % 5==0)
						{
							wnetrze.obraz = wnetrze.animacja.poruszanie.klatka[wnetrze.animacja.poruszanie.obecnaKlatka];
							wnetrze.animacja.poruszanie.obecnaKlatka++;
						}
						if(wnetrze.animacja.poruszanie.obecnaKlatka > 3)
						{
							wnetrze.animacja.poruszanie.obecnaKlatka = 0;
						}
					}
				},
				skakanie:
				{
					ruch: function(dane)
					{
						return;
					},
					animacja: function(dane)
					{
						
						wnetrze.obraz = wnetrze.animacja.skok;
					}
				},
			};
			this.obecnyStan = wnetrze.stan.poruszanie;
			this.kierunek="prawo";
			this.pedY=0;
			this.pedX=1;
			this.typ = "potwor";
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
		},
		
		Sciana: function(x,y,w,h) 
		{
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.typ="sciana";
		}
	}
}