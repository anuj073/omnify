export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex  max-w-7xl mx-auto w-full min-h-screen items-center justify-center   px-1.5">
      <div className=" max-w-6xl w-full mx-auto">{children}</div>
    </div>
  );
}
