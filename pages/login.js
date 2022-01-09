import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img className="w-52 mb-5" src="https://i.imgur.com/fPuEa9V.png" alt="" />
      {Object.values(providers).map((provider) => (
        <div className="flex items-center flex-col" key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
      <div className="text-white p-4 flex flex-col items-center">
        <p>You need prior authorization via email by me (Luke) to access.</p>
        <a
          href="https://demo.spotify.lukenneth.com"
          className="text-white underline p-2 cursor-pointer"
          target="_blank"
        >
          click here to use a demo version of the app
        </a>
        <a
          href="https://lukenneth.com/spotify"
          className="text-white underline p-2 cursor-pointer"
          target="_blank"
        >
          or view a demo video here
        </a>
      </div>
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
