import uniqid from 'uniqid';


export default class List {
      constructor(){
            this.items = [];
      }
//ADD Method
      addItem( count , unit, format){
            const item = {
                  id: uniqid(),           //library available
                  count,
                  unit,
                  format
            }
      }
//DELETE Method
      deleteItem(id){
            const index = this.items.findIndex(el => el.id === id);
            this.items.splice(index, 1);  //Arr mutation
      }
}