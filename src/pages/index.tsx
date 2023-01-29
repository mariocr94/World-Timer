import { hourMinuteSecondFormat } from '@common/constants/timeFormat';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
// import { Auth } from '@supabase/auth-ui-react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import moment from 'moment-timezone';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BsApple, BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { signInWithFacebook, signInWithGoogle } from 'utils/signIn';
// import supabaseClient from 'utils/supabaseClient';

export default function Home() {
   const [localTime, setLocalTime] = useState('');
   const supabaseClient = useSupabaseClient();
   const user = useUser();

   useEffect(() => {
      const interval = setInterval(() => {
         setLocalTime(moment().format(hourMinuteSecondFormat));
      }, 1000);

      return () => clearInterval(interval);
   }, []);

   return (
      <div className="container flex flex-col items-center justify-around min-h-screen p-4 mx-auto">
         <h1 className="font-mono text-xl code">
            <span className="text-lg font-bold tracking-wide text-purple-700">The World Timer</span>
         </h1>
         <Image src="/images/pixel-world.png" alt="world" width={200} height={200} />
         {!user ? (
            <div className="flex flex-col gap-5">
               <button
                  className="px-5 py-3 font-bold text-white rounded-lg w-80 bg-blue-fb"
                  onClick={() => {
                     signInWithFacebook(supabaseClient);
                  }}
               >
                  <div className="flex items-center justify-center gap-3 ">
                     <BsFacebook className="w-5 h-5" /> Continue with Facebook
                  </div>
               </button>
               <button
                  className="px-5 py-3 font-bold bg-white rounded-lg shadow-2xl w-80 text-gray-google"
                  onClick={() => {
                     signInWithGoogle(supabaseClient);
                  }}
               >
                  <div className="flex items-center justify-center gap-3">
                     <FcGoogle className="w-5 h-5" /> Continue with Google
                  </div>
               </button>
               <button className="px-5 py-3 font-bold text-white bg-black rounded-lg w-80">
                  <div className="flex items-center justify-center gap-3">
                     <BsApple className="w-5 h-5" /> Continue with Apple
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

export async function getServerSideProps(ctx) {
   const supabase = createServerSupabaseClient(ctx);
   const {
      data: { session },
   } = await supabase.auth.getSession();
   if (session)
      return {
         redirect: {
            destination: '/dashboard',
            permanent: false,
         },
      };
   return { props: { session } };
}
