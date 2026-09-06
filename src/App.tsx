import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SmoothScroll } from "@/lib/SmoothScroll";
import { SearchProvider } from "@/lib/searchContext";
import { PageTransition } from "@/components/motion/PageTransition";
import { redirects } from "@/data/redirects";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Rules = lazy(() => import("@/pages/Rules"));
const Committee = lazy(() => import("@/pages/Committee"));
const Teachers = lazy(() => import("@/pages/Teachers"));
const Parents = lazy(() => import("@/pages/Parents"));
const Resources = lazy(() => import("@/pages/Resources"));
const ResourceDetail = lazy(() => import("@/pages/ResourceDetail"));
const News = lazy(() => import("@/pages/News"));
const NewsDetail = lazy(() => import("@/pages/NewsDetail"));
const Events = lazy(() => import("@/pages/Events"));
const EventDetail = lazy(() => import("@/pages/EventDetail"));
const Membership = lazy(() => import("@/pages/Membership"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Contact = lazy(() => import("@/pages/Contact"));
const Search = lazy(() => import("@/pages/Search"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/* A quiet placeholder. Route chunks are small, so this is rarely
   seen; it must never look like an error. */
function Fallback() {
  return (
    <div className="container-cgs section" aria-live="polite" aria-busy="true">
      <p className="text-ink-soft">Loading…</p>
    </div>
  );
}

const page = (el: React.ReactNode) => <PageTransition>{el}</PageTransition>;

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<Fallback />}>
        <Routes location={location} key={location.pathname}>
          {/* Legacy WordPress URLs */}
          {Object.entries(redirects).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}

          <Route path="/" element={page(<Home />)} />
          <Route path="/about" element={page(<About />)} />
          <Route path="/about/rules" element={page(<Rules />)} />
          <Route path="/about/committee" element={page(<Committee />)} />
          <Route path="/teachers" element={page(<Teachers />)} />
          <Route path="/parents" element={page(<Parents />)} />
          <Route path="/resources" element={page(<Resources />)} />
          <Route path="/resources/:slug" element={page(<ResourceDetail />)} />
          <Route path="/news" element={page(<News />)} />
          <Route path="/news/:slug" element={page(<NewsDetail />)} />
          <Route path="/events" element={page(<Events />)} />
          <Route path="/events/:slug" element={page(<EventDetail />)} />
          <Route path="/membership" element={page(<Membership />)} />
          <Route path="/gallery" element={page(<Gallery />)} />
          <Route path="/contact" element={page(<Contact />)} />
          <Route path="/search" element={page(<Search />)} />
          <Route path="*" element={page(<NotFound />)} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <SearchProvider>
      <SmoothScroll>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </SmoothScroll>
    </SearchProvider>
  );
}
