import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  BooleanInput
} from 'react-admin';

export const Shippinglist = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="country" />
      <TextField source="price" />
      <TextField  source="ban" />

    </Datagrid>
  </List>
);
export const ShippingEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="country" />
      <TextInput source="price" />
      <BooleanInput  source="ban" />

    </SimpleForm>
  </Edit>
);
export const ShippingCreate = props => (
  <Create {...props}>
  <SimpleForm>
      <TextInput source="country" />
      <TextInput source="price" />
      <BooleanInput  source="ban" />
    </SimpleForm>
  </Create>
);