/* eslint-disable react/prop-types */
import React from 'react';
import {Field, reduxForm} from 'redux-form';

const CreateNodeFormContainer = (props) => {
  const {handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field">
        <Field
          name="name"
          component="input"
          type="text"
          placeholder="Folder Name"
        />
      </div>
    </form>
  );
};

const form = reduxForm({
  form: 'create-node',
});

export default form(CreateNodeFormContainer);
