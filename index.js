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

    return new Response('Hello worker!', {
        headers: { 'content-type': 'text/plain' },
    })
}

/**
 * Send request
 */
async function sendHTTP(){
    return;
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
