import { Apollo, gql } from "apollo-angular";

export class CleaverCooksApi {
    public constructor(private apollo : Apollo) {
    }

    public getAllIngredients() : Promise<any[]> {
        return new Promise((resolve, reject) => {
            try {
                const query = gql`
                    query GetAllIngredients {
                        getAllIngredients {
                            name
                            id
                        }
                    }
                `;
                this.apollo.watchQuery({
                    query: query
                }).valueChanges.subscribe(({data, error}) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve((data as any).getAllIngredients);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    public addIngredient(name:String){
      const query = gql`
            mutation CreateIngredient($name: String!) {
              createIngredient(name: $name) {
                id
                name
              }
            }
        `;
      this.apollo.mutate({mutation:query, variables:{ name:name }}) .subscribe(
        ({ data }) => {
          console.log('got data', data);
        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
    }
}
