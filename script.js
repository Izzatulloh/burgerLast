const recursiya = document.querySelector('.header__timer-extra')
const timer = document.querySelector('.header__timer')

function random(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function color() {
    let r = random(0, 255)
    let g = random(0, 255)
    let b = random(0, 255)
    return `rgb(${r},${g},${b})`
}

function func100() {
    timer.style.color = color()
    if (recursiya.innerHTML < 30) {
        recursiya.innerHTML++

        recursiya.innerHTML = setTimeout(func100, 50)
    } else if (recursiya.innerHTML < 60) {
        recursiya.innerHTML = setTimeout(func100, 80)
    } else if (recursiya.innerHTML < 80) {
        recursiya.innerHTML = setTimeout(func100, 100)
    } else if (recursiya.innerHTML < 100) {
        recursiya.innerHTML = setTimeout(func100, 130)
    }
}
func100()

const product = {
    plainBurger: {
        name: 'GAMBURGER ',
        price: 20000,
        amount: 0,
        kcall: 200,
        get Summ() {
            return this.amount * this.price
        },
        get Kcall() {
            return this.amount * this.kcall
        }
    },
    freshBurger: {
        name: 'GAMBURGER FRESH',
        price: 25000,
        amount: 0,
        kcall: 325,
        get Summ() {
            return this.amount * this.price
        },
        get Kcall() {
            return this.amount * this.kcall
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 35500,
        amount: 0,
        kcall: 650,
        get Summ() {
            return this.amount * this.price
        },
        get Kcall() {
            return this.amount * this.kcall
        }
    }
}

const extraProduct = {
    doubleMayonnaise: {
        name: 'Double Mayonnaise',
        price: 500,
        kcall: 100
    },
    lettuce: {
        name: 'Lettuce Leaf',
        price: 200,
        kcall: 150
    },
    cheese: {
        name: 'Cheese',
        price: 2000,
        kcall: 200
    },
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn')
const checkExtraproduct = document.querySelectorAll('.main__product-checkbox')
const receipt = document.querySelector('.receipt')
const receiptWindow = document.querySelector('.receipt__window')
const receiptWindowBtn = document.querySelector('.receipt__window-btn')
const receiptWindowOut = document.querySelector('.receipt__window-out')
const addCart = document.querySelector('.addCart')
const main__img = document.querySelectorAll('.main__product-info')
const viewClose = document.querySelector('.view__close')
const view = document.querySelector('.view')
const img__burger = document.querySelector('.img__burger')




for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function () {
        plusOrMinus(this)
    });
}

function plusOrMinus(element) {
    // console.log(element);
    //closest eng yaqn elementga ulanb beradi
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        out = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elementData = element.getAttribute('data-symbol')
    if (elementData === "+" && product[parentId].amount < 10) {
        product[parentId].amount++;

    } else if (elementData === '-' && product[parentId].amount > 0) {
        product[parentId].amount--;
    }

    out.innerHTML = product[parentId].amount
    price.innerHTML = product[parentId].Summ
    kcall.innerHTML = product[parentId].Kcall



    console.log(parent, parentId, out, price, elementData, product, kcall);
}

for (let i = 0; i < checkExtraproduct.length; i++) {
    checkExtraproduct[i].addEventListener('click', function () {
        addExtraProduct(this)
    });
}

function addExtraProduct(el) {

    const parent = el.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elementAtr = el.getAttribute('data-extra')

    product[parentId][elementAtr] = el.checked

    if (product[parentId][elementAtr] === true) {
        product[parentId].price += extraProduct[elementAtr].price
        product[parentId].kcall += extraProduct[elementAtr].kcall
    } else {
        product[parentId].price -= extraProduct[elementAtr].price
        product[parentId].kcall -= extraProduct[elementAtr].kcall
    }


    price.innerHTML = product[parentId].Summ
    kcall.innerHTML = product[parentId].Kcall
}
for (i = 0; i < main__img.length; i++) {
    main__img[i].addEventListener('dblclick', function () {
        click(this)
    })
}


function click(elem) {
    const parent = elem.closest('.main__product'),
        img = parent.querySelector('.main__product-img'),
        img__info = img.getAttribute('src')
    img__burger.setAttribute('src', img__info)

    view.classList.add('active')


}


addCart.addEventListener('click', function () {
    let totalPrice = 0;
    let totalName = '';
    let totalKcall = 0
    for (const key in product) {
        if (product[key].amount > 0) {
            totalName += `${product[key].name}\n`

            for (const keyId in product[key]) {
                if (product[key][keyId] === true) {
                    console.log(keyId);
                    totalName += keyId + '\n'
                }
            }

            totalName += '\n'

            totalPrice += product[key].Summ
            totalKcall += product[key].Kcall


        }
    }

    receiptWindowOut.innerHTML = `Purchased:\n\n${totalName}Total Price: ${totalPrice}Summ\nTotal kcall: ${totalKcall}kcall`




    receipt.style.display = 'flex'
    setTimeout(function () {
        receipt.style.opacity = '1'
    }, 500)
    setTimeout(function () {
        receiptWindow.style.top = '10%'
    }, 600)

    document.body.style.overflow = 'hidden'
    // console.log(receipt);
})

viewClose.addEventListener('click', function () {
    location.reload()
})

receiptWindowBtn.addEventListener('click', function () {
    location.reload()
})