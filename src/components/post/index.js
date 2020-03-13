import React, { useState } from 'react';
import './index.scss';
import Section from "../section/index";
// import GridLayout from 'react-grid-layout';

const Post = (props) => {

  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');

  return (
    <div className="Post">

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
        <div className="postMenu">
          <button className="add_section_id" id="add_section_id"
            onClick={() => props.addSection(props.num)}>+ section</button>

        </div>

      </header>
      <div className="Content">

        {props.items.map((section, index) => {
          return <Section key={index} image_file={section.image_file} num={index} tags={section.tags} postNum={props.num} editCard={props.editCard} pasteCard={props.pasteCard} copyCard={props.copyCard} deleteCard={props.deleteCard} addNote={props.addNote} addList={props.addList} addQA={props.addQA} title={section.title} desc={section.desc} items={section.items} />;
        })}

      </div>

    </div>
  );
}

export default Post;
