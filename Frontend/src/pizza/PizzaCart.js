/**
 * Created by chaika on 02.02.16.
 */
var API = require("../API");
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {

    //Додавання однієї піци в кошик покупок
    for (var i = 0; i < Cart.length; i++) {
        if (Cart[i].pizza.id== pizza.id && Cart[i].size == size) {
            Cart[i].quantity++;

            updateCart();
            return;
        }
    }

            //Приклад реалізації, можна робити будь-яким іншим способом
            Cart.push({
                pizza: pizza,
                size: size,
                quantity: 1
            });


        if(Cart.length==1){
            $(".no-orders").addClass("none");
            $(".orderPizza").removeClass("none");
            $(".button-order").removeAttr("disabled");
        }

            //Оновити вміст кошика на сторінці
            updateCart();
        }

        function removeFromCart(cart_item) {
            //Видалити піцу з кошика
            //TODO: треба зробити

            Cart.splice(cart_item.index,1);

            if(Cart.length==0){
                $(".no-orders").removeClass("none");
                $(".orderPizza").addClass("none");
                $(".button-order").attr('disabled','disabled');
            }

            //Після видалення оновити відображення
            updateCart();
        }

        function initialiseCart() {
            //Фукнція віпрацьвуватиме при завантаженні сторінки
            //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
            //TODO: ...
            Cart = JSON.parse(localStorage.getItem("data"));
            if(Cart==null)Cart=[];

            if(Cart.length==0){
                $(".no-orders").removeClass("none");
                $(".orderPizza").addClass("none");
                $(".button-order").attr('disabled','disabled');
            }
            updateCart();
        }

        function getPizzaInCart() {
            //Повертає піци які зберігаються в кошику
            return Cart;
        }

        function updateCart() {
            //Функція викликається при зміні вмісту кошика
            //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
            localStorage.setItem("data", JSON.stringify(Cart));
            //Очищаємо старі піци в кошику
            $cart.html("");

            //Онволення однієї піци
            function showOnePizzaInCart(cart_item) {
                var html_code = Templates.PizzaCart_OneItem(cart_item);
                var $node = $(html_code);

                self.totalAmount+=cart_item.pizza.price;

                $node.find(".plus").click(function () {
                    //Збільшуємо кількість замовлених піц
                    cart_item.quantity += 1;

                    //Оновлюємо відображення
                    updateCart();
                });

                $node.find(".minus").click(function () {
                    //Зменшуємо кількість замовлених піц
                    if(cart_item.quantity==1){
                    removeFromCart(cart_item);
                    }else
                    cart_item.quantity -= 1;

                    //Оновлюємо відображення
                    updateCart();
                });

                $node.find(".count-clear").click(function () {
                    //Збільшуємо кількість замовлених піц
                    removeFromCart(cart_item);
                    return;

                });

                $(".clear_order").click(function () {
                    //Зменшуємо кількість замовлених піц
                    Cart=[];
                    removeFromCart(cart_item);
                    //Оновлюємо відображення
                    updateCart();
                });

                $cart.append($node);
            }
            $(".orders-count-span").text('').append(Cart.length);
            $(".sum-number").text("").append(totalAmount);
            $("")

            Cart.forEach(showOnePizzaInCart);

        }

var totalAmount=function(){
    var t=0;
    for (var i = 0; i < Cart.length; i++) {
        var size=Cart[i].size;
        t+=(Cart[i].pizza[size].price*Cart[i].quantity);
    }
    return t;
}

// Server side, add data to server after submition

$("#data_submit").click(function(){

   // console.log("Order=" ,Cart);

    var zhopa = {
        name: $("#inputName").val(),
        phone: $("#inputPhone").val(),
        address: $("#inputAdress").val(),
        orders: Cart
    };

    API.createOrder(zhopa,function(){
        console.log("Data sent.")
    });

});



        exports.removeFromCart = removeFromCart;
        exports.addToCart = addToCart;

        exports.getPizzaInCart = getPizzaInCart;
        exports.initialiseCart = initialiseCart;

        exports.PizzaSize = PizzaSize;