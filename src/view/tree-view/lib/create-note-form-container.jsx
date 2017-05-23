/* eslint-disable react/prop-types */
import React from 'react';
import {Field, reduxForm} from 'redux-form';

const CreateNoteFormContainer = (props) => {
  const {handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field">
        <Field
          name="title"
          component="input"
          type="text"
          placeholder="Note Title"
        />
      </div>
    </form>
  );
};

const form = reduxForm({
  form: 'create-note',
});

export default form(CreateNoteFormContainer);
