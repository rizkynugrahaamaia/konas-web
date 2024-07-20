import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';

export default function InputSelect({

  className,
  mandatory,
  id,
  label,
  errors,
  validation,
  rules,
  control,
  options,
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
      <div className="w-full">
        <Controller
            control={control}
            name={id}
            render={({ field }) => (
              <Select
                options={options}
                {...field}
                {...rest}
              />
            )}
            rules={{
              validate: (value) => validation(value, rules)
            }}
        />
      </div>
      {errors[id] && <div className="text-red-600">{errors[id].message}</div>}
    </div>
  );
}

InputSelect.defaultProps = {
  className: '',
  id: '',
  label: '',
  errors: {},
  mandatory: false,
  options: [],
  validation: () => {},
};

InputSelect.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object.isRequired,
  id: PropTypes.string,
  label:  PropTypes.string,
  errors: PropTypes.object,
  mandatory: PropTypes.bool,
  options: PropTypes.array,
  rules: PropTypes.shape({
    required: PropTypes.bool,
    minLength: PropTypes.number,
    label: PropTypes.string.isRequired,
  }).isRequired,
  validation: PropTypes.func,
};
