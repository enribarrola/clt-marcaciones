import Navbar from '../navbar/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='container'>
      <Navbar />
      <main className='pt-3'>{children}</main>
    </div>
  );
}
