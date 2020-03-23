// require ('./lib/gridstack/gridstack.all')
import React, { useState } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Post from './components/post';

import './styles/styles_grid.css';
import './styles/styles.css';
import './styles/quill.snow.css';
import './lib/gridstack/gridstack.min.css'

//import 'react-quill/dist/quill.snow.css';

export const ContextApp = React.createContext();

function App() {
	const [postsList, setPosts] = useState([]);
	const [copiedCard, copyCard] = useState({});

	const [postsFormVisible, setPostsFormVisible] = useState(false);

	const [sectionsFormVisible, setSectionsFormVisible] = useState(false);
	const [editedPost, setEditedPost] = useState(0);


	const [file, setFile] = useState();
	// const [preview, setPreview] = useState();


	const saveSection = (e) => {
		let elem = {};
		const formData = new FormData(e.target);
		e.preventDefault();
		for (let entry of formData.entries()) {
			elem[entry[0]] = entry[1];
		}

		elem.items = [];
		elem.image_file = file;

		let posts_cloned = postsList.slice();
		posts_cloned[editedPost].items.push(elem);

		setPosts([...posts_cloned]);

		setSectionsFormVisible(false);
	};

	const _handleImageChange = (e) => {
		e.preventDefault();


		let file = e.target.files[0];

		setFile(file);
	}

	const savePost = (e) => {
		// let reader = new FileReader();
		let elem = {};
		const formData = new FormData(e.target);
		e.preventDefault();
		for (let entry of formData.entries()) {
			elem[entry[0]] = entry[1];
		}

		elem.image_file = file;



		elem.items = [];
		setPosts([...postsList, elem]);
		setPostsFormVisible(false);
	};

	const saveNote = (e, richText, p, s, i) => {
		let elem = {};
		const formData = new FormData(e.target);
		e.preventDefault();
		for (let entry of formData.entries()) {
			elem[entry[0]] = entry[1];
		}

		elem.desc = richText;
		elem.type = 'note';

		elem.edit = false;

		let posts_cloned = postsList;
		elem.w = posts_cloned[p].items[s].items[i].w;
		elem.h = posts_cloned[p].items[s].items[i].h;

		posts_cloned[p].items[s].items[i] = elem;

		setPosts([...posts_cloned]);
	};

	const saveSize = (p, s, i, h, w) => {
		let posts_cloned = postsList;
		let tmp_item = posts_cloned[p].items[s].items[i];

		if (tmp_item.h !== h || tmp_item.w !== w) {
			posts_cloned[p].items[s].items[i].h = h;
			if (w !== null) posts_cloned[p].items[s].items[i].w = w;
			setPosts([...posts_cloned]);
		}
	};

	const savePos = (p, s, i, x, y, layout, old) => {

		/*

		let posts_cloned = postsList;
		let tmp_item = posts_cloned[p].items[s].items[i];

		if (tmp_item.x !==x || tmp_item.y !== y) {
			posts_cloned[p].items[s].items[i].x = x;
			posts_cloned[p].items[s].items[i].y = y;
			setPosts([ ...posts_cloned ]);

		}
		*/
	};

	const pasteCard = (p, s) => {
		let posts_cloned = postsList;
		if (copiedCard) {
			const clone = JSON.parse(JSON.stringify(copiedCard));
			posts_cloned[p].items[s].items.push(clone);

			setPosts([...posts_cloned]);
		}
	};

	const deleteCard = (p, s, i) => {
		let posts_cloned = postsList;
		posts_cloned[p].items[s].items.splice(i, 1);

		setPosts([...posts_cloned]);
	};

	const editCard = (p, s, i) => {
		let posts_cloned = postsList;
		posts_cloned[p].items[s].items[i].edit = true;

		setPosts([...posts_cloned]);
	};


	const addNote = (s, p) => {

		let elem = {};
		elem.type = 'note';
		elem.edit = true;
		elem.w = 150;
		elem.h = 100;
		elem.title = '';
		let posts_cloned = postsList;
		posts_cloned[p].items[s].items.push(elem);

		setPosts([...posts_cloned]);
	};

	const addList = (s, p) => {

		let elem = {};

		elem.type = 'list';
		elem.edit = true;
		elem.title = '';
		elem.items = [];
		elem.w = 150;
		elem.h = 100;

		let posts_cloned = postsList;
		posts_cloned[p].items[s].items.push(elem);

		setPosts([...posts_cloned]);
	};

	const saveList = (e, listItems, p, s, i) => {

		let elem = {};
		const formData = new FormData(e.target);
		e.preventDefault();
		for (let entry of formData.entries()) {
			elem[entry[0]] = entry[1];
		}
		elem.type = 'list';
		elem.edit = false;
		elem.items = listItems;
		let posts_cloned = postsList;
		elem.w = posts_cloned[p].items[s].items[i].w;
		elem.h = posts_cloned[p].items[s].items[i].h;

		posts_cloned[p].items[s].items[i] = elem;

		setPosts([...posts_cloned]);
	};

	const addQA = (s, p) => {

		let elem = {};
		elem.type = 'qa';
		elem.edit = true;
		elem.w = 150;
		elem.h = 100;
		elem.title = '';
		let posts_cloned = postsList;
		posts_cloned[p].items[s].items.push(elem);

		setPosts([...posts_cloned]);
	};

	const addSection = (n) => {
		setEditedPost(n);
		setSectionsFormVisible(true);
	};

	const saveQA = (e, currentQAItems, p, s, i) => {		
		let elem = {};
		const formData = new FormData(e.target);
		e.preventDefault();
		for (let entry of formData.entries()) {
			elem[entry[0]] = entry[1];
		}

		elem.type = 'qa';
		elem.items = currentQAItems;

		elem.edit = false;

		let posts_cloned = postsList;
		elem.w = posts_cloned[p].items[s].items[i].w;
		elem.h = posts_cloned[p].items[s].items[i].h;

		posts_cloned[p].items[s].items[i] = elem;

		console.log('save list:', posts_cloned[p].items[s].items[i]);
		setPosts([...posts_cloned]);
	};

	return (
		<ContextApp.Provider value={{ saveList, saveNote, saveQA, saveSize, savePos }}>
			<div className="App container">
				<button
					onClick={() => setPostsFormVisible(true)}
					className="post_btn"
					id="post_btn">POST</button>
				<div className="SectionsList">
					{postsList.map((post, index) => {
						return (
							<Post
								pasteCard={pasteCard}
								key={index}
								num={index}
								tags={post.tags}
								copyCard={copyCard}
								deleteCard={deleteCard}
								editCard={editCard}
								addSection={addSection}
								addNote={addNote}
								addList={addList}
								addQA={addQA}
								title={post.title}
								desc={post.desc}
								items={post.items}
								image_file={post.image_file}
							/>
						);
					})}
				</div>
				{/* Add post */}
				{postsFormVisible && (
					<div className="SectionForm">
						<div className="Form">
							<h3>Add Post</h3>
							<form onSubmit={savePost}>
								<label>Title</label>
								<input type="text" name="title" />
								<label>Desc</label>
								<input type="text" name="desc" />
								<label>Thumbnail image</label>
								<input className="fileInput" name="image_file" type="file" onChange={(e) => _handleImageChange(e)} />
								<label>Tags</label>
								<input type="text" name="tags" />
								<button type="submit">Save Post</button>
							</form>
						</div>
					</div>
				)}

				{/* Post section */}
				{sectionsFormVisible && (
					<div className="SectionForm">
						<div className="Form">
							<h3>Add Section</h3>
							<form onSubmit={saveSection}>
								<label>Title</label>
								<input type="text" name="title" />
								<label>Desc</label>
								<input type="text" name="desc" />
								<label>Thumbnail image</label>
								<input className="fileInput" name="image_file" type="file" onChange={(e) => _handleImageChange(e)} />
								<label>Tags</label>
								<input type="text" name="tags" />
								<button type="submit">Post Section</button>
							</form>
						</div>
					</div>
				)}
			</div>
		</ContextApp.Provider>
	);
}

export default App;
