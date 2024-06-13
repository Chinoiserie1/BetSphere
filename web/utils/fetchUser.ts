const fetchUser = async (address: `0x${string}`) => {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${address}`).then(
    async (res) => res.json()
  );
};

export default fetchUser;
