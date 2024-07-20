import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';

import "react-datepicker/dist/react-datepicker.css";
import styles from './styles.module.css';

export default function Datepicker({

  className,
  mandatory,
  id,
  label,
  errors,
  validation,
  rules,
  control,
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
      <div className="w-full rounded-md px-2 border-2 block">
        <Controller
            control={control}
            name={id}
            render={({ field }) => (
              <DatePicker
                className={`w-full ${styles.input}`}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                wrapperClassName="w-full"
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

Datepicker.defaultProps = {
  className: '',
  id: '',
  label: '',
  errors: {},
  mandatory: false,
  validation: () => {},
};

Datepicker.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object.isRequired,
  id: PropTypes.string,
  label:  PropTypes.string,
  errors: PropTypes.object,
  mandatory: PropTypes.bool,
  rules: PropTypes.shape({
    required: PropTypes.bool,
    minLength: PropTypes.number,
    label: PropTypes.string.isRequired,
  }).isRequired,
  validation: PropTypes.func,
};
