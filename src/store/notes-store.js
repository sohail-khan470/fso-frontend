import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import noteService from "../api/note-service";

export const useNotesStore = create(
  immer((set) => ({
    notes: [],
    error: null,
    loading: false,
    fetchNotes: async () => {
      try {
        set((state) => {
          state.loading = true;
        });
        const notes = await noteService.getAll();
        set((state) => {
          state.notes = notes;
        });
        set((state) => {
          state.loading = false;
        });
      } catch (error) {
        set((state) => {
          state.error = error.message;
        });
      }
    },
    addNote: async (data) => {
      try {
        const todo = await noteService.create(data);
        set((state) => {
          state.notes.push(todo);
        });
      } catch (error) {
        set((state) => {
          state.error = error.message;
        });
      }
    },
    updateNote: async (id, data) => {
      try {
        const updatedNote = await noteService.update(id, data);

        set((state) => {
          const index = state.notes.findIndex((n) => n._id === id);
          if (index !== -1) {
            state.notes[index] = updatedNote;
          }
        });
      } catch (error) {
        set((state) => {
          state.error = error.message;
        });
      }
    },
  }))
);
