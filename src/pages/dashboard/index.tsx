import { hourMinuteSecondFormat } from '@common/constants/timeFormat';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import moment from 'moment-timezone';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface DashboardProps {
   session: any;
}
const Dashboard = ({ session }: DashboardProps) => {
   const [localTime, setLocalTime] = useState('');
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
         <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold ">Local Time: </h1>
            <p className="text-lg font-bold">{localTime}</p>
         </div>
      </div>
   );
};

export default Dashboard;

export async function getServerSideProps(ctx) {
   const supabase = createServerSupabaseClient(ctx);
   const {
      data: { session },
   } = await supabase.auth.getSession();
   if (!session)
      return {
         redirect: {
            destination: '/',
            permanent: false,
         },
      };
   return { props: { session } };
}
