import React, { useState, useContext, useEffect, useRef } from 'react';
import './index.scss';
import { ReactTinyLink } from 'react-tiny-link';
import ReactPlayer from 'react-player';
import { ContextApp } from '../../App';
import ReactQuill from 'react-quill';
import ReactResizeDetector from 'react-resize-detector';

const Note = (props) => {
	const { saveNote, saveSize } = useContext(ContextApp);
	const container = useRef();
	const titleInput = useRef();
	const urlInput = useRef();
	const tagsInput = useRef();


	const [richText, setRichText] = useState('');

	useEffect(() => {
		if (props.edit === true) {
			titleInput.current.value = props.title;
			if (props.url) urlInput.current.value = props.url;
			if (props.tags) tagsInput.current.value = props.tags;

			if (props.desc) setRichText(props.desc)

		}

	}, [props.edit, props.title]);

	const onResize = (w, h) => {
		saveSize(props.p, props.s, props.num, container.current.clientHeight, null);
	};

	return (
		<div className="Note grid-stack-item-content">
			<header className="NoteHeader">
				<h4>{props.edit ? (props.title.length > 0 ? 'Edit Note' : 'Add Note') : props.title}</h4>
			</header>
			<div ref={container}>
				{!props.edit ? (
					<div className="NoteContent">
						{props.url &&
							props.url.indexOf('youtube.com') >= 0 && (
								<ReactPlayer
									className="preview_video"
									style={{ height: '100%' }}
									url={props.url}
									playing={false}
									height='500px'
								/>
							)}
						{props.url &&
							props.url.indexOf('youtube.com') === -1 && (
								<ReactTinyLink className="preview" cardSize="large" showGraphic={true} url={props.url} />
							)}
						{props.tags && (
							<div className="tags">
								{props.tags.split(',').map((item, index) => {
									return <span key={index + '__li'}>{item}</span>;
								})}
							</div>
						)}
						{props.desc && <div className="NoteText" dangerouslySetInnerHTML={{ __html: props.desc }} />}
						<button onClick={props.copyCard}>copy</button>
						<button onClick={() => props.editCard(props.p, props.s, props.num)}>edit</button>
						<button onClick={() => props.deleteCard(props.p, props.s, props.num)}>delete</button>

					</div>
				) : (
						<div className="NoteForm">
							<div className="Form">
								<form onSubmit={(e) => saveNote(e, richText, props.p, props.s, props.num)}>
									<label>Title</label>
									<input type="text" name="title" ref={titleInput} />
									<label>URL</label>
									<input type="text" name="url" ref={urlInput} />
									<label>Tags</label>
									<input type="text" name="tags" ref={tagsInput} />
									<label>Desc</label>
									<div>
										<ReactQuill value={richText} onChange={(value) => setRichText(value)} />
									</div>
									<button type="submit">Create Note</button>
								</form>
							</div>
						</div>
					)}
				<ReactResizeDetector handleWidth handleHeight onResize={onResize} />
			</div>
		</div>
	);
};

export default Note;
