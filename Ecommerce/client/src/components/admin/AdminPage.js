import {
  Admin,
  Resource,
} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {
  Articlelist,
  ArticleEdit,
  ArticleCreate,
} from './Articles';
import {
  Userlist,
  UserEdit,
  UserCreate
} from './User';
import {
  Categorieslist,
  CategoriesEdit,
  CategoriesCreate
} from './categories';
import {
  ratingist,
  ratingEdit,
  ratingCreate
} from './Rating';
import {
  Orderlist,
  OrderEdit,
  OrderCreate
} from './order';
import {
  Order_itemlist,
  Order_itemEdit,
  Order_itemCreate
} from './order_item';
import {
  Shippinglist,
  ShippingEdit,
  ShippingCreate
} from './Shipping';
import '../../style/Admin.css'

const dataProvider = jsonServerProvider('http://127.0.0.1:8000/api');

function AdminPage() { 
  var isadmin = localStorage.getItem('role');
  if (isadmin != "rachet&clank"){
    window.location.href = "/";
    alert("Vous n'êtes pas admin...");
  }
  return (
    <Admin basename="/admin" dataProvider={dataProvider}>
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
            <Resource
        name={"shippingfee"}
        list={Shippinglist}
        edit={ShippingEdit}
        create={ShippingCreate}
      />
    </Admin>
  );
}

export default AdminPage;
