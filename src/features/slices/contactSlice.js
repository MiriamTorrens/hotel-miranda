import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ContactList } from '../../JSON/ContactList';

const initialState= [];

export const getContact = createAsyncThunk('contact/getContact', async () => {
    return new Promise(resolve => setTimeout(resolve(ContactList), 0));
});

export const contactSlice = createSlice({
    name: 'contact',
      initialState,
      reducers: {
        createContact: (state, action) => {
            const f = new Date();
            const newContact = {
              id: action.payload.id,
              date:
                f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate(),
              customer: {
                fullName: action.payload.customer.fullName,
                email: action.payload.customer.email,
                phoneNumber: action.payload.customer.phoneNumber,
              },
              subject: action.payload.subject,
              comment: action.payload.comment,
              viewed: action.payload.status,
              archived: action.payload.archived,
            };
            state = state.unshift(newContact);
        },
        getThisContact: (state, action) => {
            const newState = [...state];
            return newState.find(contact => contact.id === action.payload);
        },
        updateContact: (state, action) => {
            return state.map(contact => contact.id === action.payload.id ? action.payload : contact);
        },
        deleteContact: (state, action) => {
            return state.filter(contact => contact.id !== action.payload.id);
        },
        filterContact: (state, action) => {
            return state.filter(contact => contact.archived === action.payload);
        }
      },
      extraReducers(builder) {
          builder.addCase(getContact.fulfilled, (state, action) => {
              return state = action.payload;
          })
      }
})

export const allContact = state => state.contact;
export const {createContact, getThisContact, updateContact, deleteContact, filterContact } = contactSlice.actions;
export default contactSlice.reducer;
