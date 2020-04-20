addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {

    variants = await getVariants().then((data) => {return data;});

    rand = Math.random();
    if (rand > 0.5){select = variants[0] } else { select = variants[1] }
    response = await getHTTP(select).then((data) => {return data;});
    return response;
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
