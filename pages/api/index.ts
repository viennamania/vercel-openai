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



}
