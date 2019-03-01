import axios from 'axios';
import { key, proxy} from '../config';

export default class Recipe{
      constructor(id){
            this.id = id;
      }
      //Single-recipe Getter
      async getRecipe(){
            try
            {
                  const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
                  //Recipe facts to work with
                  this.title = res.data.recipe.title;
                  this.author = res.data.recipe.publisher;
                  this.img = res.data.recipe.image_url;
                  this.url = res.data.recipe.source_url;
                  this.ingredients = res.data.recipe.ingredients;
            }catch(error)
            {
                  console.log(error);
            }
      }
      //Time-Recipe Making
      calcTime(){
            const quarters = Math.ceil(this.ingredients.length/3);
            this.time = quarters * 15; 
      }
      //Recipe-Servings
      calcServings(){
            this.servings = 4;
      }
}
