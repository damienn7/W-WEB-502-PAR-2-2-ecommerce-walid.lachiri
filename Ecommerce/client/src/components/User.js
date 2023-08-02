import {
  List,
  Datagrid,
  TextField,
  EmailField,  
} from 'react-admin';


export const Userlist = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField  source="admin" />
      <EmailField source="mail" />
      <TextField source="remember_token" />
      <TextField source="email_verified_at" />
    </Datagrid>
  </List>
);