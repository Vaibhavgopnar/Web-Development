
let contacts = new Map()
contacts.set('india', '+918888888888')
contacts.set('usa', '+44 1632 960846')
contacts.set('canada', '+1 202 555 0156')
contacts.set('germany', '+49-163-5556-667')

setTimeout(() => {
    document.getElementById('nation-select').addEventListener('change', () => {
        let country = document.getElementById('nation-select').value;
        document.getElementById('ph-number').innerHTML = contacts.get(country);
        document.getElementById('flag-icon').src = `images/${country}.jpg`;
    });
}, 3000)

document.getElementById("scrollUp").classList.add("hide");
getYPosition = () => {
    var top = window.pageYOffset || document.documentElement.scrollTop
    return top;
};

document.addEventListener('scroll', () => {
    let scroll = getYPosition();
    let arrow = document.getElementById('scrollUp');

    scrolled = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    // navigation bar sticky
    $(window).ready(() => {
        if (scroll < 50) {
            document.getElementById("header-sticky").classList.remove("sticky-bar");
        } else {
            document.getElementById("header-sticky").classList.add("sticky-bar");
        }
    });

    // scrollup button visibility
    if (scroll > 800) {
        arrow.classList.remove("hide");
        arrow.classList.add("show");
        arrow.addEventListener('click', scrolled);
        // arrow.onclick = scrolled;
    } else {
        arrow.classList.remove('show');
        arrow.classList.add('hide');
        arrow.removeEventListener("click", scrolled);
    }
})



document.querySelectorAll('.product-hover').forEach(product => {
    product.classList.add('hide');
})

document.querySelectorAll('div[id^="product"]').forEach(product => {
    product.addEventListener('mouseover', event => {
        product.querySelector('.product-img').classList.add('blur');
        product.querySelector('.product-img').querySelector('.product-hover').classList.remove('hide');
        product.querySelector('.product-img').querySelector('.product-hover').classList.add('show');
    })
    product.addEventListener('mouseout', event => {
        product.querySelector('.product-img').classList.remove('blur');
        product.querySelector('.product-img').querySelector('.product-hover').classList.add('hide');
        product.querySelector('.product-img').querySelector('.product-hover').classList.remove('show');
    })
});

// a) Heart icon
document.querySelectorAll(".product-hover").forEach(img => {
    let img_1 = img.childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0];
    img_1.addEventListener('mouseover', func2 => {
        img_1.src = 'images/cart-new.png';
    })
});
document.querySelectorAll(".product-hover").forEach(img => {
    let img_1 = img.childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0];
    img_1.addEventListener('mouseout', func2 => {
        img_1.src = 'Images/cart.png';
    })
});
// b) Eye icon
document.querySelectorAll(".product-hover").forEach(img => {
    let img_2 = img.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[0];
    img_2.addEventListener('mouseover', func3 => {
        img_2.src = 'Images/view-new.png';
    })
});
document.querySelectorAll(".product-hover").forEach(img => {
    let img_2 = img.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[0];
    img_2.addEventListener('mouseout', func3 => {
        img_2.src = 'Images/view.png';
    })
});
// b) Cart icon
document.querySelectorAll(".product-hover").forEach(img => {
    let img_3 = img.childNodes[1].childNodes[1].childNodes[5].childNodes[1].childNodes[0];
    img_3.addEventListener('mouseover', func4 => {
        img_3.src = 'Images/wishlist-new.png';
    })
});
document.querySelectorAll(".product-hover").forEach(img => {
    let img_3 = img.childNodes[1].childNodes[1].childNodes[5].childNodes[1].childNodes[0];
    img_3.addEventListener('mouseout', func4 => {
        img_3.src = 'Images/wishlist.png';
    })
});

setTimeout(() => {
    document.querySelectorAll('.cartimg').forEach(img => {
        img.addEventListener('mouseover', func2 => {
            img.src = "images/cart-new.png";
        })
        img.addEventListener('mouseout', func2 => {
            img.src = "images/cart.png";
        })
    });
}, 2000);

