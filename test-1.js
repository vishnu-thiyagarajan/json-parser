const articles = [
    {title:'First article'},
    {title:'Second article'}
 ];
 function getArticles(){
    setTimeout(()=>{
       let articleContent='';
       articles.forEach((article,index)=>{
          articleContent+=`${article.title}`+` `;
       });
       console.log(articleContent);
    },3000);
    console.log("this is executed")
 };
 function createArticle(article){
    return new Promise((resolve,reject)=>{
       articles.push(article);
       let isError=false;
       if(!isError){
          console.log(resolve())
       } else {
          reject("err");
       }
    });
 }


//  createArticle({title:'Third article'})
//  .then(10,console.log);


// async function testAsync(){
//     await createArticle({title:'Third article'});
//     getArticles();
//  }
//  testAsync();

const p1 = Promise.resolve(21);
const p2 = 110470116021;
const p3 = new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    setTimeout(() => {
        resolve('AppDividend');
    }, 1000);
});

Promise.all([]).then(values => { 
    console.log(values);
});