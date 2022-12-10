import axios from "axios";
import {
	NOTE_CREATE_FAIL,
	NOTE_CREATE_REQUEST,
	NOTE_CREATE_SUCCESS,
	NOTE_DELETE_FAIL,
	NOTE_DELETE_REQUEST,
	NOTE_DELETE_SUCCESS,
	NOTE_LIST_FAIL,
	NOTE_LIST_REQUEST,
	NOTE_LIST_SUCCESS,
	NOTE_UPDATE_FAIL,
	NOTE_UPDATE_REQUEST,
	NOTE_UPDATE_SUCCESS
} from "../constants/noteConstants";

export const listNotes = () => async (dispatch, getState) => {
	try {
		dispatch({ type: NOTE_LIST_REQUEST });

		const { userLogin: { userInfo } } = getState();

		const { data } = await axios.get(
			"/api/notes",
			{
				headers: {
					Authorization: `Bearer ${userInfo.token}`
				}
			}
		);

		dispatch({ type: NOTE_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NOTE_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const createNoteAction = (title, content, category) => async (dispatch, getState) => {
	try {
		dispatch({ type: NOTE_CREATE_REQUEST });

		const { userLogin: { userInfo } } = getState();

		const { data } = await axios.post(
			"/api/notes/create",
			{ title, content, category },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`
				}
			}
		);

		dispatch({ type: NOTE_CREATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NOTE_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const updateNoteAction = (id, title, content, category) => async (dispatch, getState) => {
	try {
		dispatch({ type: NOTE_UPDATE_REQUEST });

		const { userLogin: { userInfo } } = getState();

		const { data } = await axios.put(
			`/api/notes/${id}`,
			{ title, content, category },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`
				}
			}
		);

		dispatch({ type: NOTE_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NOTE_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const deleteNoteAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: NOTE_DELETE_REQUEST });

		const { userLogin: { userInfo } } = getState();

		const { data } = await axios.delete(
			`/api/notes/${id}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`
				}
			}
		);

		dispatch({ type: NOTE_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NOTE_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};