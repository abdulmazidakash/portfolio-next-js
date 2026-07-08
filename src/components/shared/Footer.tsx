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

const socialLinks = [
  { href: "https://github.com/abdulmazidakash", label: "GitHub", icon: FaGithub },
  { href: "https://www.linkedin.com/in/abdulmazidakash/", label: "LinkedIn", icon: FaLinkedin },
  { href: "https://x.com/abdulmazidakash", label: "Twitter", icon: FaXTwitter },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 p-10 font-semibold text-white border-t border-white/10">
      <div className="flex flex-col items-center gap-6">
        {/* Navigation Links */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap justify-center gap-4"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white/90 hover:text-sky-300 hover:underline underline-offset-4 transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Links */}
        <nav aria-label="Social media links" className="flex justify-center gap-6">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/90 hover:text-sky-300 hover:scale-110 transition-all duration-300"
            >
              <Icon size={24} />
            </Link>
          ))}
        </nav>

        <aside className="text-center">
          <p className="font-normal text-sm text-white/60">
            © {new Date().getFullYear()} - All rights reserved by Abdul Mazid
            Akash
          </p>
        </aside>
      </div>
    </footer>
  );
}