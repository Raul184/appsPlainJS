//Storage Controller
const StorageCtrl = (function() {

})();



//ITem Controller
const ItemCtrl = (function() {
    //Item Constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data State
    const data = {
        items: [
            //{ id: 0, name: 'Steak', calories: 1200 },
            //{ id: 1, name: 'Cookie', calories: 400 },
            //{ id: 2, name: 'Eggs', calories: 300 }
        ],
        currentItem: null,
        totalCalories: 0
    }

    return {
        //Get current stocked Items
        getItems: function() {
            return data.items;
        },

        //ADD nueItems
        addItem: function(name, calories) {
            let ID;
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }
            //Calories
            calories = parseInt(calories);

            //STOCK IN
            const nueItem = new Item(ID, name, calories);
            data.items.push(nueItem);

            return nueItem;
        },

        //GET TOTAL Calories
        getTotalCalories: function(){
              let total = 0;

              //Calculate total
              data.items.forEach(item => total += item.calories)

              //Update total
              data.totalCalories = total;

              return data.totalCalories;
        },

        //Tester Function
        logData: function() {
            return data;
        }
    }
})();



//UI Controller
const UICtrl = (function() {
    const dom = {
        itemList: document.getElementById('item-list'),
        addBtn: document.querySelector('.add-btn'),
        mealInput: document.getElementById('item-name'),
        caloriesInput: document.getElementById('item-calories'),
        totalCalories: document.querySelector('.total-calories')
    }

    return {
        //DOM
        getDom() {
            return dom;
        },
        //GET Input
        getItemInput() {
            return {
                name: dom.mealInput.value,
                calories: dom.caloriesInput.value
            }
        },
        //DISPLAY items in stock in UI
        displayItems(items) {
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
        },
        //DISPLAY New Item
        addListItem(item) {
            //Show UL
            dom.itemList.style.display = 'block';

            //Create html
            const markUp = `
                  <li class="collection-item" id="${item.id}">
                        <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                              <i class="edit-item fa fa-pencil"></i>
                        </a>
                  </li>
            `;
            //Injection
            dom.itemList.insertAdjacentHTML('beforeend', markUp);
        },
        // CLEAR INPUT
        clearInput(){
            dom.mealInput.value = '';
            dom.caloriesInput.value = '';
        },
        //LIST Animation 
        hideList() { 
            dom.itemList.style.display = 'none';
        },
        //UPDATE Total Calories 
        showTotalCalories(total){
            dom.totalCalories.textContent = total;
        }
      }
})();


//APP Controller
const App = (function(ItemCtrl, UICtrl) {

    //DOM
    const dom = UICtrl.getDom();

    //Event Listeners
    const listeners = () => {
      dom.addBtn.addEventListener('click', (e) => {
            
            //Get input from UICtrl
            const input = UICtrl.getItemInput();

            //Checking in
            if (input.name !== '' && input.calories !== '') {
                //Add to storage
                const nueItem = ItemCtrl.addItem(input.name, input.calories);

                //Add to UI
                UICtrl.addListItem(nueItem);
                
                //Get Total calories
                const totalC = ItemCtrl.getTotalCalories();
                
                //Update total calories in UI
                UICtrl.showTotalCalories(totalC);

                //Clear fields
                UICtrl.clearInput();
            }
            e.preventDefault();
      });
    }
    return {
        init: function() {
            console.log('Init'); //test
            listeners(); //events

            //Fetch Data from ItemController
            const items = ItemCtrl.getItems();

            //If items, display UL
            items.length === 0 ? UICtrl.hideList() : UICtrl.displayItems(items);
      }
    }
})(ItemCtrl, UICtrl);

//Init
App.init();