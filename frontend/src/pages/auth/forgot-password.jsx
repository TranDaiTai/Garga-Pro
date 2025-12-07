"use client"


import { useState } from "react"
import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate sending reset email
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setSubmitted(true)
    console.log("[v0] Password reset requested for:", email)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/gradient-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute inset-0 opacity-0"
        style={{
          background: "rgba(0, 0, 0, 0.15)",
        }}
      ></div>

      {/* Floating glass orbs for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-50 animate-pulse"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
          }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full opacity-40 animate-pulse delay-1000"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
          }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full opacity-45 animate-pulse delay-500"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
          }}
        ></div>
      </div>

      <Card
        className="max-w-md hover-lift shadow-2xl relative z-10 opacity-100 w-[126%] mx-[0] border-transparent"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(40px) saturate(250%)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow:
            "0 32px 80px rgba(0, 0, 0, 0.3), 0 16px 64px rgba(255, 255, 255, 0.2), inset 0 3px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(255, 255, 255, 0.3)",
        }}
      >
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold font-sans text-card-foreground">Reset Password</CardTitle>
          <CardDescription className="text-card-foreground/70 font-sans">
            Enter your email to receive reset instructions
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-card-foreground font-sans">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-white/40 bg-white/10 placeholder:text-card-foreground/50 text-card-foreground py-3 focus:ring-2 focus:border-orange-500 focus:bg-white/15 transition-all duration-200"
                  style={{ "--tw-ring-color": "var(--accent)" } }
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full ripple-effect hover-lift font-sans font-bold py-5 transition-all duration-300"
                style={{ backgroundColor: "var(--accent)", color: "white" }}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-semibold text-green-800 font-sans mb-2">Check Your Email</p>
                <p className="text-sm text-green-700 font-sans">
                  We{"'"}ve sent a password reset link to <span className="font-semibold">{email}</span>. Please check
                  your inbox and follow the instructions to reset your password.
                </p>
              </div>
              <Button
                onClick={() => {
                  setSubmitted(false)
                  setEmail("")
                }}
                className="w-full ripple-effect hover-lift font-sans font-bold py-5 transition-all duration-300"
                style={{ backgroundColor: "var(--accent)", color: "white" }}
              >
                Try Another Email
              </Button>
            </div>
          )}

          <div className="text-center text-sm text-card-foreground/70 font-sans">
            Remember your password?{" "}
            <Link href="/login" className="text-card-foreground hover:underline font-semibold">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
