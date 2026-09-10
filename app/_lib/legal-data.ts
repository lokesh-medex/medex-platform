// Content for /terms and /privacy. Standard marketplace/healthcare-aggregator
// boilerplate — treat as a starting draft for legal review, not final copy.

export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalContent {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export const TERMS_CONTENT: LegalContent = {
  eyebrow: "Legal",
  title: "Terms of Service",
  lastUpdated: "September 10, 2026",
  intro:
    "These Terms of Service (“Terms”) govern your access to and use of the Medex website, mobile experience, and related services (together, the “Platform”), operated by Medex Co., Ltd. (“Medex”, “we”, “us”). By creating an account, booking a service, or otherwise using the Platform, you agree to these Terms.",
  sections: [
    {
      id: "who-we-are",
      heading: "1. What Medex is",
      paragraphs: [
        "Medex is a healthcare aggregator: we connect you with hospitals, laboratories, clinics, and wellness studios (“Providers”) so you can compare and book their services in one place.",
        "Medex is not a hospital, clinic, laboratory, or medical practice, and we do not provide medical advice, diagnosis, or treatment. Every medical service you book through the Platform is performed by the Provider you select, under that Provider's own license, standard of care, and terms.",
      ],
    },
    {
      id: "accounts",
      heading: "2. Your account",
      paragraphs: [
        "You need an account to book most services. You're responsible for keeping your login credentials confidential and for all activity under your account.",
        "You agree to provide accurate, current information when you register or book a service, and to keep it up to date — Providers rely on it to deliver care safely.",
      ],
      list: [
        "You must be at least 18, or have the consent of a parent or guardian, to create an account.",
        "You may not share an account, or use another person's account without permission.",
        "We may suspend or close an account that we reasonably believe is fraudulent, abusive, or in breach of these Terms.",
      ],
    },
    {
      id: "bookings-payments",
      heading: "3. Bookings and payments",
      paragraphs: [
        "When you book a package, test, or appointment, you're entering into an agreement with the Provider for that service; Medex facilitates the booking and payment.",
        "Prices shown on the Platform are set by Providers and may exclude items only knowable at the time of service (e.g. additional tests a clinician orders on-site). Accepted payment methods are shown at checkout.",
      ],
    },
    {
      id: "cancellations",
      heading: "4. Cancellations, rescheduling, and refunds",
      paragraphs: [
        "Cancellation windows, rescheduling rules, and refund eligibility vary by Provider and service, and are shown on the booking page before you confirm. Where a Provider's policy doesn't cover your situation, contact our support team and we'll help coordinate with the Provider.",
        "Membership plan cancellations and renewals are handled separately — see your plan's terms on the Membership page.",
      ],
    },
    {
      id: "acceptable-use",
      heading: "5. Acceptable use",
      paragraphs: [
        "You agree not to misuse the Platform. This includes, without limitation:",
      ],
      list: [
        "Attempting to access another user's account or a Provider's systems without authorization.",
        "Uploading false medical information, or booking a service under someone else's identity without consent.",
        "Scraping, reverse-engineering, or reselling access to the Platform without our written permission.",
        "Using the Platform for any unlawful purpose, or in a way that could harm Medex, a Provider, or another user.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "6. Intellectual property",
      paragraphs: [
        "The Platform — including its design, text, graphics, and underlying software — is owned by Medex or our licensors and is protected by intellectual property laws. Using the Platform doesn't grant you any ownership in it.",
      ],
    },
    {
      id: "liability",
      heading: "7. Disclaimers and limitation of liability",
      paragraphs: [
        "The Platform is provided “as is.” Medex doesn't guarantee that any Provider's services will meet your expectations, or that the Platform will be uninterrupted or error-free.",
        "To the fullest extent permitted by law, Medex is not liable for the acts or omissions of any Provider, or for indirect, incidental, or consequential damages arising from your use of the Platform. Nothing in these Terms limits liability that cannot be limited under Thai law.",
      ],
    },
    {
      id: "governing-law",
      heading: "8. Governing law",
      paragraphs: [
        "These Terms are governed by the laws of Thailand, without regard to conflict-of-law principles. Disputes arising from these Terms will be subject to the exclusive jurisdiction of the courts of Thailand.",
      ],
    },
    {
      id: "changes",
      heading: "9. Changes to these Terms",
      paragraphs: [
        "We may update these Terms from time to time. If we make material changes, we'll post the updated Terms here with a new “last updated” date, and where appropriate notify you through the Platform.",
      ],
    },
    {
      id: "contact",
      heading: "10. Contact us",
      paragraphs: [
        "Questions about these Terms? Reach us at legal@medex.co.th or through our Contact page.",
      ],
    },
  ],
};

export const PRIVACY_CONTENT: LegalContent = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  lastUpdated: "September 10, 2026",
  intro:
    "This Privacy Policy explains how Medex Co., Ltd. (“Medex”, “we”, “us”) collects, uses, shares, and protects your personal data — including health-related data — when you use the Medex Platform.",
  sections: [
    {
      id: "data-we-collect",
      heading: "1. Information we collect",
      paragraphs: [
        "We collect information you give us directly, information generated by using the Platform, and information from the Providers you book with.",
      ],
      list: [
        "Account details: name, email, phone number, date of birth, and password.",
        "Booking and health-adjacent details: the packages, tests, or appointments you book, and any information you or a Provider add to support that booking (e.g. reason for visit).",
        "Payment details: handled by our payment processors — Medex does not store full card numbers.",
        "Usage data: pages viewed, searches, device and browser information, and approximate location, collected automatically via cookies and similar technologies.",
      ],
    },
    {
      id: "how-we-use-it",
      heading: "2. How we use your information",
      paragraphs: ["We use your information to:"],
      list: [
        "Create and manage your account, and process your bookings and payments.",
        "Share the details a Provider needs to deliver the service you booked.",
        "Send booking confirmations, reminders, and support responses.",
        "Improve the Platform, including troubleshooting and understanding usage patterns.",
        "Send you offers or updates about Medex, where you've opted in — you can opt out at any time.",
        "Meet our legal and regulatory obligations.",
      ],
    },
    {
      id: "cookies",
      heading: "3. Cookies",
      paragraphs: [
        "We use cookies and similar technologies to keep you signed in, remember your preferences (e.g. language and country), and understand how the Platform is used. You can control cookies through your browser settings; disabling them may limit some features.",
      ],
    },
    {
      id: "sharing",
      heading: "4. Who we share information with",
      paragraphs: [
        "We share information only where it's needed to run the Platform or as required by law:",
      ],
      list: [
        "Providers, so they can deliver the service you booked.",
        "Payment processors, to complete your transaction securely.",
        "Service providers who support our operations (e.g. hosting, customer support tooling), bound by confidentiality obligations.",
        "Authorities, where required by law or to protect the rights, safety, or property of Medex, our users, or the public.",
      ],
    },
    {
      id: "retention",
      heading: "5. Data retention",
      paragraphs: [
        "We keep your information for as long as your account is active or as needed to provide the Platform, comply with legal obligations, resolve disputes, and enforce our agreements. We delete or anonymize data once it's no longer needed for these purposes.",
      ],
    },
    {
      id: "your-rights",
      heading: "6. Your rights",
      paragraphs: [
        "Subject to applicable law (including Thailand's Personal Data Protection Act), you can:",
      ],
      list: [
        "Request access to, or a copy of, the personal data we hold about you.",
        "Ask us to correct inaccurate data, or delete data we no longer have a lawful basis to keep.",
        "Withdraw consent for marketing communications at any time.",
        "Object to, or ask us to restrict, certain processing of your data.",
      ],
    },
    {
      id: "security",
      heading: "7. Security",
      paragraphs: [
        "We use technical and organizational measures — including encryption in transit and access controls — to protect your information. No system is completely secure, so we encourage you to also keep your account credentials confidential.",
      ],
    },
    {
      id: "changes",
      heading: "8. Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. Material changes will be posted here with a new “last updated” date.",
      ],
    },
    {
      id: "contact",
      heading: "9. Contact us",
      paragraphs: [
        "For privacy questions or to exercise your rights, contact us at privacy@medex.co.th or through our Contact page.",
      ],
    },
  ],
};
