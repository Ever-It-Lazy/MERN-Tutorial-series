import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen';
import ReactMarkdown from "react-markdown";
import { deleteNoteAction, updateNoteAction } from '../../actions/noteActions';
import axios from 'axios';

const SingleNote = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const [date, setDate] = useState("");

	const navigate = useNavigate();
	const { id } = useParams();
	const dispatch = useDispatch();

	const noteUpdate = useSelector((state) => state.noteUpdate);
	const { loading, error } = noteUpdate;

	const noteDelete = useSelector((state) => state.noteDelete);
	const { loading: loadingDelete, error: errorDelete } = noteDelete;

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(updateNoteAction(id, title, content, category));
		if (!title || !content || !category) return;

		navigate("/mynotes");
	};

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/api/notes/${id}`);

			setTitle(data.title);
			setContent(data.content);
			setCategory(data.category);
			setDate(data.updatedAt);
		};

		fetching();
	}, [id, date]);

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteNoteAction(id));
			navigate("/mynotes");
		}
	};

	return (
		<MainScreen title="Edit Note">
			<Card>
				<Card.Header>Edit your note</Card.Header>
				<Card.Body>
					<Form onSubmit={updateHandler}>
						{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
						{loadingDelete && <Loading/>}
						{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="title"
								value={title}
								placeholder="Enter the title"
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="content">
							<Form.Label>Content</Form.Label>
							<Form.Control
								as="textarea"
								value={content}
								placeholder="Enter the Content"
								rows={4}
								onChange={(e) => setContent(e.target.value)}
							/>
						</Form.Group>
						{content && (
							<Card>
								<Card.Header>Note Preview</Card.Header>
								<Card.Body>
									<ReactMarkdown>{content}</ReactMarkdown>
								</Card.Body>
							</Card>
						)}

						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control
								type="category"
								value={category}
								placeholder="Enter the Category"
								onChange={(e) => setCategory(e.target.value)}
							/>
						</Form.Group>
						{loading && <Loading size={50} />}
						<Button type="submit" variant="primary">
							Update Note
						</Button>
						<Button className="mx-2"
							onClick={() => deleteHandler(id)}
							variant="danger"
						>
							Delete Note
						</Button>
					</Form>
				</Card.Body>

				<Card.Footer className="text-muted">
					Updated on - {date.substring(0, 10)}
				</Card.Footer>
			</Card>
		</MainScreen>
	)
}

export default SingleNote;