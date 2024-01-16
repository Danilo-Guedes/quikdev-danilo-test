import PageTemplate from "@/src/components/shared/PageTemplate";
import { Card } from "@/src/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../api/user";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

import { logout } from "../../utils/auth";
import { ROUTES } from "../../utils/routes";
import { useNavigate } from "react-router";

function ProfilePage() {
  const { data: user } = useQuery({
    queryKey: ["get-user-profile"],
    queryFn: getUserById,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <PageTemplate>
      <div className="flex flex-col items-center  h-screen ">
        <Card className="mt-10 w-1/2 p-10 ">
          <div className="h-20 w-20 rounded-full border flex items-center justify-center bg-gray-600 mb-10">
            <span className="text-center text-white font-semibold">
              User Profile
            </span>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label htmlFor="name">Nome</label>
            <Input type="text" id="name" readOnly value={user?.name} />

            <label htmlFor="email">E-mail</label>
            <Input type="text" id="email" value={user?.email} readOnly />

            <Button className="mt-10 hover:cursor-not-allowed" type="submit">
              Save
            </Button>
          </form>
        </Card>

        <Button
          onClick={() => {
            logout();
            navigate(ROUTES.home)
          }}
          className="mt-10"
          variant="link"
        >
          Logout
        </Button>
      </div>
    </PageTemplate>
  );
}

export default ProfilePage;
