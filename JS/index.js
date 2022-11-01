

// Loading Screen
    $(`#loading i`).fadeOut(1000,function () {
        $(`#loading `).fadeOut(1000)
    })
    $(`body`).css(`overflow`,`auto`)




// Side Bar
$(`#open,#close`).click(function () {

    let outerWidth= $(`.left`).outerWidth()
    let boxWidth= $(`.left`).css(`width`)

    if ( boxWidth > `0px`) {
        $(`.left`).animate({width:`0px`},1000),
        $(`.right`).animate({left:`0px`},1000)
        $(`.left ul`).hide(1000)
        $(`.left .copyRights`).hide(1000)
        $(`#open`).addClass(`d-none`)
        $(`#close`).removeClass(`d-none`)
        
    }else{
        
        $(`ul`).removeClass(`d-none`)
        $(`.copyRights`).removeClass(`d-none`)
        $(`.left ul`).show(1000)
        $(`.left .copyRights`).show(1000)
        $(`.left`).animate({width:`250px`},1000,function () {
        })
        $(`.right`).animate({left:`250px`},1000)
        
        $(`#open`).addClass(`d-none`)
        $(`#close`).removeClass(`d-none`)
    }
})




// Main Page

async function getData() {
    let mainMeal= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let mainRes= await mainMeal.json()
    let finalMealRes=mainRes.meals
    // console.log(finalMealRes); 

    var mealsCartona = ``;

    for (let i = 0; i < finalMealRes.length; i++) 
    {   mealsCartona += `
        <div class="col-lg-3 py-3 col-md-6  ">
            <div class="item  ">
                <a href=""><img src="${finalMealRes[i].strMealThumb}" class="w-100 rounded-3" alt=""></a>
                <div mealName="${finalMealRes[i].strMeal}" class="layer rounded-3 d-flex justify-content-center align-items-center fw-bold">
                    <h2>${finalMealRes[i].strMeal}</h2>
                </div>
            </div>
        </div>
        `   }

        $(`#mainSection`).html(mealsCartona)

        $(`.layer`).click(function (e) {
            let test= $(e.target).attr(`mealName`)
            // console.log(test);
            instructions(test)
                    })

}

getData()




async function instructions(theName) {
    
    let mainMeal= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${theName}`)
    let mainRes= await mainMeal.json()
    let finalMealRes=mainRes.meals
    console.log(finalMealRes);

    let instructionsCartona=``

    for (let i = 0; i < finalMealRes.length; i++) {
        
        instructionsCartona += 
        `
    <div class="col-md-4">
        <img src="${finalMealRes[0].strMealThumb}" class="w-100" alt="">
        <h1 class="text-white mt-2">${finalMealRes[0].strMeal}</h1>
    </div>

    <div class="col-md-8 text-start text-white">
        <h2>Instructions</h2>
        <p class="Instructions">${finalMealRes[0].strInstructions}</p>
        <p> Area : ${finalMealRes[0].strArea} </p>
        <p> Category : ${finalMealRes[0].strCategory} </p>
        <h3 class=""> Recipes : </h3>

        <ul class="recipes p-0 ">
        </ul>

        <h3 class="mb-3">Tags :</h3>

        <ul class="recipes p-0 ">

        </ul>
        
        <div class="btns">
            <button class="btn btn-danger m-2"> <a href="${finalMealRes[0].strYoutube}" target="_blank" class="text-white">Youtub</a></button>
            <button class="btn btn-success m-2"> <a href="${finalMealRes[0].strSource}" target="_blank" class="text-white">Source</a></button>
        </div>

    </div>
        
        `
    }
            $(`#mainSection`).html(instructionsCartona)
}



// Category





$(`#Categories`).click(function () {
    getCategory()
    $(`.main-page`).removeClass(`d-none`)
    $(`.search-page`).addClass(`d-none`)
    $(`.left`).animate({width:`0px`},1000),
    $(`.right`).animate({left:`0px`},1000)
    $(`.left ul`).hide(1000)
    $(`.left .copyRights`).hide(1000)
    $(`#open`).removeClass(`d-none`)
    $(`#close`).addClass(`d-none`)

})

async function getCategory() {
    
    let categoryData= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let categoryName= await categoryData.json()
    let finalCategory= categoryName.categories
    console.log(finalCategory);

    let categoryCartona=``

    for (let i = 0; i < finalCategory.length; i++) {
        categoryCartona+=
        `
        <div categName="${finalCategory[i].strCategory}"  class="col-lg-3 py-3 col-md-6  ">
            <div class="item  ">
                <a href=""><img src="${finalCategory[i].strCategoryThumb}" class="w-100 rounded-3" alt=""></a>
                <div categName="${finalCategory[i].strCategory}" class="layer rounded-3 flex-column d-flex justify-content-center p-2 align-items-center fw-bold">
                    <h2>${finalCategory[i].strCategory}</h2>
                    <p class="p-1 m-0">${finalCategory[i].strCategoryDescription.split(' ').splice(0,10).join(' ')}</p>
                </div>
            </div>
        </div>
        `
    }

    $(`#mainSection`).html(categoryCartona)




    $(`.col-lg-3`).click(function (e) {
        let x = $(e.target).attr(`categName`)
        console.log(x);
        categoryMeal(x)

    })

}


