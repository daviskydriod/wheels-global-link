import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PwaRuntime() {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if ("serviceWorker" in navigator)
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);
  if (!visible || !installEvent) return null;
  return (
    <div className="fixed inset-x-3 bottom-20 z-50 mx-auto flex max-w-md items-center gap-3 border border-primary/30 bg-background p-4 shadow-2xl sm:inset-x-auto sm:right-5 sm:bottom-5">
      <Download className="h-5 w-5 shrink-0 text-primary" />
      <p className="flex-1 text-sm font-semibold">Install AWA AUTO MALL for faster access.</p>
      <Button
        size="sm"
        onClick={async () => {
          await installEvent.prompt();
          setVisible(false);
        }}
      >
        Install
      </Button>
      <button type="button" aria-label="Dismiss install prompt" onClick={() => setVisible(false)}>
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
