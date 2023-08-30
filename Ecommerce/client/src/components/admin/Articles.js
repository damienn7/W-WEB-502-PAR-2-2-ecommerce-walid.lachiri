import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  BooleanInput,

} from 'react-admin';

export const Articlelist = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="image" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="price" />
      <TextField source="stock" />
      <TextField source="views" />
      <TextField source="recommandation" />

    </Datagrid>
  </List>
);
export const ArticleEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id"/>
      <TextInput source="image" />
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="price" />
      <TextInput source="stock"/>
      <TextInput source="id_category"/>
      <TextInput source="views" />
      <BooleanInput label="recommandation" source="recommandation" />

    </SimpleForm>
  </Edit>
);
export const ArticleCreate = props => (
  <Create {...props}>
  <SimpleForm>
      <TextInput source="image" />
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="price" />
      <TextInput source="stock"/>
      <TextInput source="id_category"/>
      <TextInput source="views" />
      <BooleanInput  source="recommandation" />

    </SimpleForm>
  </Create>
);