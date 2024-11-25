"use client";

import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";

export default function Page() {
  const isMobile = useIsMobile();
  return (
    <main className={`flex flex-col`}>
      <div className={`flex flex-col flex-1 ${isMobile ? `p-4` : `p-20`}`}>
        <Text
          title={`Privacy Policy`}
          size="2-extra-big"
          className="mb-6 whitespace-pre-line"
        />
        <div className={`flex flex-col flex-1 mb-6`}>
          <Text
            title={`1. Introduction`}
            size="big"
            className="mb-2 whitespace-pre-line"
          />
          <ul style={{ listStyleType: "disc" }} className="px-8">
            <li>
              Welcome to TITAN INNOVATION. By accessing or using our platform, you
              agree to comply with and be bound by the following terms and
              conditions.
            </li>
          </ul>
        </div>
        <div className={`flex flex-col flex-1 mb-6`}>
          <Text
            title={`2.  Information We Collect`}
            size="big"
            className="mb-2 whitespace-pre-line"
          />
          <ul style={{ listStyleType: "disc" }} className="px-8">
            <li>
              Personal Information: We collect personal information you provide
              during registration, such as your name, email address, phone
              number, and payment details.
            </li>
            <li>
              Usage Data: We collect data on how you interact with our platform,
              including your browsing history, search queries, and the devices
              you use to access our services.
            </li>
            <li>
              Cookies: We use cookies and similar tracking technologies to
              enhance your user experience and gather data on website traffic.
            </li>
          </ul>
        </div>
        <div className={`flex flex-col flex-1 mb-6`}>
          <Text
            title={`3. How We Use Your Information`}
            size="big"
            className="mb-2 whitespace-pre-line"
          />
          <ul style={{ listStyleType: "disc" }} className="px-8">
            <li>
              Service Provision: We use your personal information to provide,
              operate, and maintain our services, including processing payments
              and managing bookings.
            </li>
            <li>
              Communication: We may use your information to send you updates,
              promotional offers, and service-related notifications.
            </li>
            <li>
              Personalization: We use your data to tailor the content and offers
              presented to you based on your preferences and previous
              interactions.
            </li>
            <li>
              Security: We use your information to detect and prevent fraudulent
              activities and to ensure the security of our platform.
            </li>
          </ul>
        </div>
        <div className={`flex flex-col flex-1 mb-6`}>
          <Text
            title={`4. Data Sharing and Disclosure`}
            size="big"
            className="mb-2 whitespace-pre-line"
          />
          <ul style={{ listStyleType: "disc" }} className="px-8">
            <li>
              Third-Party Service Providers: We may share your information with
              third-party service providers who assist us in operating our
              platform, processing payments, or providing customer support.
            </li>
            <li>
              Legal Requirements: We may disclose your information if required
              by law or in response to legal processes, such as a subpoena or
              court order.
            </li>
            <li>
              Personalization: We use your data to tailor the content and offers
              presented to you based on your preferences and previous
              interactions.
            </li>
            <li>
              Business Transfers: In the event of a merger, acquisition, or sale
              of assets, your information may be transferred to the acquiring
              entity.
            </li>
          </ul>
        </div>
        <div className={`flex flex-col flex-1 mb-6`}>
          <Text
            title={`5. Data Security`}
            size="big"
            className="mb-2 whitespace-pre-line"
          />
          <ul style={{ listStyleType: "disc" }} className="px-8">
            <li>
              Security Measures: We implement appropriate technical and
              organizational measures to protect your personal information from
              unauthorized access, alteration, or destruction.
            </li>
            <li>
              Data Breach Notification: In the event of a data breach, we will
              notify you and the relevant authorities as required by law.
            </li>
          </ul>
        </div>
        <div className={`flex flex-col flex-1 mb-6`}>
          <Text
            title={`6. Your Rights`}
            size="big"
            className="mb-2 whitespace-pre-line"
          />
          <ul style={{ listStyleType: "disc" }} className="px-8">
            <li>
              Access and Correction: You have the right to access and update
              your personal information held by us. You can do this through your
              account settings or by contacting us.
            </li>
            <li>
              Data Deletion: You may request the deletion of your personal
              information. Please note that some information may need to be
              retained for legal or operational reasons.
            </li>
            <li>
              Opt-Out: You can opt out of receiving promotional communications
              from us by following the unsubscribe instructions in the emails or
              by contacting us directly.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
