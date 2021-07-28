import express from 'express';
import { isAuthenticatedUser } from '../auth/auth';
import {
  getNotes,
  addNewNote,
  deleteNote,
  updateNote,
  getNoteById,
  search,
} from '../controllers/noteController';

const noteRouter = express.Router();

noteRouter.get('/', isAuthenticatedUser, getNotes);
noteRouter
  .get('/:id', getNoteById)
  .delete('/:id', deleteNote)
  .put('/:id', updateNote);
noteRouter.post('/', isAuthenticatedUser, addNewNote);
// noteRouter.delete("/:id", deleteNote);
// noteRouter.put("/:id", updateNote);
// noteRouter.get('/search/:text', isAuthenticatedUser, searchNote);
noteRouter.get('/searching/for/:text', isAuthenticatedUser, search);

export { noteRouter as default };
