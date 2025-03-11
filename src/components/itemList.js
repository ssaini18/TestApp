import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";

const List = ({list, addFolderClick, deleteClick}) => {
    const [expanded, setExpanded] = useState({});
    const [shown, setShown] = useState(false);
    const [pid, setPid] = useState(null);
    const [folderName, setFolderName] = useState("");

    const expandClick = (key) => {
        setExpanded((prev) => ({...prev, [key]: prev[key] ? !prev[key] : true}));
    }

    const openModal = (id) => {
        setPid(id);
        setShown(true);
    }

    const closeModal = () => {
        setShown(false);
        setPid(null);
        setFolderName("");
    }

    const saveClick = () => {
        addFolderClick(pid, folderName);
        closeModal();
    }

    return <View style={styles.listContainer}>
        {list.map((data) => {
            return <View key={data.id}>
                <View style={styles.row}>
                    {data.isFolder && <Text onPress={() => expandClick(data.name)}>{`${expanded[data.name] ? '-' : '+'}`}</Text>}
                    <Text>{data.name}</Text>
                    {data.isFolder && <Text onPress={() => openModal(data.id)}>🗂️</Text>}
                    <Text onPress={() => deleteClick(data.id)}>🗑️</Text>
                </View>
                {expanded[data.name] && data.children && <List list={data.children} addFolderClick={addFolderClick} deleteClick={deleteClick} />}
                <Modal visible={shown} backdropColor={'lightgrey'} animationType="fade">
                    <View style={styles.centerModal}>
                        <View style={styles.modalContainer}>
                            <Text>Enter Folder Name:</Text>
                            <TextInput style={styles.textInput} placeholder="Enter folder name" onChangeText={(val) => setFolderName(val)} />
                            <View style={{flexDirection: 'row', justifyContent:'center', gap: 10}}>
                                <Button title="Cancel" onPress={closeModal} >Cancel</Button>
                                <Button onPress={saveClick} >Save</Button> 
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        })}
    </View>
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: 5,
        marginVertical: 5
    },
    listContainer: {
        paddingLeft: 10,
    },
    modalContainer: {
        width: 250,
        height: 150,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    centerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        width: 150,
        padding: 5
    }
})

export default List;