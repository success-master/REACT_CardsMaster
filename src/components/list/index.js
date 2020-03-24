import React, { useState, useContext, useEffect, useRef } from 'react';
import './index.scss';
import SortableList from 'react-sortable-dnd-list';
import { ContextApp } from '../../App';
import ReactResizeDetector from 'react-resize-detector';
import { DropdownButton, Dropdown, ButtonGroup, Button } from "react-bootstrap";
import { TextArea } from 'semantic-ui-react';
import { useDispatch, connect } from 'react-redux';
import * as Actions from '../../service/action';

const List = (props) => {

	const { list_edit_item, list_modal_show, list_save_item, list_edit_item_modal } = props;

	const handleDelete = () => {
		console.log('handledelete function');
	}

	const dispatch = useDispatch();

	useEffect(() => {
		if (props.edit === true) {
			titleInput.current.value = props.title;
			if (props.items) setListItems(props.items);
		}
		dispatch(Actions.setListEditItem(props.items));
		console.log('list items:', list_edit_item);

	}, [props.edit, props.title]);

	const listItemInput = useRef(null);
	const titleInput = useRef(null);
	const [listItems, setListItems] = useState([]);
	const { saveList, saveSize } = useContext(ContextApp);
	const container = useRef();

	const handleShow = (item, index) => {
		dispatch(Actions.setListModalShow(true));
		dispatch(Actions.setListEditItemIndex(item, index));
	}

	const onResize = (w, h) => {

		saveSize(props.p, props.s, props.num, container.current.clientHeight, null);

	};

	const addListLine = (e, listItemInput) => {
		e.preventDefault();
		// if (listItemInput.current.value.length > 0) {
		// 	setListItems([...listItems, { title: listItemInput.current.value }]);

		// 	listItemInput.current.value = "";
		// }
		if (listItemInput.current.ref.current.value.length > 0) {
			setListItems([...listItems, { title: listItemInput.current.ref.current.value }]);

			listItemInput.current.ref.current.value = "";
		}
	}

	return (
		<div className="List grid-stack-item-content">

			<header className="ListHeader">
				<h6>{props.edit ? (props.title.length > 0 ? 'Edit list' : 'Add List') : props.title}</h6>
			</header>
			<div ref={container} >
				{!props.edit ? (<div className="ListContent">
					<ul>
						{list_edit_item.map((item, index) => {
							console.log('list items:', list_edit_item);
							return <li key={index}>{list_edit_item_modal.index == index ? list_edit_item_modal.content : item.title}
							{console.log('list item edit modal:', index, list_edit_item_modal.index)}
								<ButtonGroup style={{ position: "absolute", right: "0px" }} aria-label="Basic example">
									<Button variant="link" style={{ padding: "0" }} onClick={() => handleShow(item.title, index)}>E</Button>
									<Button variant="link" style={{ color: "red" }} onClick={handleDelete}>X</Button>
								</ButtonGroup>
							</li>
						})}
					</ul>
					<DropdownButton className="List-dropdown" id="dropdown-variants-secondary" drop="right" variant="secondary" size="sm" title="Actions">
						<Dropdown.Item onClick={props.copyCard}>copy</Dropdown.Item>
						<Dropdown.Item onClick={() => props.editCard(props.p, props.s, props.num)}>addlist</Dropdown.Item>
						<Dropdown.Item onClick={() => props.deleteCard(props.p, props.s, props.num)}>delete</Dropdown.Item>
					</DropdownButton>
				</div>
				) : (
						<div className="ListForm">
							<div className="Form">

								<form className="container" onSubmit={(e) => { saveList(e, listItems, props.p, props.s, props.num); }}>
									<label>Title</label>
									<input type="text" name="title" ref={titleInput} />
									<div className="enterLineHolder">
										<TextArea className="col-12 col-md-12 col-sm-12 col-xs-12" style={{ padding: "0" }} name="item" ref={listItemInput} />
										<button className="col-12 col-md-12 col-sm-12 col-xs-12" onClick={(e) => addListLine(e, listItemInput)}>Add</button>
									</div>
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

// export default List;

const mapStateToProps = state => {
	return {
		list_edit_item: state.list_edit_item,
		list_modal_show: state.list_modal_show,
		list_edit_item_modal: state.list_edit_item_modal,
		list_save_item: state.list_save_item,
	};
};

export default connect(mapStateToProps, null)(List);