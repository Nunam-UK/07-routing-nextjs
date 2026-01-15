import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Providers from '../components/Providers/Providers';
import './globals.css';

export default function RootLayout({ 
  children,
  modal 
}: { 
  children: React.ReactNode;
  modal: React.ReactNode; 
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main style={{ flex: 1 }}>
            {children}
            {modal} 
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}