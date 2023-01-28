import { SupabaseClient } from '@supabase/supabase-js';
import Head from 'next/head';
import { ReactNode } from 'react';
import Header from './Header';

type Props = {
   children?: ReactNode;
   title?: string;
   supabaseClient: SupabaseClient;
};

const Layout = ({ children, title = 'World Timer', supabaseClient }: Props) => (
   <div>
      <Head>
         <title>{title}</title>
         <meta charSet="utf-8" />
         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header supabaseClient={supabaseClient} />
      {children}
      <footer>
         <hr />
         <span>I'm here to stay (Footer)</span>
      </footer>
   </div>
);

export default Layout;
