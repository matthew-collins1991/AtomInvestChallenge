class API {


    static getPosts() {
      return fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then(response => response.json());
    }
  
  }
  
  
  window.API = API;
  
  export default API; 