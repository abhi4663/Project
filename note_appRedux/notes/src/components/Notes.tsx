import { NoteContext } from "../reducer/useContext";
import { useContext, useEffect, useState } from "react";
// import { ServiceManager } from "../services/service-layer";
import './style.css';
import AddNote from "./AddNote";
import NoteEditor from "./NoteEditor";
// import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp';
// import { IconButton } from '@material-ui/core';
// const service = new ServiceManager();


function Notes(props: any) {
    const [title, setTitle] = useState("");
    const [noteId, setNoteId] = useState({});
    const [body, setBody] = useState("");
    const { state, dispatch, service, allnotes } = useContext(NoteContext);
    const [display, setDisplayUpdate] = useState(false);


    useEffect(() => {
        allnotes();
        // service.getAllNotes(dispatch);
        dispatch({ type: "LOGIN_TOGGLE" })
    }, [])

    useEffect(() => {
        setTitle(state.selectedNote.title);
        setBody(state.selectedNote.body);
    }, [state.selectedNote]);

    function update(id: any) {
        setDisplayUpdate(true);
        setNoteId(id);
        service.getNoteById(dispatch, id);


    }

    function handleSubmit(title: string, body: string) {
        const note = {
            title: title,
            body: body,
        };
        service.editNote(dispatch, note, noteId);
        setDisplayUpdate(false);
    }
    // console.log(state);
    console.log(state.selectedNote);


    function handleDelete() {
        service.deleteNote(dispatch, noteId);
        setDisplayUpdate(false);
    }


    const note = state.notes.map((note: any, index: any) => {
        return (
            <>
                <div className="notes" >
                    <h1 onClick={() => { update(note._id); }}>{note.title}</h1>
                </div>
                <br />
            </>
        )
    })

    let searchNote: any;

    if (state.searchedNotes.length !== 0) {
        searchNote = state.searchedNotes.map((note: any, index: any) => {
            return (
                <>
                    <div className="notes"
                        onClick={() => {
                            update(note.id);
                        }}>
                        <h1>{note.title}</h1>
                    </div>
                    <br />
                </>
            )
        })
    }
    return (
        <div className="container">
            <div className="get">
                {
                    state.searchedNotes.length === 0 ?
                        <div className="adds">{note}</div> :
                        <div className="search">{searchNote}</div>
                }
            </div>
            <div className="add">
                {!display ? <AddNote /> : <NoteEditor title={title} body={body} handleSubmit={handleSubmit} handleDelete={handleDelete} />}
            </div>
        </div>
    )
}

export default Notes;



