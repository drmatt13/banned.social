import Link from 'next/link';

const Navbar = () => {
  return <>
    <style jsx>{`
      height: 75px;
      background-color: black;
      color: white;
      display: flex;
      justify-content: space-around;
      align-items: center;
    `}</style>
    <nav>
      <Link href="/">home</Link>
      <Link href="/mongo">mongo</Link>
    </nav>
  </>
}

export default Navbar
