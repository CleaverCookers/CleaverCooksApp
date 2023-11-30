import { Apollo, gql } from "apollo-angular";

export class CleaverCooksApi {
    static readonly BACKEND_API_URL:string = './graphql';

    public constructor(private apollo : Apollo) {
    }

    public getAllIngredients() : Promise<any[]> {
        return new Promise((resolve, reject) => {
            try {
                const query = gql`
                    query GetAllIngredients {
                        getAllIngredients {
                            quantity
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
}
