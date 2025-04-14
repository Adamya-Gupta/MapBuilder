"use client"

import { cn } from "@/lib/utils"

type Room = {
  id: string
  name: string
  position: { x: number; y: number } | null
}

interface PlotGridProps {
  width: number
  height: number
  rooms: Room[]
  currentRoomId: string
  onCellClick: (x: number, y: number) => void
}

// Generate a color for each room
const getColorForRoom = (roomId: string) => {
  // Extract the number from the room ID (e.g., "room-1" -> 1)
  const roomNumber = Number.parseInt(roomId.split("-")[1])

  // List of distinct colors
  const colors = [
    "bg-red-500 text-white",
    "bg-blue-500 text-white",
    "bg-green-500 text-white",
    "bg-yellow-500 text-black",
    "bg-purple-500 text-white",
    "bg-pink-500 text-white",
    "bg-indigo-500 text-white",
    "bg-orange-500 text-white",
    "bg-teal-500 text-white",
    "bg-cyan-500 text-white",
  ]

  // Use modulo to cycle through colors if there are more rooms than colors
  return colors[(roomNumber - 1) % colors.length]
}

export function PlotGrid({ width, height, rooms, currentRoomId, onCellClick }: PlotGridProps) {
  // Create a grid of cells
  const grid = Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) => ({ x, y })))

  // Find which room a cell belongs to
  const getRoomAtPosition = (x: number, y: number) => {
    return rooms.find((room) => room.position?.x === x && room.position?.y === y)
  }

  // Get the current room
  const currentRoom = rooms.find((room) => room.id === currentRoomId)

  return (
    <div className="relative">
      <div className="absolute -top-8 left-0 right-0 flex justify-center text-sm text-slate-500">Width: {width}m</div>
      <div className="absolute top-0 -left-8 bottom-0 flex items-center text-sm text-slate-500 transform -rotate-90">
        Depth: {height}m
      </div>

      <div
        className="grid gap-px bg-slate-200"
        style={{
          gridTemplateColumns: `repeat(${width}, minmax(20px, 1fr))`,
          width: `min(100%, ${width * 30}px)`,
        }}
      >
        {grid.flat().map((cell) => {
          const roomAtPosition = getRoomAtPosition(cell.x, cell.y)
          const isCurrentRoomPosition = roomAtPosition?.id === currentRoomId

          return (
            <div
              key={`${cell.x}-${cell.y}`}
              className={cn(
                "aspect-square bg-white flex items-center justify-center text-xs cursor-pointer transition-all hover:bg-slate-100",
                roomAtPosition ? "ring-2" : "",
                isCurrentRoomPosition ? "ring-2 ring-black" : "",
              )}
              onClick={() => onCellClick(cell.x, cell.y)}
              title={`Cell (${cell.x}, ${cell.y})${roomAtPosition ? ` - ${roomAtPosition.name}` : ""}`}
            >
              {roomAtPosition && (
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                    getColorForRoom(roomAtPosition.id),
                  )}
                  title={roomAtPosition.name}
                >
                  {roomAtPosition.name.charAt(0)}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={cn(
              "text-xs p-1 rounded flex items-center",
              room.id === currentRoomId ? "bg-slate-200" : "bg-white",
              room.position ? "opacity-100" : "opacity-70",
            )}
          >
            <div
              className={cn(
                "w-4 h-4 rounded-full mr-1 flex items-center justify-center text-[10px] font-bold",
                getColorForRoom(room.id),
              )}
            >
              {room.name.charAt(0)}
            </div>
            <span className="truncate">{room.name}</span>
            {room.position && (
              <span className="ml-auto text-slate-500">
                ({room.position.x},{room.position.y})
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
