import supabaseClient from 'utils/supabaseClient';

export default async function getUser(req, res) {
   const user = await supabaseClient.auth.getUser();
   console.log(user);
   return res.status(200).json({ user: user });
}