setTimeout(() => {
    document.querySelectorAll('.viewimg').forEach(img => {
        img.addEventListener('mouseover', func2 => {
            img.src = "images/view-new.png";
        })
        img.addEventListener('mouseout', func2 => {
            img.src = "images/view.png";
        })
    });
}, 2000);

setTimeout(() => {
    document.querySelectorAll('.wishimg').forEach(img => {
        img.addEventListener('mouseover', func2 => {
            img.src = "images/wishlist-new.png";
        })
        img.addEventListener('mouseout', func2 => {
            img.src = "images/wishlist.png";
        })
    });
}, 2000);


// cart page logic
let products = new Set();
let counter = 0;

// adding click events to cart icon
document.body.addEventListener('click', e => {
    if (e.target.closest('.shopping')) {
        let elem = document.querySelector('.single-product').id;
        products.add(elem);
        // storing product ids in local storage
        localStorage.setItem('Products_IDs', JSON.stringify(Array.from(products)));

        // adding number of products in cart icon
        // counter = JSON.parse(localStorage.getItem("Products_IDs")).length;
        // document.querySelector('#cart-badge').innerHTML = String(counter);
    };
});

// parsing JSON List for cart page
let RetrievedData = localStorage.getItem("Products_IDs");
console.log(RetrievedData)
console.log("++++++++=======================")
let productsArray = JSON.parse(RetrievedData);


