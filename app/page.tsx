/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BBmsuZhpyKI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import Sponsor from "@/components/sponsors"
import AdminPage from "./admin/page";

export default function Landing() {
  return (
    <>    
      <div className="flex flex-col min-h-[100dvh]">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <Link href="#" className="flex items-center justify-center" prefetch={false}>
            {/* <MountainIcon className="h-6 w-6" /> */}
            <span className="sr-only">Vercel</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Features
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Pricing
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Contact
            </Link>
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
            <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
              <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                <div>
                  <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                    IGIIDEATION Judging System
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 md-9">
                    The International Grand Invention, Innovation, and Design Expo (IGIIDeation) 2025 is a global event showcasing advancements in fields like computer science, AI, IoT, cybersecurity, and more. It promotes collaboration among innovators, researchers, and industry leaders, offering a platform for presenting projects, exploring trends, and engaging with cutting-edge technologies. Emphasizing interdisciplinary solutions, IGIIDeation 2025 aims to inspire future innovators and celebrate creativity and transformative ideas.
                  </p>
                  <div className="space-x-4 mt-6">
                    <Link
                      href="/login"
                      className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                      prefetch={false}
                    >
                      Login
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col items-start space-y-4 justify-center">
                  <img
                    src="image/IGIIDeation-2025-BANNER.png"
                    alt="Hero"
                    className="mx-auto overflow-hidden rounded-t-xl object-cover w-auto h-auto"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
  <div className="container space-y-12 px-4 md:px-6">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
          New Features
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          IGIIDeation 2025: Where Innovation Meets Inspiration
        </h2>
        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Join the International Grand Invention, Innovation, and Design Expo 2025, a premier global event dedicated to showcasing groundbreaking ideas and fostering collaboration across diverse fields. Celebrate the spirit of innovation and explore transformative solutions shaping the future.
        </p>
      </div>
    </div>
    <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4">
      <div className="grid gap-1">
        <h3 className="text-lg font-bold">Showcasing Cutting-Edge Advancements</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Discover pioneering projects and technologies in AI, IoT, cybersecurity, Islamic science, and more. IGIIDeation 2025 highlights the ingenuity and creativity driving progress across industries.
        </p>
      </div>
      <div className="grid gap-1">
        <h3 className="text-lg font-bold">Fostering Knowledge Sharing and Collaboration</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Engage with researchers, innovators, and global industry leaders to share insights, explore trends, and address complex global challenges through interdisciplinary approaches.
        </p>
      </div>
      <div className="grid gap-1">
        <h3 className="text-lg font-bold">Inspiring Future Innovators</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Connect with experts and visionaries to celebrate creativity and push boundaries. IGIIDeation 2025 encourages future inventors to redefine possibilities and turn bold ideas into reality.
        </p>
      </div>
      <div className="grid gap-1">
        <h3 className="text-lg font-bold">Celebrating Interdisciplinary Solutions</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Highlight the importance of interdisciplinary approaches in solving global challenges and creating transformative solutions that shape the future.
        </p>
      </div>
    </div>
  </div>
</section>

          <section className="w-full md:py-24 lg:py-32 bg-white">
            <div className="container grid items-center justify-center  px-4 text-center md:px-6">
              <Sponsor/>
              {/* <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sign up to get notified when we launch.{" "}
                  <Link href="#" className="underline underline-offset-2" prefetch={false}>
                    Terms & Conditions
                  </Link>
                </p>
              </div> */}
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2024 Vercel. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}