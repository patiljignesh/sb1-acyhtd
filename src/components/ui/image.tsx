import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: number;
}

export function Image({ aspectRatio = 16/9, className, alt, ...props }: ImageProps) {
  return (
    <div 
      className={cn("relative overflow-hidden", className)}
      style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
    >
      <img
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        {...props}
      />
    </div>
  );
}