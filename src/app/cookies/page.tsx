import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cookie, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      name: "Essential Cookies",
      description: "Required for the website to function properly. Cannot be disabled.",
      examples: ["Session management", "Authentication", "Security tokens", "Load balancing"],
      required: true
    },
    {
      name: "Functional Cookies",
      description: "Enable enhanced functionality and personalization.",
      examples: ["Language preferences", "Theme settings", "Dashboard layouts", "Recent searches"],
      required: false
    },
    {
      name: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website.",
      examples: ["Page views", "User journeys", "Feature usage", "Error tracking"],
      required: false
    },
    {
      name: "Marketing Cookies",
      description: "Used to deliver relevant advertisements and track campaign effectiveness.",
      examples: ["Ad targeting", "Campaign attribution", "Remarketing", "Social media tracking"],
      required: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Cookie className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Cookie Policy</h1>
                <p className="text-zinc-400 text-sm">Last updated: January 1, 2026</p>
              </div>
            </div>
            <p className="text-zinc-400">
              This Cookie Policy explains how TrustLens.ai uses cookies and similar tracking 
              technologies when you visit our website and use our services.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-12">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">What Are Cookies?</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  Cookies are small text files that are stored on your device (computer, tablet, or 
                  mobile phone) when you visit a website. They are widely used to make websites work 
                  more efficiently and to provide information to website owners.
                </p>
                <p>
                  We also use similar technologies such as pixel tags, web beacons, and local storage 
                  to collect information about your browsing activity.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">How We Use Cookies</h2>
              <div className="space-y-4 text-zinc-400">
                <p>We use cookies for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Authentication:</strong> To recognize you when you log in and maintain your session</li>
                  <li><strong className="text-white">Security:</strong> To detect and prevent fraudulent activity and security threats</li>
                  <li><strong className="text-white">Preferences:</strong> To remember your settings and preferences</li>
                  <li><strong className="text-white">Analytics:</strong> To understand how visitors use our website and improve our services</li>
                  <li><strong className="text-white">Marketing:</strong> To deliver relevant advertisements (with your consent)</li>
                </ul>
              </div>
            </section>

            {/* Cookie Types */}
            <section>
              <h2 className="text-xl font-semibold mb-6 text-white">Types of Cookies We Use</h2>
              <div className="space-y-4">
                {cookieTypes.map((cookie, i) => (
                  <Card key={i} className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-white">{cookie.name}</h3>
                        {cookie.required ? (
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                            Required
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-zinc-400">
                            Optional
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-400 mb-4">{cookie.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {cookie.examples.map((example, j) => (
                          <span key={j} className="text-xs px-2 py-1 rounded bg-white/5 text-zinc-500">
                            {example}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">Third-Party Cookies</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  We use services from third parties that may set their own cookies on your device. 
                  These include:
                </p>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10">
                        <th className="px-4 py-3 text-left font-semibold text-white">Provider</th>
                        <th className="px-4 py-3 text-left font-semibold text-white">Purpose</th>
                        <th className="px-4 py-3 text-left font-semibold text-white">Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      <tr>
                        <td className="px-4 py-3 text-zinc-300">Google Analytics</td>
                        <td className="px-4 py-3 text-zinc-400">Website analytics and usage statistics</td>
                        <td className="px-4 py-3 text-zinc-400">Analytics</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-zinc-300">Stripe</td>
                        <td className="px-4 py-3 text-zinc-400">Payment processing and fraud prevention</td>
                        <td className="px-4 py-3 text-zinc-400">Essential</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-zinc-300">Intercom</td>
                        <td className="px-4 py-3 text-zinc-400">Customer support chat widget</td>
                        <td className="px-4 py-3 text-zinc-400">Functional</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-zinc-300">HubSpot</td>
                        <td className="px-4 py-3 text-zinc-400">Marketing automation and CRM</td>
                        <td className="px-4 py-3 text-zinc-400">Marketing</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-zinc-300">Sentry</td>
                        <td className="px-4 py-3 text-zinc-400">Error tracking and monitoring</td>
                        <td className="px-4 py-3 text-zinc-400">Analytics</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">Cookie Duration</h2>
              <div className="space-y-4 text-zinc-400">
                <p>Cookies can be either:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-white">Session Cookies:</strong> Temporary cookies that are deleted when you close 
                    your browser. These are used for things like maintaining your login session.
                  </li>
                  <li>
                    <strong className="text-white">Persistent Cookies:</strong> Cookies that remain on your device for a set 
                    period or until you delete them. These are used for preferences and analytics.
                  </li>
                </ul>
                <p>Most of our cookies expire within 12 months, though some may last longer.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">Managing Cookies</h2>
              <div className="space-y-4 text-zinc-400">
                <p>You have several options for managing cookies:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-white">Cookie Banner:</strong> Use our cookie consent banner to accept or reject 
                    non-essential cookies when you first visit our website.
                  </li>
                  <li>
                    <strong className="text-white">Cookie Settings:</strong> Click the "Cookie Settings" button at the top of 
                    this page to update your preferences at any time.
                  </li>
                  <li>
                    <strong className="text-white">Browser Settings:</strong> Most browsers allow you to control cookies through 
                    their settings. You can block or delete cookies, though this may affect website functionality.
                  </li>
                  <li>
                    <strong className="text-white">Opt-Out Links:</strong> Some third parties offer opt-out mechanisms. Visit 
                    their privacy policies for more information.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">Browser-Specific Instructions</h2>
              <div className="space-y-4 text-zinc-400">
                <p>Here are links to manage cookies in popular browsers:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Microsoft Edge</a></li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">Do Not Track</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  Some browsers offer a "Do Not Track" (DNT) feature. There is currently no industry 
                  standard for how websites should respond to DNT signals. Our website does not 
                  currently respond to DNT signals, but we honor the cookie preferences you set 
                  through our consent management platform.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">Updates to This Policy</h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our 
                  practices or for other operational, legal, or regulatory reasons. We will update 
                  the "Last updated" date at the top of this page.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">Contact Us</h2>
              <div className="space-y-4 text-zinc-400">
                <p>If you have questions about our use of cookies, please contact us:</p>
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
