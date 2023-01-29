import { Auth } from '@supabase/auth-ui-react';
import { SupabaseClient } from '@supabase/supabase-js';

interface HeaderProps {
   supabaseClient: SupabaseClient;
}
const Header = ({ supabaseClient }: HeaderProps) => {
   const { user } = Auth.useUser();
   const handleLogoutClick = () => {
      supabaseClient.auth.signOut();
   };

   console.log(user);

   const renderUserOptions = () => {
      if (user)
         return (
            <div className="flex w-full items-center justify-between gap-2">
               <img
                  src={user?.user_metadata?.avatar_url}
                  alt="avatar"
                  className="h-10 w-10 rounded-full"
               />
               <button
                  className="rounded-lg bg-indigo-500 py-2 px-4 text-gray-200"
                  onClick={handleLogoutClick}
               >
                  Logout
               </button>
            </div>
         );
      return <div></div>;
   };
   // if (!user) return;

   return (
      <header className="sticky top-0 left-0 right-0">
         <nav className="flex items-center justify-between gap-2 p-4">{renderUserOptions()}</nav>
      </header>
   );
};

export default Header;
