import Image from "next/image"

interface GeneratedMapProps {
  imageUrl: string
}

export function GeneratedMap({ imageUrl }: GeneratedMapProps) {
  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-4xl aspect-[4/3] rounded-lg overflow-hidden border shadow-md">
        <Image
          src={imageUrl || "/output.png"}
          alt="Generated house floor plan"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
