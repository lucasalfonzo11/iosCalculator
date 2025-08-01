import React, { useRef, useState } from 'react';

enum Operator{
    add,
    substract,
    multiply,
    divide,
    none
}

export const useCalculator = () => {

    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');

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
        const num1 = Number(number);
        const num2 = Number(prevNumber);

        switch( lastOperation.current ){
            case Operator.add:
                setNumber( `${num1 + num2}` );
                break;
            case Operator.substract:
                setNumber( `${num2 - num1}` );
                break;
            case Operator.multiply:
                setNumber( `${num1 * num2}` );
                break;
            case Operator.divide:
                setNumber( `${num2 / num1}` );
                break;
            
            default: 
                throw new Error('Operation not implemented');
                break;
        }

        setPrevNumber('');
    }

    return {
        // Properties
        number,
        prevNumber,

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
