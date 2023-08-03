import {
  Admin,
  Resource,
  EditGuesser,
} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {
  Articlelist,
  ArticleEdit,
  ArticleCreate,
} from './components/Articles';
import {
  Userlist,
  UserEdit,
  UserCreate
} from './components/User';
import {
  Categorieslist,
  CategoriesEdit,
  CategoriesCreate
} from './components/categories';
import {
  ratingist,
  ratingEdit,
  ratingCreate
} from './components/Rating';
import {
  Orderlist,
  OrderEdit,
  OrderCreate
} from './components/order';
import {
  Order_itemlist,
  Order_itemEdit,
  Order_itemCreate
} from './components/order_item';

const dataProvider = jsonServerProvider('http://127.0.0.1:8000/api');

function App() {

  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name={"articles"}
        list={Articlelist}
        edit={ArticleEdit}
        create={ArticleCreate} />
      <Resource
        name={"users"}
        list={Userlist}
        edit={UserEdit}
        create={UserCreate}
      />
      <Resource
        name={"categories"}
        list={Categorieslist}
        edit={CategoriesEdit}
        create={CategoriesCreate}
      />
      <Resource
        name={"rating"}
        list={ratingist}
        edit={ratingEdit}
        create={ratingCreate}
      />
      <Resource
        name={"order"}
        list={Orderlist}
        edit={OrderEdit}
        create={OrderCreate}
      />
            <Resource
        name={"order_item"}
        list={Order_itemlist}
        edit={Order_itemEdit}
        create={Order_itemCreate}
      />
    </Admin>

  );
}

export default App;