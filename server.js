const http = require('http');
const fs   = require('fs');
const path = require('path');
const serverColor = require('./modules/mLog');
const url  = require('url');
const uuidv1 = require('uuid/v1');

const port = process.argv[2] || 8080;

const server = http.createServer((req, res) => {


    req.url = req.url == '/' ? 'index.html' : req.url;
    console.log(req.headers);
      // access to cookie attribute if exist
      if (req.headers.cookie) {

        
    
        // Cookie strings use a format like 'name=value;name;name=value;...''
        // We want to transform the string to an object so first we split by *;* ...
        let ar = req.headers.cookie.split(';');
    
        let objCookies = {};
    
        // ... then we have to split with *=* and add key+value to our defined object
        ar.forEach((item) => {
          let c     = item.split(' =');
          let name  = c[0];
          let value = c[1];
    
          objCookies[name] = value;
        });
    
        // setting the file to render
        let fileName = `${objCookies.favourite}.html`;
    
        // Access is throwing an exception in case of error
        try {
    
          let pathname = path.join(__dirname, 'pages', fileName);
          // Is the file exist? Is the right access ok?
          fs.accessSync(pathname);
    
          req.url = fileName;
    
        } catch(err) {
          console.log(err);
        }
      }


    if(req.method == 'POST') {
        var body='';
        req.on('data', function (data) {
            body +=data;
            console.log(body);
    });
    
    req.on('end',function(){
        //how create cookie and and add it to the header

        // var POST =  qs.parse(body);
        // console.log(POST);
        response.writeHead(200, {
            'Set-Cookie': 'mycookie=testvalue',
            'Content-Type': 'text/plain'
        });
        response.end('Hello World\n');

    });

    } else if(req.method == 'GET') {
        var url_parts = url.parse(req.url,true);
        console.log(url_parts.query);

        fs.createReadStream(path.join(__dirname, 'pages', req.url), {flags: 'r'})
        .on('error', (err) => {
            // on Error just sending 404 content

            let content = fs.readFileSync(path.join(__dirname, 'pages', '404.html'));
            res.statusCode = 404;
            res.write(content);
            res.end();

            let err2 = 'The URL ' + req.url + ' doesn\'s exist';
            serverColor.err(err2);
        })

        .on("end", () => {
            let run = 'Server running through 127.0.01 on port ' + port;
            serverColor.info(run);
            res.statusCode = 200;
            res.end();
        })
        .pipe(res, { end: false });
    }
});

server.listen(port, (err) => {
  if (err) throw err;
  
});