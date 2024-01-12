/**
 *  @file      cleaver-cooks-api.ts
 *  @brief     cleaver cooks api
 *  @author    Created by Eliott Jaquier
 *  @version   03.01.2024
 */

import {Apollo, gql} from "apollo-angular";
import {Recipe} from "../models/recipe";
import {Element} from "../models/element";
import {Ingredient} from "../models/ingredient";

/**
 * The API for interacting with the Cleaver Cooks backend.
 */
export class CleaverCooksApi {
  public constructor(private apollo: Apollo) {
  }

  /**
   * Get the full list of ingredients
   */
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
            resolve((data as any).getAllIngredients.map((data: { id: string; name: string; }) => {return new Ingredient(data.id,data.name)}));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get one ingredient by id or reject the promise
   * @param id
   */
  public getIngredient(id: string): Promise<Ingredient> {
    return new Promise((resolve, reject) => {
      try {
        const query = gql`
                    query GetIngredient($id: String!) {
                        getIngredient(id: $id) {
                            name
                            id
                        }
                    }
                `;
        this.apollo.watchQuery({
          query: query,
          variables: {id: id}
        }).valueChanges.subscribe(({data, error}) => {
          if (error) {
            reject(error);
          } else {
            let queryData = (data as any).getIngredient;
            resolve(new Ingredient(queryData.id,queryData.name));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get the full list of recipes
   */
  public getAllRecipes(): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
      try {
        const query = gql`
                    query GetAllRecipes {
                      getAllRecipes {
                        elements {
                          amount
                          unit
                          id
                          ingredient {
                            id
                            name
                          }
                        }
                        id
                        instructions
                        name
                        description
                      }
                    }
                `;
        this.apollo.watchQuery({
          query: query
        }).valueChanges.subscribe(({data, error}) => {
          if (error) {
            reject(error);
          } else {
            let queryData = (data as any).getAllRecipes;
            resolve(queryData.map((data: { id: string; name: string; description: string; instructions: string; elements: { id: string; amount: number; unit: string; ingredient: { id: string; name: string; }; }[]; }) => {
              return new Recipe(data.id, data.name, data.description, data.instructions, data.elements.map((data)=> {
                return new Element(data.id, data.amount, data.unit,  new Ingredient(data.ingredient.id, data.ingredient.name))
              }));
            }));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get the list of recipes that match ingredients local list of ids. Returns the list of the favorite recipe (with the least number of missing ingredients) to the one with the most missing ingredients.
   * @param ingredientsLocalIds
   */
  public getRecipesRankedByIngredients(ingredientsLocalIds:number[]): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
      try {
        const query = gql`
                    query GetRecipesByIngredients($ingredientIds: [ID!]!) {
                      getRecipesByIngredients(ingredientIds: $ingredientIds) {
                        description
                        id
                        ingredientCount
                        instructions
                        missingIngredientCount
                        name
                      }
                    }
                `;
        this.apollo.watchQuery({
          query: query,
          variables: {ingredientIds: ingredientsLocalIds}
        }).valueChanges.subscribe(({data, error}) => {
          if (error) {
            reject(error);
          } else {
            let queryData = (data as any).getRecipesByIngredients;
            resolve(queryData.map((data: { id: string; name: string; description: string; instructions: string; missingIngredientCount:number}) => {
              return new Recipe(data.id, data.name, data.description, data.instructions, [], data.missingIngredientCount);
            }));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get the recipe by id or reject the promise
   * @param id
   */
  public getRecipe(id: string): Promise<Recipe|null> {
    return new Promise((resolve, reject) => {
      try {
        const query = gql`
                    query GetRecipe($id: ID!) {
                      getRecipe(id: $id) {
                        elements {
                          amount
                          unit
                          id
                          ingredient {
                            id
                            name
                          }
                        }
                        id
                        instructions
                        name
                        description
                      }
                    }
                `;
        this.apollo.watchQuery({
          query: query,
          variables: {id: id}
        }).valueChanges.subscribe(({data, error}) => {
          if (error) {
            reject(error);
          } else {
            let queryData = (data as any).getRecipe;
            if(queryData == null){
              resolve(null);
              return;
            }
            resolve(new Recipe(queryData.id, queryData.name, queryData.description, queryData.instructions, queryData.elements.map((data: { id: string; amount: number; unit:string; ingredient: { id: string; name: string; }; }) => {
              return new Element(data.id, data.amount, data.unit, new Ingredient(data.ingredient.id, data.ingredient.name));
            })));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Create an ingredient with the given properties
   * @param name
   * @return - The ingredient model created
   */
  public createIngredient(name: string):Promise<Ingredient> {
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
          let queryData = (result.data as any).createIngredient;
          resolve(new Ingredient(queryData.id,queryData.name));
        }
      });
    });
  }

  /**
   * Delete an ingredient by id or reject the promise
   * @param id
   */
  public deleteIngredient(id: string) {
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

  /**
   * Update an ingredient with the given properties by it's id or reject the promise
   * @param id
   * @param name
   */
  public updateIngredient(id: string, name: string) {
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

  /**
   * Create a recipe with the given parameters
   * @param name
   * @param description
   * @param instructions
   */
  public createRecipe(name: string, description: string|undefined|null, instructions: string|undefined|null) : Promise<Recipe>{
    return new Promise((resolve, reject) => {
      const query = gql`
              mutation CreateRecipe($name: String!, $instructions: String, $description: String) {
                createRecipe(name: $name, instructions: $instructions, description: $description) {
                  id
                  description
                  name
                  instructions
                }
              }
          `;
      this.apollo.mutate({mutation: query, variables: {name: name, instructions: instructions, description: description}}).subscribe(result => {
        if (result.errors) {
          reject(result.errors);
        } else {
          let queryData = (result.data as any).createRecipe;
          resolve(new Recipe(queryData.id, queryData.name, queryData.description, queryData.instructions, []));
        }
      });
    });
  }

  /**
   * Update the recipe with the given properties
   * @param id
   * @param name
   * @param description
   * @param instructions
   * @return The update recipe model
   */
  public updateRecipe(id: string, name: string, description: string|undefined|null, instructions: string|undefined|null) : Promise<Recipe> {
    return new Promise((resolve, reject) => {
      const query = gql`
              mutation UpdateRecipe($id: ID!, $name: String!, $instructions: String, $description: String) {
                updateRecipe(id: $id, name: $name, instructions: $instructions, description: $description) {
                  id
                  description
                  name
                  instructions
                }
              }
          `;
      this.apollo.mutate({mutation: query, variables: {id: id, name: name, instructions: instructions, description: description}}).subscribe(result => {
        if (result.errors) {
          reject(result.errors);
        } else {
          let queryData = (result.data as any).updateRecipe;
          resolve(new Recipe(queryData.id, queryData.name, queryData.description, queryData.instructions, []));
        }
      });
    });
  }

  /**
   * Delete a recipe by id or reject the promise
   * @param id
   */
  public deleteRecipe(id: string) {
    return new Promise((resolve, reject) => {
      const query = gql`
              mutation DeleteRecipe($id: ID!) {
                deleteRecipe(id: $id)
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

  /**
   * Add a ingredient to the recipe (and precise the amonunt used)
   * @param recipeId
   * @param ingredientId
   * @param amount
   * @param unit
   * @return The element of the recipe
   */
  public addIngredientToRecipe(recipeId: string, ingredientId: string, amount: number, unit: string) : Promise<Element> {
    return new Promise((resolve, reject) => {
      const query = gql`
              mutation AddIngredientToRecipe($recipeId: ID!, $element: ElementInput!) {
                addIngredientToRecipe(recipeId: $recipeId, element: $element){
                  amount
                  unit
                  id
                  ingredient {
                    name
                    id
                  }
                }
              }
          `;
      this.apollo.mutate({mutation: query, variables: {recipeId: recipeId, element: {id: ingredientId, amount: amount, unit: unit}}}).subscribe(result => {
        if (result.errors) {
          reject(result.errors);
        } else {
          let queryData = (result.data as any).addIngredientToRecipe;
          resolve(new Element(queryData.id, queryData.amount, queryData.unit, new Ingredient(queryData.ingredient.id, queryData.ingredient.name)));
        }
      });
    });
  }

  /**
   * Remove an ingredient from the recipe by it's liaison ID
   * @param elementId
   */
  public removeIngredientFromRecipe(elementId: string) {
    return new Promise((resolve, reject) => {
      const query = gql`
              mutation RemoveIngredientFromRecipe($elementId: ID!) {
                removeIngredientFromRecipe(elementId: $elementId)
              }
          `;
      this.apollo.mutate({mutation: query, variables: {elementId: elementId}}).subscribe(result => {
        if (result.errors) {
          reject(result.errors);
        } else {
          resolve(result.data);
        }
      });
    });
  }

  /**
   * Update an ingredient by it's liaison id and the new amount + unit
   * @param elementId
   * @param amount
   * @param unit
   * @return The updated element / liaison
   */
  public updateIngredientInRecipe(elementId: string, amount: number, unit: string) : Promise<Element> {
    return new Promise((resolve, reject) => {
      const query = gql`
              mutation UpdateIngredientInRecipe($element: ElementInput!) {
                updateIngredientInRecipe(element: $element) {
                  id
                  amount
                  unit
                  ingredient {
                    id
                    name
                  }
                }
              }
          `;
        this.apollo.mutate({mutation: query, variables: {element: {id: elementId, amount: amount, unit: unit}}}).subscribe(result => {
            if (result.errors) {
                reject(result.errors);
            } else {
                let queryData = (result.data as any).updateIngredientInRecipe;
                resolve(new Element(queryData.id, queryData.amount, queryData.unit, new Ingredient(queryData.ingredient.id, queryData.ingredient.name)));
            }
        });
    });
  }
}
