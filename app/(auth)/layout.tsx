export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main id="auth-layout">
      <div className="h-screen flex flex-col items-center justify-center">
        {children}
      </div>
    </main>
  );
}
