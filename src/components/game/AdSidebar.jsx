export default function AdSidebar({ side }) {
  return (
    <div className="hidden lg:flex flex-col gap-4 w-36 xl:w-40 shrink-0">
      {/* 160x600 wide skyscraper placeholder */}
      <div className="flex-1 rounded-xl border border-dashed border-border bg-card/50 flex flex-col items-center justify-center gap-2 min-h-[400px] max-h-[600px]">
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-xs font-mono">Ad</span>
        </div>
        <p className="text-muted-foreground text-xs font-mono text-center px-2 leading-relaxed">
          Google<br />AdSense<br />160×600
        </p>
        <div className="text-muted-foreground/40 text-xs font-mono">{side}</div>
      </div>
      {/* 160x160 square placeholder */}
      <div className="w-full aspect-square rounded-xl border border-dashed border-border bg-card/50 flex flex-col items-center justify-center gap-1">
        <span className="text-muted-foreground text-xs font-mono">Ad</span>
        <span className="text-muted-foreground/40 text-xs font-mono">160×160</span>
      </div>
    </div>
  );
}