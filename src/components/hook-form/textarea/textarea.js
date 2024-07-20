import React from 'react';
import PropTypes from 'prop-types';


export default function Textarea({

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
          <label className="">
            {label}
            {mandatory &&
              <span className="text-red-600">*</span>}
          </label>
        </div>
      }
      <div className="">
        <div className="">
          <textarea
            className={`rounded-md border-2 p-2 w-full block`}
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

Textarea.defaultProps = {
  className: '',
  id: '',
  inputClass: '',
  label: '',
  errors: {},
  register: () => {},
  mandatory: false,
  validation: () => {},
};

Textarea.propTypes = {
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
