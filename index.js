addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

class ElementHandler {

  element(element){
      if (element.tagName === "a"){
          element.setAttribute("href", "https://www.linkedin.com/in/dominickhing/")
          element.setAttribute("target", "_blank")
          element.setInnerContent("linkedin.com/in/dominickhing/")
      }

      if (element.tagName === "p"){
          element.append("Contact me at dhing@stanford.edu. Find me on LinkedIn!")
      }
  }

  text(text){
      if (text.text.trim() === "Variant 1"){
          text.replace("V1 | CloudFlare Fullstack | Dominick Hing");
      } else if (text.text.trim() === "Variant 2") {
          text.replace("V2 | CloudFlare Fullstack | Dominick Hing");
      }

  }

}

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

    rand = Math.random();
    if (rand > 0.5){select = variants[0] } else { select = variants[1] }
    response = await getHTTP(select).then((data) => {return data;});
    return rewriter.transform(response);
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
