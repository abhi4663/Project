import React, { useReducer } from "react";
import { Reducer } from "./useReducer";
import { ServiceManager } from "../services/service-layer";

const initialState = {
    notes: [],
    selectedNote: {},
    searchedNotes: [],
    isLoggedIn: false,
    onSave: true
}
const service = new ServiceManager();

export const NoteContext = React.createContext<any>({});

export const NoteProvider = (props: any) => {
    const [state, dispatch] = useReducer(Reducer, initialState, () => {
        return initialState;

    });
    console.log(state);

    // async function addNotes(note: any, token: any) {
    //     try {
    //         let action = await service.addNotes(note, token);
    //         console.log(action);
    //         dispatch(action);
    //         dispatch({ type: "ERROR", payload: null })
    //     } catch (err: any) {
    //         dispatch({ type: "ERROR", payload: err })
    //     }
    // }
    function dispatchable(serviceFunction: any) {
        return async (...params: any) => {
            try {
                let action = await serviceFunction(...params); //...params whichever we will give addNote 
                dispatch(action);
            } catch (err: any) {
                dispatch({ type: "ERROR", payload: err })
            }
        }
    }

    let addNotes = dispatchable(service.addNotes);
    let allnotes = dispatchable(service.getAllNotes);
    let searchnote = dispatchable(service.searchTitle);




    return (
        <NoteContext.Provider value={{ state, dispatch, service, addNotes, allnotes, searchnote }}>
            {props.children}
        </NoteContext.Provider>
    );
};
