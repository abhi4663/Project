import React, { useState, useEffect, useContext } from 'react';
import { NoteContext } from "../reducer/useContext";



function NoteEditor({ title, body, handleSubmit, handleDelete }: any) {
    const [newTitle, setTitle] = useState(title);
    const [newBody, setBody] = useState(body);
    const { state } = useContext(NoteContext);

    // setImmediate(() => {
    //     setTitle(title);
    //     setBody(body);
    // })

    useEffect(() => {
        setTitle(title);
        setBody(body);
        // console.log("note editor use effect", { newTitle, newBody, title, body });
    }, [title, body]);

    // console.log("note editor direct", { newTitle, newBody, title, body });



    return (
        <div>
            <form className="edit">
                <h4>Title:</h4>
                <input type="text" className="form-control" id="formGroupExampleInput2"
                    placeholder="Enter title of Note"
                    value={newTitle}
                    onChange={(event: any) => {
                        setTitle(event.target.value);
                    }}
                    required />
                <br />
                <h4>Body:</h4>
                <textarea className="form-control" id="exampleFormControlTextarea1"
                    rows={5} placeholder="Description of the Note"
                    value={newBody}
                    onChange={(event: any) => {
                        setBody(event.target.value);
                    }} required></textarea>
                <button type="submit" className="btn btn-success bttn"
                    onClick={() => { handleSubmit(newTitle, newBody); }}> Save</button>
                <button type="submit" className="btn btn-danger bttn1"
                    onClick={() => { handleDelete(); }}>Delete</button>
                {state.onSave ? null : <div><h1 style={{ color: "red", fontSize: "20px" }}>Enter all fields</h1></div>}
            </form>
        </div>
    )
}

export default NoteEditor
