import { NextAuthProvider } from "./providers/NextAuthProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from '@/componentes/Menu';

export const metadata = {
  title: "eShop Next",
  description: "APP com server actions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Menu />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}