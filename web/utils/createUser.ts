const createUser = async (address: `0x${string}`) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address, role: "admin" }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};

export default createUser;
