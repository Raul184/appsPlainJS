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
        getTotalCalories: function() {
            let total = 0;

            //Calculate total
            data.items.forEach(item => total += item.calories)

            //Update total
            data.totalCalories = total;

            return data.totalCalories;
        },

        //ID-ITEM RETRIEVER
        getItemById: function(id) {
            let found = null;
            data.items.forEach(elem => {
                if (elem.id === id) {
                    found = elem;
                }
            });
            return found;
        },

        //SET Current Item
        setCurrentItem: function(item) {
            //Pass to data structure
            data.currentItem = item;
        },

        //GET Current Item
        getCurrentItem: function() {
            let result = data.currentItem;
            return result;
        },

        //UPDATE Edited-Item on Data controller
        updateItem: function(name, calories) {
            calories = parseInt(calories);

            //update item
            let found = null;

            data.items.forEach(item => {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },

        //DELETE Current ITEM
        deleteItem(currentI) {
            //Get ids
            const ids = data.items.map(val => val.id);

            // Index from currentItem
            const index = ids.indexOf(currentI);

            //Fix stock
            data.items.splice(index, 1);
        },

        //CLEAR ALL Items button
        clearAllItems(){
            data.items = [];
            data.totalCalories = 0;
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
        updateBtn: document.querySelector('.update-btn'),
        deleteBtn: document.querySelector('.delete-btn'),
        backBtn: document.querySelector('.back-btn'),
        clearBtn: document.querySelector('.clear-btn'),
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
        clearInput() {
            dom.mealInput.value = '';
            dom.caloriesInput.value = '';
        },
        //LIST Animation 
        hideList() {
            dom.itemList.style.display = 'none';
        },
        //UPDATE Total Calories 
        showTotalCalories(total) {
            dom.totalCalories.textContent =
                total;
        },
        //ON EDIT STATE for current Item
        clearEditState(on) {
            if (on === 'on') {
                UICtrl.clearInput();
                //Hide state
                dom.deleteBtn.style.display = 'none';
                dom.updateBtn.style.display = 'none';
                dom.backBtn.style.display = 'none';
                //+
                dom.addBtn.style.display = 'inline-block';
            } else if (on === 'off') {
                dom.deleteBtn.style.display = 'inline-block';
                dom.updateBtn.style.display = 'inline-block';
                dom.updateBtn.style.margin = '5px';
                dom.backBtn.style.display = 'inline';
                //+
                dom.addBtn.style.display = 'none';
            }
        },
        // ADD EDIT current item on UI
        addCurrentItem(currentI) {
            dom.mealInput.value = currentI.name;
            dom.caloriesInput.value = currentI.calories;
        },
        //UPDATE on List the Edited Item
        updateListItemEdited(edited) {
            //Grab list
            let listItems = document.querySelectorAll('.collection-item');

            //LOOP through
            Array.from(listItems).forEach(liItem => {
                let itemID = liItem.getAttribute('id');

                if (itemID === `${edited.id}`) {
                    document.getElementById(`${itemID}`).innerHTML = `
                    <strong>${edited.name}: </strong><em>${edited.calories} Calories</em>
                        <a href="#" class="secondary-content">
                              <i class="edit-item fa fa-pencil"></i>
                        </a>
                    `;
                }
            });
        },

        //REMOVE ALL ITEMS in list
        removeItems(){
            let list = document.querySelectorAll('li');

            list = Array.from(list);

            list.forEach(item => item.remove());
        }
    }
})();


//APP Controller
const App = (function(ItemCtrl, UICtrl) {

    //DOM
    const dom = UICtrl.getDom();

    //Event Listeners
    const listeners = () => {

        //ADD button Event --------------------------
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

        //DISABLE submit on Enter after Item is Added
        document.addEventListener('keypress', e => {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false
            }
        });

        //EDIT button event --------------------------
        dom.itemList.addEventListener('click', e => {
            if (e.target.classList.contains('edit-item')) {
                //Get item ID
                const listId = parseInt(e.target.parentNode.parentNode.id); //pos

                //Retrieve Item from Stock
                const itemToEdit = ItemCtrl.getItemById(listId);

                //Set Current Item
                ItemCtrl.setCurrentItem(itemToEdit);

                //Get Current Item
                const currentItem = ItemCtrl.getCurrentItem();
                //Add Current Item to UI & update State
                UICtrl.addCurrentItem(currentItem);
                UICtrl.clearEditState('off');
            };
            e.preventDefault();
        });

        //UPDATE button event ------------------------
        dom.updateBtn.addEventListener('click', e => {
            if (e.target.classList.contains('update-btn')) {
                //Get new input form Item selected on Edit
                const input = UICtrl.getItemInput();

                //Update edited Item on Data structure
                const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

                //Update edited Item on UI List
                UICtrl.updateListItemEdited(updatedItem);

                //Get Total calories
                const totalC = ItemCtrl.getTotalCalories();

                //Update total calories in UI
                UICtrl.showTotalCalories(totalC);

            }
            e.preventDefault();
        });
        //BACK Button Event ------------------------
        dom.backBtn.addEventListener('click', () => UICtrl.clearEditState('on'));

        //DELETE button event ------------------------
        dom.deleteBtn.addEventListener('click', (e) => {

            //Get item
            const currentItem = ItemCtrl.getCurrentItem();
            console.log(currentItem.id);

            //Delete item from Data Structure
            ItemCtrl.deleteItem(currentItem.id);

            //Delete item from UI
            document.getElementById(`${currentItem.id}`).remove();

            //CLear state buttons on UI
            UICtrl.clearEditState('on');

            e.preventDefault();
        });

        //CLEAR ALL button Event
        dom.clearBtn.addEventListener('click', () => { 

            //Clear storage
            ItemCtrl.clearAllItems();

            //Clear UI Totals   &&
            const totalC = ItemCtrl.getTotalCalories();

            //Update total calories in UI
            UICtrl.showTotalCalories(totalC);

            //Clear LIST
            UICtrl.removeItems();
        });
    }
    return {
        init: function() {
            console.log('Init'); //test
            UICtrl.clearEditState('on');
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