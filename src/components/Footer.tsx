import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-blue-500" />
              <span className="text-lg font-bold tracking-tight text-white">TrustLens.ai</span>
            </Link>
            <p className="text-sm text-zinc-500 max-w-xs">
              Next-generation AI security and compliance platform for modern SaaS startups.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/#features" className="text-sm text-zinc-500 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-sm text-zinc-500 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/docs" className="text-sm text-zinc-500 hover:text-white transition-colors">Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-zinc-500 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/blog" className="text-sm text-zinc-500 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="text-sm text-zinc-500 hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-zinc-500 hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-zinc-500 hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="/cookies" className="text-sm text-zinc-500 hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} TrustLens.ai Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
