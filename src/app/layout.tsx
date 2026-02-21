import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Caveat, Patrick_Hand, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick-hand",
  subsets: ["latin"],
  weight: "400",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "HUM | Household Manager",
  description: "House Managers for entrepreneurial families.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="gtm-head" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M3HSXX46');
        `}</Script>
        <Script id="fb-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');

          fbq('init', '327919584598740');
          fbq('track', 'PageView');
        `}</Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17614599015"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-aw-17614599015"
          strategy="afterInteractive"
        >{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17614599015');
        `}</Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G429QKPLE1"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-g-g429qkple1"
          strategy="afterInteractive"
        >{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-G429QKPLE1');
        `}</Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${patrickHand.variable} ${cormorantGaramond.variable} antialiased`}
      >
        <Script id="mouseflow" strategy="afterInteractive">{`
          window._mfq = window._mfq || [];
          (function() {
            var mf = document.createElement("script");
            mf.type = "text/javascript"; mf.defer = true;
            mf.src = "//cdn.mouseflow.com/projects/4cd6aae8-538e-4882-8893-da78958f2b5a.js";
            document.getElementsByTagName("head")[0].appendChild(mf);
          })();
        `}</Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M3HSXX46"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=327919584598740&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <Script id="spiffy" strategy="afterInteractive">{`
          "use strict";!function(i,t){var f=t.spiffy=t.spiffy||[];if(!f.init){
          if(f.invoked)return void(t.console&&console.error&&console.warn("Spiffy Elements included twice."))
          ;f.invoked=!0,f.methods=["identify","config","debug","off","on"],f.factory=function(i){
          return function(){var t=Array.prototype.slice.call(arguments);return t.unshift(i),f.push(t),f}},
          f.methods.forEach(function(i){spiffy[i]=f.factory(i)}),f.load=function(t,f){if(!spiffy.ACCOUNT){
          spiffy.ACCOUNT=t,spiffy.DOMAIN=f;var e=i.createElement("script");e.type="text/javascript",
          e.async=!0,e.crossorigin="anonymous",e.src="https://js.static.spiffy.co/spiffy.js?a="+t
          ;var n=i.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)}}}}(document,window),
          spiffy.SNIPPET_VERSION="1.1.0";
          spiffy.config({
              hideSidebar: false,
          })
          spiffy.load("humhome", "secure.humhome.co");
        `}</Script>
        <Script id="neverbounce-settings" strategy="afterInteractive">{`
          _NBSettings = {
            apiKey: 'public_03f1510969fd6666b4d242ddf5f82e10',
            blockFormSubmission: true,
            feedbackColors: {
              valid: '#28a745',
              invalid: '#dc3545',
              catchall: '#ffc107',
              unknown: '#6c757d'
            },
            displayPoweredBy: false
          };
        `}</Script>
        <Script
          src="https://cdn.neverbounce.com/widget/dist/NeverBounce.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
