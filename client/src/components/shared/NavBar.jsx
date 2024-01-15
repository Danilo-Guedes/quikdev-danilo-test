import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

import { CircleUser } from "lucide-react";

function NavBar() {
  return (
    <nav className="flex flex-row  justify-between">
      <div className="">
        <Link to={ROUTES.home}>
          <img src="/logos/logo-quikdev.png" className="w-10 h-10" alt="logo" />
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-xl font-bold">Social Media QuikDev</span>
      </div>
      <div className="">
        <CircleUser />
      </div>
    </nav>
  );
}

export default NavBar;
