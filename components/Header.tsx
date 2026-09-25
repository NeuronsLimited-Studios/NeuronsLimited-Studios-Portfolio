"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header>
      <nav>
        <Link href="/" className="logo" aria-label="NeuronsLimited Studios Home">
          <img
            src="/assets/logo.png"
            alt="NeuronsLimited Studios Logo"
            width={32}
            height={32}
            className="studio-logo"
          />
          NeuronsLimited Studios
        </Link>

        <div className="social-links">
          {isHome ? (
            <>
            <a
                href="https://neuronslimited-studios.itch.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-item"
              >
                <img
                  src="/assets/itch-io-logo.png"
                  alt="itch.io"
                  width={16}
                  height={16}
                  className="social-icon"
                />
                itch.io
              </a>
              <a
                href="https://www.youtube.com/@NeuronsLimitedStudios"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-item"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                  alt="YouTube"
                  width={16}
                  height={16}
                  className="social-icon"
                />
                YouTube
              </a>
              <a
                href="https://www.instagram.com/neuronslimitedstudios"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-item"
              >
                <img
                  src="/assets/Instagram.svg"
                  alt="Instagram"
                  width={16}
                  height={16}
                  className="social-icon"
                />
                Instagram
              </a>
              <a
                href="https://discord.gg/B9P6v8KmRM"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-item"
              >
                <img
                  src="/assets/discord.png"
                  alt="Discord"
                  width={16}
                  height={16}
                  className="social-icon"
                />
                Discord
              </a>
              <a
                href="https://buymeacoffee.com/neuronslimitedstudios"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-item"
              >
                <img
                  src="/assets/coffee.png"
                  alt="Buy Me A Coffee"
                  width={16}
                  height={16}
                  className="social-icon"
                />
                Buy Me A Coffee
              </a>
            </>
          ) : (
            <Link href="/" className="back-btn">
              ← Back to Portfolio
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}