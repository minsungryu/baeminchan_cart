class ProductCounter {

    constructor() {
        this.handleCounterEvents = this.handleCounterEvents.bind(this);
        this.validateCounter = this.validateCounter.bind(this);
    }

    delegateFrom(element) {
        element.addEventListener('click', this.handleCounterEvents);
        element.addEventListener('keyup', this.handleCounterEvents);
        element.addEventListener('change', this.validateCounter);
        element.addEventListener('input', this.validateCounter);
    }

    handleCounterEvents({ target, type, key }) {
        if (type === 'keyup' && (key !== "ArrowUp" || key !== "ArrowDown")) {
            return;
        }

        if (target.classList.contains('up')) {
            return this.updateCounter(target, 1);
        }
        if (target.classList.contains('down')) {
            return this.updateCounter(target, -1);
        }
    }

    updateCounter(target, count) {
        const counterInput = target.closest('.prd_account').querySelector('.buy_cnt');
        counterInput.value = parseInt(counterInput.value) + count;
        this.validateCounter({ target: counterInput });
    }

    validateCounter({ target }) {
        if (!target.classList.contains('buy_cnt')) {
            return;
        }

        if (isNaN(target.value) || parseInt(target.value) < 1) {
            target.value = 1;
        }
        this.updateTotalPrice();
    }

    updateTotalPrice() {
        const totalPrice = $('#detail_total_price');
        if (!totalPrice) {
            return;
        }

        const salePrice = parseInt($('.desc_price .sale-price').innerText.replace(/\D/g, ''));
        const quantity = parseInt($('.prd_account .buy_cnt').value);
        totalPrice.innerText = (salePrice * quantity).toLocaleString();
    }

}