# Svelte + Vite + Timer
1. Point to an external JavaScript file: 
   ```html
    <script type="module" crossorigin src="/svelte-timer.0.1.0.js"></script>
   ``` 
2. Add an event listener in script
   ```js
   document.querySelector('svelte-timer').addEventListener('tick', (res) => {
        fetch('https://worldtimeapi.org/api/timezone/Asia/Taipei')
        .then(function(response) {
          return response.json();
        })
        .then(function(time) {
          res.detail.load(time.data);
        })
        .catch(()=>{
          //Handle the error here
        })
      });
   ```  
3. Put the Svelte component in html 
   ```html
   <svelte-timer size="4" format="YYYY/MM/DD" color="warning" bg="black"></svelte-timer>
   ``` 
