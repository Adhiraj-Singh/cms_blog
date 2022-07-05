// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import {GraphQlClient, gql} from "graphql-request";

const graphqlAPI = process.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

const gqlrequest = require("graphql-request");

export default  async function comments (req, res) {

  console.log({graphcmsToken});
  
  const graphQLClient = new GraphQlClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`
    }
  })

  const query = gql `
    mutation CreateComment ($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) {id}
    }
  `

  try {
    const result= await graphQLClient.request(query, req.body)
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    
  }

  const result = await graphQLClient.request(query, req.body)

  return res.status(200).send(result);
}
