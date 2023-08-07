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
  
  
  export const Categorieslist = (props) => (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="sub_category" />
        <TextField source="category" />
      </Datagrid>
    </List>
  );
  export const CategoriesEdit = props => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" disabled/>
        <TextInput source="sub_category" />
        <TextInput source="category" />
      </SimpleForm>
    </Edit>
  );
  export const CategoriesCreate = props => (
    <Create {...props}>
    <SimpleForm>
        <TextInput source="sub_category" />
        <TextInput source="category" />
      </SimpleForm>
    </Create>
  );