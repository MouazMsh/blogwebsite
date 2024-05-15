$("#contact-form").on("submit", function (){
    alert("Your message has been submitted we will be in touch soon");
}); 


// $("#post_form").on("submit", function (){
//     // Variables
//     const tag = $("#tags").val();
//     const title = $("#article_title").val();
//     const subhead = $("#subheading").val();
//     const img_name = $("#post_img").val();
//     const author = $("#author_name").val();
//     const art_body = $("#article_body").val();
//     const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');

//     var htmlContent = `<div class="row featurette">
//     <div class="col-md-7">
//           <div class="mb-3 badge text-bg-success text-wrap badges_width">
//              ${tag}
//           </div>
//         <h2 class="featurette-heading fw-bold lh-2 mb-4">${title}</h2>
//         <p class="lead">${subhead}</p>
//         <a href="/read/${title}" class="icon-link gap-1 icon-link-hover">
//           Continue reading
//         </a>
//     </div>
//       <div class="col-md-5">
//           <img class="article-img" src = "\\styles\\uploaded\\${img_name}" />
//       </div>
//   </div>
//   <hr class="featurette-divider">`;
//   localStorage.setItem("myHtml", htmlContent);

//   console.log("ok");
// }); 


