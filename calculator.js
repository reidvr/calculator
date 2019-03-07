var model = (function(){
    var data = {
        currentValue: '',
        expression:[0]
    };

    var addValueToExpr = function(value){
        if(value)
            data.expression[data.expression.length-1] = parseFloat(value);

    }

    var isCurValDecimal = function(){
        var check = data.currentValue.indexOf('.');
        return (check > 0);

    }

    return {
        //Add current value and new opertator to the expression array
        addOperator: function(operator){
            with (data){
                addValueToExpr(currentValue);
                expression.push(operator);
                expression.push(0);
                currentValue = '';
                
            }
        },
        //Add new number to current value
        addToValue: function(value){
            if(value === '.')
                if(isCurValDecimal())
                    return;

            if(data.currentValue.length < 9)//max length of output
                data.currentValue += value;
            
        },
        //
        evaluateExpression:function(){
            with(data){
                addValueToExpr(currentValue);
                var result = expression[0];
                expression.forEach((el, i) => {
                    switch(el){
                        case 'x': result = result * expression[i+1];break;
                        case '÷': result = result / expression[i+1];break;
                        case '-': result = result - expression[i+1];break;
                        case '+': result = result + expression[i+1];break;
                    }
                });
                currentValue = result;
                expression = [0];

            }
        },
        getCurrentValue:function(){
            return data.currentValue;
        },
        clearData:function(){
            data.currentValue = '';
            data.expression = [0];
        },
        test: function(){
            console.log(data.expression);
        }
        
        
    }


})();

var view = (function(){

    var DOMStrings = {
        number: '.number-btn',
        clear: '.clear-btn',
        operator: '.operator-btn',
        output: '.output',
        evaluate: '.evaluate-btn'
    };

    return {
        addOperator: function(operator){

        },
        displayValue: function(value){
            document.querySelector('.output').textContent = value;
        },
        calcExpression:function(){
            
        },
        getDomStrings: () => DOMStrings
        
    }


})();

var controller = (function(_model, _view){

    var DOMStrings = _view.getDomStrings();

    var setListeners = () => {
        //add on click events to all number buttons
        var numbers = document.querySelectorAll(DOMStrings.number);
        numbers.forEach(el => el.addEventListener('click', addNumber));
        //add on click events to all operator buttons
        var operators = document.querySelectorAll(DOMStrings.operator);
        operators.forEach(el => el.addEventListener('click', addOperator));
        //add on click events to both clear buttons
        var clears = document.querySelectorAll(DOMStrings.clear);
        clears.forEach(el => el.addEventListener('click', clear));

        //add on click event to the equal button
        document.querySelector(DOMStrings.evaluate).addEventListener('click', evaluate);
        


    };

    var addNumber = function(event){
        //add number to current value in model
        var number = event.target.firstChild.textContent;
        
        _model.addToValue(number);
        //update
        update();
        
    };



    var addOperator = function(event){
        var operator = event.target.firstChild.textContent;
        _model.addOperator(operator);
        update();
    };

    var clear = function(){
        _model.clearData();

        update();
    };

    var evaluate = function(){
        _model.evaluateExpression();
        update();
    }

    var update = function(){
        var currValue = _model.getCurrentValue();
        _view.displayValue(currValue);
    };

    return {
        init: function(){
            setListeners();
         
        }
    }

})(model,view);

controller.init();