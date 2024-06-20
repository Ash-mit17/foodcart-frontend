import Footer from "../components/Footer";
import ResponsiveNavbar from "../components/Navbar";


function DefaultLayout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <ResponsiveNavbar />
      </header>
      <div className="flex-grow-1">{children}</div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default DefaultLayout;
