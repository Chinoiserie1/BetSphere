import GlimmerGrabCard from "./glimmer-grab-card";

export default function GlimmerGrabs() {
  return (
    <div className="mt-3">
      <h1 className="text-2xl font-bold">GlimmerGrabs</h1>
      <div className="mt-2 grid grid-cols-1 gap-4">
        <GlimmerGrabCard
          imgPath="/image-bali.jpeg"
          title="Win a Villa in Bali"
          description="An Exclusive Better - Stake $10 bet only and have a chance to win a newly built villa in Bali woth 200 000.00 USD"
          price="USD 200 000.00"
          id={1}
          timestamp={1728580208}
        />
        <GlimmerGrabCard
          imgPath="/image-bali.jpeg"
          title="Win a Villa in Bali"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          price="USD 200 000.00"
          id={1}
          timestamp={1728580208}
        />
        <GlimmerGrabCard
          imgPath="/image-bali.jpeg"
          title="Win a Villa in Bali"
          description="An Exclusive Better - Stake $10 bet only and have a chance to win a newly built villa in Bali woth 200 000.00 USD"
          price="USD 200 000.00"
          id={1}
          timestamp={1728580208}
        />
      </div>
    </div>
  );
}
