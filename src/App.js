import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AiFillDelete,AiOutlineEdit } from "react-icons/ai";
import { Card,Divider,Tooltip,Alert } from 'antd';

function App() {
  const getData = () => {
    let getNotes = localStorage.getItem("Note-App-React");
    return getNotes ? JSON.parse(getNotes) : [];
  } 
  const [titleValue,updateTitleValue] = useState("");
  const [notesValue,updateNotesValue] = useState("");
  const [finNotes,upFindNotes] = useState("");
  const [noteItem,updateItem] = useState(getData());
  const [btnTogg,upBtnTogg] = useState(true);
  const [editData,upEditData] = useState(null);
  const [alertShow,upAlertShow] = useState(false);
  const onSub = (e) => {
    e.preventDefault();
    if(titleValue === "" || notesValue === ""){
      upAlertShow(true);
    }else if(titleValue && notesValue && !btnTogg){
     updateItem( noteItem.map((e) => {
      if(e.id == editData){
        return {...e,title: titleValue,notes: notesValue}
      }
      return e;
    }));
      upBtnTogg(true);
      updateNotesValue('');
      updateTitleValue('');
      upEditData(null);
  
    } else{
      updateItem([...noteItem,{
        id: new Date().getTime().toString(),
        title: titleValue,
        notes: notesValue,
      }]);
      updateTitleValue("");
      updateNotesValue("");
    };
  };
  const noteDelete = (id) => {
    let filtItem = noteItem.filter((e) => {
      return id != e.id;
    })
    updateItem(filtItem);
  };
  const noteEdit = (id) => {
    let filtList = noteItem.find((e) => {
      return id == e.id;
    })
    console.log(filtList);
    upBtnTogg(false);
    updateNotesValue(filtList.notes);
    updateTitleValue(filtList.title);
    upEditData(id);
  }
  setTimeout(() => {
    upAlertShow(false)
  }, 6000);
  useEffect(() => {
    localStorage.setItem("Note-App-React",JSON.stringify(noteItem));
  },[noteItem])
  return(
   <>
     <header className='noteHead'>
      <nav className="navbar">
        <div className="logo">
          <h1>Abdul Moiz Keep</h1>
        </div>
        <div className="inp">
          <input type="text" name="" id="" onChange={(e) => upFindNotes(e.target.value)} value={finNotes}   placeholder='Search Here...'/>
        </div>
      </nav>
    </header>
    <main>

      <section>
      {alertShow ? <Alert style={{margin:'15px 40px'}}
      message="Error"
      description="Please Fill all the Fields"
      type="error"
      closable
    />  : ''}
        <form action="" className='form-cont' onSubmit={onSub}>
        <label htmlFor="">Title</label>
        <input type="text" name="" id="title" onChange={(e) => updateTitleValue(e.target.value)} value={titleValue}  placeholder='Enter Your Note Title'/>
        <label htmlFor="">Note</label>
        <textarea name="" id="note" cols="30" rows="10" onChange={(e) => updateNotesValue(e.target.value)} value={notesValue} placeholder='Enter Your Note'></textarea>
        <Tooltip color=' #48dbfb'  placement='top' title= {btnTogg ? 'Add Notes' : 'Edit Notes'}>
        <button type='submit'>{btnTogg ? 'Notes' : 'Edit Notes'}</button>
        </Tooltip>
        </form>
      </section>
      <section>
        <div className="note-list">
         {
          noteItem.filter((e) => {
            if(finNotes == ""){
              return e;
            }else if(e.title.toLowerCase().includes(finNotes.toLowerCase())){
              return e;
            }
          }).map((element) => {
            return( 
      <div className="box" key={element.id}>
      <Card className='notes'   >
  <h1>{element.title}</h1>
  <Divider/>
    <p className='p'>{element.notes}</p>
    <Divider/>
      <div className="icon"> 
      <Tooltip color=' #55efc4'  placement='top' title="Edit">
           <AiOutlineEdit className='edit' onClick={() => noteEdit(element.id)} /> 
           </Tooltip>
           <Tooltip color=' #48dbfb'  placement='top' title="Delete">
           <AiFillDelete className='delete' onClick={() => noteDelete(element.id)}/> 
           </Tooltip>
            </div>
  </Card> 
      </div>
  );
          })
         }
        </div>
      </section>
    </main>
    
   </>
  );
}

export default App;
