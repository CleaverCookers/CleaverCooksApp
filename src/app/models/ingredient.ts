/**
 *  @file      ingredient.ts
 *  @brief     Used to construct ingredient
 *  @author    Created by Eliott Jaquier
 *  @version   03.01.2024
 */

/**
 * An ingredient is a material that can be used in recipes. It can be stored and owned by a user.
 */
export class Ingredient {
    constructor(public id: string, public name: string) {
    }
}