prices_discounted = [];
prices_original = [];
pricesOnDiscount2 = [];
pricesOriginal2 = [];
totalCartItems = 0;
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let ReturnedHTML2 = " ";
        let myProducts = JSON.parse(this.responseText);
        for (i = 0; i < productsArray.length; i++) {
            for (j = 0; j < myProducts.products.length; j++) {
                if (productsArray[i] == myProducts.products[j].id) {
                    prices_discounted.push(parseInt(myProducts.products[j].priceAfterDiscount));
                    prices_original.push(parseInt(myProducts.products[j].price));

                    // saving the prices arrays in session storage
                    sessionStorage.setItem("discountedPrices", JSON.stringify(Array.from(prices_discounted)));
                    sessionStorage.setItem("originalPrices", JSON.stringify(Array.from(prices_original)));

                    // rendering the HTML through JS
                    ReturnedHTML2 = `<div class="cart-items-holder" id='${productsArray[i]}'>
            <div class='pdt-container' id='pdt-single'>
                <img class='img-sweater' src="Images/${myProducts.products[j].imageName}.png" alt="Sweater Image">
                <div class="pdt-text w-100">
                    <div class="text1">
                        <h6>${myProducts.products[j].name}</h6>
                        <p class="mb-0 text-secondary">Color : Multicolor</p>
                        <p class="mb-0 text-secondary">Seller : Indus Valley & Co</p>
                        <div class="forms mt-xl-3 mt-lg-3 mt-md-2 mt-sm-2 d-flex justify-content-start align-items-start">
                            <div class="form-group">
                                <label class='mr-2' for="exampleFormControlSelectSize"></label>
                                <select class="form-control" id="exampleFormControlSelectSize">
                                    <option>Size : Onesize</option>
                                    <option>S</option>
                                    <option>M</option>
                                    <option>L</option>
                                    <option>XL</option>
                                    <option>XXL</option>
                                </select>
                            </div>
                            <div class="form-group2 ml-3">
                                <label class='mr-2' for="exampleFormControlSelectQuantity"></label>
                                <select class="form-control" id="exampleFormControlSelectQuantity${i}">
                                    <option>QTY : 1</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="text2">
                        <p class='pricing mb-0'>Rs.<strong id='final-price${i}'>${myProducts.products[j].priceAfterDiscount}</strong> Rs.<del id='initial-price${i}'>${myProducts.products[j].price}</del><span
                            class="offer font-weight-bold ml-1">(60%Off)</span></p>
                            <small class="text-secondary">Delivery in 4 - 6 days</small>
                    </div>
                </div>
            </div>
            <div class="options">
                <button class="ml-3 mr-3 text-dark font-weight-bold" id='remove-btn${i}'>REMOVE</button> | <button class="ml-3 mr-3 text-dark font-weight-bold" id='wishlist-btn${i}'>ADD TO WISHLIST</button>
            </div>
        </div>
        <br>`
                    totalCartItems += 1;
                    document.querySelector('#cart-items-area').innerHTML += ReturnedHTML2;
                }
            }
        }


        // retrieving the prices from storage
        RetrievedDiscountPrices = sessionStorage.getItem("discountedPrices");
        RetrievedOriginalPrices = sessionStorage.getItem("originalPrices");
        pricesOnDiscount = prices_discounted;
        pricesOriginal = prices_original;


        // calculating the total, subtotal, discount prices when the items are added to cart for the first time
        document.getElementById('totalCartValue').innerHTML = calculateTotalCartValue(pricesOnDiscount);
        document.getElementById('originalPrice').innerHTML = calculateOriginalCartValue(pricesOriginal);
        document.getElementById('bagDiscount').innerHTML = document.getElementById('originalPrice').innerHTML - document.getElementById('totalCartValue').innerHTML;
        document.getElementById('orderTotal').innerHTML = calculateTotalCartValue(pricesOnDiscount);

        // assigning prices to local storage so they can be retrieved in checkout page
        localStorage.setItem("finalPrice", calculateTotalCartValue(pricesOnDiscount));
        localStorage.setItem("originalPrice", calculateTotalCartValue(pricesOriginal));
        // localStorage.setItem("bagDiscount", (calculateTotalCartValue(pricesOriginal) - calculateTotalCartValue(pricesOriginal)));



        pricesOnDiscount2 = pricesOnDiscount;
        pricesOriginal2 = pricesOriginal;
        // looping through the cart items to perform quantity selection based calculations
        for (let i = 0; i < totalCartItems; i++) {

            document.getElementById('exampleFormControlSelectQuantity' + i).onchange = () => {
                pricesOnDiscount = JSON.parse(RetrievedDiscountPrices);
                pricesOriginal = JSON.parse(RetrievedOriginalPrices);
                const selected_quantity = document.getElementById('exampleFormControlSelectQuantity' + i).selectedIndex;
                document.getElementById('final-price' + i).innerHTML = pricesOnDiscount[i] * selected_quantity;
                document.getElementById('initial-price' + i).innerHTML = pricesOriginal[i] * selected_quantity;
                pricesOnDiscount2[i] = pricesOnDiscount[i] * selected_quantity;
                pricesOriginal2[i] = pricesOriginal[i] * selected_quantity;
                document.getElementById('totalCartValue').innerHTML = calculateTotalCartValue(pricesOnDiscount2);
                document.getElementById('originalPrice').innerHTML = calculateOriginalCartValue(pricesOriginal2);
                document.getElementById('bagDiscount').innerHTML = document.getElementById('originalPrice').innerHTML - document.getElementById('totalCartValue').innerHTML;
                document.getElementById('orderTotal').innerHTML = calculateTotalCartValue(pricesOnDiscount2);

                localStorage.setItem("finalPrice", calculateTotalCartValue(pricesOnDiscount2));
                localStorage.setItem("originalPrice", calculateTotalCartValue(pricesOriginal2));
            }

            // removing products on click of remove button and updating all prices
            document.getElementById('remove-btn' + i).addEventListener('click', fadeOutEffect);
            function fadeOutEffect() {
                var productId = document.getElementById('remove-btn' + i).closest('.cart-items-holder').id;
                var fadeTarget = document.getElementById(productId);
                var fadeEffect = setInterval(function () {
                    if (!fadeTarget.style.opacity) {
                        fadeTarget.style.opacity = 1;
                    }
                    if (fadeTarget.style.opacity > 0) {
                        fadeTarget.style.opacity -= 0.1;
                    }
                    else {
                        clearInterval(fadeEffect);
                        fadeTarget.style.display = 'none';
                        pricesOnDiscount2[i] = pricesOnDiscount[i] * 0;
                        pricesOriginal2[i] = pricesOriginal[i] * 0;
                        document.getElementById('totalCartValue').innerHTML = calculateTotalCartValue(pricesOnDiscount2) - pricesOnDiscount2[i];
                        document.getElementById('originalPrice').innerHTML = calculateOriginalCartValue(pricesOriginal2) - pricesOriginal2[i];
                        document.getElementById('bagDiscount').innerHTML = document.getElementById('originalPrice').innerHTML - document.getElementById('totalCartValue').innerHTML;
                        document.getElementById('orderTotal').innerHTML = calculateTotalCartValue(pricesOnDiscount2) - pricesOnDiscount2[i];

                        localStorage.setItem("finalPrice", calculateTotalCartValue(pricesOnDiscount2) - pricesOnDiscount2[i]);
                        localStorage.setItem("originalPrice", calculateTotalCartValue(pricesOriginal2) - pricesOriginal2[i]);

                        var items = JSON.parse(localStorage.getItem("Products_IDs"));
                        for (var k = 0; k < items.length; k++) {
                            var item = items[k];
                            if (item == productId) {
                                const index = items.indexOf(productId);
                                if (index > -1) {
                                    items.splice(index, 1);
                                }
                                break;
                            }
                        }
                    }
                    // Don't forget to store the result back in localStorage and set the cart icon value
                    localStorage.setItem("Products_IDs", JSON.stringify(Array.from(items)));
                    counter = JSON.parse(localStorage.getItem("Products_IDs")).length;
                    document.querySelector('#cart-badge').innerHTML = String(counter);

                }, 100);
            };

            // addToWishlist functionality for cart items
            document.getElementById('wishlist-btn' + i).addEventListener('click', fadeOutEffect4);
            function fadeOutEffect4() {

                // get product Id of the removed product and update counter of cart icon
                var productId4 = document.getElementById('wishlist-btn' + i).closest('.cart-items-holder').id;

                var existing_fav_Products = JSON.parse(localStorage.getItem('Wishlist_IDs'));

                if (existing_fav_Products == null) {
                    existing_fav_Products = [];
                }
                existing_fav_Products.push(document.getElementById('wishlist-btn' + i).closest('.cart-items-holder').id);

                localStorage.setItem('Wishlist_IDs', JSON.stringify(Array.from(existing_fav_Products)));

                counter2 = JSON.parse(localStorage.getItem("Wishlist_IDs")).length;
                document.querySelector('#wishlist-badge').innerHTML = String(counter2);
                // fade effect while removing product
                var fadeTarget2 = document.getElementById(productId4);
                var fadeEffect2 = setInterval(function () {
                    if (!fadeTarget2.style.opacity) {
                        fadeTarget2.style.opacity = 1;
                    }
                    if (fadeTarget2.style.opacity > 0) {
                        fadeTarget2.style.opacity -= 0.1;
                    }
                    else {
                        clearInterval(fadeEffect2);
                        fadeTarget2.style.display = 'none';
                        pricesOnDiscount2[i] = pricesOnDiscount[i] * 0;
                        pricesOriginal2[i] = pricesOriginal[i] * 0;
                        document.getElementById('totalCartValue').innerHTML = calculateTotalCartValue(pricesOnDiscount2) - pricesOnDiscount2[i];
                        document.getElementById('originalPrice').innerHTML = calculateOriginalCartValue(pricesOriginal2) - pricesOriginal2[i];
                        document.getElementById('bagDiscount').innerHTML = document.getElementById('originalPrice').innerHTML - document.getElementById('totalCartValue').innerHTML;
                        document.getElementById('orderTotal').innerHTML = calculateTotalCartValue(pricesOnDiscount2) - pricesOnDiscount2[i];

                        localStorage.setItem("finalPrice", calculateTotalCartValue(pricesOnDiscount2) - pricesOnDiscount2[i]);
                        localStorage.setItem("originalPrice", calculateTotalCartValue(pricesOriginal2) - pricesOriginal2[i]);
                        // removing that particular Id from local storage 
                        var items4 = JSON.parse(localStorage.getItem("Products_IDs"));
                        for (var m = 0; m < items4.length; m++) {
                            var item1 = items4[m];
                            if (item1 == productId4) {
                                const index3 = items4.indexOf(productId4);
                                if (index3 > -1) {
                                    items4.splice(index3, 1);
                                }
                                break;
                            }
                        }
                        // Don't forget to store the result back in localStorage and set the cart icon value
                        localStorage.setItem("Products_IDs", JSON.stringify(Array.from(items4)));
                        counter = JSON.parse(localStorage.getItem("Products_IDs")).length;
                        document.querySelector('#cart-badge').innerHTML = String(counter);
                    }
                }, 100);
            };
        }
        // function to calculate discounted price 
        function calculateTotalCartValue(prices) {
            sum = 0;
            for (p of prices) {
                sum += parseInt(p);
            }
            return sum;
        }

        // function to calculate original price 
        function calculateOriginalCartValue(prices) {
            sum_2 = 0;
            for (q of prices) {
                sum_2 += parseInt(q);
            }
            return sum_2;
        }
    }
};
xmlhttp.open("GET", "products.json", true);
xmlhttp.send();


