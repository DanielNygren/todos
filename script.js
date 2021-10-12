
const form = document.querySelector("form");
const todoList = document.querySelector("#todo-list");
const checkAllButton = document.querySelector("#check-all");
const sectionMain = document.querySelector(".main");
const sectionFooter = document.querySelector(".footer");
const cearCompleted = document.querySelector(".clear-completed");
const filter = document.querySelectorAll(".filters li");
const localStoregeList = [];

//Load From Local Storege
loadFromLocalStorege();

/*
if(localStoregeList > 0){
    sectionMain.style.visibility = "visible";
    sectionFooter.style.shadow = "none";
}
else{
    noteContainer.style.visibility = 'hidden';
    inputContainer.style.visibility = 'visible';
}
*/
form.onsubmit = event => {
    event.preventDefault();

    if(form.input.value != ""){
        createListItem();
    }

    form.input.value = "";
    saveToLocalStorege();
}

function createListItem(text, checked){

    const todoItem = document.createElement("li");
    
    //Checkbox
    const itemCheckbox = document.createElement("input");
    itemCheckbox.className = "list-checked"
    itemCheckbox.type = "checkbox";
    try{
        if(checked == "checked"){
            itemCheckbox.checked = true;
            todoItem.className = "checked";
        }
    }
    catch{}
    
    //Text label
    const itemLabel = document.createElement("label")
    if(text){
        itemLabel.textContent = text;
    }
    else{
        itemLabel.textContent = form.elements.input.value;
    }
    
    //Edid Text Input 
    const itemLabelEdit = document.createElement("input");
    itemLabelEdit.className = "edit";
    itemLabelEdit.type = "text";
    itemLabelEdit.hidden = "hidden";

    itemLabelEdit.addEventListener('focusout', (event) => {
        itemLabel.textContent = itemLabelEdit.value;
        itemLabelEdit.hidden = true;
        itemLabel.hidden = false;
        saveToLocalStorege();
      });
    
    //Item Delete Butten
    const itemDeleteButten = document.createElement("butten");
    itemDeleteButten.className = "item-delete-butten";
    itemDeleteButten.textContent = "❌";
    
    //Events
    
    //Item Checkbox
    itemCheckbox.onchange = event => {
        if(itemCheckbox.checked == true){
            todoItem.className = "checked";
        }
        else{
            todoItem.className = "";
        }
        saveToLocalStorege();
    }
    //Edit Label Text
    itemLabel.ondblclick = event => {
        itemLabel.hidden = true;
        itemLabelEdit.hidden = false;
        itemLabelEdit.value = itemLabel.textContent;
        itemLabelEdit.focus(itemLabelEdit)
    }

    //Edit Label Event
    itemLabelEdit.onkeydown = event => {
        if(event.key == "Enter"){
            itemLabel.textContent = itemLabelEdit.value;
            itemLabelEdit.hidden = true;
            itemLabel.hidden = false;
            saveToLocalStorege();
        }
    }

    //Delete Button
    itemDeleteButten.onclick = event => {
        todoItem.remove();
        deleteItemInList(todoItem);
        saveToLocalStorege();
    }

    //Append Chilldren
    todoItem.appendChild(itemCheckbox);
    todoItem.appendChild(itemLabel);
    todoItem.appendChild(itemLabelEdit);
    todoItem.appendChild(itemDeleteButten);
    todoList.appendChild(todoItem);

    localStoregeList.push(todoItem);
}

//Check all todos
checkAllButton.onclick = event => {
    let items = todoList.getElementsByTagName("li");
    let itemsChecked = []
    for (let i = 0; i < items.length; i++) {

        if(items[i].className == "checked"){

            itemsChecked.push(items[i])
        }
    }
    if(itemsChecked.length == items.length){
        for (let i = 0; i < items.length; i++) {

            let cb = items[i].firstElementChild;
            cb.click();
        }
    }
    else{
        for (let i = 0; i < items.length; i++) {

            if(items[i].className != "checked"){
                let cb = items[i].firstElementChild;
                cb.click();
            }
        }     
    }
}

//Delete From Local Storege List
function deleteItemInList(todoItem){
    const index = localStoregeList.indexOf(todoItem);
    localStoregeList.splice(index,1);
}

//Save To Local Storege
function saveToLocalStorege(){
    localStorage.clear();
    let string = "";
    for(let i = 0; i < localStoregeList.length; i++){
        string = localStoregeList[i].textContent + localStoregeList[i].className;
        localStorage.setItem(i,string)
    }

    itemsLeftCounter();
}

//Load Form Local Storege
function loadFromLocalStorege(){
    for (let i = 0; i < localStorage.length; i++) {
        let item = localStorage.getItem(i);
        let value = item.split("❌");
        createListItem(value[0], value[1]);
    }
}

//Hash Event Listener
window.addEventListener("hashchange", hashCanged, false);
//Run 
hashCanged();

//Hash Canged Check Function
function hashCanged(){
    if(location.hash === "#/"){
        hiddenItem(false, "checked")
        hiddenItem(false, "")
        filter[0].className = "active"
        filter[1].className = "disable";
        filter[2].className = "disable";
    }
    if(location.hash === "#/active"){
        hiddenItem(true, "checked");
        hiddenItem(false, "")
        filter[0].className = "disable"
        filter[1].className = "active"
        filter[2].className = "disable"

    }
    if(location.hash === "#/completed"){
        hiddenItem(true, "")
        hiddenItem(false, "checked")
        filter[0].className = "disable"
        filter[1].className = "disable"
        filter[2].className = "active"
    }
}

//Hash Canged Viseble Result Function
function hiddenItem(value, checked){
    for(let i = 0; i < localStoregeList.length; i++){
        if(localStoregeList[i].className === checked){
            localStoregeList[i].hidden = value
        }
    }
}

//Cear Comleted
cearCompleted.onclick = event => {
    const todoListItem = document.querySelectorAll("#todo-list li")
    for (let i = todoListItem.length; i >= 0; i--) {
        try{
            if(todoListItem[i].className === "checked"){
                localStoregeList.splice(i,1);
                todoList.removeChild(todoListItem[i]);
            }
        }
        catch{}    
    }
    saveToLocalStorege();
}



function itemsLeftCounter(){
    const todoListItem = document.querySelectorAll("#todo-list li")
    let itemsChecked = 0;
    const itemsLeft = document.querySelector("#counter strong")
    for (let i = 0; i < todoListItem.length; i++) {
        if(todoListItem[i].className != "checked"){
            itemsChecked++
        }
    }
    itemsLeft.textContent = itemsChecked
}
itemsLeftCounter();
