export default function WorkspaceLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-surface w-full h-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="font-mono-label text-on-surface-variant text-[13px] tracking-widest uppercase">
          Initializing Workspace Environment...
        </p>
      </div>
    </div>
  );
}
