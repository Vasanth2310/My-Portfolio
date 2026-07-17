import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote as QuoteIcon,
  Play,
  Pause,
  Plus,
  ExternalLink,
  Copy,
  Image as ImageIcon,
  Music,
  ChevronLeft,
  ChevronRight,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { SiteNav } from "@/components/portfolio/SiteNav";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useMemo } from "react";

// Static JSON imports
import favLinesData from "../data/fav-lines.json";
import favVidsData from "../data/fav-vids.json";
import canvasData from "../data/canvas.json";

// Asset imports
import playlistImg from "../assets/Playlist Image.jpg";
import vinylImg from "../assets/icons/vinyl.png";
import song1 from "../assets/audio/Chandiranai Thottadhu Yaar.mp3";
import song2 from "../assets/audio/Enna Solla Pogirai.mp3";
import song3 from "../assets/audio/Kangal Edho.mp3";
import song4 from "../assets/audio/Vizhi Veekura.mp3";

const TRACKS = [
  { title: "Chandiranai Thottadhu Yaar", src: song1 },
  { title: "Enna Solla Pogirai", src: song2 },
  { title: "Kangal Edho", src: song3 },
  { title: "Vizhi Veekura", src: song4 },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Dynamically resolve local canvas images if referenced in the JSON paths
const canvasImages = import.meta.glob("/src/assets/canvas/*", { eager: true });

const resolveCanvasImage = (url: string) => {
  if (url.startsWith("/src/assets/canvas/")) {
    const resolved = canvasImages[url] as { default: string } | undefined;
    return resolved ? resolved.default : url;
  }
  return url;
};

/* ---------------- TYPES & CONSTANTS ---------------- */

type TabType = "echoes" | "playhouse" | "canvas";

type Line = { id: string; text: string; createdAt: number };
type Vid = { id: string; videoId: string; url: string; addedAt: number };
type Artwork = { id: string; url: string; caption: string; addedAt: number };

/* ---------------- ROUTE DEFINITION ---------------- */

type AtelierSearch = {
  tab?: TabType;
};

export const Route = createFileRoute("/atelier")({
  validateSearch: (search: Record<string, unknown>): AtelierSearch => {
    return {
      tab: (search.tab as TabType) || "echoes",
    };
  },
  head: () => ({
    meta: [
      { title: "Atelier — Vasanth Kumar C" },
      {
        name: "description",
        content: "Vasanth Kumar C's Atelier - Quotes, Videos, and Creative Artwork Canvas.",
      },
    ],
  }),
  component: AtelierPage,
});

/* ---------------- MAIN COMPONENT ---------------- */

function AtelierPage() {
  const { tab = "echoes" } = useSearch({ from: "/atelier" });
  const navigate = useNavigate({ from: "/atelier" });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive resizing for sidebar collapsed calculations
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Synchronize URL tab changes
  const setTab = (newTab: TabType) => {
    navigate({ search: { tab: newTab } });
  };

  const desktopCollapsed = isCollapsed && !isMobile;

  return (
    <div className="relative min-h-screen md:h-screen bg-background text-foreground flex flex-col md:flex-row overflow-x-hidden md:overflow-hidden">
      <Toaster theme="dark" />
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />

      {/* Main Navigation (for desktop top or fallback) */}
      <div className="absolute top-0 inset-x-0 z-40 hidden md:block">
        <SiteNav />
      </div>

      {/* Sidebar - Left panel (resizable) */}
      <motion.aside
        animate={{ width: isMobile ? "100%" : desktopCollapsed ? 80 : 288 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-30 w-full md:h-screen border-b md:border-b-0 md:border-r border-white/5 bg-card/25 backdrop-blur-xl flex flex-col justify-between p-6 pt-20 md:pt-16 flex-shrink-0 overflow-y-auto md:overflow-y-auto scrollbar-none"
      >
        {/* Toggle Collapse/Expand Button for desktop only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-1/2 -right-3 -translate-y-1/2 hidden md:flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-card hover:bg-white/10 text-muted-foreground hover:text-foreground cursor-pointer z-40 transition"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>

        <div>
          {/* Header Title */}
          {!desktopCollapsed && (
            <div className="mb-4 hidden md:block">
              <h1 className="text-xl font-bold tracking-wider text-gradient-neon uppercase">// Atelier</h1>
              <p className="text-xs text-muted-foreground mt-1">Vasanth's Creative Space</p>
            </div>
          )}

          {/* Quick back to home for mobile */}
          <div className="flex md:hidden items-center justify-between mb-6">
            <h1 className="text-lg font-bold tracking-wider text-gradient-neon uppercase">// Atelier</h1>
          </div>

          {/* Sidebar Menu Options */}
          <nav className="flex flex-row md:flex-col gap-2 md:gap-1 pb-3 md:pb-0 scrollbar-none items-center">
            <TabButton active={tab === "echoes"} onClick={() => setTab("echoes")} icon={<QuoteIcon className="h-4 w-4" />} collapsed={desktopCollapsed}>
              Echoes
            </TabButton>
            <TabButton active={tab === "playhouse"} onClick={() => setTab("playhouse")} icon={<Play className="h-4 w-4" />} collapsed={desktopCollapsed}>
              Playhouse
            </TabButton>
            <TabButton active={tab === "canvas"} onClick={() => setTab("canvas")} icon={<ImageIcon className="h-4 w-4" />} collapsed={desktopCollapsed}>
              Canvas
            </TabButton>
          </nav>
        </div>

        {/* Sidebar Playlist & Music Player for Desktop only */}
        {!isMobile && <SidebarMusicPlayer collapsed={desktopCollapsed} isMobile={false} />}
      </motion.aside>

      {/* Mobile Sticky bottom audio player */}
      {isMobile && <SidebarMusicPlayer collapsed={false} isMobile={true} />}

      {/* Right Content Area */}
      <main className="relative z-10 flex-1 md:h-screen md:overflow-y-auto px-4 md:px-12 pb-24 pt-8 md:pt-32">
        {/* Mobile menu nav bar fallback */}
        <div className="block md:hidden mb-6">
          <SiteNav />
        </div>

        <div className="max-w-5xl mx-auto overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {tab === "echoes" && <EchoesPanel />}
              {tab === "playhouse" && <PlayhousePanel />}
              {tab === "canvas" && <CanvasPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* ---------------- TAB BUTTON COMPONENT ---------------- */

function TabButton({
  active,
  onClick,
  icon,
  children,
  collapsed = false,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
  collapsed?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-1.5 rounded-xl text-sm font-medium transition-all w-full cursor-pointer justify-start ${
        collapsed ? "md:justify-center md:px-0 md:w-10 md:h-10 md:rounded-full" : ""
      } ${
        active
          ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_oklch(0.85_0.18_195/0.1)]"
          : "text-muted-foreground hover:text-foreground hover:bg-white/[0.02] border border-transparent"
      }`}
      title={collapsed ? String(children) : undefined}
    >
      {icon}
      <span className={collapsed ? "md:hidden" : ""}>{children}</span>
    </button>
  );
}

/* ---------------- SIDEBAR PLAYLIST & MUSIC PLAYER COMPONENT ---------------- */

function SidebarMusicPlayer({ collapsed, isMobile }: { collapsed: boolean; isMobile: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  // Initialize random song on first load / visit and trigger autoplay
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * TRACKS.length);
    setCurrentTrack(randomIndex);
    setIsPlaying(true);
    setHasMounted(true);
  }, []);

  // Manage Audio instances
  useEffect(() => {
    if (!hasMounted) return;
    const audio = new Audio(TRACKS[currentTrack].src);
    audioRef.current = audio;
    audio.muted = isMuted;

    const onTimeUpdate = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    const onEnded = () => {
      const next = (currentTrack + 1) % TRACKS.length;
      setCurrentTrack(next);
    };
    const onLoaded = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("loadedmetadata", onLoaded);

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn("Autoplay block:", err);
        setIsPlaying(false);
      });
    }

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadedmetadata", onLoaded);
    };
  }, [currentTrack, hasMounted]);

  // Sync play/pause state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Sync mute state
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  const togglePlay = () => setIsPlaying((p) => !p);
  const toggleMute = () => setIsMuted((m) => !m);
  const prev = () => setCurrentTrack((t) => (t - 1 + TRACKS.length) % TRACKS.length);
  const next = () => setCurrentTrack((t) => (t + 1) % TRACKS.length);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
    setProgress(audio.currentTime);
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progressPct = duration > 0 ? (progress / duration) * 100 : 0;

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-t border-white/10 px-4 py-2 flex items-center justify-between shadow-2xl safe-bottom">
        {/* Top Progress Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-primary to-fuchsia-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Left: Artwork + Title */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <a
            href="https://open.spotify.com/playlist/3UlLeVuxzDTcXg47olRwWL?si=86648fe067a24b69"
            target="_blank"
            rel="noreferrer"
            className="relative h-10 w-10 rounded-lg overflow-hidden border border-white/10 flex-shrink-0"
          >
            <img src={playlistImg} alt="playlist" className="h-full w-full object-cover" />
            <img
              src={vinylImg}
              alt="vinyl"
              className="absolute bottom-0 right-0 h-4 w-4 animate-[spin_8s_linear_infinite]"
            />
          </a>
          <div className="min-w-0">
            <span className="text-[10px] font-semibold text-primary block leading-none mb-0.5 truncate">
              Serenading the Soul With Love
            </span>
            <span className="text-xs font-semibold text-foreground/90 block truncate leading-tight">
              {TRACKS[currentTrack].title}
            </span>
          </div>
        </div>

        {/* Right: Controls (Play/Pause, Next, Mute) */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          <button
            onClick={togglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 transition-all"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </button>
          <button
            onClick={next}
            className="rounded-lg p-2 text-muted-foreground hover:text-primary transition-all"
            title="Next track"
          >
            <SkipForward className="h-4 w-4" />
          </button>
          <button
            onClick={toggleMute}
            className="rounded-lg p-2 text-muted-foreground hover:text-primary transition-all"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
    );
  }

  if (collapsed) {
    // If collapsed, render a very simple icon-only Spotify/Music indicator
    return (
      <div className="flex flex-col items-center gap-4 mt-6 pt-6 border-t border-white/5">
        <a
          href="https://open.spotify.com/playlist/3UlLeVuxzDTcXg47olRwWL?si=86648fe067a24b69"
          target="_blank"
          rel="noreferrer"
          className="relative h-10 w-10 rounded-lg overflow-hidden border border-white/10 hover:border-primary/50 transition-all flex items-center justify-center group"
          title="Serenading the Soul With Love"
        >
          <img src={playlistImg} alt="art" className="h-full w-full object-cover" />
          <img
            src={vinylImg}
            alt="vinyl"
            className="absolute bottom-0 right-0 h-4.5 w-4.5 animate-[spin_8s_linear_infinite]"
          />
        </a>
        <button
          onClick={togglePlay}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 transition-all"
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col mt-4">
      {/* Thick Divider */}
      <div className="h-[2px] bg-white/10 w-full mb-6" />

      {/* Playlist Name - Link */}
      <a
        href="https://open.spotify.com/playlist/3UlLeVuxzDTcXg47olRwWL?si=86648fe067a24b69"
        target="_blank"
        rel="noreferrer"
        className="text-sm md:text-base font-bold text-foreground/90 hover:text-primary transition-colors block text-center mb-4 leading-snug"
      >
        Serenading the Soul With Love
      </a>

      {/* Playlist Image (Square) with Overlay Spinning Vinyl */}
      <a
        href="https://open.spotify.com/playlist/3UlLeVuxzDTcXg47olRwWL?si=86648fe067a24b69"
        target="_blank"
        rel="noreferrer"
        className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg border border-white/5 mb-5 bg-black/20 group block hover:border-primary/30 transition-colors"
      >
        <img
          src={playlistImg}
          alt="Serenading the Soul With Love"
          className="h-full w-full object-cover"
        />
        {/* Large spinning vinyl icon in bottom-right corner */}
        <div className="absolute bottom-3 right-3 h-14 w-14 rounded-full bg-black/40 backdrop-blur-sm p-1 border border-white/10 shadow-2xl flex items-center justify-center">
          <img
            src={vinylImg}
            alt="vinyl"
            className="h-full w-full object-contain animate-[spin_8s_linear_infinite]"
          />
        </div>
      </a>

      {/* Controls Container: Pause/Play Button - Song Name - Song Switch buttons */}
      <div className="space-y-3">
        {/* Audio control line: [Pause Button] [Song Name] [Mute] [Prev] [Next] */}
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 hover:shadow-[0_0_15px_oklch(0.85_0.18_195/0.25)] transition-all cursor-pointer flex-shrink-0"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </button>

          {/* Song Name (Truncated) */}
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-muted-foreground uppercase block leading-none mb-1">
              Currently Playing
            </span>
            <span className="text-xs font-semibold text-foreground/90 block truncate leading-tight">
              {TRACKS[currentTrack].title}
            </span>
          </div>

          {/* Controls Right: Prev, Next, Mute */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={prev}
              className="rounded-lg p-1.5 text-muted-foreground hover:text-primary hover:bg-white/5 transition-all cursor-pointer"
              title="Previous track"
            >
              <SkipBack className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={next}
              className="rounded-lg p-1.5 text-muted-foreground hover:text-primary hover:bg-white/5 transition-all cursor-pointer"
              title="Next track"
            >
              <SkipForward className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={toggleMute}
              className="rounded-lg p-1.5 text-muted-foreground hover:text-primary hover:bg-white/5 transition-all cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Progress bar and time indicators */}
        <div className="space-y-1">
          <div
            className="h-1 w-full rounded-full bg-white/10 cursor-pointer overflow-hidden group"
            onClick={seek}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-fuchsia-500 transition-all duration-100 group-hover:opacity-90"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-[9px] text-muted-foreground/80">
            <span>{fmt(progress)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>

        {/* Track selection dots */}
        <div className="flex justify-center gap-1.5">
          {TRACKS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentTrack(i)}
              className={`h-1 rounded-full transition-all cursor-pointer ${
                i === currentTrack
                  ? "w-4 bg-primary shadow-[0_0_6px_oklch(0.85_0.18_195/0.6)]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
              title={TRACKS[i].title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- PANEL 1: ECHOES (Quotes) ---------------- */

function EchoesPanel() {
  const [selectedLine, setSelectedLine] = useState<Line | null>(null);
  const shuffledLines = useMemo(() => shuffleArray(favLinesData), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedLine(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Echoes</h2>
        <p className="text-sm text-muted-foreground mt-1">
          A curated collection of tweets, quotes, and intelligent lines worth remembering.
        </p>
      </div>

      <motion.ul layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {shuffledLines.map((l, index) => (
            <motion.li
              key={l.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: index * 0.02 }}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => setSelectedLine(l)}
              className="group glass relative rounded-2xl p-6 min-h-[200px] border border-white/5 hover:border-primary/40 hover:bg-white/[0.04] hover:shadow-[0_12px_30px_-10px_oklch(0.85_0.18_195/0.15)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex gap-4 items-start mb-4">
                <QuoteIcon className="h-5 w-5 text-primary rotate-180 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all flex-shrink-0" />
                <p dir="auto" className="line-clamp-5 whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-foreground/90 font-medium group-hover:text-foreground transition-colors">
                  {l.text}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {new Date(l.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {/* Dialog Modal */}
      <AnimatePresence>
        {selectedLine && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLine(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass max-w-lg w-full rounded-2xl p-8 border border-white/15 bg-card/90 shadow-2xl z-10"
            >
              <button
                onClick={() => setSelectedLine(null)}
                className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-white/5 hover:text-foreground transition cursor-pointer"
              >
                <Plus className="h-5 w-5 rotate-45" />
              </button>
              <div className="flex gap-4">
                <QuoteIcon className="h-6 w-6 text-primary rotate-180 opacity-70 flex-shrink-0" />
                <div className="flex-grow">
                  <p dir="auto" className="whitespace-pre-wrap text-base sm:text-lg leading-relaxed text-foreground/95 font-medium pr-6">
                    {selectedLine.text}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {new Date(selectedLine.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedLine.text);
                        toast.success("Copied!");
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium hover:bg-white/10 transition cursor-pointer"
                    >
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------------- PANEL 2: PLAYHOUSE (Videos) ---------------- */

function PlayhousePanel() {
  const shuffledVids = useMemo(() => shuffleArray(favVidsData), []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Playhouse</h2>
        <p className="text-sm text-muted-foreground mt-1">
          A collection of favorite videos and streams.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shuffledVids.map((v) => (
          <motion.div
            key={v.id}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card hover:border-white/15 transition-colors flex flex-col"
          >
            <a href={v.url} target="_blank" rel="noreferrer" className="relative block aspect-video overflow-hidden">
              <img
                src={`https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`}
                onError={(e) => {
                  e.currentTarget.src = `https://i.ytimg.com/vi/${v.videoId}/mqdefault.jpg`;
                }}
                alt="Video thumbnail"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground group-hover:scale-110 transition-transform">
                  <Play className="ml-0.5 h-5 w-5 fill-current" />
                </span>
              </div>
            </a>
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.01]">
              <a href={v.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="h-3 w-3" /> Open YouTube
              </a>
              {"category" in v && (
                <span className="text-[10px] font-mono font-semibold tracking-wider text-primary/70 uppercase bg-primary/5 border border-primary/15 px-2 py-0.5 rounded-full">
                  {(v as { category: string }).category}
                </span>
              )}
            </div>

          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function CanvasPanel() {
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedArt(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Canvas</h2>
        <p className="text-sm text-muted-foreground mt-1">
          A showcase gallery of portrait layout paintings, drawings, and visual digital art.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {canvasData.map((art) => (
          <motion.div
            key={art.id}
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => setSelectedArt(art)}
            className="group glass overflow-hidden rounded-2xl border border-white/5 bg-card/40 hover:border-primary/40 hover:bg-white/[0.03] transition-all flex flex-col justify-between cursor-pointer"
          >
            <div className="relative aspect-[2/3] overflow-hidden bg-black/20">
              <img
                src={resolveCanvasImage(art.url)}
                alt={art.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4 bg-white/[0.01] border-t border-white/5">
              <p className="text-sm font-medium text-foreground/80 leading-relaxed">
                {art.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dialog Preview Modal */}
      <AnimatePresence>
        {selectedArt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArt(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass max-w-2xl w-full rounded-2xl overflow-hidden border border-white/15 bg-card/95 shadow-2xl z-10 flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedArt(null)}
                className="absolute right-4 top-4 rounded-full p-2 bg-black/60 hover:bg-black/80 text-muted-foreground hover:text-foreground transition cursor-pointer z-20"
                title="Close overlay"
              >
                <Plus className="h-5 w-5 rotate-45" />
              </button>

              <div className="relative w-full overflow-hidden max-h-[70vh] flex justify-center bg-black/20">
                <img
                  src={resolveCanvasImage(selectedArt.url)}
                  alt={selectedArt.caption}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>

              <div className="p-5 bg-white/[0.02] border-t border-white/5">
                <p className="text-sm font-medium text-foreground/90 leading-relaxed">
                  {selectedArt.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
