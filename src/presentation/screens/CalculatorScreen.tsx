import React from 'react'
import { Pressable, Text, View } from 'react-native';
import { colors, globalStyles } from '../../config/theme/app-theme';
import { CalculatorButton } from '../components/CalculatorButton';
import { useCalculator } from '../hooks/useCalculator';



export const CalculatorScreen = () => {

    const {
        number,
        buildNumber,
        resetNumbers,
        delLastNumber,
        toggleSign,
        substractOperation,
        addOperation,
        multiplyOperation,
        divideOperation,
        prevNumber,
        calculateResult
    } = useCalculator();

    return (
        <View style={globalStyles.calculatorContainer}>
            <View style={{paddingHorizontal:30,paddingBottom:20}}>
                <Text 
                    style={globalStyles.mainResult}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                >
                    { number }
                </Text>
                <Text 
                    style={globalStyles.subResult}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                >
                    { (prevNumber === '0') ? '' : prevNumber }
                </Text>
            </View>

            <View style={globalStyles.row}>
                <CalculatorButton onPress={()=>resetNumbers()} blackText label={"C"} color={colors.lightGray}/>
                <CalculatorButton onPress={()=>toggleSign()} blackText label={"+/-"} color={colors.lightGray}/>
                <CalculatorButton onPress={()=>delLastNumber()} blackText label={"del"} color={colors.lightGray}/>
                <CalculatorButton onPress={divideOperation} label={"÷"} color={colors.orange}/>
            </View>
            <View style={globalStyles.row}>
                <CalculatorButton onPress={()=>buildNumber("7")} label={"7"} color={colors.darkGray}/>
                <CalculatorButton onPress={()=>buildNumber("8")} label={"8"} color={colors.darkGray}/>
                <CalculatorButton onPress={()=>buildNumber("9")} label={"9"} color={colors.darkGray}/>
                <CalculatorButton onPress={multiplyOperation} label={"*"} color={colors.orange}/>
            </View>
            <View style={globalStyles.row}>
                <CalculatorButton onPress={()=>buildNumber("4")} label={"4"} color={colors.darkGray}/>
                <CalculatorButton onPress={()=>buildNumber("5")} label={"5"} color={colors.darkGray}/>
                <CalculatorButton onPress={()=>buildNumber("6")} label={"6"} color={colors.darkGray}/>
                <CalculatorButton onPress={substractOperation} label={"-"} color={colors.orange}/>
            </View>
            <View style={globalStyles.row}>
                <CalculatorButton onPress={()=>buildNumber("1")} label={"1"} color={colors.darkGray}/>
                <CalculatorButton onPress={()=>buildNumber("2")} label={"2"} color={colors.darkGray}/>
                <CalculatorButton onPress={()=>buildNumber("3")} label={"3"} color={colors.darkGray}/>
                <CalculatorButton onPress={addOperation} label={"+"} color={colors.orange}/>
            </View>
            <View style={globalStyles.row}>
                <CalculatorButton onPress={()=>buildNumber("0")} label={"0"} color={colors.darkGray} doubleSize/>
                <CalculatorButton onPress={()=>buildNumber(".")} label={"."} color={colors.darkGray}/>
                <CalculatorButton onPress={calculateResult} label={"="} color={colors.orange}/>
            </View>
        </View>
    )
}
