"use client"
import "./globals.css";
import Header from "./Header/Header";
import { useEffect } from "react";
import homeStyle from "./homeStyle.module.scss"
import { Provider } from "react-redux";
import { store } from "./store";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    document.title = 'pixema';
  }, []);
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Header />
          <div className={homeStyle.container}>
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
