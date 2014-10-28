describe("Spotify", function() {

	it("should be able to identify an App", function() {
    	expect(Spotify.Entity.isApp('spotify:app:bluenote')).toEqual(true);
    	expect(Spotify.Entity.isApp('spotify:notapp:bluenote')).toEqual(false);
  	});

  	it("should be able to identify an Track", function() {
    	expect(Spotify.Entity.isTrack('spotify:track:asdf555')).toEqual(true);
    	expect(Spotify.Entity.isTrack('spotify:nottrack:asdf555')).toEqual(false);
  	});

  	it("should be able to identify an Playlist", function() {
    	expect(Spotify.Entity.isPlaylist('spotify:playlist:asdf555')).toEqual(true);
    	expect(Spotify.Entity.isPlaylist('spotify:notplaylist:asdf555')).toEqual(false);
  	});

	it("should be able to identify Entites", function() {
		var mixxed = ['spotify:app:bluenote', 'spotify:track:asdf555', 'spotify:playlist:asdf555'];
		mixxed.foreach(function(elem) {
            expect(Spotify.Entity.isEntity(elem)).toEqual(true);
        });

        var randomStr = Math.random().toString(36).substring(7);
        expect(Spotify.Entity.isEntity(randomStr)).toEqual(false); 	
  	});  	

	it("should be able to identify list of Entites", function() {
		var testEntities = function(elems) {
			var counter = 0;
			Spotify.Entity.process(elems, function(params) {
		        counter++;
		    });
		    return counter;
		}

        expect(testEntities(['spotify:app:bluenote', 'spotify:track:asdf555', 'spotify:playlist:asdf555'])).toEqual(3);
    	expect(testEntities(['spotify:app:test1', 'spotify:undefined:asdf55'])).toEqual(1);
  	});  	
 });