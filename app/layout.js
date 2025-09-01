import "./globals.css";
import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";
import { FaPlusCircle, FaUser } from "react-icons/fa";
import Nav from "./Nav"; 

export const metadata = {
  title: "School Project",
  description: "Mini project with Next.js and MySQL",
};
export default function RootLayout({ children }) {

  return (
    <html lang="en" className="bg-white">
            <head>
        <style>{`html, body { background: #ffffff; margin: 0; padding: 0; }`}</style>
      </head>
      <body className="flex flex-col min-h-screen bg-white">
<Nav />
        {/* Main Content */}
        <main className="flex-grow w-full">{children}</main>


        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12 mt-8">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {/* Column 1: About */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">
                🏫 School Project
              </h2>
              <p className="text-sm leading-6">
                A modern mini project built with Next.js and MySQL for managing
                school information. Fast, simple, and intuitive.
              </p>
              <p className="mt-4 text-sm">📍 123 Education Lane, Knowledge City</p>
              <p className="text-sm">📞 +1 (555) 123-4567</p>
              <p className="text-sm">✉️ contact@schoolproject.com</p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/addSchool"
                    className="hover:text-white transition-colors"
                  >
                    Add School
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Resources</h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="https://nextjs.org/"
                    target="_blank"
                    className="hover:text-white transition-colors"
                  >
                    Next.js Docs
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    target="_blank"
                    className="hover:text-white transition-colors"
                  >
                    TailwindCSS
                  </a>
                </li>
                <li>
                  <a
                    href="https://react-icons.github.io/react-icons/"
                    target="_blank"
                    className="hover:text-white transition-colors"
                  >
                    React Icons
                  </a>
                </li>
                <li>
                  <a
                    href="https://mysql.com/"
                    target="_blank"
                    className="hover:text-white transition-colors"
                  >
                    MySQL
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Socials */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
              <div className="flex space-x-6 text-2xl">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="hover:text-blue-500 transition-colors"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  className="hover:text-gray-100 transition-colors"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="hover:text-blue-400 transition-colors"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  className="hover:text-red-500 transition-colors"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  className="hover:text-sky-400 transition-colors"
                >
                  <FaTwitter />
                </a>
              </div>
              <p className="mt-4 text-sm">
                Stay connected with us for updates and announcements.
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} School Project. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
