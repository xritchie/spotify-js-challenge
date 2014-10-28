/**
 * Disclaimer: This fragment of code forms part of a code challenge,
 * it follows INTENTIONALLY bad practices, that you need to identify and fix.
 *
 * Tasks:
 *
 * - 1. Refactor and improve the unit tests on the functionality.
 * - 2. Refactor the original code.
 * - 3. You can switch to your preferred unit testing FW(even write your own).
 *
 * @see https://github.com/spotify/spotify-js-challenge
 */

var Spotify = Spotify || {};

Spotify.Entity = {
    isApp: function(spotifyUri) {
        // e.g. spotify:app:bluenote
        return eval('/^spotify:app:[a-zA-Z]*/').test(spotifyUri);
    },
    isTrack: function(spotifyUri) {
        // e.g. spotify:track:5t8ANYm2ToLpjV7AxJ1U1N
        return eval('/^spotify:track:[a-zA-Z0-9]*/').test(spotifyUri);
    },
    isPlaylist: function(spotifyUri) {
        // e.g. spotify:playlist:6J9kgSvipjimfDLYTsCOAv
        return eval('/spotify:playlist:[a-zA-Z0-9]*/').test(spotifyUri);
    },
    isEntity: function(spotifyUri) {
        return (this.isApp(spotifyUri) || this.isTrack(spotifyUri) || this.isPlaylist(spotifyUri));
    },
    // entities_array e.g. ['spotify:app:test1', 'spotify:playlist:asdf']
    process: function(entities_array, callback) {
        entities_array.foreach(function(entity) {
            if (this.isEntity(entity)) {
                callback(entity);
            }
        }.bind(this));
    }
};

