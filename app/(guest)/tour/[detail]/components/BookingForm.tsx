import { Input } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const BookingForm = (props: any) => {
    const { errors, control, onSubmit, validateRules } = props;
    return (
        <>
            <form id="BookingForm" onSubmit={onSubmit}>
                <div className="flex flex-col gap-2 pt-4">
                    <div>
                        <label className="font-medium text-sgt-secondary-dark">Họ và tên<span className="text-red-500">*</span></label>
                        <Controller
                            name="full_name"
                            control={control}
                            rules={validateRules.full_name}
                            render={
                                ({ field }) =>
                                    <Input
                                        type="text" placeholder="Họ và tên"
                                        className="border-0 transition ease-linear focus:ring-1 focus:ring-sgt-primary-dark focus:ring-opacity-50"
                                        {...field}
                                    />
                            }
                        />
                        {errors.full_name && <p className="text-red-500">{errors.full_name?.message as string}</p>}
                    </div>
                    <div>
                        <label className="font-medium text-sgt-secondary-dark">Điện thoại<span className="text-red-500">*</span></label>
                        <Controller
                            name="phone"
                            control={control}
                            rules={validateRules.phone}
                            render={
                                ({ field }) =>
                                    <Input type="number" placeholder="Số điện thoại"
                                        className="border-0 transition ease-linear focus:ring-1 focus:ring-sgt-primary-dark focus:ring-opacity-50"
                                        {...field}
                                    />
                            }
                        />
                        {errors.phone && <p className="text-red-500">{errors.phone?.message as string}</p>}
                    </div>
                    <div>
                        <label className="font-medium text-sgt-secondary-dark" >Email</label>
                        <Controller
                            name='email'
                            control={control}
                            rules={validateRules.email}
                            render={
                                ({ field }) =>
                                    <Input placeholder="Email"
                                        className="border-0 transition ease-linear focus:ring-1 focus:ring-sgt-primary-dark focus:ring-opacity-50"
                                        {...field}
                                    />
                            }
                        />
                        {errors.email && <p className="text-red-500">{errors.email?.message as string}</p>}
                    </div>
                    <div>
                        <label className="font-medium text-sgt-secondary-dark">Khác</label>
                        <Controller
                            name='other'
                            control={control}
                            render={
                                ({ field }) =>
                                    <TextArea placeholder="khác" rows={4} className="border-0 focus:ring-1 focus:ring-sgt-primary-dark"
                                        allowClear
                                        {...field}
                                    />
                            }
                        />
                    </div>
                </div>
            </form>
        </>
    )
}

export default BookingForm