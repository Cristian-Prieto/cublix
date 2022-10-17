export default function DisplayContainer({ children }) {
  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-8 h-full w-full">
      {children}
    </div>
  );
}
