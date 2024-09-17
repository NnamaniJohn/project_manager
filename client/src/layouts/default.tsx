import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/layouts/header'), { ssr: false });


export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />

      <main>
        {children}
      </main>
    </div>
  )
}