
let productListUrl = './products.json';
var productList;
let htmlToReturn = "",
    reviews = "",
    lowStar = 0,
    i = 0,
    isNew = '';
async function loadProducts(productListUrl) {

    fetch('./products.json')
        .then(response => response.json())
        .then(json => {

            productList = json;

            productList.products.forEach((product) => {
                htmlToReturn = '<div class="col-xl-4 col-lg-4 col-md-6">' +
                    '<div class="single-product" id="product' + product.id + '">' +
                    '<div class="product-img prod-card">' +
                    '<img src="images/' + product.imageName + '.png" alt="">';

                isNew = '<div class="new-product">' +
                    '<span>New</span>' +
                    '</div>'
                if (product.isNew == 'TRUE')
                    htmlToReturn += isNew;

                isNew = "";
                htmlToReturn += '<div class="product-hover">' +
                    '<div class="container">' +
                    '<div class="row">' +
                    '<div class="col-4 shopping">' +
                    '<a ><img class="cartimg shopping" src="images/cart.png"></a>' +
                    '</div>' +
                    '<div class="col-4">' +
                    '<a href="product-view.html"><img class="viewimg" src="images/view.png"></a>' +
                    '</div>' +
                    '<div class="col-4 heart">' +
                    '<a ><img class="wishimg heart" src="images/wishlist.png"></a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="product-caption">' +
                    '<div class="product-ratting">';

                lowStar = 6 - product.retings;
                if (product.retings == 5)
                    lowStar = 0;
                for (i = 1; i <= product.retings; i++) {
                    reviews += '<i class="fas fa-star"></i>';

                }
                for (i = 1; i < lowStar; i++) {
                    reviews += '<i class="far fa-star"></i>';

                }
                lowStar = 0;
                htmlToReturn += reviews + product.retings + '/5';
                reviews = "";
                htmlToReturn += ' </div>' +
                    '   <h4><a href="#">' + product.name + '</a></h4>' +
                    '   <div class="price">' +
                    '     <ul>' +
                    '       <li>$' + product.priceAfterDiscount + '</li>' +
                    '       <li class="discount">$' + product.price + '</li>' +
                    '     </ul>' +
                    '   </div>' +
                    ' </div>' +
                    '</div>' +
                    '</div>';
                document.querySelector('#productListArea').innerHTML += htmlToReturn;
            });

            document.querySelectorAll('.product-hover').forEach(product => {
                product.classList.add('hide');
            })

            document.querySelectorAll('div[id^="product"]').forEach(product => {
                product.addEventListener('mouseover', event => {
                    product.querySelector('.product-img').classList.add('blur');
                    product.querySelector('.product-img').querySelector('.product-hover').classList.remove('hide');
                    product.querySelector('.product-img').querySelector('.product-hover').classList.add('show');
                });
                product.addEventListener('mouseout', event => {
                    product.querySelector('.product-img').classList.remove('blur');
                    product.querySelector('.product-img').querySelector('.product-hover').classList.add('hide');
                    product.querySelector('.product-img').querySelector('.product-hover').classList.remove('show');
                });
            });

        })

}

loadProducts(productListUrl);