import { StyleSheet, View, Text, Pressable } from "react-native";
import { useState } from "react";

const DropDown = ({options, onSelect, selected}) => {
    const [show, setShow] = useState(false);

    const toggle = () => {
        setShow((prev) => !prev);
    }


    return <View><Pressable style={styles.input} onPress={toggle}>
        <Text>{selected ?? 'Select Values'}</Text>
    </Pressable>
    {show && options.map((v, i) => {
            return <Pressable key={i.toString()} onPress={() => {onSelect(v);setShow(false)}}><Text>{v}</Text></Pressable>
        })}</View>
}


const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 5
    }
});

export default DropDown;