import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy",
  description:
    "Privacy and Cookie Policy for NeuronsLimited Studios — how we collect, use, and protect your data.",
};

export default function PolicyPage() {
  return (
    <section className="policy-content">
      <h1>Privacy &amp; Cookie Policy</h1>

      <p>
        <strong>Last Updated:</strong> October 26, 2026
      </p>

      <p>
        NeuronsLimited Studios (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or
        &ldquo;us&rdquo;) respects your privacy and is committed to protecting
        your personal information. This Privacy &amp; Cookie Policy explains
        what information we collect, how we collect it, how we use it, how it
        may be shared, how long it is retained, and your rights regarding your
        personal data when visiting our website or using our games and services.
      </p>

      <h2>1. Information We Collect</h2>

      <p>
        When you visit our website, we may automatically collect limited
        information, including:
      </p>

      <ul>
        <li>
          <strong>Technical Data:</strong> IP address, browser type and version,
          operating system, device information, language settings, and time
          zone.
        </li>
        <li>
          <strong>Usage Data:</strong> Pages visited, session duration,
          referring pages, interactions with the website, and general traffic
          statistics.
        </li>
        <li>
          <strong>Cookie Data:</strong> Information stored through cookies and
          similar technologies.
        </li>
      </ul>

      <p>
        We do not intentionally collect personally identifiable information such
        as names, postal addresses, payment information, or government-issued
        identifiers through this website.
      </p>

      <p>
        If you play our games, additional information may be collected by
        third-party platforms and distributors such as Google Play, Epic Games
        Store, Steam, Apple App Store, or similar services, according to their
        own privacy policies.
      </p>

      <h2>2. How We Collect Information</h2>

      <p>Information may be collected through:</p>

      <ul>
        <li>Web server logs generated when you access our website.</li>
        <li>Cookies and similar tracking technologies.</li>
        <li>Website analytics services.</li>
        <li>Third-party game distribution platforms.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>

      <p>We use collected information to:</p>

      <ul>
        <li>Operate and maintain our website.</li>
        <li>Improve website functionality and user experience.</li>
        <li>Monitor website performance and security.</li>
        <li>Analyze aggregate visitor statistics.</li>
        <li>Comply with applicable legal obligations.</li>
      </ul>

      <p>
        We do not use collected information for automated decision-making,
        profiling, or advertising purposes.
      </p>

      <h2>4. How We Share Information</h2>

      <p>We do not sell, rent, or trade personal information.</p>

      <p>Information may be shared only when reasonably necessary with:</p>

      <ul>
        <li>Website hosting providers.</li>
        <li>Analytics service providers.</li>
        <li>Game distribution and publishing platforms.</li>
        <li>Government authorities when required by law.</li>
      </ul>

      <p>
        Any sharing is limited to the purposes described in this policy and
        performed in accordance with applicable laws.
      </p>

      <h2>5. Data Retention</h2>

      <p>
        We retain technical, usage, and analytics information only for as long
        as reasonably necessary to operate, secure, maintain, and improve our
        services.
      </p>

      <p>
        When information is no longer required, it may be deleted, anonymized,
        or aggregated.
      </p>

      <h2>6. Cookie Policy</h2>

      <p>
        Cookies are small text files stored on your device to help websites
        function properly and improve user experience.
      </p>

      <p>We may use the following categories of cookies:</p>

      <ul>
        <li>
          <strong>Strictly Necessary Cookies:</strong> Required for basic
          website functionality.
        </li>
        <li>
          <strong>Analytics Cookies:</strong> Used to understand visitor
          behavior and website performance.
        </li>
      </ul>

      <p>
        Analytics cookies are set by Google Analytics only after you accept
        them in the cookie banner shown on your first visit. If you reject
        them, no analytics cookies are set. You can change your choice at any
        time with the &ldquo;Cookie settings&rdquo; link at the bottom of every
        page, and you can also control or delete cookies through your browser
        settings.
      </p>

      <h2>7. Third-Party Services and Links</h2>

      <p>
        Our website may contain links to third-party websites, applications,
        communities, or services including YouTube, Discord, Buy Me a Coffee,
        game stores, and social media platforms.
      </p>

      <p>
        We are not responsible for the privacy practices or content of
        third-party services. Please review their privacy policies before
        providing personal information.
      </p>

      <h2>8. Your Privacy Rights</h2>

      <p>
        Depending on applicable laws, including the GDPR, you may have the right
        to:
      </p>

      <ul>
        <li>Request access to your personal data.</li>
        <li>Request correction of inaccurate information.</li>
        <li>Request deletion of your personal data.</li>
        <li>Object to certain processing activities.</li>
        <li>Request restriction of processing.</li>
        <li>Request a copy of your personal data where applicable.</li>
        <li>Withdraw consent where processing relies on consent.</li>
      </ul>

      <h2>9. Children&apos;s Privacy</h2>

      <p>
        Our website is not specifically directed toward children under the age
        required by applicable law. We do not knowingly collect personal
        information from children.
      </p>

      <h2>10. Changes to This Policy</h2>

      <p>
        We may update this Privacy &amp; Cookie Policy from time to time. Any
        updates will be published on this page together with a revised
        &ldquo;Last Updated&rdquo; date.
      </p>

      <h2>11. Contact Us</h2>

      <p>
        If you have any questions regarding this Privacy &amp; Cookie Policy,
        your privacy rights, or our data practices, you may contact us at:
      </p>

      <p>
        <a href="mailto:neuronslimitedstudios@gmail.com">
          neuronslimitedstudios@gmail.com
        </a>
      </p>

      <p>You may also contact us through our official Discord community:</p>

      <p>
        <a
          href="https://discord.gg/B9P6v8KmRM"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official Discord Server
        </a>
      </p>
    </section>
  );
}