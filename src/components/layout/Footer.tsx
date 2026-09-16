import { Link } from "react-router-dom";
import { contact, membership, site, social } from "@/data/site";
import { footerExplore } from "@/data/nav";
import { RuledPaper } from "@/components/motifs/Motifs";
import { IconFacebook, IconTwitter, IconYoutube, IconDownload, IconExternal } from "@/components/ui/Icons";

/* ============================================================
   Footer, four columns plus a base row, on warm paper.
   Column three carries the most-requested documents as direct
   downloads, because that is what people come to the footer for.
   ============================================================ */

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-section border-t border-rule bg-paper-tint">
      <RuledPaper soft className="opacity-50" />

      <div className="container-cgs relative py-section-sm">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* 1, identity */}
          <div>
            <img
              src="/images/logo/cgs-logo-colour.png"
              alt={site.name}
              width={56}
              height={56}
              style={{ height: 52, width: "auto" }}
              loading="lazy"
            />
            <p className="mt-4 max-w-[34ch] text-small text-ink-soft">
              A UK educational charity supporting the teaching and learning of Gujarati for
              children aged 5 to 16.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CGS on Facebook"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border border-rule bg-paper-raised text-ink-soft transition-colors duration-fast hover:border-indigo hover:text-indigo"
              >
                <IconFacebook size={18} />
              </a>
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CGS on Twitter"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border border-rule bg-paper-raised text-ink-soft transition-colors duration-fast hover:border-indigo hover:text-indigo"
              >
                <IconTwitter size={18} />
              </a>
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CGS on YouTube"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border border-rule bg-paper-raised text-ink-soft transition-colors duration-fast hover:border-indigo hover:text-indigo"
              >
                <IconYoutube size={18} />
              </a>
            </div>
          </div>

          {/* 2, explore */}
          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="text-small font-semibold text-ink">
              Explore
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {footerExplore.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-draw text-small text-ink-soft hover:text-indigo">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3, the documents people actually come for */}
          <nav aria-labelledby="footer-forms">
            <h2 id="footer-forms" className="text-small font-semibold text-ink">
              Forms &amp; specifications
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {membership.forms.map((f) => (
                <li key={f.fileUrl}>
                  <a
                    href={f.fileUrl}
                    download
                    className="group flex items-start gap-2 text-small text-ink-soft transition-colors hover:text-indigo"
                  >
                    <IconDownload size={16} className="mt-1 shrink-0" />
                    <span className="link-draw">{f.title}</span>
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/resources?type=Exam+Specifications"
                  className="group flex items-start gap-2 text-small text-ink-soft transition-colors hover:text-indigo"
                >
                  <IconExternal size={16} className="mt-1 shrink-0" />
                  <span className="link-draw">Exam specifications</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/resources?type=Past+Papers"
                  className="group flex items-start gap-2 text-small text-ink-soft transition-colors hover:text-indigo"
                >
                  <IconExternal size={16} className="mt-1 shrink-0" />
                  <span className="link-draw">Past papers</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* 4, contact + newsletter */}
          <div>
            <h2 className="text-small font-semibold text-ink">Get in touch</h2>
            <address className="mt-4 not-italic text-small text-ink-soft">
              <p className="font-medium text-ink">{contact.chair}</p>
              <p>{contact.chairRole}</p>
              <p className="mt-2">
                <a href={contact.phoneHref} className="link-draw text-indigo">
                  {contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${contact.email}`} className="link-draw break-words text-indigo">
                  {contact.email}
                </a>
              </p>
            </address>

            <h3 className="mt-6 text-small font-semibold text-ink">Newsletter</h3>
            <p className="mt-2 text-small text-ink-soft">
              Occasional updates on training, exams and resources.
            </p>
            <a
              href={social.newsletter}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[44px] items-center rounded-pill bg-indigo px-5 text-small font-semibold text-white transition-colors duration-fast hover:bg-indigo-deep"
            >
              Sign up
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-rule pt-5 text-micro text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Registered charity in the United Kingdom.
          </p>
          <p>
            <Link to="/about/rules" className="link-draw">
              Rules &amp; objects
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
