import React, { useState, useContext, useRef, useEffect } from 'react';
import './index.scss';
// import { Accordion, AccordionItem } from 'react-sanfona';
import { ContextApp } from '../../App';
import ReactQuill from 'react-quill';
import ReactResizeDetector from 'react-resize-detector';
import { DropdownButton, Dropdown } from "react-bootstrap";


const QA = (props) => {
	const [currentQAItems, setCurrentQAItems] = useState([]);
	const { saveQA, saveSize } = useContext(ContextApp);
	const container = useRef();
	const titleInput = useRef(null);

	useEffect(() => {
		if (props.edit === true) {
			titleInput.current.value = props.title;
			if (props.items) setCurrentQAItems(props.items);
		}

	}, [props.edit, props.title])


	const onResize = (w, h) => {

		saveSize(props.p, props.s, props.num, container.current.clientHeight, null);

	};

	const editCurrentQAItem = (n, item) => {
		let items = currentQAItems;
		items[n] = item;
		setCurrentQAItems(items);
	}

	const editAnswerTitle = (e) => {

	}

	const addCurrentQAItem = (e) => {
		e.preventDefault();
		setCurrentQAItems([...currentQAItems, ""]);
	}

	// const [opened, setOpened] = useState(0);
	return (
		<div className="QA grid-stack-item-content">
			<header className="QAHeader">
				<h4>{props.edit ? (props.title.length > 0 ? 'Edit QA' : 'Add QA') : props.title}</h4>
			</header>
			<div ref={container} >
				{!props.edit ? (<div className="QAContent">
					{/* <Accordion> */}
					{props.items.map((item, index) => {
						return (

							<div key={index + "_a"}>
								<div className="QAText" dangerouslySetInnerHTML={{ __html: item }} />
							</div>
						)
					})}
					{/* </Accordion> */}
					<DropdownButton className="Qa-dropdown" id="dropdown-variants-secondary" drop="right" variant="secondary" size="sm" title="Actions">
						<Dropdown.Item onClick={props.copyCard}>copy</Dropdown.Item>
						<Dropdown.Item onClick={() => props.editCard(props.p, props.s, props.num)}>add/ edit</Dropdown.Item>
						<Dropdown.Item onClick={() => props.deleteCard(props.p, props.s, props.num)}>delete</Dropdown.Item>
					</DropdownButton>
				</div>

				) : (

						<div className="QAForm">
							<div className="Form">
								<form onSubmit={(e) => saveQA(e, currentQAItems, props.p, props.s, props.num)}>
									<label>Question</label>
									<input type="text" name="title" ref={titleInput} />

									<label>Answer</label>

									<div>
										{currentQAItems.map((item, index) =>
											<div>
												<label>Title</label>
												<input key={index + "_a"} onChange={editAnswerTitle} className="w-100" type="text" name="answer_title" placeholder="Answer Title"></input>
												<ReactQuill key={index + "_a"} value={item} onChange={(value) => editCurrentQAItem(index, value)} />
											</div>
										)}

									</div>
									<button onClick={addCurrentQAItem}>+add answer</button>
									<button type="submit">Save</button>
								</form>
							</div>
						</div>)}
				<ReactResizeDetector handleWidth handleHeight onResize={onResize} />
			</div>
		</div>
	);
};

export default QA;
