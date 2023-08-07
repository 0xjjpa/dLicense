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
          values: ["development"]
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