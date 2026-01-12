"use client"

// Mock authentication utilities

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("isAuthenticated") === "true"
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null
  const email = localStorage.getItem("userEmail")
  const name = localStorage.getItem("userName")
  if (!email) return null
  return {
    id: "1",
    email,
    name: name || email.split("@")[0],
    role: "admin" as const,
  }
}

export function logout() {
  localStorage.removeItem("isAuthenticated")
  localStorage.removeItem("userEmail")
  localStorage.removeItem("userName")
}
