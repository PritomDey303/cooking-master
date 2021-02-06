const searchBtn=document.getElementById("search-btn");

//Adding event handler on search button
searchBtn.addEventListener("click",() => {
    let searchVal=document.getElementById("search-value").value;
    searchVal=searchVal.trim();
    if(searchVal!=""){
        findMeals(searchVal);
    }
    else{
        let msg="Please Enter a country name.";
        displayAlert(msg);
    }
    
});

//findMeals function
const findMeals = (searchValue) => {
    const mealList=document.getElementById("meal-list");

   //Calling api by first letter of food name

   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchValue}`).then((response) => {
    return response.json();
    }).then((mealData) => {    
     const meals=mealData.meals;
     console.log(meals);
   
    if(meals==null){
        let msg="No meal found.";
        displayAlert(msg);
    }
    else{
        for(let i=0;i<meals.length;i++){
            let col=document.createElement("div");
            col.setAttribute("class","col-3");
            console.log(i,mealList);
        let listItem=`
        <div class="card  border">
           <img src="..." class="card-img-top" alt="...">
           <div class="card-body">
             <h5 class="card-title text-center">Card title</h5>
           </div>
        </div>
        `;
        col.innerHTML=listItem;
      mealList.appendChild(col);
        }
    }
});
}

//displayAlert function

const displayAlert = (message) => {
    console.log(message);
}