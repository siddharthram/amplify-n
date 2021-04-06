


import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
//import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui/dist/style.css';
import { render } from '@testing-library/react';
import { API, graphqlOperation } from  'aws-amplify';
import { createNote, deleteNote } from './graphql/mutations';
import { listNotes } from './graphql/queries';



class App extends Component {
  state = {
      note: "",
      notes: []
  };

  async componentDidMount() {

   const result = await API.graphql(graphqlOperation(listNotes));
   this.setState({notes: result.data.listNotes.items});


  }

  handleChangeNote = event =>  this.setState({note:event.target.value});

  handleAddNote = async event => {
    const { note, notes } = this.state;
    event.preventDefault();
    const input = { note };
    const result = await API.graphql(graphqlOperation(createNote, { input }));
    const newNote = result.data.createNote;
    const updatedNotes = [newNote, ...notes ];
    this.setState({notes: updatedNotes, note : ""});
    
  };

handleDeleteNote = async noteid => {
  const input = { id: noteid }
  const { notes } = this.state;
  const result = await API.graphql(graphqlOperation(deleteNote, { input }));
  const deleteNoteId = result.data.deleteNote.id;
  const updatedNotes = notes.filter(note => note.id !== deleteNoteId);
  this.setState({notes: updatedNotes});


}

  render() {
    const { notes,note  } = this.state; 

    return (
      <div className="flex flex-column  items-center justify-center pa3 bg-washed-red">
        <h1 className="code f2-1">  Amplify Notetaker </h1>
        {/* Note form */}
        <form onSubmit={this.handleAddNote} className="mb3">
          <input type="text" className="pa2 f4" 
          placeholder="Write your note"
          onChange={this.handleChangeNote} 
          value={note}
          />
          <button className="pa2 f4"
            type="submit">
            Add Note
          </button>
        </form>
        {/* notes list */}
        <div>
          {notes.map(item => (
            <div key={item.id} className="flex items-center">
              <li className="list pa1 f3">
                {item.note}
              </li>
              <button onClick={() => this.handleDeleteNote(item.id)} className="bg-transparent bn f4">
                <span>&times; </span>
              </button>
            </div>
          ))}
      </div>
      </div>
    );
  }
}
export default withAuthenticator(App, { includeGreetings: true });

