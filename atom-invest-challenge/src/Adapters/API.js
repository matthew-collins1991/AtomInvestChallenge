class API {
  
    static getUsers() {
      return fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then(response => response.json());
    }

    // static getArtwork() {
    //     return fetch(`${baseUrl}admin/utilities`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //     }).then(response => response.json());
    //   }
  
  
  
  }
  
  
  window.API = API;
  
  export default API; 