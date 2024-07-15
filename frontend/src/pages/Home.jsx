import React, { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {user ? (
        <h1 className="text-4xl font-bold">
          !Bienvenido, {user.nombre} {user.apellido}!
        </h1>
      ) : (
        <h1 className="text-4xl font-bold">¡Bienvenido!</h1>
      )}
    </div>
  );
};

export default Home;
