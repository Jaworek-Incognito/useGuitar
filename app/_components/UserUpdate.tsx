"use client";

import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import UserUpdateForm from "./UserUpdateForm";
import { useRouter } from "next/navigation";

function UserUpdate() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/api/auth")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <Spinner />;

  if (data.status !== 200) {
    return router.push("/login");
  }
  const user = { ...data.user };
  return (
    <div>
      <UserUpdateForm user={user} />
    </div>
  );
}

export default UserUpdate;
