/* eslint-disable react/prop-types */
import NavBar from './NavBar';
import Footer from './Footer';

const PageTemplate = ({ children }) => {
    return (
        <div className="h-full flex flex-col bg-cyan-300">
            <NavBar />
            <div className="flex h-screen flex-col bg-lime-300">{children}</div>
            <Footer />
        </div>
    );
};

export default PageTemplate;
