import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

interface DashboardProps {
   session: any;
}
const Dashboard = ({ session }: DashboardProps) => {
   return <div>Dashboard of {session.user.user_metadata.name}</div>;
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
