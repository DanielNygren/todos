const form = document.querySelector('form');
const todoList = document.querySelector('#todo-list')
const checkAllButton = document.querySelector('#check-all');
const noteContainer = document.querySelector('#note-container');
const inputContainer = document.querySelector('#input-container');
const clearCompletedButton = document.querySelector('#clearCompletedButton');
const localStorageList = [];
const filter = document.querySelectorAll('.filters li');
const itemsLeftLabel = document.querySelector('#counter');
const sectionMain = document.querySelector('.main');
const sectionFooter = document.querySelector('.footer');

//Load from Local Storage
loadFromLocalStorage();

form.onsubmit = event => {
    event.preventDefault();

    if (form.input.value != "") {
        createListItem();
    }

    form.input.value = "";
    saveToLocalStorage();

}

//Create a 'li' for each added task and add to the HTML ul
function createListItem(text, checked) {

    const todoItem = document.createElement('li');
    todoItem.onmouseenter = event => {
        itemDeleteButton.hidden = false;
    }
    todoItem.onmouseleave = event => {
        itemDeleteButton.hidden = true;
    }
    
    //Checkbox
    const itemCheckbox = document.createElement('input');;
    itemCheckbox.type = "checkbox";
    itemCheckbox.className = "checkbox-round";

    try {
        if (checked == "checked") {
            itemCheckbox.checked = true;
            todoItem.className = "checked";
        }
    }
    catch { }

    //Text input
    const itemLabel = document.createElement('label');

    if (text) {
        itemLabel.textContent = text;
    }
    else {
        itemLabel.textContent = form.input.value;
    }

    //Edit text input
    const itemLabelEdit = document.createElement('input');
    itemLabelEdit.className = 'edit';
    itemLabelEdit.type = 'text';
    itemLabelEdit.hidden = true;

    //Button
    const itemDeleteButton = document.createElement('button');
    itemDeleteButton.className = 'item-delete-button';
    itemDeleteButton.textContent = '❌';
    itemDeleteButton.hidden = true;

    //Events
    itemCheckbox.onchange = event => {
        if (itemCheckbox.checked == true) {
            todoItem.className = 'checked';
        }
        else {
            todoItem.className = '';
        }
        saveToLocalStorage();
    }

    itemDeleteButton.onclick = event => {
        todoItem.remove();
        deleteItemInList(todoItem);
        saveToLocalStorage();
    }

    itemLabel.ondblclick = event => {
        itemLabel.hidden = true;
        itemLabelEdit.hidden = false;
        itemLabelEdit.value = itemLabel.textContent;
        itemLabelEdit.focus();
    }

    itemLabelEdit.addEventListener('focusout', (event) => {
        itemLabel.textContent = itemLabelEdit.value;
        itemLabelEdit.hidden = true;
        itemLabel.hidden = false;
        saveToLocalStorage();
    });

    itemLabelEdit.onkeydown = event => {
        if (event.key == 'Enter') {
            itemLabel.textContent = itemLabelEdit.value;
            itemLabelEdit.hidden = true;
            itemLabel.hidden = false;
            saveToLocalStorage();
        }
    }

    todoItem.appendChild(itemCheckbox);
    todoItem.appendChild(itemLabel);
    todoItem.appendChild(itemLabelEdit);
    todoItem.appendChild(itemDeleteButton);
    todoList.appendChild(todoItem);

    localStorageList.push(todoItem);

}

//Check / Uncheck all list items
checkAllButton.onclick = event => {

    let items = todoList.getElementsByTagName("li");
    let itemsChecked = [];

    for (let i = 0; i < items.length; i++) {

        if (items[i].className == "checked") {

            itemsChecked.push(items[i])
        }
    }
    if (itemsChecked.length == items.length) {

        for (let i = 0; i < items.length; i++) {

            let cb = items[i].firstElementChild;
            cb.click();
        }
    }
    else {
        for (let i = 0; i < items.length; i++) {

            if (items[i].className != "checked") {
                let cb = items[i].firstElementChild;
                cb.click();
            }
        }
    }

}

//Delete from Local Storage List
function deleteItemInList(todoItem) {
    const index = localStorageList.indexOf(todoItem);
    localStorageList.splice(index, 1);

}

//Save to Local Storage List
function saveToLocalStorage() {
    localStorage.clear();
    let string = "";
    for (let i = 0; i < localStorageList.length; i++) {

        string = localStorageList[i].textContent + localStorageList[i].className;
        localStorage.setItem(i, string);
    }

    itemsLeftCounter();
    hiddenSections();
}

//Load from Local Storage List
function loadFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {

        let item = localStorage.getItem(i);
        let value = item.split('❌');
        createListItem(value[0], value[1]);
    }
}

//Update URL
window.addEventListener('hashchange', hashChanged, false);
hashChanged();

function hashChanged() {
    if(location.hash === "#/"){
        hiddenItem("grid", "checked")
        hiddenItem("grid", "")
        filter[0].className = "active"
        filter[1].className = "disabled";
        filter[2].className = "disabled";
    }
    if(location.hash === "#/active"){
        hiddenItem("none", "checked");
        hiddenItem("grid", "")
        filter[0].className = "disabled"
        filter[1].className = "active"
        filter[2].className = "disabled"

    }
    if(location.hash === "#/completed"){
        hiddenItem("none", "")
        hiddenItem("grid", "checked")
        filter[0].className = "disabled"
        filter[1].className = "disabled"
        filter[2].className = "active"
    }
}

//Show / Hide listitems as Hash changes
function hiddenItem(h, state){
    const todoListItem = document.querySelectorAll("#todo-list li")
    for(let i = 0; i < todoListItem.length; i++){
        if(todoListItem[i].className === state){
            todoListItem[i].style.display = h
        }
    }
}

//Clear all checked items when "clear completed button" is clicked
clearCompletedButton.onclick = event => {

    const items = todoList.getElementsByTagName("li");
    for (let i = items.length; i >= 0; i--) {
        try {
            if (items[i].className == "checked") {
                localStorageList.splice(i, 1);
                todoList.removeChild(items[i]);
            }
        }
        catch {
        }
    }
    clearCompletedButton.hidden = true;
    saveToLocalStorage();
}

//Checks how many items are left for "items left" label, and hides/shows clearCompletedButton
function itemsLeftCounter() {

    const items = todoList.getElementsByTagName("li");
    clearCompletedButton.hidden = true;
    let taskNumber = 0;

    for (let i = 0; i < items.length; i++) {

        const cb = items[i].firstElementChild;

        if (cb.checked == true) {
            clearCompletedButton.hidden = false;
        }
        else {
            taskNumber++;
        }
    }
    itemsLeftLabel.textContent = taskNumber + ' items left'

    if (taskNumber === 0) {
        checkAllButton.style.opacity = '1';
    }
    else {
        checkAllButton.style.opacity = '0.2';
    }
}
itemsLeftCounter();

//Show only the input-container and hide rest of the "Container" when there are no items in list
function hiddenSections(){
    if(localStorageList.length > 0){
        sectionMain.hidden = false;
        sectionFooter.hidden= false;
        checkAllButton.style.visibility = "visible";
        sectionMain.style.shadow = "none";
    }
    else{
        sectionMain.hidden = true;
        sectionFooter.hidden= true;
        checkAllButton.style.visibility = "hidden";

    }
}
hiddenSections();
