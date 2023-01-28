import { Auth } from '@supabase/auth-ui-react';
import { SupabaseClient } from '@supabase/supabase-js';
import Link from 'next/link';
import signIn from 'utils/signIn';

interface HeaderProps {
   supabaseClient: SupabaseClient;
}
const Header = ({ supabaseClient }: HeaderProps) => {
   const { user } = Auth.useUser();

   const handleLogoutClick = () => {
      supabaseClient.auth.signOut();
   };

   const handleLoginClick = () => {
      signIn(supabaseClient);
   };

   const renderUserOptions = () => {
      if (user)
         return (
            <div className="flex gap-2 items-center">
               <img
                  src={user?.user_metadata.avatar_url}
                  alt="avatar"
                  className="h-10 w-10 rounded-full"
               />
               <button
                  className="py-2 px-4 bg-indigo-500 rounded-lg text-gray-200"
                  onClick={handleLogoutClick}
               >
                  Logout
               </button>
            </div>
         );
      return (
         <button
            className="py-2 px-4 bg-indigo-500 rounded-lg text-gray-200"
            onClick={handleLoginClick}
         >
            Login
         </button>
      );
   };

   return (
      <header className="sticky top-0 left-0 right-0  border-b border-gray-900">
         <nav className="flex p-4 gap-2 justify-between items-center">
            <div>
               <Link href="/">Home</Link> | <Link href="/about">About</Link>
            </div>
            <div>{renderUserOptions()}</div>
         </nav>
      </header>
   );
};

export default Header;
