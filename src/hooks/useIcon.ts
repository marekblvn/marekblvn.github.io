import { useMemo } from "react";

interface IconProps {
  icon: string;
}

function useIcon({ icon }: IconProps): string {
  const icons = import.meta.glob<{ default: string }>(
    "/src/assets/icons/*.png",
    { eager: true, import: "default" }
  );

  const iconUrl = useMemo(() => {
    const iconPath = `/src/assets/icons/${icon}.png`;
    return icons[iconPath].default || "/src/assets/icons/empty.png";
  }, [icon, icons]);

  return iconUrl;
}

export default useIcon;
