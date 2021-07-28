import * as Constants from './constants';

const initalstate = {
  notes: [],
  selectedNote: {},
  searchedNotes: [],
  isLoggedIn: false,
  onSave: true,
};

const noteReducer = (state: any = initalstate, action: any) => {
  switch (action.type) {
    case Constants.NOTES_LIST:
      return {
        ...state,
        notes: action.noteList,
      };
    case Constants.NOTE_DETAILS:
      return {
        ...state,
        selectedNote: action.selectedNote,
      };
    case Constants.ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.addNote],
      };
    case Constants.NOTE_SEARCH:
      return {
        ...state,
        searchedNotes: action.noteList,
      };
    default:
      return state;
  }
};

export default noteReducer;
