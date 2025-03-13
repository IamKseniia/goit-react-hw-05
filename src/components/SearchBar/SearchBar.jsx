import { Field, Formik, Form } from 'formik';
import './SearchBar.module.css';

const SearchBar = ({ handleChangeQuery }) => {
  const onSubmit = (values, actions) => {
    handleChangeQuery(values.query);
    actions.resetForm();
  };

  const initialValues = { query: '' };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Field name="query" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
