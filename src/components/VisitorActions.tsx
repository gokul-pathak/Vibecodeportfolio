import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Share2, 
  Mail, 
  BookmarkPlus, 
  Coffee,
  Twitter,
  Linkedin,
  Facebook,
  Link2,
  Check,
  Download,
  FileText
} from 'lucide-react';

export function VisitorActions() {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = 'Check out this amazing portfolio!';

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = () => {
    // Fallback method for copying to clipboard when Clipboard API is blocked
    const url = window.location.href;
    
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          // Fallback to textarea method
          fallbackCopyTextToClipboard(url);
        });
    } else {
      // Use fallback method
      fallbackCopyTextToClipboard(url);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    document.body.removeChild(textArea);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter subscription
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl" />
            
            <div className="relative p-8 rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
                  <Share2 className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl text-white">Share Portfolio</h3>
                  <p className="text-slate-400 text-sm">Spread the word!</p>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setIsShareOpen(!isShareOpen)}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg shadow-purple-500/25"
                >
                  <Share2 className="w-5 h-5 inline-block mr-2" />
                  Share on Social Media
                </button>

                <AnimatePresence>
                  {isShareOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-3 gap-3 pt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleShare('twitter')}
                          className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20 transition-colors"
                        >
                          <Twitter className="w-6 h-6 text-sky-400 mx-auto" />
                          <p className="text-xs text-sky-400 mt-2">Twitter</p>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleShare('linkedin')}
                          className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 transition-colors"
                        >
                          <Linkedin className="w-6 h-6 text-blue-400 mx-auto" />
                          <p className="text-xs text-blue-400 mt-2">LinkedIn</p>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleShare('facebook')}
                          className="p-4 rounded-xl bg-blue-600/10 border border-blue-600/30 hover:bg-blue-600/20 transition-colors"
                        >
                          <Facebook className="w-6 h-6 text-blue-500 mx-auto" />
                          <p className="text-xs text-blue-500 mt-2">Facebook</p>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={handleCopyLink}
                  className="w-full px-6 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-all border border-white/10 flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 text-green-400" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="w-5 h-5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Enjoying the portfolio?</span>
                  <a
                    href="https://www.buymeacoffee.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors border border-yellow-500/30"
                  >
                    <Coffee className="w-4 h-4" />
                    <span>Buy me a coffee</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-3xl blur-2xl" />
            
            <div className="relative p-8 rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-white/10 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl text-white">Stay Updated</h3>
                  <p className="text-slate-400 text-sm">Get latest projects & insights</p>
                </div>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={subscribed}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {subscribed ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      Subscribed!
                    </span>
                  ) : (
                    'Subscribe to Newsletter'
                  )}
                </motion.button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <p className="text-sm text-slate-400 mb-3">Download Resources:</p>
                
                <button className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 hover:bg-slate-800 transition-colors flex items-center justify-between group">
                  <span className="text-white flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Case Studies PDF
                  </span>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </button>

                <button className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 hover:bg-slate-800 transition-colors flex items-center justify-between group">
                  <span className="text-white flex items-center gap-2">
                    <BookmarkPlus className="w-4 h-4" />
                    Design Templates
                  </span>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </button>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20">
                <p className="text-sm text-slate-300">
                  🎁 <span className="text-blue-400">Bonus:</span> Subscribers get exclusive access to design resources and early project previews!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}