//API MODULE

export class API {
    constructor(){}

    async getLyrics(artist, cancion){
        //request
        const request = await fetch(`https://api.lyrics.ovh/v1/${artist}/${cancion}`);

        const response = await request.json();

        return response;
    }
}