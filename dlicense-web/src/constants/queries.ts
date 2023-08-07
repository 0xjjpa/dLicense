export const GET_APPS_QUERY = `
  {
    transactions(
      tags: [
        {
          name: "App-Name",
          values: ["dLicense"]
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