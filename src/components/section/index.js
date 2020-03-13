import React, { useRef, useState, useContext } from 'react';
import './index.scss';
import GridLayout from 'react-grid-layout';
import StackGrid from "react-stack-grid";
import Note from '../note/index'
import List from '../list/index'
import QA from '../qa';
import { ContextApp } from '../../App';
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'

const Section = (props) => {
  const { saveSize, savePos } = useContext(ContextApp);

  const layoutGenerator = () => {
    let layouts = [];
    props.items.map((item, index) => {

      layouts.push({ i: index.toString(), x: item.x || 0, y: item.y || 0, w: Math.ceil(item.w / 30), h: Math.ceil(item.h / 30) });
    });
    return layouts;
  }

  return (
    <div className="Section">

      <header className="Header">
        {props.image_file && <img src={URL.createObjectURL(props.image_file)} />}
        <div className="Text">
          <h2>{props.title}</h2>
          <h4>{props.desc}</h4>
          {props.tags && (
            <div className="tags">
              {props.tags.split(',').map((item, index) => {
                return <span key={index + '__li'}>{item}</span>;
              })}
            </div>
          )}
        </div>
        <div className="sectionMenu">
          <button className="clickgrid" id="note_btn" onClick={() => props.addNote(props.num, props.postNum)}>+ note</button>
          <button className="clickgrid" onClick={() => props.addList(props.num, props.postNum)}>+ list</button>
          <button className="clickgrid" onClick={() => props.addQA(props.num, props.postNum)}>+ qa</button>
        </div>

      </header>
      <div className="Content">

        <GridLayout className="layout unset-width"
          layout={layoutGenerator()}
          onResize={(layout, old, newItem) => saveSize(props.postNum, props.num, Number(newItem.i), Number(newItem.h) * 30, Number(newItem.w) * 30)}
          onDragStop={(layout, old, newItem) => { savePos(props.postNum, props.num, Number(newItem.i), Number(newItem.x), Number(newItem.y)); }}
          autoSize={true} draggableCancel='.Form' cols={12} colWidth={30} rowHeight={30} width={1200}>

          {props.items.map((item, index) => {

            if (item.type === "note") return (<div key={index}><Note num={index} p={props.postNum} s={props.num} title={item.title} edit={item.edit} copyCard={() => props.copyCard(item)} deleteCard={props.deleteCard} editCard={props.editCard} url={item.url} desc={item.desc} tags={item.tags} /></div>)
            if (item.type === "list") return (<div key={index} ><List num={index} p={props.postNum} s={props.num} title={item.title} edit={item.edit} copyCard={() => props.copyCard(item)} deleteCard={props.deleteCard} editCard={props.editCard} items={item.items} /></div>)
            if (item.type === "qa") return (<div key={index} ><QA num={index} p={props.postNum} s={props.num} title={item.title} edit={item.edit} copyCard={() => props.copyCard(item)} deleteCard={props.deleteCard} editCard={props.editCard} items={item.items} /></div>)
          })
          }

        </GridLayout>

        {/* <div className="grid-stack">
          {props.items.map((item, index) => {

            if (item.type === "note") return (<div className="grid-stack-item" key={index}><Note num={index} p={props.postNum} s={props.num} title={item.title} edit={item.edit} copyCard={() => props.copyCard(item)} deleteCard={props.deleteCard} editCard={props.editCard} url={item.url} desc={item.desc} tags={item.tags} /></div>)
            if (item.type === "list") return (<div className="grid-stack-item" key={index} ><List num={index} p={props.postNum} s={props.num} title={item.title} edit={item.edit} copyCard={() => props.copyCard(item)} deleteCard={props.deleteCard} editCard={props.editCard} items={item.items} /></div>)
            if (item.type === "qa") return (<div className="grid-stack-item" key={index} ><QA num={index} p={props.postNum} s={props.num} title={item.title} edit={item.edit} copyCard={() => props.copyCard(item)} deleteCard={props.deleteCard} editCard={props.editCard} items={item.items} /></div>)
          })
          }
        </div> */}
        <button onClick={() => props.pasteCard(props.postNum, props.num)}>paste</button>
      </div>

    </div>
  );
}

export default Section;
