addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/*
 * Define an element handler class for transformation
 */
class ElementHandler {

  element(element){
      //Set url to linkedin to open in a new tab
      if (element.tagName === "a"){
          element.setAttribute("href", "https://www.linkedin.com/in/dominickhing/")
          element.setAttribute("target", "_blank")
          element.setInnerContent("linkedin.com/in/dominickhing/")
      }
      //Update paragraph
      if (element.tagName === "p"){
          element.append("Contact me at dhing@stanford.edu. Find me on LinkedIn!")
      }
  }

  text(text){
      //Update in <title> tag and in the body
      if (text.text.trim() === "Variant 1"){
          text.replace("V1 | CloudFlare Fullstack | Dominick Hing");
      } else if (text.text.trim() === "Variant 2") {
          text.replace("V2 | CloudFlare Fullstack | Dominick Hing");
      }
  }
}

/*
 * Define HTML rewriter object
 */
const rewriter = new HTMLRewriter()
    .on('title', new ElementHandler())
    .on('h1#title', new ElementHandler())
    .on('p#description', new ElementHandler())
    .on('a#url', new ElementHandler())

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
    variants = await getVariants().then((data) => {return data;});
    if (Math.random() > 0.5){select = variants[0]} else {select = variants[1]}
    response = await getHTTP(select).then((data) => {return data;});
    if (!response.ok){
        return rewriter.transform(response);
    } else {
        return new Response("The resource could not be obtained. Please try again.");
    }
}

/**
 * @param {String} url
 * Send request for variant
 */
async function getHTTP(url){
    return await fetch(url).then((response) => {
        return response;
    })
}

/**
 * Define function for getting URL variants
 */
async function getVariants(){
    const url = "https://cfw-takehome.developers.workers.dev/api/variants"
    response = await fetch(url, {
        method: "GET"
    }).then((response) => {
        return response.json();
    }).then((data) => {
        return data;
    })
    return response['variants'];
}
