import { Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (topic: string) => void;
}

interface FormValues {
  topic: string;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  return (
    <header className={css.header}>
      <Formik<FormValues>
        initialValues={{ topic: '' }}
        onSubmit={(values, actions) => {
          if (values.topic.trim() === '') {
            toast.error('Please enter something for seach.', {
              duration: 1750,
              position: 'top-center',
              className: `${css['custom-toast-error']} ${css['info']}`,
            });
            return;
          }

          onSubmit(values.topic);
          // console.log(values.topic);
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            name="topic"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
}
