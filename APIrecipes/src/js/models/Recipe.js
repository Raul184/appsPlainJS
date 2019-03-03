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
      //Recipe-Sorter
      parseIngredients(){
            const unitsLong = ['tablespoons', 'tableSpoon', 'ounces', 'ounce', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
            const proper = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'gr', 'kg', 'jars', 'packages'];
      //Uniform Units
            const formatingrd = this.ingredients.map(el =>{
                  let format = el.toLowerCase();
                  unitsLong.forEach((unit, i) => {
                        format = format.replace(unit, proper[i]);
                  });
      //Remove parenthesis
                  format = format.replace(/ *\([^)]*\) */g, ' ');
      //SPLIT formatted text
                  const arrIng = format.split(' ');
      //return Units position
                  const units = arrIng.findIndex(el2 => proper.includes(el2)); 
                  
                  let stockIng;
                  if(units > -1)
                  {
            //found units    >      Ex. 4 1/2 cups    >>    counter = [4, 1/2]
                        const counter = arrIng.slice(0, units);

                        let count;                     //calculate str and return me a total value in Numbers
                        counter.length === 1 ? count = eval(arrIng[0].replace('-', '+')) : 
                                               count = eval((arrIng.slice(0, units).join('+')));
                        stockIng = {
                              count,
                              unit: arrIng[units],
                              format: arrIng.slice(units+1).join(' ')
                        };
                  }
                  else if(parseInt(arrIng[0], 10))
                  {     
            //if Just a number
                        stockIng = {
                              count: parseInt(arrIng[0], 10),
                              unit: '',
                              format: arrIng.slice(0,1).join(' ')         
                        }
                  }
                  else if(units === -1)
                  {     
            //Not found
                        stockIng = {
                              count: 1,
                              unit: '',
                              format        //automatically assigned ES6
                        }
                  }
                  return stockIng;
            });
            this.ingredients = formatingrd; //reassign formatted context 
      }
}
