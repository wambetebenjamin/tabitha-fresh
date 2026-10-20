import React from "react";
import {
  BedDouble,
  Flame,
  Footprints,
  ShieldCheck,
  Shirt,
  Zap,
} from "lucide-react";
import { ServiceIconKey } from "@/lib/data";

export default function ServiceIcon({
  iconKey,
  size = 22,
  className = "",
}: {
  iconKey: ServiceIconKey;
  size?: number;
  className?: string;
}) {
  switch (iconKey) {
    case "shirt":
      return <Shirt size={size} className={className} />;
    case "shield":
      return <ShieldCheck size={size} className={className} />;
    case "flame":
      return <Flame size={size} className={className} />;
    case "bed":
      return <BedDouble size={size} className={className} />;
    case "footprints":
      return <Footprints size={size} className={className} />;
    case "zap":
      return <Zap size={size} className={className} />;
    default:
      return <Shirt size={size} className={className} />;
  }
}
