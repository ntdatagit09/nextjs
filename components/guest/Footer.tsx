import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Image from "next/image";
function Footer() {
    return (
        <section className='bg-sgt-primary-default'>
            <div className='width-primary m-auto text-sm  flex justify-center items-center py-12'>
                <div className='w-full grid grid-cols-12 gap-3'>
                    <div className='col-span-8'>
                        <div className='font-bold'>
                            <h2 className='text-gray-800'>THÔNG TIN LIÊN HỆ</h2>
                            <div className='flex flex-row justify-start items-end gap-6 pb-6'>
                                <a href="/" className='navbar_logo'>
                                    <Image
                                        src="/assets/images/sgt-logo.png"
                                        alt="canh-dong-quat-gio"
                                        width={200}
                                        height={0}
                                    />
                                </a>
                                <h3 className='font-semibold text-sgt-secondary-default'>CÔNG TY TNHH TM-DL SÀI GÒN THỜI ĐẠI</h3>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1.5 text-sgt-secondary-dark font-medium'>
                            <div><strong>Trụ sở chính: </strong>18/3 Đường số 12, khu phố Tam Đa, phường Trường Thạnh, thành phố Thủ Đức, TPHCM</div>
                            <div><strong>Văn phòng giao dịch: </strong>Tòa nhà Nam Sài Gòn, 19 Huỳnh Đình Hai, Bình Thạnh, Hồ Chí Minh</div>
                            <div><strong>MST: </strong>0314620212</div>
                            <a href="/" className='flex flex-row gap-1.5 justify-start items-center'>
                                <FontAwesomeIcon className='text-sm text-sgt-secondary-default' icon={['fas', 'phone']} />
                                <p>0916 938 824</p>
                            </a>
                            <a href="/" className='flex flex-row gap-1.5 justify-start items-center'>
                                <FontAwesomeIcon className='text-sm text-sgt-secondary-default' icon={['fas', 'envelope']} />
                                <p>info@saigontimestravel.com</p>
                            </a>

                        </div>
                    </div>
                    <div className='col-span-4 font-bold'>
                        <h2 className='pb-4 text-gray-800'>KẾT NỐI VỚI CHÚNG TÔI</h2>
                        <div className='flex flex-col gap-4 justify-start text-sgt-secondary-default'>
                            <a href='/' className='flex flex-row gap-2.5 justify-start items-center'>
                                <FontAwesomeIcon className='text-2xl text-youtube' icon={['fab', 'youtube']} />
                                <p>Youtube</p>
                            </a>
                            <a href='/' className='flex flex-row gap-2.5 justify-start items-center'>
                                <FontAwesomeIcon className='text-2xl text-facebook' icon={['fab', 'facebook']} />
                                <p>Facebook</p>
                            </a>
                            <a href='/' className='flex flex-row gap-2.5 justify-start items-center'>
                                <Image
                                    src="/assets/images/zalo.png"
                                    alt="canh-dong-quat-gio"
                                    width={24}
                                    height={24}
                                />
                                <p>Zalo</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='font-bold bg-sgt-primary-dark text-white text-center p-3.5'>
                Copyright 2024 © SaigonTimesTravel - From Saigon to Everywhere
            </div>
        </section>
    )
}

export default Footer