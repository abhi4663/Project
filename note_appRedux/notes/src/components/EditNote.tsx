import React from 'react'
import { useState, useContext, useEffect, } from "react";
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { ServiceManager } from "../services/service-layer";
import { NoteContext } from "../reducer/useContext";
import NoteEditor from './NoteEditor';

function EditNote() {

    const { state, dispatch } = useContext(NoteContext);
    const [noteId, setNoteId] = useState({});
    const [display, setDisplayUpadte] = useState(false);


    // console.log(state);
    // console.log(state.selectedNote.title);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const history = useHistory();
    const service = new ServiceManager();

    // useEffect(() => {
    //     service.getNoteById(dispatch, id);
    // }, []);

    useEffect(() => {
        setTitle(state.selectedNote.title);
        setBody(state.selectedNote.body);
    }, [state.selectedNote]);


    function handleSubmit(title: string, body: string) {
        const note = {
            title: title,
            body: body,
        };
        service.editNote(dispatch, note, noteId);
        setDisplayUpadte(false);
    }
    // console.log(state);
    console.log(state.selectedNote);


    function handleDelete() {
        service.deleteNote(dispatch, noteId);
        setDisplayUpadte(false);

    }
    return (
        <div>
            <br />

            <NoteEditor title={title} body={body} handleSubmit={handleSubmit} handleDelete={handleDelete} />
        </div>
    )
}

export default EditNote