// ----------------------------------------------------------------------------------------------------------------------------

// wishlist page logic
let fav_products = new Set();


// adding click events to heart icon
document.body.addEventListener('click', f => {
    if (f.target('.heart')) {
        let element = document.querySelector('.single-product').id;
        fav_products.add(element);

        localStorage.setItem('Wishlist_IDs', JSON.stringify(Array.from(fav_products)))

    };
});

let RetrievedData2 = localStorage.getItem("Wishlist_IDs");
let productsArray2 = JSON.parse(RetrievedData2);

totalWishlistItems = 0;
let xmlhttp2 = new XMLHttpRequest();

xmlhttp2.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

        let myProducts = JSON.parse(this.responseText);

        for (i = 0; i < productsArray2.length; i++) {
            for (j = 0; j < myProducts.products.length; j++) {
                if (productsArray2[i] == myProducts.products[j].id) {

                    let ReturnedHTML3 = " ";

                    ReturnedHTML3 = `<div class='pdt-container2' id='${productsArray2[i]}'> 
            <img class='img-sweater' src="Images/${myProducts.products[j].imageName}.png" alt="Sweater Image">
            <div class="pdt-text2 d-flex flex-row justify-content-between align-items-start">
                <div class="text1">
                    <h6>${myProducts.products[j].name}</h6>
                    <div class="stars-group mt-2" id="starsgroup">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                        <small class="ml-2">${myProducts.products[j].reviews}</small>
                    </div>
                    <p class='pricing mt-2 text-dark mb-0'><strong>Rs ${myProducts.products[j].priceAfterDiscount}</strong> <del>Rs ${myProducts.products[j].price}</del><span
                        class="offer font-weight-bold ml-1">(60%Off)</span></p>
                    <div class="form-group">
                        <label class='mr-2' for="exampleFormControlSelect2"></label>
                        <select class="form-control" id="exampleFormControlSelect2">
                            <option>Select Pack of</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                    <button type="button" class="btn btn-orange mr-2" id='addToCart${i}' aria-label='buy now button'>Add to Cart</button> | <button id='removeFromWishlist${i}'<small class="ml-2 text-secondary">Remove from Wishlist</small></button>
                </div>
                
            </div>
        </div>
        <hr>`
                    totalWishlistItems += 1;
                    document.querySelector('#wishlist-items-container').innerHTML += ReturnedHTML3;
                }
            }
        }
        for (let i = 0; i < totalWishlistItems; i++) {
            document.getElementById('removeFromWishlist' + i).addEventListener('click', fadeOutEffect2);
            function fadeOutEffect2() {
                var productId2 = document.getElementById('removeFromWishlist' + i).closest('.pdt-container2').id;
                var fadeTarget = document.getElementById(productId2);
                var fadeEffect = setInterval(function () {
                    if (!fadeTarget.style.opacity) {
                        fadeTarget.style.opacity = 1;
                    }
                    if (fadeTarget.style.opacity > 0) {
                        fadeTarget.style.opacity -= 0.1;
                    }
                    else {
                        clearInterval(fadeEffect);
                        fadeTarget.style.display = 'none';
                    }
                    var items2 = JSON.parse(localStorage.getItem("Wishlist_IDs"));
                    for (var k = 0; k < items2.length; k++) {
                        var item = items2[k];
                        if (item == productId2) {
                            const index1 = items2.indexOf(productId2);
                            if (index1 > -1) {
                                items2.splice(index1, 1);
                            }
                            break;
                        }
                    }
                    
                    localStorage.setItem("Wishlist_IDs", JSON.stringify(Array.from(items2)));
                    counter2 = JSON.parse(localStorage.getItem("Wishlist_IDs")).length;
                    document.querySelector('#wishlist-badge').innerHTML = String(counter2);
                }, 100);
            }

           
            document.getElementById('addToCart' + i).addEventListener('click', fadeOutEffect3);
            function fadeOutEffect3() {

                // get product Id of the removed product and update counter of cart icon
                var productId3 = document.getElementById('addToCart' + i).closest('.pdt-container2').id;
                // Get the existing data
                var existing_Products = JSON.parse(localStorage.getItem('Products_IDs'));

                
                if (existing_Products == null) {
                    existing_Products = [];
                }
                existing_Products.push(document.getElementById('addToCart' + i).closest('.pdt-container2').id);

                localStorage.setItem('Products_IDs', JSON.stringify(Array.from(existing_Products)));

                counter = JSON.parse(localStorage.getItem("Products_IDs")).length;
                document.querySelector('#cart-badge').innerHTML = String(counter);

                // fade effect while removing product
                var fadeTarget1 = document.getElementById(productId3);
                var fadeEffect1 = setInterval(function () {
                    if (!fadeTarget1.style.opacity) {
                        fadeTarget1.style.opacity = 1;
                    }
                    if (fadeTarget1.style.opacity > 0) {
                        fadeTarget1.style.opacity -= 0.1;
                    }
                    else {
                        clearInterval(fadeEffect1);
                        fadeTarget1.style.display = 'none';
                    }
                    // removing that particular Id from local storage 
                    var items3 = JSON.parse(localStorage.getItem("Wishlist_IDs"));
                    for (var l = 0; l < items3.length; l++) {
                        var item1 = items3[l];
                        if (item1 == productId3) {
                            const index2 = items3.indexOf(productId3);
                            if (index2 > -1) {
                                items3.splice(index2, 1);
                            }
                            break;
                        }
                    }
                    // Don't forget to store the result back in localStorage and set the cart icon value
                    localStorage.setItem("Wishlist_IDs", JSON.stringify(Array.from(items3)));
                    counter2 = JSON.parse(localStorage.getItem("Wishlist_IDs")).length;
                    // document.querySelector('#wishlist-badge').innerHTML = String(counter2);
                }, 100);
            }
        }
    }
};
xmlhttp2.open("GET", "products.json", true);
xmlhttp2.send();



