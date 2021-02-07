const searchBtn=document.getElementById("search-btn");


////////////////////////////////////////
//Adding event handler on search button
/////////////////////////////////////////
searchBtn.addEventListener("click",() => {
    let searchVal=document.getElementById("search-value").value;
    searchVal=searchVal.trim();
    if(searchVal!=""){
        findMeals(searchVal);
    }
    else{
        let msg="Please Enter meal name.";
        displayAlert(msg,"red");
    }
    
});


///////////////////////////////////////////////////////
//findMeals function
//////////////////////////////////////////////////////

const findMeals = (searchValue) => {
    const mealList=document.getElementById("meal-list");
    mealList.innerHTML="";
   //Calling api by first letter of food name

   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`).then((response) => {
    return response.json();
    }).then((mealData) => {    
     const meals=mealData.meals;
   
    if(meals==null){
        let msg="No meal found.";
        displayAlert(msg,"#f04086");
    }
    else{
        meals.forEach((item) => {
            let col=document.createElement("div");
            col.setAttribute("class","col-3");
            col.setAttribute("onclick","singleDisplay(event)");
            let listItem=`
               <div class="card  border cards">
                  <img src="${item.strMealThumb}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h6 class="card-title text-center">${item.strMeal}</h6>
                  </div>
               </div>
             `;
            col.innerHTML=listItem;
            mealList.appendChild(col);
        });
    }
})
}

////////////////////////////////
//displayAlert function
///////////////////////////////

const displayAlert = (message,color) => {
    let alert=document.getElementById("alert");
    alert.children[0].innerText=message;
    alert.style.display="block";
    alert.style.backgroundColor=color;
}

///////////////////////////
//singleDisplay function
///////////////////////////
const singleDisplay = (event) => {
    let singleMain=event.currentTarget.children[0].children;
    let mealName=singleMain[1].children[0].innerText;
    mealName=mealName.trim();
    singleDisplayItem(mealName);
}

//////////////////////////////////
//singleDisplayItem function
/////////////////////////////////
const singleDisplayItem = (name) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`).then((res) => {
        return res.json();
    }).then((nameApi) => {
        const item=nameApi.meals[0];
        console.log(item);
        let i=1;
        document.getElementById("single-food-section").style.display="block";
        const listGroup=document.getElementById("list-group");
        listGroup.innerHTML="";
        const singleItemImg=document.getElementById("single-item-img");
        singleItemImg.setAttribute("src",`${item.strMealThumb}`);
        document.getElementById('single-item-title').innerText=item.strMeal;

        while(i!=0){
            let ingredient=`strIngredient${i}`;
            if(item[ingredient]===""||item[ingredient]===null){
               break;
            }
            else{
                //let listItem=`<li class="list-group-item">${item[ingredient]}</li>`;
                let listItem=document.createElement("li");
                listItem.setAttribute("class","list-group-item");
                listItem.innerHTML =`<i class="fa fa-check-square text-success"></i> ${item[ingredient]}`;
                listGroup.appendChild(listItem);
                i++;
            }
            i++;
        }
            
    })
}

///////////////////////////////////
//closeDisplay function
///////////////////////////////////
const closeDisplay = (event) => {
    event.target.parentNode.parentNode.style.display="none";
}