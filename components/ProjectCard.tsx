"use client";
import { useRef } from "react";
import RevealWrapper from "./RevealWrapper";

interface ProjectCardProps {
  /** Project title */
  title: string;
  /** Project description */
  description: string;
  /** Status tag text (e.g. "In Development", "Released on Google Play") */
  statusLabel: string;
  /** Status type determines the tag color */
  statusType: "in-development" | "released";
  /** Feature tags to display */
  features: string[];
  /** Project image path */
  image: string;
  /** Image alt text */
  imageAlt: string;
  /** Whether the image is portrait orientation (constrains width) */
  portrait?: boolean;
  /** Whether the layout is reversed (image on left, text on right) */
  reversed?: boolean;
  /** Optional download button image path (e.g. Google Play badge) */
  downloadButtonImage?: string;
  /** URL the download button links to */
  downloadButtonLink?: string;
  /** Alt text for the download button image */
  downloadButtonAlt?: string;

  contentHoverImage?: string;
}

export default function ProjectCard({
  title,
  description,
  statusLabel,
  statusType,
  features,
  image,
  imageAlt,
  portrait = false,
  reversed = false,
  downloadButtonImage,
  downloadButtonLink,
  downloadButtonAlt = "Download on Google Play",
  contentHoverImage,
}: ProjectCardProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const strength = 15;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bg = bgRef.current;
    if (!bg) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const mx = (x - 0.5) * strength * -1;
    const my = (y - 0.5) * strength * -1;

    bg.style.setProperty("--mx", `${mx}px`);
    bg.style.setProperty("--my", `${my}px`);
  };

  const handleMouseLeave = () => {
    const bg = bgRef.current;
    if (!bg) return;

    bg.style.setProperty("--mx", "0px");
    bg.style.setProperty("--my", "0px");
  };

  return (
    <RevealWrapper>
      <div className={`project-card${reversed ? " reversed" : ""}`}>
        <div
          className={`project-content${
            contentHoverImage ? " hover-reveal" : ""
          }`}
          onMouseMove={contentHoverImage ? handleMouseMove : undefined}
          onMouseLeave={contentHoverImage ? handleMouseLeave : undefined}
        >
          {contentHoverImage && (
            <div
              ref={bgRef}
              className="project-content-bg"
              style={{ backgroundImage: `url(${contentHoverImage})` }}
              aria-hidden="true"
            />
          )}
          <div className={`status-tag ${statusType}`}>{statusLabel}</div>
          <h2>{title}</h2>
          <p className="description">{description}</p>
          <div className="features">
            {features.map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
          {downloadButtonImage && downloadButtonLink && (
            <a
              href={downloadButtonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="download-button"
            >
              <img
                src={downloadButtonImage}
                alt={downloadButtonAlt}
              />
            </a>
          )}
        </div>
        <div className={`project-image${portrait ? " portrait" : ""}`}>
          <img src={image} alt={imageAlt} />
        </div>
      </div>
    </RevealWrapper>
  );
}