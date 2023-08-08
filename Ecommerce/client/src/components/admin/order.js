import {
    List,
    Datagrid,
    TextField,
    EmailField,
    Edit,
    SimpleForm,
    TextInput,
    Create
  } from 'react-admin';
  
  
  export const Orderlist = (props) => (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="user_id" />
        <TextField source="order_date" />
        <TextField source="status" />
        <TextField source="delivery_address" />
      </Datagrid>
    </List>
  );
  export const OrderEdit = props => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" disabled/>
        <TextInput source="user_id" />
        <TextInput source="order_date" />
        <TextInput source="status" />
        <TextInput source="delivery_address" />

      </SimpleForm>
    </Edit>
  );
  export const OrderCreate = props => (
    <Create {...props}>
    <SimpleForm>
    <TextInput source="id" disabled/>
        <TextInput source="user_id" label="user_id"/>
        <TextInput source="status" />
        <TextInput source="delivery_address" />
      </SimpleForm>
    </Create>
  );