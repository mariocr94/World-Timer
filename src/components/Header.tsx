import Link from 'next/link';

const Header = () => {
   return (
      <header className="sticky top-0 left-0 right-0  border-b border-gray-900">
         <nav className="p-4">
            <Link href="/">Home</Link> | <Link href="/about">About</Link>
         </nav>
      </header>
   );
};

export default Header;
