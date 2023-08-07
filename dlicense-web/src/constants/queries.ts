import { BUNDLR_DLICENSE_APP_ENVIRONMENT } from "./bundlr";

export const GET_APPS_QUERY = `
  {
    transactions(
      tags: [
        {
          name: "App-Name",
          values: ["dLicense"]
        },
        {
          name: "App-Environment",
          values: ["${BUNDLR_DLICENSE_APP_ENVIRONMENT}"]
        }
      ],
    ) {
      edges {
        node {
          id
          tags {
            name
            value
          }
        }
      }
    }
  }
`