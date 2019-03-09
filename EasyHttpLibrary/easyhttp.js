

//                                        LIBRARY on ES5

function easyHttp() {
    this.http = new XMLHttpRequest();
};

//                                        METHODS

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
      }


      this.http.send();
};


// HTTP POST Request

easyHttp.prototype.post = function (url, data, callback) {
      
      this.http.open('POST', url, true);
//Content-type for POST 
      this.http.setRequestHeader('Content-type', 'application/json');

      let self = this; //ES5 fix
      this.http.onload = function () {
            callback(null, self.http.responseText);
      }

      this.http.send(JSON.stringify(data));
};


// HTTP PUT Request
easyHttp.prototype.put = function (url, data, callback) {
      
      this.http.open('PUT', url, true);

      //Content-type for POST 
      this.http.setRequestHeader('Content-type', 'application/json');
      
      let self = this; //ES5 fix
      this.http.onload = function () {
            callback(null, self.http.responseText);
      }

      this.http.send(JSON.stringify(data));
};



// HTTP DELETE Request
easyHttp.prototype.delete = function(url, callback){
      this.http.open('DELETE', url, true);

      let self = this;
      this.http.onload = function(){
            if(self.http.status === 200){
                  console.log('item removed');
            } else
            {
                  callback('Error: ' + self.http.status);
            }
      }

      this.http.send();
};

