import React, { useEffect, useRef, useState } from 'react';

enum Operator{
    add = '+',
    substract = '-',
    multiply = '*',
    divide = '÷',
    none = ''
}

export const useCalculator = () => {

    const [formula, setFormula] = useState('');

    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');

    useEffect(() => {
        if( lastOperation.current ){
            const firstFormulaPart = formula.split(' ').at(0);
            setFormula( `${firstFormulaPart} ${lastOperation.current} ${number}` )
        }else{
            setFormula(number);
        }
    }, [number]);

    useEffect(() => {
        const subResult = calculateSubResult();
        setPrevNumber(subResult.toString());
    }, [formula]);
    

    const lastOperation = useRef<Operator>(Operator.none);

    const buildNumber = (numberString : string) => {
        if( number.includes('.') && numberString === '.' ) return;

        // Punto Decimal
        if( number.startsWith('0') || number.startsWith('-0') ){
            if( numberString === '.' ){
                return setNumber( number + numberString );
            }

            // Evaluar si es otro cero y no hay punto
            if( numberString === '0' &&  number.includes('.') ){
                return setNumber(number + numberString);
            }

            // Evaluar si es diferente de cero, no hay punto decimal y es el primer numero
            if( numberString !== '0' && !number.includes('.') ){
                if( number.startsWith('-') )
                    return setNumber('-'+numberString);
                else
                    return setNumber(numberString);
            }

            // Evitar 00000
            if( numberString === '0' && !number.includes('.') ) return;
            return setNumber( number + numberString );
        }
        setNumber(number + numberString);
    }

    const setLastNumber = () =>{
        calculateResult();
        if( number.endsWith('.') ){
            setPrevNumber( number.slice(0,-1) );
        }else{
            setPrevNumber( number );
        }
        setNumber('0');
    }

    const divideOperation = () =>{
        setLastNumber();
        lastOperation.current = Operator.divide;
    }

    const multiplyOperation = () =>{
        setLastNumber();
        lastOperation.current = Operator.multiply;
    }

    const addOperation = () =>{
        setLastNumber();
        lastOperation.current = Operator.add;
    }

    const substractOperation = () =>{
        setLastNumber();
        lastOperation.current = Operator.substract;
    }

    const resetNumbers = () =>{
        setNumber('0');
        setPrevNumber('0');
        lastOperation.current = Operator.none;
        setFormula('');
    }

    // Borrar ultimo numero ingresado
    const delLastNumber = () =>{

        let currentSign = '';
        let temporalNumber = number;

        if( number.includes('-') ){
            currentSign = '-';
            temporalNumber = number.substring(1);
        }

        if( temporalNumber.length > 1 ){
            return setNumber(currentSign + temporalNumber.slice(0,-1));
        }

        return setNumber('0');
        
        // if( number.startsWith('-') ){
        //     if( number.length === 2 )
        //         return setNumber('0');
        // }
        // if( number.length === 1 )
        //     return setNumber('0');
        
        // return setNumber( number.slice(0,number.length-1) );
    }

    const toggleSign = () =>{
        if( number.length === 1 )
            return setNumber('-'+number);
        else
            return setNumber(number+'-');
    }

    const calculateResult = () =>{
        const result = calculateSubResult();
        setFormula(`${result}`);
        lastOperation.current = Operator.none;
        setPrevNumber('0');
    }

    const calculateSubResult = () : number =>{
        const [firstValue, operation, secondValue] = formula.split(' ');
        const num1 = Number(firstValue);
        const num2 = Number(secondValue);

        if( isNaN(num2) ) return num1;

        switch( lastOperation.current ){
            case Operator.add:
                return  num1 + num2;
            case Operator.substract:
                return num1 - num2
            case Operator.multiply:
                return num1 * num2
            case Operator.divide:
                return num1 / num2
            default: 
                throw new Error('Operation not implemented');
                break;
        }
    }

    return {
        // Properties
        number,
        prevNumber,
        formula,

        // Methods
        buildNumber,
        resetNumbers,
        delLastNumber,
        toggleSign,
        substractOperation,
        addOperation,
        multiplyOperation,
        divideOperation,
        calculateResult
    }
}
