function back() 
{ 
  location.href(history.go(-1));
}
var Smierc =
{
	
	wywolanie: function(dane)
	{
		Smierc.zadania.StrataZycia(dane)
	},
	
	zadania:
	{
		StrataZycia: function(dane)
		{
			var koko = dane.obiekty.koko;
			
			if(koko.zycia>0)
			{
					
			
				koko.zycia--;
			}
			if(koko.zycia<1)
			{
				const sound = new Audio("audio/go.mp3");
							sound.play();
							sound.loop = false;
				setTimeout(function()
				{
					
					window.location.href='menu.html';
					
				},1000);
			}
			else
			{
				for( var i = 0 ; i<dane.obiekty.tabelaScian.length; i++)
				{
					dane.obiekty.tabelaScian[i].x -= dane.obiekty.mapa.x;
				}
				
				for( var i = 0 ; i<dane.obiekty.tabelaPotworow.length; i++)
				{
					dane.obiekty.tabelaPotworow[i].x -= dane.obiekty.mapa.x;
				}

					for( var i = 0 ; i<dane.obiekty.tabelaBananow.length; i++)
				{
					dane.obiekty.tabelaBananow[i].x -= dane.obiekty.mapa.x;
				}
				for( var i = 0 ; i<dane.obiekty.tabelaKisci.length; i++)
				{
					dane.obiekty.tabelaKisci[i].x -= dane.obiekty.mapa.x;
				}
				for( var i = 0 ; i<dane.obiekty.tabelaMam.length; i++)
				{
					dane.obiekty.tabelaMam[i].x -= dane.obiekty.mapa.x;
				}
				
				dane.obiekty.mapa.x = koko.x = koko.y = 0;
				koko.pedY= 1;
				koko.obecnyStan= koko.stan.stanie;
				koko.pedX = 4;
				koko.momentSmierci = false;
			}
		}
	}
}