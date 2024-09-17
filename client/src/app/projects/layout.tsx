import dynamic from 'next/dynamic';

const UseAuth = dynamic(() => import('@/components/use-auth'), { ssr: false });

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UseAuth>
        {children}
      </UseAuth>
    </>
  );
}
