import React, { useState, useContext, useEffect, useRef } from 'react';
import './index.scss';
import SortableList from 'react-sortable-dnd-list';
import { ContextApp } from '../../App';
import ReactResizeDetector from 'react-resize-detector'

const List = (props) => {

	useEffect(() => {
		if (props.edit === true) {
			titleInput.current.value = props.title;
			if (props.items) setListItems(props.items);
		}

	}, [props.edit, props.title]);

	const listItemInput = useRef(null);
	const titleInput = useRef(null);
	const [listItems, setListItems] = useState([]);
	const { saveList, saveSize } = useContext(ContextApp);
	const container = useRef();



	const onResize = (w, h) => {

		saveSize(props.p, props.s, props.num, container.current.clientHeight, null);

	};




	const addListLine = (e, listItemInput) => {
		e.preventDefault();
		if (listItemInput.current.value.length > 0) {
			setListItems([...listItems, { title: listItemInput.current.value }]);

			listItemInput.current.value = "";
		}


	}

	return (
		<div className="List grid-stack-item-content">

			<header className="ListHeader">
				<h4>{props.edit ? (props.title.length > 0 ? 'Edit list' : 'Add List') : props.title}</h4>
			</header>
			<div ref={container} >
				{!props.edit ? (<div className="ListContent">
					<ul>
						{props.items.map((item, index) => {
							return <li key={index}>{item.title}</li>
						})}
					</ul>
					<button onClick={props.copyCard}>copy</button>
					<button onClick={() => props.editCard(props.p, props.s, props.num)}>edit</button>
					<button onClick={() => props.deleteCard(props.p, props.s, props.num)}>delete</button>
				</div>
				) : (

						<div className="ListForm">
							<div className="Form">

								<form onSubmit={(e) => { saveList(e, listItems, props.p, props.s, props.num); }}>
									<label>Title</label>
									<input type="text" name="title" ref={titleInput} />
									<div className="enterLineHolder"><input type="text" name="item" ref={listItemInput} /><button onClick={(e) => addListLine(e, listItemInput)}>Add</button></div>
									<SortableList
										className="list"
										itemComponent={ItemComponent}
										value={listItems}
										onChange={setListItems} />

									<button type="submit">Save</button>
								</form>
							</div>
						</div>
					)}
				<ReactResizeDetector handleWidth handleHeight onResize={onResize} />
			</div>
		</div>
	)



}



function ItemComponent({
	dragging,
	dragged,
	children: { title, description },
	...rest
}) {
	return (
		<div {...rest} className={`list__item ${dragged ? 'is-dragging' : ''}`}>
			<div className="list__item-content">
				<div className="list__item-title">
					{title}
				</div>
			</div>
		</div>
	)
}

export default List;