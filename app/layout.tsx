import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const inter = Inter({ subsets: ["latin"] });


library.add(fab, fas);

export const metadata: Metadata = {
  title: "Đặt tour du lịch trực tuyến tại SaigonTimes Travel",
  description: "Công ty du lịch Saigontimes Travel chuyên cung cấp tour du lịch nước ngoài (Thái Lan, Nhật Bản, Đài Loan, Hàn Quốc, Úc, Châu Âu, .v.v.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet" /> */}
        <link rel='icon' sizes="32x32" href='/assets/icons/favicon.png' />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png" />
      </head>
      <body id="__sgt" className={inter.className}>
        <main>
          <AntdRegistry>
            <ConfigProvider theme={{
              token: {
                fontFamily: inter.style.fontFamily
              },
            }}>
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </main>
      </body>
    </html>
  );
}
