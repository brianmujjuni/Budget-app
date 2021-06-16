//Budget Controller
let budgetController =(()=>{
   let Expense = function(id, description, value){
       this.id = id;
       this.description = description;
       this.value = value;
   };

   let Income =function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
};

let data ={
    allItems:{
        exp:[],
        inc:[]
    },
    totals:{
       exp: 0,
       inc: 0 
    }
    
};

return{
    addItem: function( type, des, val){

        let newItem,id;
        //Create new Id
        if(data.allItems[type].length>0){
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        }else{
            ID = 0
        }
       
        //Create new item based on 'inc' or exp type
        if(type==='exp'){
         newItem = new Expense(ID,des,val) 

        }else if(type==='inc'){
            newItem = new Income(ID,des,val)
        }

        //push it into our data structur
        
        data.allItems[type].push(newItem);

        //Return the new element
        return newItem;
       
    },
    testing: ()=>{
        console.log(data)
    }

};


})();



//ui controller
let UIController =(()=>{

    let DOMstrings ={
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        container: '.container'
    };

    return{
        getinput:()=>{
            return{
                //Will be either increment or expense
             type : document.querySelector(DOMstrings.inputType).value,
             description : document.querySelector(DOMstrings.inputDescription).value,
             value : parseFloat(document.querySelector(DOMstrings.inputValue).value)

            };
                     
        },
        addListItem:(obj,type)=>{
            let html,newHtml,element ;
            if(type === 'inc'){
                // Create HTML string with palceholder text
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'  
            }else if(type==='exp'){
                element = DOMstrings.expensesContainer
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>' 
         
            }
                  
          // Replace the palceholder text with somae actual data
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value)
        // insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml)
        },

        clearFields:()=>{
            let fields,fieldsArr;
           fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
           fieldsArr = Array.prototype.slice.call(fields);
           fieldsArr.forEach((current,index,array) => {
               current.value = "";
           });
           fieldsArr[0].focus();
        },

        getDOMstrings: ()=>{
            return DOMstrings;
        }
    }

})();

//global app controller
let controller=((budgetCtrl,UICtrl) => {
    let setupEvenListeners = () => {
        let DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem); 
        document.addEventListener('keypress',(e)=>{
            if(e.keyCode === 13 || e.which === 13 ){
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

    };
    let updateBudget =()=>{
        //Calculate the budget

        //return the budget

        //Dispaly the budget on the UI

    };

    let ctrlAddItem =()=>{
        let newItem,input;
    //Get the field input data
         input = UICtrl.getinput();
         if(input.description !== "" && !isNan(input.value) && input.value >0){
         //Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type,input.description,input.value)
        //Add the item to the UI
          UICtrl.addListItem(newItem,input.type)
        //Clear the Fields
          UICtrl.clearFields();    
  
        //calculate and update budget
         updateBudget();
         }
        

    };
    
    return{
        init:()=>{
          setupEvenListeners();
        }
    };
    
})(budgetController,UIController);

controller.init();