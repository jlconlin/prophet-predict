export default function LoadingSpinner(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
      <div className="w-[50px] h-[50px] border-4 border-black/10 border-t-blue-400 rounded-full animate-spin"></div>
      <p className="text-base text-gray-500 m-0">Calculating prophet probabilities...</p>
    </div>
  );
}
