import React, { useContext, useState } from 'react';
import './index.scss';
import GridLayout from 'react-grid-layout';
import { WidthProvider } from "react-grid-layout";
// import sizeMe from 'react-sizeme';

import Note from '../note/index'
import List from '../list/index'
import QA from '../qa/index';

import { ContextApp } from '../../App';
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import { DropdownButton, Dropdown } from "react-bootstrap";
import ListItemEditModal from '../modal/listItemEditModal';

const ReactGridLayout = WidthProvider(GridLayout);

const Section = (props) => {

  const { saveSize, savePos } = useContext(ContextApp);
  const layoutGenerator = () => {
    let layouts = [];
    props.items.map((item, index) => {
      layouts.push({ i: index.toString(), x: item.x || 0, y: item.y || 0, w: Math.ceil(item.w / 30), h: Math.ceil(item.h / 30) });
    });
    return layouts;
  }

  // const [modalOpen, setModalOpen] = useState(false);

  // const [list_item, setList_Item] = useState(null);

  // const handleShow = (list_item) => {
  //   setModalOpen(true);
  //   console.log(list_item);
  // }
  // const handleClose = () => {
  //   setModalOpen(false);
  // }


  return (
    <div className="Section">
      <header className="Header">
        {props.image_file && <div className="SectionImg">
          <img src={URL.createObjectURL(props.image_file)} />
        </div>}
        <div className="Text">
          <h5>{props.title}</h5>
          <h6>{props.desc}</h6>
          {props.tags && (
            <div className="tags">
              {props.tags.split(',').map((item, index) => {
                return <span key={index + '__li'}>{item}</span>;
              })}
            </div>
          )}
        </div>
        <div className="sectionMenu">
          <DropdownButton alignRight className="clickgrid" id="dropdown-variants-secondary" variant="secondary" size="sm" title="Create Cards">
            <Dropdown.Item onClick={() => props.addNote(props.num, props.postNum)}>+ note</Dropdown.Item>
            <Dropdown.Item onClick={() => props.addList(props.num, props.postNum)}>+ list</Dropdown.Item>
            <Dropdown.Item onClick={() => props.addQA(props.num, props.postNum)}>+ qa</Dropdown.Item>
          </DropdownButton>
        </div>

      </header>
      <div className="Content">

        <ReactGridLayout className="layout unset-width"
          layout={layoutGenerator()}
          onResize={(layout, old, newItem) => saveSize(props.postNum, props.num, Number(newItem.i), Number(newItem.h) * 30, Number(newItem.w) * 30)}
          onDragStop={(layout, old, newItem, event) => { savePos(props.postNum, props.num, Number(newItem.i), Number(newItem.x), Number(newItem.y), layout, event); }}
          autoSize={true} draggableCancel='.Form'
          cols={12}
          rowHeight={30} width={1200}
        >

          {props.items.map((item, index) => {

            if (item.type === "note") return (<div key={index} ><Note num={index} p={props.postNum} s={props.num} title={item.title} edit={item.edit} copyCard={() => props.copyCard(item)} deleteCard={props.deleteCard} editCard={props.editCard} url={item.url} desc={item.desc} tags={item.tags} /></div>)
            if (item.type === "list") return (<div key={index} ><List num={index} p={props.postNum} s={props.num} title={item.title} edit={item.edit} copyCard={() => props.copyCard(item)} deleteCard={props.deleteCard} editCard={props.editCard} items={item.items} /></div>)
            if (item.type === "qa") return (<div key={index} ><QA num={index} p={props.postNum} s={props.num} title={item.title} edit={item.edit} copyCard={() => props.copyCard(item)} deleteCard={props.deleteCard} editCard={props.editCard} items={item.items} /></div>)
          })
          }

        </ReactGridLayout>

        <button style={{ marginTop: "10px" }} onClick={() => props.pasteCard(props.postNum, props.num)}>paste</button>
      </div>
      <ListItemEditModal p={props.postNum} s={props.num} />
    </div>
  );
}

export default Section;
