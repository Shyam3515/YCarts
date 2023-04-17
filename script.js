if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// Script for navigation bar
const bar = document.getElementById('bar')
const nav = document.getElementById('navbar')
const close = document.getElementById('close')

if(bar){
    bar.addEventListener('click',() =>{
        nav.classList.add('active');
    })
}
if(close){
    close.addEventListener('click',() =>{
        nav.classList.remove('active');
    })
}

// cart
function ready(){
    let removeButtons = document.getElementsByClassName('fa-times-circle')
    for(let i=0;i<removeButtons.length;i++){
        let button = removeButtons[i];
        button.addEventListener('click',removeBtn)
    }
    //Quantity
    let inputQuantity = document.getElementsByClassName('input')
    for(let i=0;i<inputQuantity.length;i++){
        let input = inputQuantity[i];
        input.addEventListener('click',quantityBtn)
    }

    //Add to cart buttons
    let addToCart = document.getElementsByClassName('cart');
    for(let i=0;i<addToCart.length;i++){
        let input = addToCart[i];
        input.addEventListener('click',addToCartClicked)
    }

    document.getElementsByClassName('proceed')[0].addEventListener('click', purchaseClicked)
    //for initial setup after loading
    updateCartTotal();
}

// Purchase button
function purchaseClicked(){
    let cartItems = document.getElementsByTagName('tbody')[0];
    let cartRow = cartItems.getElementsByClassName('cart-row');
    
    if(cartRow.length > 0){ 
        alert('Thank You for your purchase..!');
    }
    else{
        alert('Add items to cart..!');
    }

    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function removeBtn(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //update total
    updateCartTotal();
}  

function quantityBtn(event){
    let input = event.target;
    if(isNaN(input.value) || input.value<=0){
        input.value = 1;
    }
    updateCartTotal();
}

function addToCartClicked(event){
    let button = event.target;
    let shopItem = button.parentElement;
    let details = shopItem.getElementsByClassName('des')[0];
    let title = details.getElementsByTagName('h5')[0].innerText;
    let priceEl = details.getElementsByTagName('h4')[0].innerText;
    let imgSrc = shopItem.getElementsByTagName('img')[0].src;
    const myArray = imgSrc.split("master")[2];
    //console.log(title,priceEl,myArray)
    addItemToCart(title,priceEl,myArray)
    updateCartTotal();
}

function addItemToCart(title,priceEl,myImgSrc){
   let cartItems = document.getElementsByTagName('tbody')[0];
   let cartRow = document.createElement('tr');
   cartRow.classList.add('cart-row');
     
//    let cartItemNames = cartRow.getElementsByTagName('td');
//    console.log(cartItemNames)
//     for (let i = 0; i < cartItemNames.length; i++) {
//         console.log(cartItemNames[i].innerText == title)
//         if (cartItemNames[i].innerText == title) {
//             alert('This item is already added to the cart')
//             cartItemNames[0].addEventListener("click",removeBtn);
//             // cartItems.remove(cartProds);
//             // return;
//         }
//     }

   let cartRowItems = `
   <td><i class="far fa-times-circle"></i></td>
   <td><img src="..${myImgSrc}" alt=""></td>
   <td class="text">${title}</td>
   <td>$18.00</td>
   <td><input type="number" value="1" class="input"></td>
   <td class="price">${priceEl}.00</td>
   ` ;
   let cartProds = cartRowItems;
   cartRow.innerHTML = cartProds;
   cartItems.append(cartRow);
  
   cartRow.getElementsByClassName('fa-times-circle')[0].addEventListener('click', removeBtn)
   cartRow.getElementsByClassName('input')[0].addEventListener('change', quantityBtn)
}

function updateCartTotal(){
    let cartItemContainer = document.getElementsByTagName('tbody')[0];
    let cartRows= cartItemContainer.getElementsByClassName('cart-row');
    let total = 0;
    for(let i=0;i<cartRows.length;i++){
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('price')[0];
        let inputQuantity = cartRow.getElementsByClassName('input')[0];

        let price = parseFloat(priceElement.innerText.replace('$',''));
        let quantity = inputQuantity.value;
        total += price*quantity;
    }
    document.getElementsByClassName('cart-total')[0].innerText = '$' + total.toFixed(2);
    document.getElementsByClassName('price-total')[0].innerText = '$' + total.toFixed(2);
}