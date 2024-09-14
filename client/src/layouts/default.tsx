import Header from '@/layouts/header';

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