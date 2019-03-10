

//LIBRARY on ES5

function easyHttp() {
    this.http = new XMLHttpRequest();
}


//METHODS


//HTTP GET Request

easyHttp.prototype.get = function(url, callback){
      this.http.open('GET', url, true);

      let self = this;                          //ES5 fix
      this.http.onload = function(){
            if(self.http.status === 200){
                  callback(null, self.http.responseText);
            } else{
                  callback('Error: ' + self.http.status);
            }
      };

      this.http.send();
};


// HTTP POST Request
easyHttp.prototype.post = function (url, data, callback) {
      this.http.open('POST', url, true);

      //Content-type for POST request
      this.http.setRequestHeader('Content-type', 'application/json');

      let self = this; //ES5 fix
      this.http.onload = function () {
            callback(null, self.http.responseText);
      };

      this.send(JSON.stringify(data));
};



// HTTP PUT Request




// HTTP DELETE Request


