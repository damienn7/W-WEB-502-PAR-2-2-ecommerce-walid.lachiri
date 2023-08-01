import {
  List,
  Datagrid,
  TextField,
  EmailField,
  
} from 'react-admin';

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="image" />
      <TextField source="nom" />
      <TextField source="description" />
      <TextField source="price" />
      <TextField source="stock" />
      <TextField source="views" />
    </Datagrid>
  </List>
);