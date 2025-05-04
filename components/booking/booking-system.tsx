"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Phone, Video, Clock, CalendarIcon, CreditCard } from "lucide-react"

interface BookingSystemProps {
  readerId: string
  readerName: string
  readerAvatar: string
  readerSpecialty: string
  readerRating: number
  readerPrice: number
}

export function BookingSystem({
  readerId,
  readerName,
  readerAvatar,
  readerSpecialty,
  readerRating,
  readerPrice,
}: BookingSystemProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [readingType, setReadingType] = useState<"chat" | "call" | "video">("chat")
  const [duration, setDuration] = useState<number>(15)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  // Mock available time slots
  const availableTimeSlots = ["9:00 AM", "10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"]

  const handleBooking = () => {
    if (!date || !selectedTime) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsBooked(true)
    }, 1500)
  }

  const totalCost = readerPrice * duration

  return (
    <div className="space-y-6">
      {isBooked ? (
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-400/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-center">Booking Confirmed!</CardTitle>
            <CardDescription className="text-center">
              Your reading with {readerName} has been scheduled.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="glass-card p-4 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={readerAvatar} alt={readerName} />
                  <AvatarFallback className="bg-pink-400/20 text-pink-400">{readerName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{readerName}</h3>
                  <p className="text-sm text-gray-400">{readerSpecialty}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-pink-400" />
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="font-medium">{date?.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-pink-400" />
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="font-medium">{selectedTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {readingType === "chat" ? (
                    <MessageSquare className="h-5 w-5 text-pink-400" />
                  ) : readingType === "call" ? (
                    <Phone className="h-5 w-5 text-pink-400" />
                  ) : (
                    <Video className="h-5 w-5 text-pink-400" />
                  )}
                  <div>
                    <p className="text-sm text-gray-400">Reading Type</p>
                    <p className="font-medium capitalize">{readingType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-pink-400" />
                  <div>
                    <p className="text-sm text-gray-400">Total Cost</p>
                    <p className="font-medium">${totalCost.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-400">
              <p>You'll receive a confirmation email with details and instructions for your reading.</p>
              <p className="mt-2">Please be online 5 minutes before your scheduled time.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="bg-pink-400 hover:bg-pink-500 text-black">Add to Calendar</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Book a Reading with {readerName}</CardTitle>
            <CardDescription>Select your preferred date, time, and reading type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50">
              <Avatar className="h-12 w-12">
                <AvatarImage src={readerAvatar} alt={readerName} />
                <AvatarFallback className="bg-pink-400/20 text-pink-400">{readerName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium">{readerName}</h3>
                <p className="text-sm text-gray-400">{readerSpecialty}</p>
                <div className="flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-yellow-400 fill-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm">{readerRating}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-pink-400 font-medium">${readerPrice}/min</p>
              </div>
            </div>

            <Tabs defaultValue="date" className="w-full">
              <TabsList className="bg-gray-800/70 w-full mb-4">
                <TabsTrigger
                  value="date"
                  className="flex-1 data-[state=active]:bg-pink-400 data-[state=active]:text-black"
                >
                  1. Select Date
                </TabsTrigger>
                <TabsTrigger
                  value="time"
                  className="flex-1 data-[state=active]:bg-pink-400 data-[state=active]:text-black"
                  disabled={!date}
                >
                  2. Select Time
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="flex-1 data-[state=active]:bg-pink-400 data-[state=active]:text-black"
                  disabled={!date || !selectedTime}
                >
                  3. Reading Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="date" className="mt-0">
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border border-gray-700/50 bg-gray-800/50"
                    disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    className="bg-pink-400 hover:bg-pink-500 text-black"
                    disabled={!date}
                    onClick={() => document.querySelector('[data-value="time"]')?.click()}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="time" className="mt-0">
                <div className="grid grid-cols-3 gap-3">
                  {availableTimeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={
                        selectedTime === time
                          ? "bg-pink-400 hover:bg-pink-500 text-black"
                          : "border-gray-700/50 text-gray-300 hover:bg-gray-800/50"
                      }
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50"
                    onClick={() => document.querySelector('[data-value="date"]')?.click()}
                  >
                    Back
                  </Button>
                  <Button
                    className="bg-pink-400 hover:bg-pink-500 text-black"
                    disabled={!selectedTime}
                    onClick={() => document.querySelector('[data-value="details"]')?.click()}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-0">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>Reading Type</Label>
                    <RadioGroup
                      defaultValue="chat"
                      value={readingType}
                      onValueChange={(value) => setReadingType(value as "chat" | "call" | "video")}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="chat" id="reading-chat" className="peer sr-only" />
                        <Label
                          htmlFor="reading-chat"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700/50 bg-gray-800/30 p-4 hover:bg-gray-800/50 hover:border-gray-600 peer-data-[state=checked]:border-pink-400 peer-data-[state=checked]:bg-pink-400/10 [&:has([data-state=checked])]:border-pink-400"
                        >
                          <MessageSquare className="mb-3 h-6 w-6 text-pink-400" />
                          <span className="text-sm font-medium">Chat</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="call" id="reading-call" className="peer sr-only" />
                        <Label
                          htmlFor="reading-call"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700/50 bg-gray-800/30 p-4 hover:bg-gray-800/50 hover:border-gray-600 peer-data-[state=checked]:border-pink-400 peer-data-[state=checked]:bg-pink-400/10 [&:has([data-state=checked])]:border-pink-400"
                        >
                          <Phone className="mb-3 h-6 w-6 text-pink-400" />
                          <span className="text-sm font-medium">Call</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="video" id="reading-video" className="peer sr-only" />
                        <Label
                          htmlFor="reading-video"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700/50 bg-gray-800/30 p-4 hover:bg-gray-800/50 hover:border-gray-600 peer-data-[state=checked]:border-pink-400 peer-data-[state=checked]:bg-pink-400/10 [&:has([data-state=checked])]:border-pink-400"
                        >
                          <Video className="mb-3 h-6 w-6 text-pink-400" />
                          <span className="text-sm font-medium">Video</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Duration</Label>
                    <RadioGroup
                      defaultValue="15"
                      value={duration.toString()}
                      onValueChange={(value) => setDuration(Number.parseInt(value))}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="15" id="duration-15" className="peer sr-only" />
                        <Label
                          htmlFor="duration-15"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700/50 bg-gray-800/30 p-4 hover:bg-gray-800/50 hover:border-gray-600 peer-data-[state=checked]:border-pink-400 peer-data-[state=checked]:bg-pink-400/10 [&:has([data-state=checked])]:border-pink-400"
                        >
                          <span className="text-sm font-medium">15 min</span>
                          <span className="mt-1 text-xs text-gray-400">${(readerPrice * 15).toFixed(2)}</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="30" id="duration-30" className="peer sr-only" />
                        <Label
                          htmlFor="duration-30"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700/50 bg-gray-800/30 p-4 hover:bg-gray-800/50 hover:border-gray-600 peer-data-[state=checked]:border-pink-400 peer-data-[state=checked]:bg-pink-400/10 [&:has([data-state=checked])]:border-pink-400"
                        >
                          <span className="text-sm font-medium">30 min</span>
                          <span className="mt-1 text-xs text-gray-400">${(readerPrice * 30).toFixed(2)}</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="60" id="duration-60" className="peer sr-only" />
                        <Label
                          htmlFor="duration-60"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700/50 bg-gray-800/30 p-4 hover:bg-gray-800/50 hover:border-gray-600 peer-data-[state=checked]:border-pink-400 peer-data-[state=checked]:bg-pink-400/10 [&:has([data-state=checked])]:border-pink-400"
                        >
                          <span className="text-sm font-medium">60 min</span>
                          <span className="mt-1 text-xs text-gray-400">${(readerPrice * 60).toFixed(2)}</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-800/50">
                    <h4 className="font-medium mb-2">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date:</span>
                        <span>{date?.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time:</span>
                        <span>{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Reading Type:</span>
                        <span className="capitalize">{readingType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span>{duration} minutes</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span className="text-pink-400">${totalCost.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50"
                    onClick={() => document.querySelector('[data-value="time"]')?.click()}
                  >
                    Back
                  </Button>
                  <Button
                    className="bg-pink-400 hover:bg-pink-500 text-black"
                    onClick={handleBooking}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
