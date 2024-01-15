import { useState } from "react";
import PageTemplate from "@/src/components/shared/PageTemplate";
import { Card } from "@/src/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../api/user";

function ProfilePage() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get-user-profile"],
    queryFn: getUserById,
  });

  const [name, setName] = useState("");
  const [userImage, setUserImage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setUserImage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <PageTemplate>
      <div className="flex flex-col items-center  h-screen ">
        <Card className="h-96 mt-20 w-1/2">
          <h1>User Profile</h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />

            <label htmlFor="userImage">User Image:</label>
            <input
              type="text"
              id="userImage"
              value={userImage}
              onChange={handleImageChange}
            />

            <button type="submit">Save</button>
          </form>
        </Card>
      </div>
    </PageTemplate>
  );
}

export default ProfilePage;
