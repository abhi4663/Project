import React from 'react'
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// import { ServiceManager } from "../services/service-layer";
import { NoteContext } from "../reducer/useContext";
import NoteEditor from './NoteEditor';
import { useDispatch, useSelector } from 'react-redux';
import NoteServices from '../services/service';

function AddNote() {
    // const { dispatch, service } = useContext(NoteContext);
    const noteServices = new NoteServices();
    const dispatch = useDispatch();

    // const note = useSelector((states: any) => states.note)

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    // const service = new ServiceManager();

    async function handleSubmit(title: string, body: string) {
        if (title === "" || body === "") {
            dispatch({ type: "ERROR" });
        } else {
            const notes = {
                title: title,
                body: body,
            };
            let token = "Bearer " + localStorage.getItem("login");
            if (localStorage.getItem('login')) {
                // addNotes(note, token);
                noteServices.addNotes(notes, token);
                console.log("hadleSubmit clearing title and body", title, body);
            }
            setTitle("");
            setBody("");
        }

    }
    function handleDelete() {
        setTitle("");
        setBody("");
    }
    console.log("addnote direct", { title, body });

    return (
        <div>
            <br />
            <NoteEditor title={title} body={body} handleSubmit={handleSubmit} handleDelete={handleDelete} />
        </div>
    )
}

export default AddNote
