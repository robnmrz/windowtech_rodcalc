var app = new Vue({
    el: '#app',
    data: {
      results: null,
      payload: {
        name: "Clemence",
        age: 26
      }
    },
    methods: {
        fetchResults() {
            const url = "https://127.0.0.1/hello"
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(this.payload)
            })
            .then(response => response.json())
            .then(data => console.log(data));
        }
    }
})