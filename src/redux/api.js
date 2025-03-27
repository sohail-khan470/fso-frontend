// src/features/notes/notesApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4100/" }),
  tagTypes: ["Note"], // Define tag types for caching
  endpoints: (builder) => ({
    // Query to get all notes
    getNotes: builder.query({
      query: () => "/notes",
      providesTags: ["Note"], // This data provides 'Note' tag
    }),

    // Query to get a single note by ID
    getNoteById: builder.query({
      query: (id) => `/notes/${id}`,
      providesTags: (result, error, id) => [{ type: "Note", id }],
    }),

    // Mutation to add a new note
    addNote: builder.mutation({
      query: (newNote) => ({
        url: "/notes",
        method: "POST",
        body: newNote,
      }),
      invalidatesTags: ["Note"], // Invalidate all notes cache
    }),

    // Mutation to update a note
    updateNote: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/notes/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Note", id }],
    }),

    // Mutation to delete a note
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Note"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
