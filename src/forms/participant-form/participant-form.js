import React from "react";
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import validation from "./validate";
import Textfield from '../../components/hook-form/textField'
import InputDatepicker from '../../components/hook-form/datepicker'
import InputSelect from "../../components/hook-form/select/select";
import Textarea from '../../components/hook-form/textarea'

export default function ParticipantForm({
    onSubmit = () => {},
    defaultValues = {},
    isDetail = false,
    isEdit = false,
    isLoading = false,
    statusLoading = false,
    statusOptions = [],
    wilayahLoading = false,
    wilayahOptions = []
}){

    const { register, control, handleSubmit, setValue, formState: { errors, isValid } } = useForm({
        mode: 'onChange',
        progressive: true,
        defaultValues: {
          fullname: '',
          username: '',
          birthday: '',
          status: '',
          region: '',
          roomMeet: '',
          flight: '',
          roomStay: '',
          ...defaultValues
        }
    });

    const handleInputChange = (event) => {
        const value = event.target.value.toLowerCase().replace(/[^a-z0-9]/g, '');
        setValue(event.target.name, value, { shouldValidate: true });
    };

    return(
      <form onSubmit={handleSubmit(onSubmit)}>

        <Textfield
            disabled={isDetail}
            id="fullname"
            className="mb-6"
            label="Nama"
            mandatory
            register={register}
            errors={errors}
            placeholder="Masukkan Nama"
            rules={{ 
                label: 'Nama',
                required: true, 
            }}
            validation={validation}
        />

        <Textfield
            disabled={isEdit || isDetail}
            id="username"
            className="mb-6"
            label="Username"
            mandatory
            register={register}
            errors={errors}
            onChange={handleInputChange}
            placeholder="Masukkan Username"
            rules={{ 
                label: 'Username',
                required: true, 
            }}
            validation={validation}
        />

        <InputDatepicker
            disabled={isDetail}
            id="birthday"
            className="mb-6"
            control={control}
            label="Tanggal Lahir"
            errors={errors}
            mandatory
            placeholderText="Pilih Tanggal"
            rules={{ 
                label: 'Tanggal Lahir',
                required: true, 
            }}
            validation={validation}
        />

        <InputSelect
            isDisabled={isDetail}
            id="status"
            className="mb-6"
            control={control}
            isLoading={statusLoading}
            label="Status Peserta"
            errors={errors}
            mandatory
            options={statusOptions}
            placeholder="Pilih Peserta"
            rules={{ 
                label: 'Status Peserta',
                required: true, 
            }}
            validation={validation}
        />

        <InputSelect
            isDisabled={isDetail}
            id="region"
            className="mb-6"
            control={control}
            isLoading={wilayahLoading}
            label="Wilayah"
            errors={errors}
            mandatory
            options={wilayahOptions}
            placeholder="Pilih Wilayah"
            rules={{ 
                label: 'Wilayah',
                required: true, 
            }}
            validation={validation}
        />

        <Textarea
            disabled={isDetail}
            id="roomMeet"
            className="mb-6"
            label="Ruang Meeting"
            register={register}
            errors={errors}
            mandatory
            placeholder="Masukkan Ruang Meeting"
            rules={{ 
                label: 'Ruang Meeting',
                required: true, 
            }}
            rows={5}
            validation={validation}
        />

        <Textarea
            disabled={isDetail}
            id="flight"
            className="mb-6"
            label="Informasi Penerbangan"
            register={register}
            errors={errors}
            mandatory
            placeholder="Masukkan Informasi Penerbangan"
            rules={{ 
                label: 'Informasi Penerbangan',
                required: true, 
            }}
            rows={5}
            validation={validation}
        />

        <Textarea
            disabled={isDetail}
            id="roomStay"
            className="mb-6"
            label="Ruang Inap"
            register={register}
            errors={errors}
            mandatory
            placeholder="Masukkan Ruang Inap"
            rules={{ 
                label: 'Ruang Inap',
                required: true, 
            }}
            rows={5}
            validation={validation}
        />
         
        {!isDetail ? ( <button 
            className="bg-[#55185D] p-2 w-28 rounded-md text-white float-right disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!isValid || isLoading}
            type="submit"
        >
            Submit
        </button>) : null }
   
        
      </form>
    )
}

ParticipantForm.propTypes = {
    defaultValues: PropTypes.object,
    isDetail: PropTypes.bool,
    isEdit: PropTypes.bool,
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func
}