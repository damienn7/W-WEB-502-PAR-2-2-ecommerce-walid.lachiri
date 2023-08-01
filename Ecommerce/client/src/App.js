import {
  Admin,
  Resource,
  EditGuesser,
} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {
  UserList,
  UserEdit
} from './components/Articles';
import React, { useEffect, useState } from "react"


  
const dataProvider = jsonServerProvider('http://127.0.0.1:8000/api');

function App() {
  const [type, setType] = useState(0)

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    setType(params.get('perPage'))
  }, [window.location.search])

  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name={"articles"}
        list={UserList}
        edit={EditGuesser}
      />
            <Resource
        name={"users"}
        list={UserList}
        edit={EditGuesser}
      />
            <Resource
        name={"stock"}
        list={UserList}
        edit={EditGuesser}
      />
    </Admin>
    
  );
}

export default App;