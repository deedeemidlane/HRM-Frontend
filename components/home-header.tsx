"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { DialogTitle } from "./ui/dialog"
import { Menu } from "lucide-react"
import { useState } from "react"

export function HomeHeader({
  aboutRef,
  contactRef,
}: {
  aboutRef?: React.RefObject<HTMLElement | null>
  contactRef?: React.RefObject<HTMLElement | null>
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 bg-white z-50">
      <Link className="flex items-center justify-center" href="/">
        <span className="font-bold text-2xl text-[#3db87a]">ADA</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          Trang chủ
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/#about"
          onClick={(e) => {
            if (aboutRef) {
              e.preventDefault()
              scrollToSection(aboutRef)
            }
          }}
        >
          Giới thiệu
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/jobs"
        >
          Tuyển dụng
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/#contact"
          onClick={(e) => {
            if (contactRef) {
              e.preventDefault()
              scrollToSection(contactRef)
            }
          }}
        >
          Liên hệ
        </Link>
      </nav>

      {/* Desktop Login Button */}
      <div className="ml-4 hidden md:block">
        <Button asChild variant="outline" size="sm">
          <a href="/login">Đăng nhập</a>
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="ml-auto md:hidden">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 p-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Mở menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <DialogTitle></DialogTitle>
            <div className="flex flex-col gap-6 h-full">
              <div className="flex items-center justify-between">
                <Link
                  className="flex items-center"
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-bold text-xl text-[#3db87a]">ADA</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-4">
                <Link
                  className="text-sm font-medium hover:text-[#3db87a] transition-colors"
                  href="/"
                  onClick={(e) => {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: "smooth" })
                    setIsMenuOpen(false)
                  }}
                >
                  Trang chủ
                </Link>
                <Link
                  className="text-sm font-medium hover:text-[#3db87a] transition-colors"
                  href="/#about"
                  onClick={(e) => {
                    if (aboutRef) {
                      e.preventDefault()
                      scrollToSection(aboutRef)
                    }
                  }}
                >
                  Giới thiệu
                </Link>
                <Link
                  className="text-sm font-medium hover:text-[#3db87a] transition-colors"
                  href="/jobs"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tuyển dụng
                </Link>
                <Link
                  className="text-sm font-medium hover:text-[#3db87a] transition-colors"
                  href="/#contact"
                  onClick={(e) => {
                    if (contactRef) {
                      e.preventDefault()
                      scrollToSection(contactRef)
                    }
                  }}
                >
                  Liên hệ
                </Link>
              </nav>
              <div className="mt-auto">
                <Button
                  asChild
                  className="w-full bg-[#3db87a] hover:bg-[#35a46c]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <a href="/login">Đăng nhập</a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
