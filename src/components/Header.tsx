import Link from 'next/link';

const Header = () => {
   return (
      <header>
         <nav>
            <Link href="/">Home</Link> | <Link href="/about">About</Link> |{' '}
            <Link href="/users">Users List</Link> | <a href="/api/users">Users API</a>
         </nav>
      </header>
   );
};

export default Header;
