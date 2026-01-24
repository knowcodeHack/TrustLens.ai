import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText, Mail } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Terms of Service</h1>
                <p className="text-zinc-400 text-sm">Last updated: January 1, 2026</p>
              </div>
            </div>
            <p className="text-zinc-400">
              These Terms of Service ("Terms") govern your access to and use of TrustLens.ai's 
              services. Please read these Terms carefully before using our platform.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-12">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  By accessing or using TrustLens.ai services, you agree to be bound by these Terms 
                  and our Privacy Policy. If you are using our services on behalf of an organization, 
                  you represent that you have authority to bind that organization to these Terms.
                </p>
                <p>
                  If you do not agree to these Terms, you may not access or use our services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">2. Description of Services</h2>
              <div className="space-y-4 text-zinc-400">
                <p>TrustLens.ai provides:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI-powered security log monitoring and analysis</li>
                  <li>Real-time anomaly detection and alerting</li>
                  <li>Compliance readiness dashboards (SOC 2, HIPAA)</li>
                  <li>Behavioral modeling for insider threat detection</li>
                  <li>Automated security report generation</li>
                  <li>API access for log ingestion and integration</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">3. Account Registration</h2>
              <div className="space-y-4 text-zinc-400">
                <p>To use our services, you must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Promptly notify us of any unauthorized access</li>
                  <li>Be at least 18 years old or the age of majority in your jurisdiction</li>
                </ul>
                <p className="mt-4">
                  You are responsible for all activities that occur under your account.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">4. Acceptable Use</h2>
              <div className="space-y-4 text-zinc-400">
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use our services for any illegal purpose or in violation of any laws</li>
                  <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                  <li>Interfere with or disrupt the integrity or performance of our services</li>
                  <li>Upload malicious code, viruses, or harmful content</li>
                  <li>Reverse engineer, decompile, or attempt to extract source code from our services</li>
                  <li>Resell or redistribute our services without authorization</li>
                  <li>Use our services to monitor third parties without their consent</li>
                  <li>Exceed rate limits or attempt to circumvent usage restrictions</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">5. Subscription and Billing</h2>
              <div className="space-y-4 text-zinc-400">
                <p><strong className="text-white">Subscription Plans:</strong> We offer Free and Premium subscription plans as described on our pricing page.</p>
                <p><strong className="text-white">Billing:</strong> Premium subscriptions are billed monthly or annually in advance. All fees are non-refundable except as required by law.</p>
                <p><strong className="text-white">Automatic Renewal:</strong> Subscriptions automatically renew unless cancelled before the renewal date.</p>
                <p><strong className="text-white">Price Changes:</strong> We may change prices with 30 days' notice. Continued use after the effective date constitutes acceptance.</p>
                <p><strong className="text-white">Taxes:</strong> Fees do not include taxes. You are responsible for applicable taxes.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">6. Data and Privacy</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  Your use of our services is also governed by our Privacy Policy. You retain 
                  ownership of all data you submit to our platform ("Customer Data").
                </p>
                <p>
                  You grant us a limited license to process Customer Data solely to provide our 
                  services. We will not use Customer Data for any other purpose without your consent.
                </p>
                <p>
                  We may use anonymized and aggregated data to improve our AI models and services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">7. Intellectual Property</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  <strong className="text-white">Our IP:</strong> TrustLens.ai and its licensors own all rights to the services, 
                  including software, algorithms, models, documentation, and trademarks. These Terms 
                  do not grant you any rights to our intellectual property except the limited license 
                  to use our services.
                </p>
                <p>
                  <strong className="text-white">Your IP:</strong> You retain all rights to your Customer Data. We claim no 
                  ownership over the data you submit to our platform.
                </p>
                <p>
                  <strong className="text-white">Feedback:</strong> If you provide feedback or suggestions, we may use them 
                  without obligation to you.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">8. Service Level Agreement</h2>
              <div className="space-y-4 text-zinc-400">
                <p>For Premium subscribers, we commit to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Uptime:</strong> 99.9% availability (excluding scheduled maintenance)</li>
                  <li><strong className="text-white">Support Response:</strong> 4-hour response time for critical issues</li>
                  <li><strong className="text-white">Data Processing:</strong> Real-time log processing within 60 seconds</li>
                </ul>
                <p className="mt-4">
                  If we fail to meet these commitments, you may be eligible for service credits as 
                  described in our SLA documentation.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">9. Disclaimer of Warranties</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, 
                  FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p>
                  We do not warrant that our services will be uninterrupted, error-free, or completely 
                  secure. Our AI models may not detect all anomalies or threats, and you should not 
                  rely solely on our services for security.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">10. Limitation of Liability</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, TRUSTLENS.AI SHALL NOT BE LIABLE FOR ANY 
                  INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS 
                  OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES.
                </p>
                <p>
                  OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNTS PAID BY YOU IN THE 12 MONTHS 
                  PRECEDING THE CLAIM.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">11. Indemnification</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  You agree to indemnify and hold harmless TrustLens.ai and its officers, directors, 
                  employees, and agents from any claims, damages, or expenses arising from:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your use of our services</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any third-party rights</li>
                  <li>Your Customer Data</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">12. Termination</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  <strong className="text-white">By You:</strong> You may cancel your subscription at any time through your 
                  account settings. Cancellation takes effect at the end of the current billing period.
                </p>
                <p>
                  <strong className="text-white">By Us:</strong> We may suspend or terminate your access if you violate these 
                  Terms or for any other reason with 30 days' notice (or immediately for serious violations).
                </p>
                <p>
                  Upon termination, your right to use our services ends. We will retain your data 
                  for 30 days to allow for export, then delete it.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">13. Dispute Resolution</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  Any disputes arising from these Terms will be resolved through binding arbitration 
                  in San Francisco, California, under the rules of JAMS. You agree to waive any right 
                  to a jury trial or participation in a class action.
                </p>
                <p>
                  For claims under $10,000, you may choose small claims court instead of arbitration.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">14. General Provisions</h2>
              <div className="space-y-4 text-zinc-400">
                <p><strong className="text-white">Governing Law:</strong> These Terms are governed by the laws of California, USA.</p>
                <p><strong className="text-white">Entire Agreement:</strong> These Terms constitute the entire agreement between you and TrustLens.ai.</p>
                <p><strong className="text-white">Severability:</strong> If any provision is found unenforceable, the remaining provisions remain in effect.</p>
                <p><strong className="text-white">No Waiver:</strong> Our failure to enforce any right does not waive that right.</p>
                <p><strong className="text-white">Assignment:</strong> You may not assign these Terms without our consent.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">15. Changes to Terms</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  We may modify these Terms at any time. We will notify you of material changes by 
                  email or through our services. Continued use after changes take effect constitutes 
                  acceptance of the new Terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">16. Contact Information</h2>
              <div className="space-y-4 text-zinc-400">
                <p>If you have questions about these Terms, please contact us:</p>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 mt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span className="text-white">legal@trustlens.ai</span>
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
