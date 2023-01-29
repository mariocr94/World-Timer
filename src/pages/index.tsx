import { hourMinuteSecondFormat } from '@common/constants/timeFormat';
import { Auth } from '@supabase/auth-ui-react';
import moment from 'moment-timezone';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BsApple, BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { signInWithFacebook, signInWithGoogle } from 'utils/signIn';
import supabaseClient from 'utils/supabaseClient';

export default function Home() {
   const { user } = Auth.useUser();
   const [localTime, setLocalTime] = useState('');

   useEffect(() => {
      const interval = setInterval(() => {
         setLocalTime(moment().format(hourMinuteSecondFormat));
      }, 1000);

      return () => clearInterval(interval);
   }, []);

   return (
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-around p-4">
         <h1 className="code font-mono text-xl">
            <span className="text-lg font-bold tracking-wide text-purple-700">The World Timer</span>
         </h1>
         <Image src="/images/pixel-world.png" alt="world" width={200} height={200} />
         {!user ? (
            <div className="flex flex-col gap-5">
               <button
                  className="w-80 rounded-lg bg-blue-fb py-3 px-5 font-bold text-white"
                  onClick={() => {
                     signInWithFacebook(supabaseClient);
                  }}
               >
                  <div className=" flex items-center justify-center gap-3">
                     <BsFacebook className="h-5 w-5" /> Continue with Facebook
                  </div>
               </button>
               <button
                  className="w-80 rounded-lg bg-white py-3 px-5 font-bold text-gray-google shadow-2xl"
                  onClick={() => {
                     signInWithGoogle(supabaseClient);
                  }}
               >
                  <div className="flex items-center justify-center gap-3">
                     <FcGoogle className="h-5 w-5" /> Continue with Google
                  </div>
               </button>
               <button className="w-80 rounded-lg bg-black py-3 px-5 font-bold text-white">
                  <div className="flex items-center justify-center gap-3">
                     <BsApple className="h-5 w-5" /> Continue with Apple
                  </div>
               </button>
            </div>
         ) : (
            <div className="flex items-center gap-2">
               <h1 className="text-lg font-bold ">Local Time: </h1>
               <p className="text-lg font-bold">{localTime}</p>
            </div>
         )}
      </div>
   );
}

export async function getServerSideProps() {
   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/getUser`).then(
      (response) => response.json()
   );

   const { user } = response;
   console.log(user.data);

   if (user.data.user) {
      return {
         redirect: { destination: '/dashboard', permanent: false },
      };
   }
   return { props: { user } };
}
