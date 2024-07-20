import React from "react";
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import validation from "./validate";
import Textfield from '../../components/hook-form/textField'
import InputDatepicker from '../../components/hook-form/datepicker'
import InputSelect from "../../components/hook-form/select/select";
import Textarea from '../../components/hook-form/textarea'

export default function ParticipantForm(props){

    const { onSubmit } = props;
    const { register, control, handleSubmit, formState: { errors } } = useForm();

    return(
      <form onSubmit={handleSubmit(onSubmit)}>

        <Textfield
            id="name"
            className="mb-6"
            label="Nama"
            mandatory
            register={register}
            errors={errors}
            placeholder="Masukkan Nama"
            rules={{ 
                label: 'Nama',
                required: true, 
                minLength: 3 
            }}
            validation={validation}
        />

        <Textfield
            id="username"
            className="mb-6"
            label="Username"
            mandatory
            register={register}
            errors={errors}
            placeholder="Masukkan Username"
            rules={{ 
                label: 'Username',
                required: true, 
            }}
            validation={validation}
        />

        <InputDatepicker
            id="birthDate"
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
            id="peserta"
            className="mb-6"
            control={control}
            label="Status Peserta"
            errors={errors}
            mandatory
            options={[
                { value: 'formal', label: 'Formal' },
                { value: 'non_formal', label: 'Non Formal' }
            ]}
            placeholder="Pilih Peserta"
            rules={{ 
                label: 'Status Peserta',
                required: true, 
            }}
            validation={validation}
        />

        <InputSelect
            id="wilayah"
            className="mb-6"
            control={control}
            label="Wilayah"
            errors={errors}
            mandatory
            options={[
                { value: 'wilayah1', label: 'Wilayah I' },
                { value: 'wilayah2', label: 'Wilayah II' }
            ]}
            placeholder="Pilih Wilayah"
            rules={{ 
                label: 'Wilayah',
                required: true, 
            }}
            validation={validation}
        />

        <Textarea
            id="meeting_room"
            className="mb-6"
            label="Ruang Meeting"
            register={register}
            errors={errors}
            placeholder="Masukkan Ruang Meeting"
            rows={5}
        />

        <Textarea
            id="flight_info"
            className="mb-6"
            label="Informasi Penerbangan"
            register={register}
            errors={errors}
            placeholder="Masukkan Informasi Penerbangan"
            rows={5}
        />

        <Textarea
            id="guest_room"
            className="mb-6"
            label="Ruang Inap"
            register={register}
            errors={errors}
            placeholder="Masukkan Ruang Inap"
            rows={5}
        />

        <button 
            className="bg-[#55185D] p-2 w-28 rounded-md text-white float-right"
            type="submit"
        >
            Submit
        </button>
        
      </form>
    )
}

ParticipantForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}