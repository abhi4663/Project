import axios from 'axios';

class NoteServices {
  getAllNotes = async () => {
    let token = 'Bearer ' + localStorage.getItem('login');
    let response = await axios.get('http://localhost:7000/api/notes', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response;
  };

  getNoteById = async (id: any) => {
    let response = await axios.get(`http://localhost:7000/api/notes/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: token
      },
    });
    return response;
  };

  addNotes = async (Note: any, token: any) => {
    let response = await axios.post('http://localhost:7000/api/notes', Note, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response;
  };

  editNote = async (dispatch: any, Note: any, id: any) => {
    let check = await axios.put(`http://localhost:7000/api/notes/${id}`, Note, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (check.status === 200) {
      // dispatch({ type: "EDIT_NOTE", editNote: Note  });
      this.getAllNotes();
    }
  };
  deleteNote = async (dispatch: any, id: any) => {
    let check = await axios.delete('http://localhost:7000/api/notes/' + id);
    if (check.status === 200) {
      // dispatch({ type: "DELETE_NOTE", deleteNote: id });
      this.getAllNotes();
    }
  };
  searchTitle = async (dispatch: any, text: any) => {
    let token = 'Bearer ' + localStorage.getItem('login');
    let response = await axios.get(
      `http://localhost:7000/api/notes/searching/for/${text}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );
    return response;
  };
  addUser = async (dispatch: any, user: any) => {
    let response = await axios.post(
      'http://localhost:7000/api/user/register',
      user
    );
    return response;
  };
}

export default NoteServices;
