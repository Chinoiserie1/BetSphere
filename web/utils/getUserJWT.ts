const getUserJWT = async (
  address: `0x${string}`,
  message: string,
  signature: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address, message, signature }),
    }
  );
  return response.json();
};

export default getUserJWT;
