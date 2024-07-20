import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

export default function TextField({

  className,
  inputClass,
  mandatory,
  id,
  label,
  register,
  errors,
  validation,
  rules,
  ...rest

}) {

  className = [className].filter(Boolean).join(' ');

  return (
    <div className={className}>
      {label &&
        <div className="">
          <label className={styles.label}>
            {label}
            {mandatory &&
              <span className="text-red-600">*</span>}
          </label>
        </div>
      }
      <div className="">
        <div className="">
          <input
            className={`
              rounded-md border-2 p-2 w-full block 
              ${styles.input} 
              ${inputClass}
              `}
            id={id}
            {...register(id, { validate: (value) => validation(value, rules) })}
            {...rest}
          />
        </div>
        {errors[id] && <div className="text-red-600">{errors[id].message}</div>}
      </div>
    </div>
  );
}

TextField.defaultProps = {
  className: '',
  id: '',
  inputClass: '',
  label: '',
  errors: {},
  register: () => {},
  mandatory: false,
  validation: () => {},
};

TextField.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  inputClass: PropTypes.string,
  label:  PropTypes.string,
  errors: PropTypes.object,
  register: PropTypes.func,
  mandatory: PropTypes.bool,
  rules: PropTypes.shape({
    required: PropTypes.bool,
    minLength: PropTypes.number,
    label: PropTypes.string.isRequired,
  }).isRequired,
  validation: PropTypes.func,
};
