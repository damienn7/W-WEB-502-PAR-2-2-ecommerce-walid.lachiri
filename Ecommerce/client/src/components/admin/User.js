import {
  List,
  Datagrid,
  TextField,
  EmailField,
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  Create
} from 'react-admin';


export const Userlist = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id"  />
      <TextField source="name" />
      <TextField  source="admin" />
      <EmailField source="mail" />
      <TextField source="remember_token" />
    </Datagrid>
  </List>
);
export const UserEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <BooleanInput label="admin" source="admin" />
      <TextInput source="password" />
      <TextInput source="mail" />
      <TextInput source="remember_token"/>
      <BooleanInput label="recommandation" source="r" />

    </SimpleForm>
  </Edit>
);
export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="admin" />
      <TextInput source="password" />
      <TextInput source="mail" />
      <TextInput source="remember_token" />
    </SimpleForm>
  </Create>
);