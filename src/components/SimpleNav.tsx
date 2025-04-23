
import { Link } from 'react-router-dom';

const SimpleNav = () => {
  return (
    <nav className="border-b py-4 px-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">CodeSimple</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/challenge" className="hover:text-primary transition-colors">Challenge</Link>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNav;
