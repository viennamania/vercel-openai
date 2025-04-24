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

  // header and body
  const headers = req.headers
  const body = req.body

  console.log('headers', headers)
  console.log('body', body)


  /*
  curl -X 'POST' \
    'http://52.78.186.199:8080' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "method": "net_version",
    "id": 1,
    "jsonrpc": "2.0",
    "params": []
  }'
  */


  // request to http://52.78.186.199:8080

  const reponse = await fetch(
    'http://52.78.186.199:8080',
    {
      method: req.method,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    }
  )
  const data = await reponse.json()
  console.log('data', data)
  // set the CORS headers


  return new Response(JSON.stringify(data), {
    status: reponse.status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Expose-Headers': '*',
      'Access-Control-Max-Age': '86400',
    },
  })



}


