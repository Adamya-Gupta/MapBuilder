"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { PlotGrid } from "@/components/plot-grid";
import { GeneratedMap } from "@/components/generated-map";
import { ArrowLeft, ArrowRight, Check, Home, Loader2 } from "lucide-react";

type PlotSize = {
  width: number;
  height: number;
};

type Room = {
  id: string;
  name: string;
  position: { x: number; y: number } | null;
};

type ProjectDetails = {
  budget: string;
  style: string;
  floors: number;
  terrain: string;
  climate: string;
  specialRequirements: string;
};

export function HousePlotDesigner() {
  const [step, setStep] = useState<"details" | "setup" | "design" | "result">(
    "details"
  );
  const [plotSize, setPlotSize] = useState<PlotSize>({ width: 15, height: 12 });
  const [numberOfRooms, setNumberOfRooms] = useState<number>(5);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [generatedMapUrl, setGeneratedMapUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    budget: "100000-200000",
    style: "modern",
    floors: 1,
    terrain: "flat",
    climate: "temperate",
    specialRequirements: "",
  });

  const handlePlotSizeChange = (
    dimension: "width" | "height",
    value: number[]
  ) => {
    const numValue = value[0];
    if (numValue > 0 && numValue <= 100) {
      setPlotSize((prev) => ({ ...prev, [dimension]: numValue }));
    }
  };

  const handleNumberOfRoomsChange = (value: number[]) => {
    const numValue = value[0];
    if (numValue > 0 && numValue <= 10) {
      setNumberOfRooms(numValue);
    }
  };

  const updateProjectDetails = (
    field: keyof ProjectDetails,
    value: string | number
  ) => {
    setProjectDetails((prev) => ({ ...prev, [field]: value }));
  };

  const startSetup = () => {
    setStep("setup");
  };

  const startDesign = () => {
    // Initialize rooms with names
    const roomTypes = [
      "Living Room",
      "Kitchen",
      "Master Bedroom",
      "Bathroom",
      "Dining Room",
      "Guest Bedroom",
      "Study",
      "Laundry Room",
      "Garage",
      "Patio",
    ];

    const initialRooms = Array.from({ length: numberOfRooms }, (_, i) => ({
      id: `room-${i + 1}`,
      name: i < roomTypes.length ? roomTypes[i] : `Room ${i + 1}`,
      position: null,
    }));
    setRooms(initialRooms);
    setCurrentRoom(initialRooms[0]);
    setStep("design");
  };

  const handleCellClick = (x: number, y: number) => {
    if (!currentRoom) return;

    // Update the position of the current room
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === currentRoom.id) {
          return {
            ...room,
            position: { x, y },
          };
        }
        return room;
      })
    );

    // Update current room with the new position
    setCurrentRoom((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        position: { x, y },
      };
    });

    // Automatically move to the next room if available
    const currentIndex = rooms.findIndex((room) => room.id === currentRoom.id);
    if (currentIndex < rooms.length - 1) {
      const nextRoom = rooms[currentIndex + 1];
      setCurrentRoom(nextRoom);
    }
  };

  const selectRoom = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setCurrentRoom(room);
    }
  };

  const generateMap = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if all rooms have positions
      const unpositionedRooms = rooms.filter((room) => !room.position);
      if (unpositionedRooms.length > 0) {
        throw new Error(
          `Please position all rooms before generating the map. Missing: ${unpositionedRooms
            .map((r) => r.name)
            .join(", ")}`
        );
      }

      // Prepare the data to send to the backend
      const data = {
        plotSize,
        numberOfRooms,
        rooms,
        projectDetails,
      };

      // In a real application, you would send this data to your backend
      console.log("Sending data to backend:", JSON.stringify(data, null, 2));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate receiving an image URL from the backend
      setGeneratedMapUrl("/output.png");
      setStep("result");
    } catch (err: any) {
      setError(err.message || "Failed to generate map. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetDesign = () => {
    setStep("details");
    setRooms([]);
    setCurrentRoom(null);
    setGeneratedMapUrl(null);
  };

  const goBack = () => {
    if (step === "setup") setStep("details");
    else if (step === "design") setStep("setup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-6xl mx-auto shadow-lg">
            <CardHeader className="bg-emerald-600 text-white">
              <div className="flex items-center">
                <Home className="h-8 w-8 mr-3" />
                <div>
                  <CardTitle className="text-2xl">MapBuilder</CardTitle>
                  <CardDescription className="text-emerald-100">
                    Design your dream home with AI
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 md:p-8">
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {[
                    "Project Details",
                    "Plot Setup",
                    "Room Placement",
                    "Final Design",
                  ].map((stageName, index) => {
                    const stageValue = ["details", "setup", "design", "result"][
                      index
                    ];
                    const isActive = step === stageValue;
                    const isPast =
                      (step === "setup" && index === 0) ||
                      (step === "design" && index <= 1) ||
                      (step === "result" && index <= 2);

                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isActive
                              ? "bg-emerald-600 text-white"
                              : isPast
                              ? "bg-emerald-200 text-emerald-800"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {isPast ? <Check className="h-5 w-5" /> : index + 1}
                        </div>
                        <span
                          className={`text-xs mt-1 ${
                            isActive
                              ? "text-emerald-600 font-medium"
                              : "text-slate-500"
                          }`}
                        >
                          {stageName}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-300"
                    style={{
                      width:
                        step === "details"
                          ? "25%"
                          : step === "setup"
                          ? "50%"
                          : step === "design"
                          ? "75%"
                          : "100%",
                    }}
                  ></div>
                </div>
              </div>

              {step === "details" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      Tell us about your dream home
                    </h2>
                    <p className="text-slate-600 mb-6">
                      These details will help our AI create a floor plan that
                      matches your vision and requirements.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="budget" className="text-base">
                          What's your budget range?
                        </Label>
                        <Select
                          value={projectDetails.budget}
                          onValueChange={(value) =>
                            updateProjectDetails("budget", value)
                          }
                        >
                          <SelectTrigger id="budget" className="w-full">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-100000">
                              Under INR100,000
                            </SelectItem>
                            <SelectItem value="100000-200000">
                              INR100,000 - INR200,000
                            </SelectItem>
                            <SelectItem value="200000-300000">
                              INR200,000 - INR300,000
                            </SelectItem>
                            <SelectItem value="300000-500000">
                              INR300,000 - INR500,000
                            </SelectItem>
                            <SelectItem value="over-500000">
                              Over INR500,000
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="style" className="text-base">
                          Preferred architectural style
                        </Label>
                        <Select
                          value={projectDetails.style}
                          onValueChange={(value) =>
                            updateProjectDetails("style", value)
                          }
                        >
                          <SelectTrigger id="style" className="w-full">
                            <SelectValue placeholder="Select architectural style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="traditional">
                              Traditional
                            </SelectItem>
                            <SelectItem value="contemporary">
                              Contemporary
                            </SelectItem>
                            <SelectItem value="minimalist">
                              Minimalist
                            </SelectItem>
                            <SelectItem value="farmhouse">Farmhouse</SelectItem>
                            <SelectItem value="mediterranean">
                              Mediterranean
                            </SelectItem>
                            <SelectItem value="colonial">Colonial</SelectItem>
                            <SelectItem value="craftsman">Craftsman</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="floors" className="text-base">
                          Number of floors
                        </Label>
                        <Select
                          value={projectDetails.floors.toString()}
                          onValueChange={(value) =>
                            updateProjectDetails(
                              "floors",
                              Number.parseInt(value)
                            )
                          }
                        >
                          <SelectTrigger id="floors" className="w-full">
                            <SelectValue placeholder="Select number of floors" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Floor</SelectItem>
                            <SelectItem value="2">2 Floors</SelectItem>
                            <SelectItem value="3">3 Floors</SelectItem>
                            <SelectItem value="4">4+ Floors</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="terrain" className="text-base">
                          Terrain type
                        </Label>
                        <Select
                          value={projectDetails.terrain}
                          onValueChange={(value) =>
                            updateProjectDetails("terrain", value)
                          }
                        >
                          <SelectTrigger id="terrain" className="w-full">
                            <SelectValue placeholder="Select terrain type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="flat">Flat</SelectItem>
                            <SelectItem value="sloped">Sloped</SelectItem>
                            <SelectItem value="hilly">Hilly</SelectItem>
                            <SelectItem value="waterfront">
                              Waterfront
                            </SelectItem>
                            <SelectItem value="rocky">Rocky</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="climate" className="text-base">
                          Climate considerations
                        </Label>
                        <Select
                          value={projectDetails.climate}
                          onValueChange={(value) =>
                            updateProjectDetails("climate", value)
                          }
                        >
                          <SelectTrigger id="climate" className="w-full">
                            <SelectValue placeholder="Select climate type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="temperate">Temperate</SelectItem>
                            <SelectItem value="hot">Hot/Arid</SelectItem>
                            <SelectItem value="cold">Cold</SelectItem>
                            <SelectItem value="tropical">Tropical</SelectItem>
                            <SelectItem value="coastal">Coastal</SelectItem>
                            <SelectItem value="mountain">Mountain</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label
                          htmlFor="special-requirements"
                          className="text-base"
                        >
                          Special requirements
                        </Label>
                        <Textarea
                          id="special-requirements"
                          placeholder="E.g., accessibility features, energy efficiency, smart home integration, etc."
                          value={projectDetails.specialRequirements}
                          onChange={(e) =>
                            updateProjectDetails(
                              "specialRequirements",
                              e.target.value
                            )
                          }
                          className="min-h-[120px]"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "setup" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      Define your plot dimensions
                    </h2>
                    <p className="text-slate-600 mb-6">
                      Set the size of your construction plot. This will
                      determine the available space for your home.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <Label htmlFor="width" className="text-base">
                            Plot Width (meters)
                          </Label>
                          <span className="text-slate-500 font-medium">
                            {plotSize.width}m
                          </span>
                        </div>
                        <Slider
                          id="width"
                          min={5}
                          max={100}
                          step={1}
                          value={[plotSize.width]}
                          onValueChange={(value) =>
                            handlePlotSizeChange("width", value)
                          }
                          className="py-4"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <Label htmlFor="height" className="text-base">
                            Plot Depth (meters)
                          </Label>
                          <span className="text-slate-500 font-medium">
                            {plotSize.height}m
                          </span>
                        </div>
                        <Slider
                          id="height"
                          min={5}
                          max={100}
                          step={1}
                          value={[plotSize.height]}
                          onValueChange={(value) =>
                            handlePlotSizeChange("height", value)
                          }
                          className="py-4"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <Label htmlFor="rooms" className="text-base">
                            Number of Rooms
                          </Label>
                          <span className="text-slate-500 font-medium">
                            {numberOfRooms}
                          </span>
                        </div>
                        <Slider
                          id="rooms"
                          min={3}
                          max={10}
                          step={1}
                          value={[numberOfRooms]}
                          onValueChange={(value) =>
                            handleNumberOfRoomsChange(value)
                          }
                          className="py-4"
                        />
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-lg font-semibold mb-4">
                        Plot Preview
                      </h3>
                      <div className="aspect-[4/3] bg-slate-100 rounded-md border border-slate-300 flex items-center justify-center relative">
                        <div
                          className="bg-emerald-100 border-2 border-emerald-500 rounded-md relative"
                          style={{
                            width: `${Math.min(
                              90,
                              (plotSize.width / 100) * 90
                            )}%`,
                            height: `${Math.min(
                              90,
                              (plotSize.height / 100) * 90
                            )}%`,
                          }}
                        >
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-700">
                            {plotSize.width}m
                          </div>
                          <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-xs font-medium text-slate-700 rotate-90">
                            {plotSize.height}m
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-slate-600">
                        <p>
                          Total area:{" "}
                          <span className="font-medium">
                            {plotSize.width * plotSize.height} m²
                          </span>
                        </p>
                        <p className="mt-1">
                          Rooms to place:{" "}
                          <span className="font-medium">{numberOfRooms}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "design" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      Place your rooms
                    </h2>
                    <p className="text-slate-600 mb-6">
                      Click on the grid to indicate where you want each room to
                      be positioned. Select one point per room.
                    </p>
                  </div>

                  <Tabs defaultValue={rooms[0]?.id} className="w-full">
                    <TabsList className="w-full flex overflow-x-auto">
                      {rooms.map((room) => (
                        <TabsTrigger
                          key={room.id}
                          value={room.id}
                          onClick={() => selectRoom(room.id)}
                          className="flex-1"
                        >
                          <div className="flex items-center">
                            {room.position ? (
                              <Check className="h-3 w-3 mr-1 text-emerald-500" />
                            ) : null}
                            <span>{room.name}</span>
                          </div>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {rooms.map((room) => (
                      <TabsContent key={room.id} value={room.id}>
                        <div className="text-sm mb-2">
                          {room.position
                            ? `${room.name} positioned at coordinates (${room.position.x}, ${room.position.y}). Click elsewhere to reposition.`
                            : `Click on the grid to position ${room.name}.`}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>

                  <div className="border rounded-lg p-4 overflow-auto bg-white">
                    <PlotGrid
                      width={plotSize.width}
                      height={plotSize.height}
                      rooms={rooms}
                      currentRoomId={currentRoom?.id || ""}
                      onCellClick={handleCellClick}
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </motion.div>
              )}

              {step === "result" && generatedMapUrl && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      Your AI-Generated Floor Plan
                    </h2>
                    <p className="text-slate-600 mb-6">
                      Here's your custom floor plan based on your preferences
                      and room placements.
                    </p>
                  </div>

                  <GeneratedMap imageUrl={generatedMapUrl} />

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-800">
                    <h3 className="font-semibold mb-2">Design Summary</h3>
                    <ul className="space-y-1 text-sm">
                      <li>
                        Plot size: {plotSize.width}m × {plotSize.height}m (
                        {plotSize.width * plotSize.height}m²)
                      </li>
                      <li>
                        Architectural style:{" "}
                        {projectDetails.style.charAt(0).toUpperCase() +
                          projectDetails.style.slice(1)}
                      </li>
                      <li>Number of rooms: {rooms.length}</li>
                      <li>Number of floors: {projectDetails.floors}</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between p-6 bg-slate-50 border-t">
              {step !== "details" && step !== "result" && (
                <Button variant="outline" onClick={goBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              )}

              {step === "details" && (
                <Button
                  className="ml-auto bg-emerald-600 hover:bg-emerald-700"
                  onClick={startSetup}
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              {step === "setup" && (
                <Button
                  className="ml-auto bg-emerald-600 hover:bg-emerald-700"
                  onClick={startDesign}
                >
                  Start Placing Rooms <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              {step === "design" && (
                <Button
                  className="ml-auto bg-emerald-600 hover:bg-emerald-700"
                  onClick={generateMap}
                  disabled={isLoading || rooms.some((room) => !room.position)}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate Floor Plan{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}

              {step === "result" && (
                <div className="flex gap-4 w-full">
                  <Button
                    variant="outline"
                    onClick={resetDesign}
                    className="flex-1"
                  >
                    Start New Design
                  </Button>
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    Download Floor Plan
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
