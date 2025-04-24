import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge'
}




/*
    curl -X 'POST' \
      'https://vercel-openai-rho.vercel.app/api/ckec' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d '{
      "method": "net_version",
      "id": 1,
      "jsonrpc": "2.0",
      "params": []
    }'

  resquest to http://52.78.186.199:8080
  and return the response to the client
  and set the CORS headers
  and set the content type to application/json
  and set the access control allow origin to *
  and set the access control allow headers to *

*/

export default async function handler(req: NextRequest) {

  
  const httpServer = 'http://52.78.186.199:8080';
  const url = new URL(req.url)
  url.host = httpServer.replace(/^http:\/\//, '');
  url.pathname = url.pathname.replace(/^\/api/, '')

  const fetchUrl = url.toString();

  console.log('fetchUrl:', fetchUrl)


  // check if the request is a POST request

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }


  try {


    // forward the original post request header and body to the http://

    const response = await fetch(
      fetchUrl,
      {
        method: req.method,
        headers: {
          ...req.headers,
          'Host': url.host,
          'Origin': httpServer,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
        body: req.body,
        signal: req.signal,
      }
    )
    const data = await response.json()
    console.log('Response from proxy:', data)
    // Set the CORS headers
    const headers = new Headers(response.headers)
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Headers', '*')
    headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    headers.set('Content-Type', 'application/json')
    headers.set('Access-Control-Allow-Credentials', 'true')
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: headers,
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }


}


