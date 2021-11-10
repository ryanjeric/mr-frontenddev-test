// Initialize LocalStorage to Empty
localStorage.setItem('selectedSize', '');
localStorage.setItem('itemsInCart', null);
document.getElementById("totalAddedQty").innerHTML = 0;

// Check total quantity
function totalQty(){
    // Update Cart total Quantity
    let totalQty = 0;
    let itemsInCart = JSON.parse(localStorage.getItem('itemsInCart')) || [];
    itemsInCart.map((val)=>{
        totalQty = totalQty + val['quantity'];
        if(val['size']==='small'){
            document.getElementById("smallQty").innerHTML = val['quantity'];
            document.getElementById("small-added").style.display = "block";
        }
        else if(val['size']==='medium'){
            document.getElementById("mediumQty").innerHTML = val['quantity']; 
            document.getElementById("medium-added").style.display = "block";
        }
        else if(val['size']==='large'){
            document.getElementById("largeQty").innerHTML = val['quantity'];
            document.getElementById("large-added").style.display = "block";
        }
    });
    document.getElementById("totalAddedQty").innerHTML = totalQty;
};


// Toggle show/hide cart widget
let mycartWidget = document.getElementById("MyCartWidgetButton");
let cartWidget = document.getElementById("CartWidget");
mycartWidget.addEventListener("click",()=>{
    cartWidget.classList.toggle("show-mycart-widget")
})

mycartWidget.addEventListener("mouseenter",()=>{
    cartWidget.classList.toggle("show-mycart-widget")
})
mycartWidget.addEventListener("mouseleave",()=>{
    cartWidget.classList.toggle("show-mycart-widget")
})

// Sizes
let small = document.getElementById("size-small");
let medium = document.getElementById("size-medium");
let large = document.getElementById("size-large");

function clearActive(){
    let current = document.getElementsByClassName("active");
    if (current.length > 0) {
        current[0].className = current[0].className.replace("active", "");
    }
}
// Initialize storage to be empty
localStorage.setItem('selectedSize', '');
small.addEventListener("click",()=>{
    clearActive();
    small.classList.add("active");
    localStorage.setItem('selectedSize', 'small');
    document.getElementById("selectedSize").innerHTML = "S";
});
medium.addEventListener("click",()=>{
    clearActive();
    medium.classList.add("active");
    localStorage.setItem('selectedSize', 'medium');
    document.getElementById("selectedSize").innerHTML = "M";
});
large.addEventListener("click",()=>{
    clearActive();
    large.classList.add("active");
    localStorage.setItem('selectedSize', 'large');
    document.getElementById("selectedSize").innerHTML = "L";
});

// Add to cart button
let addToCart = document.getElementById("add-to-cart-btn");

var addNewItem = function(size, quantity) {
    // retrieve it (Or create a blank array if there isn't any info saved yet),
    var items = JSON.parse(localStorage.getItem('itemsInCart')) || [];
    // add to it, only if it's empty
    var item = items.find(item => item.size === size);

    if (item) {
      item.quantity += quantity;
    } else {
      items.push({
        size,
        quantity
      })
    }
    // then put it back.
    localStorage.setItem('itemsInCart', JSON.stringify(items));
}

addToCart.addEventListener("click",()=>{
    if(!localStorage.getItem("selectedSize")){
        alert("Please select a size");
        return;
    }
    addNewItem(localStorage.getItem("selectedSize"),1);
    // Update Quantity
    totalQty();
});