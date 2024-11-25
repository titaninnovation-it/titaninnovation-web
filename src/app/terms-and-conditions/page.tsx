"use client";

import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";

export default function Page() {
  const isMobile = useIsMobile();
  return (
    <main className={`flex flex-col`}>
      <div className={`flex flex-col flex-1 ${isMobile ? `p-4` : `p-20`}`}>
        <Text
          title={`Terms & conditions`}
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
            title={`2. Use of the Platform`}
            size="big"
            className="mb-2 whitespace-pre-line"
          />
          <ul style={{ listStyleType: "disc" }} className="px-8">
            <li>
              Eligibility: Users must be at least 18 years old to use our
              services.
            </li>
            <li>
              Account Registration: Users must provide accurate and up-to-date
              information during registration. You are responsible for
              maintaining the confidentiality of your account details.
            </li>
            <li>
              Prohibited Activities: You agree not to engage in any activity
              that disrupts or interferes with the functioning of the platform,
              or violates any applicable laws.
            </li>
          </ul>
        </div>
        <div className={`flex flex-col flex-1 mb-6`}>
          <Text
            title={`3. Services`}
            size="big"
            className="mb-2 whitespace-pre-line"
          />
          <ul style={{ listStyleType: "disc" }} className="px-8">
            <li>
              Heavy Machinery Rentals: All rentals are subject to availability
              and the specific terms agreed upon at the time of booking.
            </li>
            <li>
              Sales of Heavy Machinery: Purchases are final once confirmed.
              Warranties, if applicable, will be specified in the purchase
              agreement.
            </li>
            <li>
              Payments: Payments must be made in full at the time of booking or
              purchase. We accept various forms of payment as listed on the
              platform.
            </li>
          </ul>
        </div>
        <div className={`flex flex-col flex-1 mb-6`}>
          <Text
            title={`4. Pricing and Payments`}
            size="big"
            className="mb-2 whitespace-pre-line"
          />
          <ul style={{ listStyleType: "disc" }} className="px-8">
            <li>
              Price Changes: Prices are subject to change without notice. The
              final price will be confirmed at the time of transaction.
            </li>
            <li>
              Payment Terms: Payment must be made in full at the time of booking
              or purchase unless otherwise agreed.
            </li>
          </ul>
        </div>
        <div className={`flex flex-col flex-1 mb-6`}>
          <Text
            title={`5. Cancellations and Refunds`}
            size="big"
            className="mb-2 whitespace-pre-line"
          />
          <ul style={{ listStyleType: "disc" }} className="px-8">
            <li>
              Cancellation Policy: Cancellations must be made [X] hours/days
              before the scheduled rental or purchase. Specific cancellation
              fees may apply.
            </li>
            <li>
              Refund Policy: Refunds will be processed based on the cancellation
              policy. No refunds will be issued for services already rendered.
            </li>
          </ul>
        </div>
        <div className={`flex flex-col flex-1 mb-6`}>
          <Text
            title={`6. Liability and Disclaimers`}
            size="big"
            className="mb-2 whitespace-pre-line"
          />
          <ul style={{ listStyleType: "disc" }} className="px-8">
            <li>
              Limitation of Liability: TITAN INNOVATION will not be liable for any
              indirect, incidental, or consequential damages arising from the
              use of our services.
            </li>
            <li>
              Disclaimer of Warranties: We provide our services “as is” without
              any warranties, express or implied, including warranties of
              merchantability or fitness for a particular purpose.
            </li>
          </ul>
        </div>
        <div className={`flex flex-col flex-1 mb-6`}>
          <Text
            title={`7. Privacy Policy`}
            size="big"
            className="mb-2 whitespace-pre-line"
          />
          <ul style={{ listStyleType: "disc" }} className="px-8">
            <li>
              Data Collection: We collect personal data to provide and improve
              our services. Please review our Privacy Policy for details on how
              we handle your information.
            </li>
            <li>
              Data Security: We implement appropriate security measures to
              protect your personal information.
            </li>
          </ul>
        </div>
        <div className={`flex flex-col flex-1 mb-6`}>
          <Text
            title={`8. Governing Law`}
            size="big"
            className="mb-2 whitespace-pre-line"
          />
          <ul style={{ listStyleType: "disc" }} className="px-8">
            <li>
              Jurisdiction: These terms are governed by the laws of [Your
              Jurisdiction]. Any disputes will be resolved in the courts of
              [Your Jurisdiction].
            </li>
          </ul>
        </div>
        <div className={`flex flex-col flex-1 mb-6`}>
          <Text
            title={`9. Amendments`}
            size="big"
            className="mb-2 whitespace-pre-line"
          />
          <ul style={{ listStyleType: "disc" }} className="px-8">
            <li>
              Changes to Terms: TITAN INNOVATION reserves the right to update or
              modify these terms at any time. Users will be notified of
              significant changes via email or through the platform.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
