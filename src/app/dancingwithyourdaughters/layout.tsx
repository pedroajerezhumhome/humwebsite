import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dancing With Your Daughters",
  description: "An unreleased song. Shared with love.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Dancing With Your Daughters",
    description: "An unreleased song. Shared with love.",
    type: "music.song",
    url: "https://humhome.co/dancingwithyourdaughters",
  },
};

export default function DancingWithYourDaughtersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
