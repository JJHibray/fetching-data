const foodFactory = (foodData) => {

    return `<div> 
        <h1>${foodData.name} </h1>
        <p>${foodData.category}</p>
        <p>${foodData.ethnicity}</p>
        <p>Barcode: ${foodData.barcode}<p>
        <p>Ingredients: ${foodData.ingredients}<p>
        <p>Sugar: ${foodData.sugar}<p>
        <p>Origin: ${foodData.origin}<p>
        <p>Fat: ${foodData.fat}<p>
        <p>Energy: ${foodData.energy}<p>
    </div>
    `

}




fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {

            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    food.ingredients = productInfo.product.ingredients_text
                    console.log(productInfo.product.ingredients_text)
                    food.origin = productInfo.product.countries
                    food.sugar = productInfo.product.nutriments.sugars_serving
                    food.energy = productInfo.product.nutriments.energy
                    food.fat = productInfo.product.nutriments.fat_serving


                    const foodAsHTML = foodFactory(food)
                    addFoodToDom(foodAsHTML)
                })
        })
    })



const addFoodToDom = (foodData) => {
    document.querySelector("#foodList").innerHTML += foodData

}