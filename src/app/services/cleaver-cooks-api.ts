import {Apollo, gql} from "apollo-angular";
import {Recipe} from "../models/recipe";
import {Ingredient} from "../models/ingredient";

export class CleaverCooksApi {
  public constructor(private apollo: Apollo) {
  }

  public getAllIngredients(): Promise<Ingredient[]> {
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

  public addIngredient(name: String) {
    return new Promise((resolve, reject) => {
      const query = gql`
              mutation CreateIngredient($name: String!) {
                createIngredient(name: $name) {
                  id
                }
              }
          `;
      this.apollo.mutate({mutation: query, variables: {name: name}}).subscribe(result => {
        if (result.errors) {
          reject(result.errors);
        } else {
          resolve(result.data);
        }
      });
    });
  }

  public deleteIngredient(id: String) {
    return new Promise((resolve, reject) => {
      const query = gql`
              mutation DeleteIngredient($id: String!) {
                deleteIngredient(id: $id) {
                  id
                }
              }
          `;
      this.apollo.mutate({mutation: query, variables: {id: id}}).subscribe(result => {
        if (result.errors) {
          reject(result.errors);
        } else {
          resolve(result.data);
        }
      });
    });
  }

  public updateIngredient(id: String, name: String) {
    return new Promise((resolve, reject) => {
      const query = gql`
              mutation UpdateIngredient($id: String!, $name: String!) {
                updateIngredient(id: $id, name: $name) {
                  id
                }
              }
          `;
      this.apollo.mutate({mutation: query, variables: {id: id, name: name}}).subscribe(result => {
        if (result.errors) {
          reject(result.errors);
        } else {
          resolve(result.data);
        }
      });
    });
  }

  public getAllRecipes(): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
      try {
        const query = gql`
                    query GetAllRecipes {
                        getAllRecipes {
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
            resolve((data as any).getAllRecipes);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
