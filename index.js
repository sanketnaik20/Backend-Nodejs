
const { log } = require('console');
const fs=require('fs');
const http=require('http');
const url=require('url');






///////////FILEeeEEEEEEE//////
// const textIn=fs.readFileSync('/Users/sanketnaik/Desktop/backend-dev/complete-node-bootcamp-master/1-node-farm/starter/txt/input.txt','utf-8');

// console.log(textIn);

// const textOut=`This is what we know about the avacado: ${textIn}.\nCreated on ${Date.now()}`;



// fs.writeFileSync('/Users/sanketnaik/Desktop/backend-dev/complete-node-bootcamp-master/1-node-farm/starter/txt/input.txt',textOut);

// console.log(`File Written`);


// Non Blocking Code


// fs.readFile('/Users/sanketnaik/Desktop/backend-dev/complete-node-bootcamp-master/1-node-farm/starter/txt/starttttt.txt','utf-8',(err,data1)=>{
//     if(err)return console.log('Error');
//     fs.readFile(`/Users/sanketnaik/Desktop/backend-dev/complete-node-bootcamp-master/1-node-farm/starter/txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile(`/Users/sanketnaik/Desktop/backend-dev/complete-node-bootcamp-master/1-node-farm/starter/txt/append.txt`,'utf-8',(err,data3)=>{
//             console.log(data3);
        


//             fs.writeFile(`complete-node-bootcamp-master/1-node-farm/starter/txt/final.txt`,`${data2}\n${data3}`,`utf-8`,(err)=>{
//                 console.log('File has been written ❤️');
//             })
//         })
    
//     })

// })


// console.log(`will read file`);

// ////////// server
const replaceTemplate=(temp,product ) =>{
    let output=temp.replace(/{%PRODUCTNAME%}/g ,product.productName);
     output=output.replace(/{%IMAGE%}/g ,product.image);
     output=output.replace(/{%PRICE%}/g ,product.price);
     output=output.replace(/{%FROM%}/g,product.from);
     output=output.replace(/{%NUTRIENTS%}/g,product.nutrients);
     output=output.replace(/{%QUANTITY%}/g ,product.quantity);
     output=output.replace(/{%DESCRIPTION%}/g ,product.description);
     output=output.replace(/{%ID%}/g,product.id);
     if(!product.organic)output=output.replace(/{%NOT_ORGANIC%}/g,'not-organic')
     return output;

};

    const tempOveriew=fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
    
    const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
    const tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');


    
    const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
    const dataObj=JSON.parse(data);



    const server = http.createServer((req,res)=>{
    const {query,pathname}=url.parse(req.url,true);

    // Overview Page
    if(pathname==='/'||pathname==='/overview'){


        res.writeHead(400,{'content-type':'text/html'});
        const cardsHtml=dataObj.map(el=>replaceTemplate(tempCard,el));
        
        const output=tempOveriew.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(output);
    }else

    // product page
     if(pathname==='/product'){
        res.writeHead(400,{'content-type':'text/html'});
        const product=dataObj[query.id];
        const output=replaceTemplate(tempProduct,product);
        res.end(output);




    }else
    // API
     if(pathname==='/api'){
     res.writeHead(400,{'content-type':'application/json'});
     res.end(data);
    }else
    {
    // Not Found
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'hello world'
        });
        res.end('<h1>This PAGE NOT FOUND</h1>');
    }

})


server.listen(8000,'127.0.0.1',()=>{
    console.log("Listening to Request at Port 8000");
});