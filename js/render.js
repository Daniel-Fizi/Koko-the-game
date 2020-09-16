var Render =
 {
	aktualizacja: function(dane) 
	{
		Render.zadania.Rysuj(dane.obiekty.niebo, dane.canvas.skyCtx);
		
		dane.canvas.bgCtx.clearRect(0,0, dane.canvas.bgCanvas.width, dane.canvas.bgCanvas.height);
		Render.zadania.Rysuj(dane.obiekty.mapa, dane. canvas.bgCtx);
		
		dane.canvas.fgCtx.clearRect(0,0, dane.canvas.fgCanvas.width, dane.canvas.fgCanvas.height);
		Render.zadania.Rysuj(dane.obiekty.koko, dane.canvas.fgCtx);
		
		Render.zadania.Pisz("  " + dane.obiekty.koko.punkty, dane.canvas.fgCtx, 774,50,"36px","PixelEmulator" );
		
		Render.zadania.Pisz("  " + dane.obiekty.koko.zycia, dane.canvas.fgCtx, 16, 50 ,"36px","PixelEmulator");
		
		if(dane.obiekty.koko.zycia<1) Render.zadania.Pisz("Game Over", dane.canvas.fgCtx, 200, 300, "72px" , "PixelEmulator");
		
		dane.obiekty.tabelaPotworow.forEach(function(p)
		{
			Render.zadania.Rysuj(p, dane.canvas.fgCtx);
		});
		
		dane.obiekty.tabelaBananow.forEach(function(p)
		{
			Render.zadania.Rysuj(p, dane.canvas.fgCtx);
		});
		dane.obiekty.tabelaKisci.forEach(function(p)
		{
			Render.zadania.Rysuj(p, dane.canvas.fgCtx);
		});
		dane.obiekty.tabelaMam.forEach(function(p)
		{
			Render.zadania.Rysuj(p,dane.canvas.fgCtx);
		});
	},
	
	zadania: 
	{
		Rysuj: function(co, gdzie) 
		{
			gdzie.drawImage(co.obraz.img, 
										co.obraz.x, co.obraz.y,
										co.obraz.w, co.obraz.h,
										co.x, co.y, co.w, co.h);
		},
		
		Pisz:function(tekst,gdzie,x,y, rozmiar,czcionka)
		{
			gdzie.font = rozmiar + " " + czcionka;
			gdzie.fillStyle = '#fff';
			gdzie.fillText(tekst,x,y);
		}
	}
}