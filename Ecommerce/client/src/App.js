import {
  Admin,
  Resource,
  EditGuesser,
} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {
  Articlelist,
} from './components/Articles';
import {
  Userlist,
} from './components/User';


  
const dataProvider = jsonServerProvider('http://127.0.0.1:8000/api');

function App() {

  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name={"articles"}
        list={Articlelist}
        edit={EditGuesser}
      />
            <Resource
        name={"users"}
        list={Userlist}
        edit={EditGuesser}
      />
            <Resource
        name={"stock"}
        list={Articlelist}
        edit={EditGuesser}
      />
    </Admin>
    
  );
}

export default App;