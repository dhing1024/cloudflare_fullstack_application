addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {

    const url = "https://cfw-takehome.developers.workers.dev/api/variants"
    response = await fetch(url, {
        method: "GET"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            return data
        })

    variants = response['variants']

    return new Response('Hello worker!', {
        headers: { 'content-type': 'text/plain' },
    })
}
