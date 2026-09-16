import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Consortium of Gujarati Schools, home"
    >
      <img
        src="/images/logo/cgs-logo-colour.png"
        alt="Consortium of Gujarati Schools"
        width={300}
        height={78}
        className="h-[46px] w-auto sm:h-[54px]"
        // eager: part of the sticky header, always visible
        loading="eager"
      />
    </Link>
  );
}
