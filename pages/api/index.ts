import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge'
}

export default async function handler(req: NextRequest) {

  /*
  const url = new URL(req.url)
  url.host = 'api.openai.com'
  url.pathname = url.pathname.replace(/^\/api/, '')
  return fetch(
    url.toString(),
    {
      method: req.method,
      headers: req.headers,
      body: req.body,
      signal: req.signal,
    }
  )
  */

  // default proxy to http://52.78.186.199:8080

  try {

    /*
    const url = new URL(req.url)
    url.host = 'http://52.78.186.199:8080';
    url.pathname = url.pathname.replace(/^\/api/, '')
    return fetch(
      url.toString(),
      {
        method: req.method,
        headers: req.headers,
        body: req.body,
        signal: req.signal,
      }
    )
    */

    // forward the original post request header and body to the http://52.78.186.199:8080

    const url = 'http://52.78.186.199:8080';
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(req.headers.entries()),
      },
      body: req.body,
      signal: req.signal,
    })
    const data = await response.json()
    const headers = new Headers(response.headers)
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Headers', '*')
    headers.set('Access-Control-Allow-Methods', '*')
    headers.set('Access-Control-Allow-Credentials', 'true')
    headers.set('Access-Control-Expose-Headers', '*')
    headers.set('Content-Type', 'application/json')
    headers.set('Access-Control-Max-Age', '86400')
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
 

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: headers,
    })
    
    

  } catch (e) {
    console.log(e)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Expose-Headers': '*',
        'Access-Control-Max-Age': '86400',
      },
    })
  }



}
