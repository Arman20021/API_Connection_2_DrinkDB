const loadAllProduct = () => {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b")
    .then((response) => response.json())
    .then((data) => {
      displayProduct(data.drinks);
    });
};


const displayProduct = (products) => {
  const productContainer = document.getElementById("drinksList");
  productContainer.classList.add("row");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("col-4");

    div.innerHTML = /*html*/ `
      <div class="card p-2 m-2">
        <img class="image w-100" src="${product.strDrinkThumb}" alt="">
        <h5 class="title1 mt-2">${product.strDrink}</h5>
        <h6 class="title1 mt-2"> Category: ${product.strCategory}</h6>
        <h6 class="title1 mt-2">Instructions: ${product.strInstructions
          .split(" ")
          .slice(0, 10)
          .join(" ")}...</h6>
        <button class="btn btn-sm btn-info mt-2 w-50 mx-auto d-block" onclick="showDetails('${product.strDrink}', '${product.strDrinkThumb}', '${product.strCategory}', 
        '${product.strAlcoholic}','${product.strInstructions}')"   data-bs-toggle="modal"
  data-bs-target="#productModal">Details</button>
        <button class="btn btn-sm btn-success mt-2  w-50 mx-auto d-block"   onclick="handleAddToCart('${product.strDrink}', '${product.strDrinkThumb}')">Add to Cart</button>
      </div>
    `;

    productContainer.appendChild(div);
  });
};


const showDetails = (title, image, category, alcoholic, instructions) => {
  document.getElementById("modalTitle").innerText = title;

  document.getElementById("modalBody").innerHTML = `
    <img src="${image}" class="img-fluid mb-3 rounded w-25" />
    <h6><b>Category:</b> ${category}</h6>
    <h6><b>Alchoholic:</b> ${alcoholic}</h6>
    <p><b>Instructions:</b> ${instructions}</p>
  `;
};



const searchDrinksByName = (searchText) => {
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.drinks) {
        displayProduct(data.drinks);
      } else {
        showNotFound();
      }
    });
};

const showNotFound = () => {
  const productContainer = document.getElementById("drinksList");
  productContainer.innerHTML = `
    <h3 class="text-center text-danger mt-5"> No item found!</h3>
  `;
};

document.getElementById("searchBtn").addEventListener("click", () => {
  const searchValue = document.getElementById("searchInput").value;

  if (searchValue === "") {
    loadAllProduct();
  } else {
    searchDrinksByName(searchValue);
  }
});








let cartSerial = 0;

const handleAddToCart = (name, img) => {
      if (cartSerial >= 7) {
    alert(" You can add maximum 7 drinks in the cart!");
    return;
  }
  const container = document.getElementById("cart-main-container");

  cartSerial++; 

  const div = document.createElement("div");
  div.classList.add("cart-info");

div.innerHTML = `
  <p>${cartSerial}</p>
  <img src="${img}" alt="">
  <p>${name.slice(0, 20)}</p>
`;


  container.appendChild(div);

  UpdateTotal(); 
};

const UpdateTotal = () => {
  document.getElementById("cartCount").innerText = cartSerial;
};











loadAllProduct();
