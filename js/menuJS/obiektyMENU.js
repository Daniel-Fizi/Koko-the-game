var Obiekty = {
	ini: function(dane) {
		var niebo = {
			obraz: new Obiekty.zadania.Obraz(dane.grafika, 0, 416,1920, 416),
			x: 0,
			y: 0,
			w: 2880,
			h: 624
		};
		
		
		
		dane.obiekty = {};
		
		dane.obiekty.niebo = niebo;
		
	},
	
	zadania: {
		Obraz: function(img, x, y, w, h) {
			this.img = img;
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
		}
	}
}