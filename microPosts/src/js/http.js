//Library for Making HTTP requests


class EasyHTTP{
    // HTTTP Get request
    async get(url){
        const response = await fetch(url);

        const resData = await response.json();

        return resData;
    }

    // HTTTP Post request
    async post(url, data){
        const response = await fetch(url, {
            method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
        });

        const resData = await response.json();

        return resData;
    }

    // HTTTP Update request
    async put(url) {
        const response = await fetch(url, {
                  method: 'PUT',
                  headers: {
                        'Content-type': 'application/json'
                  },
                  body: JSON.stringify(data)
        });

        const resData = await response.json();

        return resData;
    }

    // HTTTP Delete request
    async delete(url) {
        const response = await fetch(url, {
                  method: 'DELETE',
                  headers: {
                        'Content-type': 'application/json'
                  }
        });
        const resData = await 'Item deleted';
    }
}

export const http = new EasyHTTP();