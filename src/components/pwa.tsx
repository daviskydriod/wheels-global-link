import { useEffect, useState } from "react";
import {
  Check,
  ChevronRight,
  Download,
  Globe,
  MoreVertical,
  Share,
  Smartphone,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};
const REMINDER_KEY = "awa-install-reminder-dismissed";
const ONBOARDING_KEY = "awa-install-onboarding-seen";

export function PwaRuntime() {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  const [onboarding, setOnboarding] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [platform, setPlatform] = useState<"android" | "ios" | "desktop">("desktop");
  const [installed, setInstalled] = useState(false);
  useEffect(() => {
    if ("serviceWorker" in navigator)
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setPlatform(isIos ? "ios" : /android/i.test(navigator.userAgent) ? "android" : "desktop");
    setInstalled(standalone);
    if (!standalone && !localStorage.getItem(ONBOARDING_KEY)) setOnboarding(true);
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);
  const dismiss = (remember = false) => {
    setOnboarding(false);
    setReminder(false);
    if (remember) localStorage.setItem(ONBOARDING_KEY, "1");
  };
  const install = async () => {
    if (installEvent) {
      await installEvent.prompt();
      setInstalled(true);
      dismiss(true);
    } else {
      dismiss(true);
      setReminder(true);
    }
  };
  if (installed) return null;
  return (
    <>
      {onboarding && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#081126]/75 p-3 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="relative overflow-hidden bg-[#101b33] px-6 pb-8 pt-8 text-white">
              <button
                type="button"
                onClick={() => dismiss(true)}
                className="absolute right-4 top-4 text-white/60"
                aria-label="Close install onboarding"
              >
                <X />
              </button>
              <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-primary font-display text-3xl font-bold shadow-lg">
                A
              </div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-primary-foreground/60">
                AWA AUTO MALL
              </p>
              <h2 className="mt-2 text-3xl font-extrabold leading-none">
                Your vehicle desk,
                <br />
                ready to go.
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/65">
                Install the AWA app for faster access to your shortlist, inquiries, sourcing
                updates, and admin workspace.
              </p>
            </div>
            <div className="space-y-3 p-5">
              <OnboardingItem icon={Smartphone} text="Quick access from your home screen" />
              <OnboardingItem icon={Globe} text="Works across Android, iPhone, iPad and desktop" />
              <OnboardingItem icon={Check} text="Fast loading with offline app shell support" />
              <Button onClick={install} size="lg" className="mt-3 w-full" variant="automotive">
                {installEvent ? (
                  <>
                    <Download /> Install AWA AUTO MALL
                  </>
                ) : (
                  <>
                    Show install instructions <ChevronRight />
                  </>
                )}
              </Button>
              <button
                type="button"
                onClick={() => {
                  dismiss(false);
                  setReminder(true);
                }}
                className="w-full py-2 text-xs font-bold text-slate-400"
              >
                Remind me later
              </button>
            </div>
          </div>
        </div>
      )}
      {reminder && (
        <InstallReminder
          platform={platform}
          installEvent={installEvent}
          onInstall={install}
          onClose={() => setReminder(false)}
        />
      )}
    </>
  );
}
function OnboardingItem({ icon: Icon, text }: { icon: typeof Check; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      {text}
    </div>
  );
}
function InstallReminder({
  platform,
  installEvent,
  onInstall,
  onClose,
}: {
  platform: string;
  installEvent: InstallPromptEvent | null;
  onInstall: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-x-3 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 mx-auto max-w-md rounded-2xl border border-primary/20 bg-white p-4 shadow-2xl sm:inset-x-auto sm:bottom-5 sm:right-5">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-white">
          <Download className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-extrabold">Install AWA AUTO MALL</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {installEvent
              ? "Add the app to your device for one-tap access."
              : platform === "ios"
                ? "Tap Share, then Add to Home Screen."
                : "Use your browser menu and choose Install or Add to Home Screen."}
          </p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close install reminder">
          <X className="h-4 w-4 text-slate-400" />
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        {(installEvent || platform !== "desktop") && (
          <Button size="sm" onClick={onInstall} className="flex-1">
            {installEvent ? (
              "Install now"
            ) : platform === "ios" ? (
              <>
                <Share /> Share menu
              </>
            ) : (
              <>
                <MoreVertical /> Browser menu
              </>
            )}
          </Button>
        )}
        <Button size="sm" variant="outline" onClick={onClose}>
          Later
        </Button>
      </div>
    </div>
  );
}
