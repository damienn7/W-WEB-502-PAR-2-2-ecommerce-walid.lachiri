import {
    List,
    Datagrid,
    TextField,
    Edit,
    SimpleForm,
    TextInput,
    Create
  } from 'react-admin';
  
  
  export const Order_itemlist = (props) => (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="order_id" />
        <TextField source="item_id" />
        <TextField source="quantity" />
        <TextField source="unit_price" />
      </Datagrid>
    </List>
  );
  export const Order_itemEdit = props => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" disabled/>
        <TextInput source="order_id" />
        <TextInput source="item_id" />
        <TextInput source="quantity" />
        <TextInput source="unit_price" />

      </SimpleForm>
    </Edit>
  );
  export const Order_itemCreate = props => (
    <Create {...props}>
    <SimpleForm>
    <TextInput source="id" disabled/>
        <TextInput source="order_id" label="order_id"/>
        <TextInput source="item_id" label="item_id" />
        <TextInput source="quantity" />
        <TextInput source="unit_price" />

      </SimpleForm>
    </Create>
  );