// ___________________________________________________________________________________________________________________________________________________


// setting local storage in edit profile page
const mobile = document.getElementById('profileInputMobileNum');
const full_name = document.getElementById('profileInputFullname');
const email = document.getElementById('profileInputEmail1');
const birthday = document.getElementById('profileInputBirthday');
const area = document.getElementById('profileInputLocation');
const mobile_alt = document.getElementById('profileInputAltMobile');
const nickname = document.getElementById('profileInputNickname');
const btn_save = document.querySelector('#save-btn');
const gender = document.getElementById('gender-select');


btn_save.onclick = () => {
    console.log('click!');
    setLocalStorage(),
        goToProfilePage();
};

function setLocalStorage() {
    if (document.getElementById('tick-m').classList.contains('d-none')) {
        gender.value = 'Female'
    }
    else {
        gender.value = 'Male'
    }
    const mobile_key = mobile.value;
    const name_key = full_name.value;
    const email_key = email.value;
    const gender_key = gender.value;
    const birthday_key = birthday.value;
    const location_key = area.value;
    const mobile2_key = mobile_alt.value;
    const nickname_key = nickname.value;

    console.log(gender_key);

    if (mobile_key && name_key && email_key && gender_key && birthday_key && location_key && mobile2_key && nickname_key) {
        localStorage.setItem("Mobile Number", mobile_key);
        localStorage.setItem("Full Name", name_key);
        localStorage.setItem("Email", email_key);
        localStorage.setItem("Gender", gender_key);
        localStorage.setItem("Birthday", birthday_key);
        localStorage.setItem("Location", location_key);
        localStorage.setItem("Alternate Mobile Number", mobile2_key);
        localStorage.setItem("Nickname", nickname_key);
    }
};

