class Calculator{
    constructor(prevOpeElement, curOpeElement){
        this.prevOpeElement = prevOpeElement;
        this.curOpeElement = curOpeElement;
        this.clear();
    }

    clear(){
        this.curOpe = '';
        this.prevOpe = '';
        this.operation = undefined;
    }

    delete(){
        this.curOpe = this.curOpe.toString().slice(0,-1)
    }

    append(number){
        if(number == '.' && this.curOpe.includes('.')) return
        this.curOpe = this.curOpe.toString() + number.toString()
    }

    chooseOperation(operation){ 
        if(this.curOpe == '') return
        if(this.prevOpe != ''){
            this.compute()
        }
        this.operation = operation
        this.prevOpe = this.curOpe
        this.curOpe = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.prevOpe)
        const cur = parseFloat(this.curOpe)

        if(isNaN(prev) || isNaN(cur)) return

        switch(this.operation){
            case '+': 
                computation = prev + cur;
                break;
            case '-':
                computation = prev - cur;
                break;
            case 'x':
                computation = prev * cur;
                break;
            case '÷': 
                computation = prev/cur;
                break;
            default: return
        }
        this.curOpe = computation
        this.operation = undefined
        this.prevOpe = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const intDigit = parseFloat(stringNumber.split('.')[0])
        const decDigit = stringNumber.split('.')[1]

        let intDisplay
            if (isNaN(intDigit)){
                intDisplay = ''
            } else{
                intDisplay = intDigit.toLocaleString('en',{
                    maximumFractionDigits: 0
                })
            }

            if(decDigit != null){
                return `${intDisplay}.${decDigit}`
            } else {
                return intDisplay
            }
        
        /*const floatNumber = parseFloat(number)
        if(isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')*/
    }

    display(){
        this.curOpeElement.innerText = this.getDisplayNumber(this.curOpe);
        if(this.operation != null){
            this.prevOpeElement.innerText = 
            `${this.getDisplayNumber(this.prevOpe)} ${this.operation}`
        } else{
            this.prevOpeElement.innerText = ''
        }
    }
}




const numButtons = document.querySelectorAll('[data-num]')
const opButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const delButton = document.querySelector('[data-del]')
const acButton = document.querySelector('[data-ac]')
const prevOpeElement= document.querySelector('[data-prev-ope]')
const curOpeElement= document.querySelector('[data-cur-ope]')

const calc = new Calculator(prevOpeElement, curOpeElement)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.append(button.innerText)
        calc.display()
    })
})

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerText)
        calc.display()
    })
})

equalButton.addEventListener('click', button => {
    calc.compute()
    calc.display()
})

acButton.addEventListener('click', button => {
    calc.clear()
    calc.display()
})

delButton.addEventListener('click', button => {
    calc.delete()
    calc.display()
})