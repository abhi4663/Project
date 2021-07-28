import Note from '../models/noteSchema';

export const getNotes = async (req: any, res: any) => {
  try {
    const Notes = await Note.find({ user: req.user.id });
    res.status(200).json(Notes);
  } catch (err: any) {
    res.status(404).json({ err: err.message, success: false });
  }
};

export const getNoteById = async (req: any, res: any) => {
  try {
    const Notes = await Note.findById(req.params.id);
    res.status(200).json(Notes);
  } catch (err: any) {
    res.status(404).json({ err: err.message, success: false });
  }
};

export const addNewNote = async (req: any, res: any) => {
  const Notes = new Note({
    title: req.body.title,
    body: req.body.body,
    user: req.user.id,
  });
  try {
    const a1 = await Notes.save();
    res
      .status(200)
      .json({ message: 'Note is Added Successfully...', success: true });
  } catch (err: any) {
    res.status(404).json({ err: err.message, success: false });
  }
};

export const deleteNote = async (req: any, res: any) => {
  try {
    const Notes: any | null = await Note.findById(req.params.id);
    const a1 = await Notes.remove();
    res
      .status(200)
      .json({ message: 'Note is Deleted Successfully...', success: true });
  } catch (err: any) {
    res.status(404).json({ err: err.message, success: false });
  }
};

export const updateNote = async (req: any, res: any) => {
  try {
    const note: any = await Note.findById(req.params.id);

    note.title = req.body.title;
    note.body = req.body.body;

    const a1 = await note.save();
    res
      .status(200)
      .json({ message: 'Note is Updated Successfully...', success: true });
  } catch (err: any) {
    res.status(304).json({ err: err.message, success: false });
  }
};

export const search = async (req: any, res: any) => {
  try {
    const note: any = await Note.find({
      $and: [
        {
          $or: [
            { title: { $regex: new RegExp(req.params.text), $options: 'i' } },
            { body: { $regex: new RegExp(req.params.text), $options: 'i' } },
          ],
        },
        { user: req.user.id },
      ],
    });
    if (note.length > 0) {
      res.status(200).json(note);
    } else {
      res.status(404).json('title not found');
    }
  } catch (err: any) {
    res.status(404).json({ err: err.message, success: false });
  }
};
// export const searchNoteBody = async (req: any, res: any) => {
//   try {
//     const note: any = await Note.find({
//       body: { $regex: new RegExp(req.params.body), $options: 'i' },
//     });
//     if (note.length > 0) {
//       res.status(200).json(note);
//     } else {
//       res.status(404).json('title not found');
//     }
//   } catch (err: any) {
//     res.status(404).json({ err: err.message, success: false });
//   }
// };

//export const searchNote = async (req: any, res: any) => {
//   try {
//     const note: any = await Note.find({
//       $or: [
//         { title: { $regex: new RegExp(req.params.text), $options: 'i' } },
//         { body: { $regex: new RegExp(req.params.text), $options: 'i' } },
//       ],
//     });
//     if (note.length > 0) {
//       res.status(200).json(note);
//     } else {
//       res.status(404).json('title not found');
//     }
//   } catch (err: any) {
//     res.status(404).json({ err: err.message, success: false });
//   }
// };
