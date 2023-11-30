import { Apollo, gql } from "apollo-angular";

export class CleaverCooksApi {
    static readonly BACKEND_API_URL:string = 'localhost:3000';

    public getAllIngredients(apollo : Apollo) : Promise<unknown> {
        return new Promise((resolve, reject) => {
            const query = gql`
                query GetAllIngredients {
                    getAllIngredients {
                        quantity
                        name
                        id
                    }
                }
            `;
            apollo.watchQuery({
                query: query
            }).valueChanges.subscribe(({data, error}) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }
}