async function categoryMeal(categoryMealName) {
    
    let categMeals= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryMealName}`)
    let mealsData= await categMeals.json()
    let finalMeals= mealsData.meals
    console.log(finalMeals);

    let categMealsCartona=``

    for (let i = 0; i < finalMeals.length; i++) {
        
        categMealsCartona +=
        `
        <div mealName="${finalMeals[i].strMeal}" class="col-lg-3 py-3 col-md-6  ">
            <div class="item  ">
                <a href=""><img src="${finalMeals[i].strMealThumb}" class="w-100 rounded-3" alt=""></a>
                <div mealName="${finalMeals[i].strMeal}" class="layer rounded-3 d-flex justify-content-center align-items-center fw-bold">
                    <h2>${finalMeals[i].strMeal}</h2>
                </div>
            </div>
        </div>
        
        `
    }

    $(`#mainSection`).html(categMealsCartona)



    $(`.col-lg-3`).click(function (e) {
        let x = $(e.target).attr(`mealName`)
        console.log(x);
        instructions(x)
    })
}

// Areas


$(`#Area`).click(function () {
    areas()
    $(`.main-page`).removeClass(`d-none`)
    $(`.search-page`).addClass(`d-none`)
    $(`.left`).animate({width:`0px`},1000),
    $(`.right`).animate({left:`0px`},1000)
    $(`.left ul`).hide(1000)
    $(`.left .copyRights`).hide(1000)
    $(`#open`).removeClass(`d-none`)
    $(`#close`).addClass(`d-none`)
})


async function areas() {
    
    let areaLink= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let areaData= await areaLink.json()
    let areaName= areaData.meals
    console.log(areaName);

    areaCartona=``

    for (let i = 0; i < areaName.length; i++) {
        
        areaCartona+=
        `
        <div  class="col-lg-3 py-3 col-md-6  ">

        <div class="item">

            <div countryName="${areaName[i].strArea}" class=" countryImage image w-25 text-center m-auto pointer">
                <img src="earth.png" alt="">
            </div>

            <div countryName="${areaName[i].strArea}" class="country">
                <h2 countryName="${areaName[i].strArea}" class="fw-bolder text-white pointer">${areaName[i].strArea}</h2>
            </div>


        </div>

        </div> 

        `
        
    }

    $(`#mainSection`).html(areaCartona)

    $(`.country`).click(function (e) {
        let y = $(e.target).attr(`countryName`);
        console.log(y);
        areaMeals(y)
    })

}

async function areaMeals(countryName) {
    let areaMealLink= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryName}`)
    let areaMealData= await areaMealLink.json()
    let areaMeal= areaMealData.meals
    console.log(areaMeal);

    let areaMealCartona=``

    for (let i = 0; i < areaMeal.length; i++) {
        
        areaMealCartona+= 
        `
        <div class="col-lg-3 py-3 col-md-6  ">
        <div class="item  ">
            <a href=""><img src="${areaMeal[i].strMealThumb}" class="w-100 rounded-3" alt=""></a>
            <div mealName="${areaMeal[i].strMeal}" class="layer rounded-3 d-flex justify-content-center align-items-center fw-bold">
                <h2>${areaMeal[i].strMeal}</h2>
            </div>
        </div>
        </div>
        
        `
    }

    $(`#mainSection`).html(areaMealCartona)

    
    $(`.layer`).click(function (e) {
        let mealNameInst= $(e.target).attr(`mealName`)
        // console.log(mealNameInst);
        instructions(mealNameInst)
                })

}




// Ingredients


$(`#Ingredients`).click(function () {

    IngredData() 
    $(`.main-page`).removeClass(`d-none`)
    $(`.search-page`).addClass(`d-none`)
    $(`.left`).animate({width:`0px`},1000),
    $(`.right`).animate({left:`0px`},1000)
    $(`.left ul`).hide(1000)
    $(`.left .copyRights`).hide(1000)
    $(`#open`).removeClass(`d-none`)
    $(`#close`).addClass(`d-none`)
    
})

async function IngredData() {
    
    let ingredLink= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let ingred= await ingredLink.json()
    let finalIngred= ingred.meals.slice(0,12)
    console.log(finalIngred);

    let ingredCartona=``

    for (let i = 0; i < finalIngred.length; i++) {
        
        ingredCartona+=
        `
        <div  class="col-lg-3 py-3 col-md-6 ">
            <div class="item m-auto  ">
                <div class=" ingredIcon image w-25 mb-3 text-center m-auto pointer">
                    <i class="fa-solid fa-bowl-food text-success  "></i>
                </div>

                <div  class="ingredText text-center">
                    <h2 ingredName="${finalIngred[i].strIngredient}" class="ingredName fw-normal text-white pointer ">${finalIngred[i].strIngredient}</h2>
                    <p class="fw-lighter text-white ">${finalIngred[i].strDescription.split(' ').splice(0,10).join(' ')}</p>
                </div>
            </div>
        </div>
        `
    }
    $(`#mainSection`).html(ingredCartona)

    $(`.ingredName`).click(function (e) {
        let x = $(e.target).attr(`ingredName`)
        console.log(x);
        ingredMeals(x)

    })

}


