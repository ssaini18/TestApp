import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import jsonData from '../utils/data/folderData.json';
import List from "../components/itemList";

const FileExplorer = () => {
    const [data, setData] = useState(jsonData);

    const addFolderClick = (id, name) => {
        const updateTree = (list) => {
            return list.map(d => {
                if (d.id == id) {
                    return {
                        ...d,
                        children: [
                            ...d.children,
                            {id: Date.now().toString(), name, isFolder: true, children: []}
                        ]
                    }
                } else if (d.children) {
                    return {
                        ...d,
                        children: updateTree(d.children)
                    }
                } else {
                    return d;
                }
            })
        }

        setData((prev) => updateTree(prev));
    }

    const deleteClick = (id) => {
        const updateTree = (list) => {
            return list.filter(d => d.id != id).map((d) => {
                if (d.children) {
                    return {...d, children: updateTree(d.children)}
                } else {
                    return d;
                }
            })
        }

        setData((prev) => updateTree(prev));
    }

    return <View style={styles.container}>
        <List list={data} addFolderClick={addFolderClick} deleteClick={deleteClick} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
})

export default FileExplorer;