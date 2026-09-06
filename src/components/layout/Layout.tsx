import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomBar } from "./BottomBar";
import { ScrollProgress } from "./ScrollProgress";
import { SkipLink } from "./SkipLink";
import { SearchOverlay } from "./SearchOverlay";
import { useSearch } from "@/lib/searchContext";

export function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen, close } = useSearch();
  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <Header />
      {/* Padding matches the header's resting height; the bottom padding
          clears the mobile bar so nothing is ever hidden behind it. */}
      <main id="main" className="pt-[76px] pb-[calc(var(--bottombar-h)+env(safe-area-inset-bottom))] lg:pt-[116px] sm:pb-0">
        {children}
      </main>
      <Footer />
      <BottomBar />
      <SearchOverlay open={isOpen} onClose={close} />
    </>
  );
}
