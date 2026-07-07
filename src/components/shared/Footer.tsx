import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Project" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 p-10 font-semibold text-white mt-8">
      <div className="flex flex-col items-center gap-6">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Links */}
        <nav className="flex justify-center gap-6">
          <Link
            href="https://github.com/abdulmazidakash"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-primary transition"
          >
            <FaGithub size={24} />
          </Link>

          <Link
            href="https://www.linkedin.com/in/abdulmazidakash/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-primary transition"
          >
            <FaLinkedin size={24} />
          </Link>

          <Link
            href="https://x.com/abdulmazidakash"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-primary transition"
          >
            <FaXTwitter size={24} />
          </Link>
        </nav>

        <aside className="text-center">
          <p>
            © {new Date().getFullYear()} - All rights reserved by Abdul Mazid
            Akash
          </p>
        </aside>
      </div>
    </footer>
  );
}