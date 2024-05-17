import React from 'react'
import Image from "next/image";

const HeaderForm = () => {
    return (
        <div><div className="flex flex-col items-center gap-3">
            <div className='flex flex-row justify-center'>
                <a href="/" className='navbar_logo'>
                    <Image
                        src="/assets/images/sgt-logo.png"
                        alt="canh-dong-quat-gio"
                        width={200}
                        height={0}
                    />
                </a>
            </div>
            <p className=" text-sgt-secondary-dark">Vui lòng nhập thông tin liên hệ </p>
        </div></div>
    )
}

export default HeaderForm