import { AppProps } from 'next/app';

import Layout from '@components/Layout';
import { Auth } from '@supabase/auth-ui-react';
import supabaseClient from 'utils/supabaseClient';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <Auth.UserContextProvider supabaseClient={supabaseClient}>
         <Layout supabaseClient={supabaseClient}>
            <Component {...pageProps} />
         </Layout>
      </Auth.UserContextProvider>
   );
}

export default MyApp;
