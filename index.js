import http from 'http';
import fetch from 'node-fetch';

const port = 8080;

const server = http.createServer((req, res) => {
  const url = req.url;
  let tableData = '<table border="1"><tr><th>Name</th><th>Height (cm)</th><th>Birth Year</th><th>Gender</th><th>URL</th></tr>';

  // Routes
  if (url === '/') {
    res.write('<h1>Welcome to the homepage!</h1><img src="https://dummyimage.com/600x400/737173/fff.png&text=Landing+Image">');
    res.end();
  } else if (url === '/list') {
    // fetch API
    fetch('https://swapi.dev/api/people')
      // convert to JSON
      .then(res => res.json())
      // .then(json => console.log(json))
      // pass data into createTable function
      .then(data => {
        createTable(data);
        res.write(tableData);
        res.end();
      })
  } else {
    res.writeHead(404);
    res.end('ERROR: Page Not Found');
  }

  function createTable(data) {
    data.results.forEach(person => {
      tableData += `<tr><td>${person.name}</td><td>${person.height}</td><td>${person.birth_year}</td><td>${person.gender}</td><td>${person.url}</td></tr>`
    });
    tableData += `</table>`;
  }
})

server.listen(port, console.log(`Server listening on port ${port}`));