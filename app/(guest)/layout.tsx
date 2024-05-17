import Footer from "@/components/guest/Footer";
import NavBar from "@/components/guest/NavBar";
import Head from "next/head";
import React from "react";

function GuestLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<>
			<NavBar />
			{children}
			<Footer />
		</>
	);
}
export default GuestLayout