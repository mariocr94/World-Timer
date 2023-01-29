interface DashboardProps {
   user: any;
}
const Dashboard = ({ user }: DashboardProps) => {
   console.log(user);
   return <div>Dashboard of {user.user_metadata?.name}</div>;
};

export default Dashboard;

export async function getServerSideProps() {
   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/getUser`).then(
      (response) => response.json()
   );

   const { user } = response;
   console.log(user);

   if (!user.data.user) {
      return {
         redirect: { destination: '/', permanent: false },
      };
   }
   return { props: { user } };
}
