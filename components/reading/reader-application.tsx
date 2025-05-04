"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Upload } from "lucide-react"

export function ReaderApplication() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    languages: [],
    specialties: [],
    experience: "",
    bio: "",
    pricePerMinute: "",
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    timeZone: "",
    profileImage: null,
    identificationDocument: null,
    backgroundCheck: false,
    termsAgreed: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleAvailabilityChange = (day: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: checked,
      },
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMultiSelectChange = (name: string, value: string) => {
    setFormData((prev) => {
      const currentValues = prev[name as keyof typeof prev] as string[]
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [name]: currentValues.filter((v) => v !== value),
        }
      } else {
        return {
          ...prev,
          [name]: [...currentValues, value],
        }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  if (isSubmitted) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-400/20 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <CardTitle className="text-center">Application Submitted</CardTitle>
          <CardDescription className="text-center">
            Thank you for applying to become a SoulSeer reader. We'll review your application and get back to you within
            3-5 business days.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-300 mb-4">
            While you wait, you can explore our community guidelines and prepare for your verification interview.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="bg-pink-400 hover:bg-pink-500 text-black">Return to Dashboard</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Reader Application</CardTitle>
        <CardDescription>
          Join our community of spiritual readers and share your gifts with clients around the world.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <div className="relative">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex flex-col items-center relative z-10 ${
                    step < currentStep ? "text-green-400" : step === currentStep ? "text-pink-400" : "text-gray-500"
                  }`}
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${
                      step < currentStep
                        ? "bg-green-400/20 border-green-400"
                        : step === currentStep
                          ? "bg-pink-400/20 border-pink-400"
                          : "bg-gray-800/50 border-gray-700"
                    }`}
                  >
                    {step < currentStep ? <Check className="h-5 w-5" /> : <span>{step}</span>}
                  </div>
                  <span className="text-xs mt-2">
                    {step === 1 ? "Personal Info" : step === 2 ? "Professional Details" : "Verification"}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-700">
              <div className="h-full bg-pink-400" style={{ width: `${((currentStep - 1) / 2) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-700/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-700/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-800/50 border-gray-700/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-gray-800/50 border-gray-700/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => handleSelectChange("country", value)}
                  required
                >
                  <SelectTrigger id="country" className="bg-gray-800/50 border-gray-700/50">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Languages</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["English", "Spanish", "French", "German", "Portuguese", "Italian", "Other"].map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`language-${language.toLowerCase()}`}
                        checked={formData.languages.includes(language)}
                        onCheckedChange={(checked) => handleMultiSelectChange("languages", language)}
                      />
                      <Label htmlFor={`language-${language.toLowerCase()}`} className="text-sm">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Specialties</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Tarot Reading",
                    "Astrology",
                    "Psychic Medium",
                    "Spiritual Healing",
                    "Aura Reading",
                    "Chakra Balancing",
                    "Dream Interpretation",
                    "Past Life Regression",
                  ].map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox
                        id={`specialty-${specialty.toLowerCase().replace(/\s+/g, "-")}`}
                        checked={formData.specialties.includes(specialty)}
                        onCheckedChange={(checked) => handleMultiSelectChange("specialties", specialty)}
                      />
                      <Label htmlFor={`specialty-${specialty.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm">
                        {specialty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => handleSelectChange("experience", value)}
                  required
                >
                  <SelectTrigger id="experience" className="bg-gray-800/50 border-gray-700/50">
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="bg-gray-800/50 border-gray-700/50 min-h-[120px]"
                  placeholder="Tell clients about your background, abilities, and approach to readings..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerMinute">Price Per Minute ($)</Label>
                <Input
                  id="pricePerMinute"
                  name="pricePerMinute"
                  type="number"
                  min="1"
                  step="0.01"
                  value={formData.pricePerMinute}
                  onChange={handleInputChange}
                  className="bg-gray-800/50 border-gray-700/50"
                  required
                />
                <p className="text-xs text-gray-400">
                  SoulSeer takes a 30% commission. You'll receive 70% of your per-minute rate.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Availability</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.keys(formData.availability).map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={`day-${day}`}
                        checked={formData.availability[day as keyof typeof formData.availability]}
                        onCheckedChange={(checked) => handleAvailabilityChange(day, checked as boolean)}
                      />
                      <Label htmlFor={`day-${day}`} className="text-sm capitalize">
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeZone">Time Zone</Label>
                <Select
                  value={formData.timeZone}
                  onValueChange={(value) => handleSelectChange("timeZone", value)}
                  required
                >
                  <SelectTrigger id="timeZone" className="bg-gray-800/50 border-gray-700/50">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                    <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                    <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="utc+0">Greenwich Mean Time (UTC+0)</SelectItem>
                    <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                    <SelectItem value="utc+8">China Standard Time (UTC+8)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-gray-800/50 border border-gray-700/50 flex items-center justify-center overflow-hidden">
                    {formData.profileImage ? (
                      <img
                        src={URL.createObjectURL(formData.profileImage as unknown as Blob) || "/placeholder.svg"}
                        alt="Profile Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Upload className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      className="bg-gray-800/50 border-gray-700/50"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFormData((prev) => ({
                            ...prev,
                            profileImage: e.target.files?.[0] || null,
                          }))
                        }
                      }}
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Upload a clear, professional headshot. This will be visible to clients.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="identificationDocument">Identification Document</Label>
                <Input
                  id="identificationDocument"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="bg-gray-800/50 border-gray-700/50"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFormData((prev) => ({
                        ...prev,
                        identificationDocument: e.target.files?.[0] || null,
                      }))
                    }
                  }}
                  required
                />
                <p className="text-xs text-gray-400">
                  Please upload a government-issued ID for verification purposes. This will not be shared with clients.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="backgroundCheck"
                    checked={formData.backgroundCheck}
                    onCheckedChange={(checked) => handleCheckboxChange("backgroundCheck", checked as boolean)}
                    required
                  />
                  <Label htmlFor="backgroundCheck">
                    I consent to a background check as part of the verification process
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="termsAgreed"
                    checked={formData.termsAgreed}
                    onCheckedChange={(checked) => handleCheckboxChange("termsAgreed", checked as boolean)}
                    required
                  />
                  <Label htmlFor="termsAgreed">
                    I agree to the{" "}
                    <a href="#" className="text-pink-400 hover:underline">
                      Reader Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-pink-400 hover:underline">
                      Community Guidelines
                    </a>
                  </Label>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50"
                onClick={prevStep}
              >
                Previous
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep < 3 ? (
              <Button type="button" className="bg-pink-400 hover:bg-pink-500 text-black" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" className="bg-pink-400 hover:bg-pink-500 text-black" disabled={isSubmitting}>
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
                    Submitting...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
