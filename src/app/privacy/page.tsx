import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Privacy Policy</h1>
                <p className="text-zinc-400 text-sm">Last updated: January 1, 2026</p>
              </div>
            </div>
            <p className="text-zinc-400">
              At TrustLens.ai, we take your privacy seriously. This policy describes how we collect, 
              use, and protect your personal information.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-12">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">1. Information We Collect</h2>
              <div className="space-y-4 text-zinc-400">
                <p>We collect information you provide directly to us, such as when you:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create an account or register for our services</li>
                  <li>Use our security monitoring and compliance platform</li>
                  <li>Contact our support team or communicate with us</li>
                  <li>Subscribe to our newsletter or marketing communications</li>
                  <li>Participate in surveys, promotions, or other activities</li>
                </ul>
                <p className="mt-4">The types of information we may collect include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Account Information:</strong> Name, email address, password, company name, and job title</li>
                  <li><strong className="text-white">Billing Information:</strong> Payment card details, billing address, and transaction history</li>
                  <li><strong className="text-white">Usage Data:</strong> Log data, device information, IP addresses, and how you interact with our services</li>
                  <li><strong className="text-white">Security Logs:</strong> Data you send through our API for security analysis</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">2. How We Use Your Information</h2>
              <div className="space-y-4 text-zinc-400">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, security alerts, and support messages</li>
                  <li>Respond to your comments, questions, and provide customer service</li>
                  <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                  <li>Train and improve our AI/ML models for anomaly detection (using anonymized data only)</li>
                  <li>Generate compliance reports and security insights for your organization</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">3. Data Sharing and Disclosure</h2>
              <div className="space-y-4 text-zinc-400">
                <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Service Providers:</strong> With vendors who perform services on our behalf (hosting, payment processing, analytics)</li>
                  <li><strong className="text-white">Legal Requirements:</strong> When required by law or to respond to legal process</li>
                  <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong className="text-white">With Your Consent:</strong> When you have given us explicit permission</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">4. Data Security</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  We implement industry-standard security measures to protect your data, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption in transit (TLS 1.3) and at rest (AES-256)</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>SOC 2 Type II certified infrastructure</li>
                  <li>Role-based access controls and multi-factor authentication</li>
                  <li>24/7 security monitoring and incident response</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">5. Data Retention</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  We retain your personal information for as long as necessary to provide our services 
                  and fulfill the purposes described in this policy. Specifically:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Account data: Retained while your account is active, deleted within 30 days of account closure</li>
                  <li>Security logs: Retained according to your subscription plan (7-30 days)</li>
                  <li>Billing records: Retained for 7 years for tax and legal purposes</li>
                  <li>Support communications: Retained for 3 years</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">6. Your Rights and Choices</h2>
              <div className="space-y-4 text-zinc-400">
                <p>Depending on your location, you may have the following rights:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Access:</strong> Request a copy of the personal data we hold about you</li>
                  <li><strong className="text-white">Correction:</strong> Request that we correct inaccurate or incomplete data</li>
                  <li><strong className="text-white">Deletion:</strong> Request that we delete your personal data</li>
                  <li><strong className="text-white">Portability:</strong> Request your data in a machine-readable format</li>
                  <li><strong className="text-white">Objection:</strong> Object to certain processing of your data</li>
                  <li><strong className="text-white">Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at privacy@trustlens.ai.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">7. International Data Transfers</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  We are based in the United States and process data globally. If you are located outside 
                  the United States, your data may be transferred to, stored, and processed in the United States 
                  or other countries. We use Standard Contractual Clauses and other safeguards to ensure 
                  adequate protection of your data.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">8. Children's Privacy</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  Our services are not directed to individuals under 18. We do not knowingly collect 
                  personal information from children. If we learn that we have collected personal information 
                  from a child, we will delete it promptly.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">9. Changes to This Policy</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any material 
                  changes by posting the new policy on this page and updating the "Last updated" date. 
                  We encourage you to review this policy periodically.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">10. Contact Us</h2>
              <div className="space-y-4 text-zinc-400">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 mt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span className="text-white">privacy@trustlens.ai</span>
                  </div>
                  <p className="text-sm text-zinc-500">
                    TrustLens.ai Pvt. Ltd.<br />
                    Bandra Kurla Complex<br />
                    Mumbai, Maharashtra 400051<br />
                    India
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
