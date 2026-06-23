'use client';

// Replace YOUR_ADSENSE_CLIENT_ID with your actual AdSense client ID (ca-pub-XXXXXXXXXX)
const ADSENSE_CLIENT = 'ca-pub-YOUR_ADSENSE_CLIENT_ID';

export function AdSenseScript() {
  // Uncomment once you have your AdSense account approved
  // return (
  //   <Script
  //     async
  //     src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
  //     crossOrigin="anonymous"
  //     strategy="afterInteractive"
  //   />
  // );
  return null;
}

interface AdProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'leaderboard' | 'skyscraper';
  className?: string;
  label?: string;
  height?: string;
}

export function AdUnit({ slot, format = 'auto', className = '', label = 'Advertisement', height = 'h-24' }: AdProps) {
  // Placeholder — replace with real AdSense ins tag after approval
  // Example real implementation:
  // useEffect(() => {
  //   try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
  // }, []);
  // return (
  //   <ins
  //     className={`adsbygoogle ${className}`}
  //     style={{ display: 'block' }}
  //     data-ad-client={ADSENSE_CLIENT}
  //     data-ad-slot={slot}
  //     data-ad-format={format}
  //     data-full-width-responsive="true"
  //   />
  // );

  return (
    <div className={`ad-placeholder ${height} w-full ${className}`}>
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs uppercase tracking-widest opacity-50">Ad</span>
        <span className="text-xs">{label}</span>
      </div>
    </div>
  );
}

export function HeaderAd() {
  return <AdUnit slot="1234567890" format="leaderboard" label="Header Ad — 728×90" height="h-24" className="mb-6" />;
}

export function InContentAd() {
  return <AdUnit slot="0987654321" format="rectangle" label="In-Content Ad — 336×280" height="h-36" className="my-8" />;
}

export function SidebarAd() {
  return <AdUnit slot="1122334455" format="skyscraper" label="Sidebar Ad — 300×600" height="h-64" />;
}

export function FooterAd() {
  return <AdUnit slot="5544332211" format="leaderboard" label="Footer Ad — 728×90" height="h-24" className="mt-6" />;
}
