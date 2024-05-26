import * as React from "react";
import Box from "@mui/material/Box";
import {SimpleTreeView} from "@mui/x-tree-view/SimpleTreeView";
import {TreeItem} from "@mui/x-tree-view/TreeItem";
import {Button} from "@mui/material";

export interface ITreeData {
    [key: string]: string[]
}

export function isCategory(id: string) {
    return !id.includes('-');
}

function buildCode(department: string, product: string) {
    return department + '-' + product;
}

export default function ControlledSelection({tree, setSelection, selectedFilters}: { tree: ITreeData, setSelection: Function, selectedFilters: string[] }) {
    const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set(selectedFilters));
console.log('selectedFilters', JSON.stringify(selectedFilters))
    const handleSelectedItemsChange = (event: React.SyntheticEvent, ids: string[]) => {
        const newSelectedItems = new Set<string>(ids);
        ids.forEach(id => {
            if (isCategory(id)) { // If it's a category
                const children = tree[id];
                children.forEach(child => {
                    newSelectedItems.add(`${id}-${child}`);
                });
            }
        });

        // To handle unselecting parent and its children
        selectedItems.forEach(id => {
            if (!ids.includes(id)) {
                if (isCategory(id)) { // If it's a category being unselected
                    const children = tree[id];
                    children.forEach(child => {
                        newSelectedItems.delete(`${id}-${child}`);
                    });
                } else { // If a child is being unselected
                    const parent = id.split('-')[0];
                    newSelectedItems.delete(id);
                    newSelectedItems.delete(parent); // Unselect the parent
                }
            }
        });

        // To ensure unselected parent when not all children are selected
        Object.keys(tree).forEach(parent => {
            const allChildrenSelected = tree[parent].every(child => newSelectedItems.has(`${parent}-${child}`));
            if (allChildrenSelected) {
                newSelectedItems.add(parent);
            } else {
                newSelectedItems.delete(parent);
            }
        });
        setSelectedItems(newSelectedItems);
    };

    return (
        <Box sx={{flexGrow: 1, maxWidth: 400}}>
            <Box sx={{minHeight: 200, flexGrow: 1}}>
                <SimpleTreeView
                    selectedItems={Array.from(selectedItems)}
                    onSelectedItemsChange={handleSelectedItemsChange}
                    multiSelect
                    checkboxSelection={true}

                >
                    {Object.entries(tree).map(([department, products]) =>
                        <TreeItem itemId={department} label={department} key={department}>
                            {(products).map(p =>
                                <TreeItem itemId={buildCode(department, p)} label={p} key={buildCode(department, p)}/>
                            )}
                        </TreeItem>
                    )}
                </SimpleTreeView>
                <Button variant='contained' color={"secondary"} sx={{maxWidth: '200px'}} onClick={() => setSelection(Array.from(selectedItems))}>Aplicar Filtros</Button>
            </Box>
        </Box>
    );
}