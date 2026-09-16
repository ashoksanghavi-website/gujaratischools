/* ============================================================
   Navigation model.
   The mega menu is the fix for "teachers can't find anything":
   every entry below is a direct link into a pre-filtered view of
   the library, so any document is two clicks from anywhere.
   ============================================================ */

export interface NavItem {
  label: string;
  to: string;
  description?: string;
}

export interface MegaColumn {
  heading: string;
  items: NavItem[];
}

export const primaryNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Find a school", to: "/find-a-school" },
  { label: "Teachers", to: "/teachers" },
  { label: "Parents", to: "/parents" },
  { label: "Resources", to: "/resources" },
  { label: "News", to: "/news" },
  { label: "Membership", to: "/membership" },
  { label: "Contact", to: "/contact" },
];

/** Which nav items open a mega menu. */
export const megaFor: Record<string, MegaColumn[]> = {
  "/resources": [
    {
      heading: "Who it's for",
      items: [
        { label: "For teachers", to: "/resources?audience=Teachers", description: "Lesson material, past papers, training packs" },
        { label: "For school leaders", to: "/resources?audience=Leaders", description: "Running a school, governance, forms" },
        { label: "For parents", to: "/resources?audience=Parents", description: "Helping at home, finding a school" },
      ],
    },
    {
      heading: "By type",
      items: [
        { label: "Past papers", to: "/resources?type=Past+Papers" },
        { label: "Exam specifications", to: "/resources?type=Exam+Specifications" },
        { label: "Exam information", to: "/resources?type=Exam+Information" },
        { label: "Training materials", to: "/resources?type=Training+Materials" },
        { label: "Teaching materials", to: "/resources?type=Teaching+Materials" },
        { label: "Membership forms", to: "/resources?type=Membership+Forms" },
        { label: "Newsletters", to: "/resources?type=Newsletters" },
        { label: "Useful links", to: "/resources?type=Useful+Links" },
      ],
    },
    {
      heading: "By exam",
      items: [
        { label: "GCSE Gujarati", to: "/resources?exam=GCSE" },
        { label: "A Level Gujarati", to: "/resources?exam=A+Level" },
        { label: "OCR past papers", to: "/resources?type=Past+Papers&board=OCR" },
        { label: "Browse everything", to: "/resources" },
      ],
    },
  ],
  "/teachers": [
    {
      heading: "Start here",
      items: [
        { label: "Become a teacher", to: "/teach", description: "New to teaching? We train you, no qualification needed" },
        { label: "Teacher hub", to: "/teachers", description: "Training, exams and classroom material" },
        { label: "Training events", to: "/events" },
        { label: "Become a member", to: "/membership" },
      ],
    },
    {
      heading: "Classroom",
      items: [
        { label: "Teaching materials", to: "/resources?type=Teaching+Materials" },
        { label: "Training packs", to: "/resources?type=Training+Materials" },
        { label: "Past papers", to: "/resources?type=Past+Papers" },
      ],
    },
    {
      heading: "Running a school",
      items: [
        { label: "Leadership & management", to: "/resources?audience=Leaders" },
        { label: "Governance & meetings", to: "/resources?type=Governance" },
        { label: "Membership forms", to: "/resources?type=Membership+Forms" },
      ],
    },
  ],
};

/** Footer: the most-requested documents, as direct downloads. */
export const footerExplore: NavItem[] = [
  { label: "About CGS", to: "/about" },
  { label: "Find a school", to: "/find-a-school" },
  { label: "Become a teacher", to: "/teach" },
  { label: "Rules & objects", to: "/about/rules" },
  { label: "Committee", to: "/about/committee" },
  { label: "News", to: "/news" },
  { label: "Photo gallery", to: "/gallery" },
];

/** Bottom bar on phones: the two things people came for, always one tap away. */
export const bottomBar = [
  { label: "Home", to: "/", icon: "home" as const },
  { label: "Resources", to: "/resources", icon: "library" as const },
  { label: "Find a school", to: "/find-a-school", icon: "school" as const },
  { label: "Contact", to: "/contact", icon: "mail" as const },
];
