import Table from './Table'
import Form from './Form';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

function MyApp() {
   const [characters, setCharacters] = useState([])
    
   async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:5000/users', person);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
      }
   }
   async function deleteOne(index){
      //find user that is getting deleted on front end
      const updated = characters.filter((character, i) => {
         return i === index
      })[0];
      try {
         //call delete api using id of deleted element
         const response = await axios.delete('http://localhost:5000/users/'.concat(updated.id));
         return response.data.users_list;     
      }
      catch (error){
         //We're not handling errors. Just logging into the console.
         console.log(error); 
         return false;         
        }
      }
   async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:5000/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
      }
   }

   useEffect(() => {
      fetchAll().then( result => {
         if (result)
         setCharacters(result);
      });
   }, [] );

   function removeOneCharacter(index) {
      deleteOne(index);
      const updated = characters.filter((character, i) => {
         return i !== index
      });
      setCharacters(updated);
   }
   function updateList(person) { 
      makePostCall(person).then( result => {
         if (result && result.status === 201){
            setCharacters([...characters, result.data]);
         }
      });
   }
   return (
      <div className="container">
        <Table characterData={characters} removeCharacter={removeOneCharacter} />
        <Form handleSubmit={updateList}/>
      </div>
   );  
}

export default MyApp;