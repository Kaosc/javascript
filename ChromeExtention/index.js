const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const clearBtn = document.getElementById("clear-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
let myLeads = []

if (localStorage.getItem("myLeads") != null) {
    myLeads = leadsFromLocalStorage
    render(myLeads)    
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {

    let listItems = ""
    
    for (let index = 0; index < leads.length; index++) 
    {
        listItems += `
            <li>
                <a target="_blank" href="${leads[index]}"> 
                    ${leads[index]} 
                </a>
            </li>` 
    }
    
    ulEl.innerHTML = listItems
}

inputEl.addEventListener('keyup', function(e){
    if(e.key == "Enter")
    {
        myLeads.push(inputEl.value);
        inputEl.value = "";
    
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
    
        render(myLeads)
    }
})

inputBtn.addEventListener('click',function(){
    myLeads.push(inputEl.value);
    inputEl.value = ""

    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    render(myLeads)
})

clearBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    ulEl.innerHTML = ""
})



