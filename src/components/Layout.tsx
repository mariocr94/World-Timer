import { Auth } from '@supabase/auth-ui-react';
import Head from 'next/head';
import { ReactNode } from 'react';
import supabaseClient from 'utils/supabaseClient';
import Header from './Header';

type Props = {
   children?: ReactNode;
   title?: string;
};

const Layout = ({ children, title = 'World Timer' }: Props) => (
   <div>
      <Head>
         <title>{title}</title>
         <meta charSet="utf-8" />
         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Auth.UserContextProvider supabaseClient={supabaseClient}>
         <Header supabaseClient={supabaseClient} />
         {children}
         <footer>
            <hr />
            <span>I'm here to stay (Footer)</span>
         </footer>
      </Auth.UserContextProvider>
   </div>
);

export default Layout;
