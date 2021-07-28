import axios from "axios";

export class ServiceManager {
    getAllNotes = async () => {
        let token = "Bearer " + localStorage.getItem("login");
        let response = await axios
            .get("http://localhost:7000/api/notes", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
            })
        if (response.status === 200) {
            return ({ type: "NOTES_LIST", noteList: response.data });
        }
        // .then(response => {
        //     console.log(response.data);
        //     return ({ type: "NOTES_LIST", noteList: response.data });
        //     // return ({ type: "ADD_NOTE", addNote: Note }); 

        //     // return (response.data);
        // })
        // .catch(err => {
        //     console.log(err.message);
        // });
    };
    getNoteById = async (dispatch: any, id: any) => {

        await axios
            .get(`http://localhost:7000/api/notes/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: token
                },
            })
            .then(response => {
                dispatch({ type: "NOTE_DETAILS", selectedNote: response.data });
            })
            .catch(err => {
                console.log(err.message);
            });
    };
    addNotes = async (Note: any, token: any) => {
        let check = await axios.post(
            "http://localhost:7000/api/notes",
            Note,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
            }
        );
        if (check.status === 200) {
            return ({ type: "ADD_NOTE", addNote: Note }); //dispatchable object....... it is async function
        }
    };
    editNote = async (dispatch: any, Note: any, id: any) => {
        let check = await axios.put(
            `http://localhost:7000/api/notes/${id}`,
            Note,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        if (check.status === 200) {
            // dispatch({ type: "EDIT_NOTE", editNote: Note  });
            this.getAllNotes();

        };
    }
    deleteNote = async (dispatch: any, id: any) => {
        let check = await axios.delete(
            "http://localhost:7000/api/notes/" + id,

        );
        if (check.status === 200) {
            // dispatch({ type: "DELETE_NOTE", deleteNote: id });
            this.getAllNotes();
        }

    };
    searchTitle = async (dispatch: any, text: any) => {
        let token = "Bearer " + localStorage.getItem("login");
        let response = await axios
            .get(`http://localhost:7000/api/notes/searching/for/${text}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
            })
        if (response.status === 200) {
            return ({ type: "NOTE_SEARCH", noteList: response.data });
        }
        // .then(response => {
        //     dispatch({ type: "NOTE_SEARCH", noteList: response.data });
        // })
        // .catch(err => {
        //     console.log(err.message);
        // });
    };
    addUser = async (dispatch: any, user: any) => {
        let check = await axios.post(
            "http://localhost:7000/api/user/register", user,

        );
        if (check.status === 200) {
            // dispatch({ type: "REGISTER", addUser: user });
        }

    };

}

