
//Library for Making HTTP requests


class EasyHTTP{

      // HTTTP Get request
      get(url){
            const response = await fetch(url);

            const resData = await response.json();

            return resData;
      }

      // HTTTP Post request
      post(url, data){
            
      }

      // HTTTP Update request
      put(url) {
            
      }

      // HTTTP Delete request
      delete(url) {
            
      }
};