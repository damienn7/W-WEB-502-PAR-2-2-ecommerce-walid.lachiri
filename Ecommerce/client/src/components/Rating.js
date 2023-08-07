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
  
  
  export const ratingist = (props) => (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id"  />
        <TextField source="id_user" />
        <TextField  source="id_article" />
        <EmailField source="rating" />
      </Datagrid>
    </List>
  );
  export const ratingEdit = props => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="id_user" />
        <TextInput source="id_article" />
        <TextInput source="rating" />
      </SimpleForm>
    </Edit>
  );
  export const ratingCreate = props => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="id_user" />
        <TextInput source="id_article" />
        <TextInput source="rating" />
        <TextInput source="updated_at" />
      </SimpleForm>
    </Create>
  );