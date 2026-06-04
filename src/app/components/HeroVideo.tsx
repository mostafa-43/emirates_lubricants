import { useState } from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";

interface HeroVideoProps {
  videoId: string;
  posterUrl?: string;
  title?: string;
}

export function HeroVideo({ videoId, posterUrl, title = "Intro Video" }: HeroVideoProps) {
  const [playing, setPlaying] = useState(false);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`;
  const poster = posterUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 bg-black shadow-2xl">
      {playing ? (
        <div className="relative aspect-[16/9]">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <motion.button
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setPlaying(true)}
          className="group relative w-full overflow-hidden rounded-3xl bg-black"
        >
          <img
            src={poster}
            alt={title}
            className="w-full h-auto min-h-[220px] object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-xl transition duration-200 group-hover:scale-105">
              <Play className="w-10 h-10" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-4 text-left">
            <p className="text-sm font-semibold text-white">Watch our introduction video</p>
          </div>
        </motion.button>
      )}
    </div>
  );
}