async function ingredMeals(ingredMealsName) {
    
    let ingredMealsLink= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredMealsName}`)
    let ingredMealsData= await ingredMealsLink.json()
    let ingredMealsNames= ingredMealsData.meals
    console.log(ingredMealsNames);
    let ingredMealsCartona=``

    for (let i = 0; i < ingredMealsNames.length; i++) {
        
        ingredMealsCartona+=
        `
        <div class="col-lg-3 py-3 col-md-6  ">
            <div class="item  ">
                <a href=""><img src="${ingredMealsNames[i].strMealThumb}" class="w-100 rounded-3" alt=""></a>
                <div mealName="${ingredMealsNames[i].strMeal}" class="layer rounded-3 d-flex justify-content-center align-items-center fw-bold">
                    <h2>${ingredMealsNames[i].strMeal}</h2>
                </div>
            </div>
        </div>
        `   
    }
            $(`#mainSection`).html(ingredMealsCartona)
            
            $(`.layer`).click(function (e) {
                let mealNameInst= $(e.target).attr(`mealName`)
                // console.log(mealNameInst);
                instructions(mealNameInst)
                        })

}

//Name Search

$(`#search`).click(function () {

    console.log(`yrbb`);
    $(`.main-page`).addClass(`d-none`)
    $(`.search-page`).removeClass(`d-none`)
    $(`.left`).animate({width:`0px`},1000),
    $(`.right`).animate({left:`0px`},1000)
    $(`.left ul`).hide(1000)
    $(`.left .copyRights`).hide(1000)
    $(`#open`).removeClass(`d-none`)
    $(`#close`).addClass(`d-none`)

})



async function searchName(name) {
    
    let searchNameLink= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let searchNameData= await searchNameLink.json()
    let searchName= searchNameData.meals
    console.log(searchName);

    let searchNameCartona=``

    for (let i = 0; i < searchName.length; i++) {
        
        searchNameCartona+=
        `
        <div class="col-lg-3 py-3 col-md-6  ">
            <div class="item  ">
                <a href=""><img src="${searchName[i].strMealThumb}" class="w-100 rounded-3" alt=""></a>
                <div mealName="${searchName[i].strMeal}" class="layer rounded-3 d-flex justify-content-center align-items-center fw-bold">
                    <h2>${searchName[i].strMeal}</h2>
                </div>
            </div>
        </div>
        `

        
        
    }

    $(`#searchSection`).html(searchNameCartona)

    
    $(`.layer`).click(function (e) {
        let x = $(e.target).attr(`mealName`)
        console.log(x);
        instructions(x)
        $(`.main-page`).removeClass(`d-none`)
        $(`.search-page`).addClass(`d-none`)


    })

}



$(`#NameSearch`).keyup(function () {
    let searchNameBar= document.getElementById('NameSearch')
    searchNameValue= searchNameBar.value
    console.log(searchNameValue);

    searchName(searchNameValue)

})





//Letter Search

$(`#search`).click(function () {

    console.log(`yrbb`);
    $(`.main-page`).addClass(`d-none`)
    $(`.search-page`).removeClass(`d-none`)
    $(`.left`).animate({width:`0px`},1000),
    $(`.right`).animate({left:`0px`},1000)
    $(`.left ul`).hide(1000)
    $(`.left .copyRights`).hide(1000)
    $(`#open`).removeClass(`d-none`)
    $(`#close`).addClass(`d-none`)

})



async function searchLetter(letter) {
    
    let searchLetterLink= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let searchLetterData= await searchLetterLink.json()
    let searchLetter= searchLetterData.meals
    console.log(searchLetter);

    let searchLetterCartona=``

    for (let i = 0; i < searchLetter.length; i++) {
        
        searchLetterCartona+=
        `
        <div class="col-lg-3 py-3 col-md-6  ">
            <div class="item  ">
                <a href=""><img src="${searchLetter[i].strMealThumb}" class="w-100 rounded-3" alt=""></a>
                <div mealName="${searchLetter[i].strMeal}" class="layer rounded-3 d-flex justify-content-center align-items-center fw-bold">
                    <h2>${searchLetter[i].strMeal}</h2>
                </div>
            </div>
        </div>
        `

        
        
    }

    $(`#searchSection`).html(searchLetterCartona)

    
    $(`.layer`).click(function (e) {
        let x = $(e.target).attr(`mealName`)
        console.log(x);
        instructions(x)
        $(`.main-page`).removeClass(`d-none`)
        $(`.search-page`).addClass(`d-none`)


    })

}



$(`#letterSearch`).keyup(function () {
    let searchLetterBar= document.getElementById('letterSearch')
    searchLetterValue= searchLetterBar.value
    console.log(searchLetterValue);

    searchLetter(searchLetterValue)
})


