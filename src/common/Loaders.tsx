function Spinner() {
  return (
    <div className="w-5 h-5 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
  );
}
function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <Spinner />
    </div>
  );
}

export { Loader, Spinner };