function goToProfilePage() {
    location.href = "My-profile.html"
};

// Updating info on edit profile page with filled values
window.onload = function () {
    if (localStorage.getItem('Mobile Number') == null) {
        document.getElementById('profileInputMobileNum').value = 9000000009;
    }
    else {
        document.getElementById('profileInputMobileNum').value = localStorage.getItem('Mobile Number')
    }
    if (localStorage.getItem('Full Name') == null) {
        document.getElementById('profileInputFullname').value = 'Mark Mathhews';
    }
    else {
        document.getElementById('profileInputFullname').value = localStorage.getItem('Full Name')
    }
    if (localStorage.getItem('Email') == null) {
        document.getElementById('profileInputEmail1').value = 'markmathhews@xyz.com';
    }
    else {
        document.getElementById('profileInputEmail1').value = localStorage.getItem('Email')
    }
    if (localStorage.getItem('Birthday') == null) {
        document.getElementById('profileInputBirthday').value = '-Not Added-';
    }
    else {
        document.getElementById('profileInputBirthday').value = localStorage.getItem('Birthday')
    }
    if (localStorage.getItem('Location') == null) {
        document.getElementById('profileInputLocation').value = '-Not Added-';
    }
    else {
        document.getElementById('profileInputLocation').value = localStorage.getItem('Location')
    }
    if (localStorage.getItem('Alternate Mobile Number') == null) {
        document.getElementById('profileInputAltMobile').value = 9898989890;
    }
    else {
        document.getElementById('profileInputAltMobile').value = localStorage.getItem('Alternate Mobile Number')
    }
    if (localStorage.getItem('Nickname') == null) {
        document.getElementById('profileInputNickname').value = 'Lorelboy';
    }
    else {
        document.getElementById('profileInputNickname').value = localStorage.getItem('Nickname')
    }
    if (localStorage.getItem('Gender') == null) {
        document.getElementById('tick-m').classList.remove('d-none');
        document.getElementById('tick-f').classList.add('d-none');
    }
    else if (localStorage.getItem('Gender') == 'Male') {
        document.getElementById('tick-m').classList.remove('d-none');
        document.getElementById('tick-f').classList.add('d-none');
    }
    else if (localStorage.getItem('Gender') == 'Female') {
        document.getElementById('tick-f').classList.remove('d-none');
        document.getElementById('tick-m').classList.add('d-none');
    }
    cart_num = JSON.parse(localStorage.getItem("Products_IDs")).length;
    document.querySelector('#cart-badge').innerHTML = cart_num;
    wishlist_num = JSON.parse(localStorage.getItem("Wishlist_IDs")).length;
    document.querySelector('#wishlist-badge').innerHTML = wishlist_num;
};


