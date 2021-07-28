"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
var express_1 = __importDefault(require("express"));
var auth_1 = require("../auth/auth");
var noteController_1 = require("../controllers/noteController");
var noteRouter = express_1.default.Router();
exports.default = noteRouter;
noteRouter.get('/', auth_1.isAuthenticatedUser, noteController_1.getNotes);
noteRouter
    .get('/:id', noteController_1.getNoteById)
    .delete('/:id', noteController_1.deleteNote)
    .put('/:id', noteController_1.updateNote);
noteRouter.post('/', auth_1.isAuthenticatedUser, noteController_1.addNewNote);
// noteRouter.delete("/:id", deleteNote);
// noteRouter.put("/:id", updateNote);
// noteRouter.get('/search/:text', isAuthenticatedUser, searchNote);
noteRouter.get('/searching/for/:text', auth_1.isAuthenticatedUser, noteController_1.search);
