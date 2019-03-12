

//Storage Controller
const StorageCtrl = (function () {
      
})();



//ITem Controller
const ItemCtrl = (function(){
      //Item Constructor
      const Item = function(id, name, calories){
            this.id = id;
            this.name = name;
            this.calories = calories;
      }

      //Data State
      const data = {
            items: [
                  { id: 0, name: 'Steak', calories: 1200 },
                  { id: 1, name: 'Cookie', calories: 400 },
                  { id: 2, name: 'Eggs', calories: 300 }
            ],
            currentItem: null, 
            totalCalories: 0
      }

      return{
            //Get current stocked Items
            getItems: function(){
                  return data.items;
            },

            //Tester Function
            logData: function(){
                  return data;
            }
      }
})();



//UI Controller
const UICtrl = (function () {
      const dom = {
            itemList: document.getElementById('item-list')
      }

      return{
            displayItems(items){
                  //html
                  let markUp = '';
                  
                  //Loop through data
                  items.forEach(item => {
                        markUp += `
                              <li class="collection-item" id="item-${item.id}">
                                    <strong>${item.name}:</strong><em>${item.calories} Calories</em>
                                    <a href="#" class="secondary-content">
                                          <i class="edit-item fa fa-pencil"></i>
                                    </a>
                              </li>
                        `;
                  });
                  //Injection
                  dom.itemList.insertAdjacentHTML('afterbegin', markUp);
            }
      }
      
})();




//APP Controller
const App = (function (ItemCtrl, UICtrl) {
      return{
            init: function(){
                  console.log('Init');
                  //Fetch Data from ItemController
                  const items = ItemCtrl.getItems();

                  //Display Items on UI
                  UICtrl.displayItems(items);
            }
      }
})(ItemCtrl, UICtrl);

//Init
App.init();



