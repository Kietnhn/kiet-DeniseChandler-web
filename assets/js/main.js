
// header
var menu = document.querySelector('.header-menu')
var open = document.querySelector('.header-menu-btn-open')
var close = document.querySelector('.header-menu-btn-close')

open.onclick = function(){
    open.style.display = 'none'
    open.style.animation = 'Notify-smaller ease .3s';
    menu.style.display = 'block';
    menu.style.transform = 'Notify-grow ease .3s';
    
}
close.onclick = function(){
    menu.style.display = 'none';
    open.style.display = 'block'
    open.style.animation = 'Notify-grow ease .1s';
}
// slider 
var clock1 = document.querySelector('.slider-clock-img')
var clock2 = document.querySelector('.slider-clock-2-img')

var time1 = 225;
var time2 = -10
setInterval(function(){
    clock1.style.transform = `rotate(${time1}deg)`
    clock2.style.transform = `rotate(${time2}deg)`
   
    time1+=6;
    time2+=2;
    if(time1 >= 360)time1 = 0
    if(time2 >= 360)time2 = 0

},25)
var dot1 = document.querySelector('.slider-dot1-img')
var dot2 = document.querySelector('.slider-dot2-img')
var dot3 = document.querySelector('.slider-dot3-img')

var tree1 = document.querySelector('.slider-tree1-img')
var tree2 = document.querySelector('.slider-tree2-img')
var tree3 = document.querySelector('.slider-tree3-img')

var subs = document.querySelectorAll('.slider-sub-img')

setInterval(function(){
    setTimeout(function(){
        dot1.classList.add('pop')
    },100)
    setTimeout(function(){
        dot2.classList.add('pop')
    },300)
    setTimeout(function(){
        dot3.classList.add('pop')
        tree1.classList.add('pop')
    },500)
    setTimeout(function(){
        tree2.classList.add('pop')
    },1000)
    setTimeout(function(){
        tree3.classList.add('pop')

    },1500)
    Array.from(subs).forEach(function(sub){
        if(sub.classList.contains('pop')){
            sub.classList.remove('pop')
        }
    })
},2500)

// aboutHead
var head = document.querySelector('.aboutHead-img')
head.classList.add('tossing')


// validator
function Validator (formSelector,options = {}) {
    var formRules = {}
    function getParent(element, selector){
        while (element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement
        }
    }
    var validatorRules = {
        email: function (value)  {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Vui lòng nhập email'
        },
    }
    var formElement = document.querySelector(formSelector)
    if(formElement) {

        var inputs = formElement.querySelectorAll('[name][rules]');
        for(var input of inputs) {
            var rules = input.getAttribute('rules').split('|')
            for (var rule of rules) {
                var ruleInfo;
                var isRuleHasValue = rule.includes(":");
                if(isRuleHasValue){
                    ruleInfo = rule.split(':')
                    rule = ruleInfo[0]
                }
                var ruleFunc = validatorRules[rule];
                if(isRuleHasValue){
                    ruleFunc = ruleFunc(ruleInfo[1])
                }
                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(ruleFunc)
                }else{
                    formRules[input.name] = [ruleFunc]
                }
            }
            
            // lắng nge sự kiện
            input.onblur = handleValidate;
            input.oninput = handleClearError;

        }
        function handleValidate(event) {
            var rules = formRules[event.target.name]
            var errorMessage;
            for (var rule of rules) {
                errorMessage = rule(event.target.value)
                if(errorMessage) break;
            }
           
            if (errorMessage) {
                var formGroup = getParent(event.target, ".form-group")
                var mesage = formGroup.querySelector('.form-message')
                if(formGroup){
                    if(mesage){
                        mesage.classList.add("invalid")
                        mesage.innerText = errorMessage;
                    }
                    if(input.value === ''){
                        if (mesage.classList.contains('invalid')) {
                            mesage.classList.remove("invalid")
                        }
                        if (input.classList.contains('entering')) {
                            input.classList.remove("entering")
                        }

                    }
                }
            }
            
            return !errorMessage
        }
        function handleClearError(event) {
            input.classList.add("entering")
            var formGroup = getParent(event.target, ".form-group")
            var mesage = formGroup.querySelector('.form-message')
            if (mesage.classList.contains('invalid')) {
                mesage.classList.remove("invalid")
                if(mesage){
                    mesage.innerText = '';
                }
            }
        }

        formElement.onsubmit = function(event) {
            event.preventDefault()
            var inputs = formElement.querySelectorAll('[name][rules]');
            var isValid = true;
            for(var input of inputs) {
               if(!handleValidate({target: input})){
                isValid = false;
               }
            }
            if(isValid){
                if(typeof options.onSubmit === "function"){
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')
                    var formValue = Array.from(enableInputs).reduce(function (values, input){
                        values[input.name] = input.value
                        return values
                    }, {})

                    options.onSubmit(formValue)
                }else{
                    formElement.submit()
                }
            }
        }
    }
}