/* ============================================================
   Legacy URL map.
   Every path that worked on the old WordPress site maps to its
   new home, so existing links, bookmarks and search results
   never break. Where an old page was a list of documents, it
   redirects into the equivalent filtered library view.
   ============================================================ */

export const redirects: Record<string, string> = {
  /* ---- top level ---- */
  "/home": "/",
  "/blog": "/news",
  "/aboutus": "/about",
  "/about-us": "/about",
  "/category/aboutus": "/about",
  "/contactus": "/contact",
  "/contact-us": "/contact",
  "/welcome-to-http-gujaratischools-org": "/",

  /* ---- audiences ---- */
  "/teachers-leaders-managers": "/teachers",
  "/teachers-leaders": "/teachers",
  "/category/teachers": "/teachers",
  "/category/leaders-and-managers": "/resources?audience=Leaders",
  "/category/parents": "/parents",
  "/parents-2": "/parents",
  "/category/useful-resources-and-links": "/resources",
  "/category/list-of-gujarati-schools": "/resources?audience=Parents&type=Useful+Links",

  /* ---- committee ---- */
  "/committee": "/about/committee",
  "/committee-members-2024-2026": "/about/committee",
  "/committee-members-2018-2020": "/about/committee",
  "/commitee-2020-2022": "/about/committee",
  "/committee-members-2020-2022": "/about/committee",
  "/rules": "/about/rules",

  /* ---- events ---- */
  "/category/teachers/teaching-events": "/events",
  "/training-on-28th-november-2020": "/events/training-28-november-2020",
  "/training-on-21st-july-2019": "/events/training-21-july-2019",
  "/training-on-27th-october-2018": "/events/training-27-october-2018",
  "/training-on-1st-july-2018": "/events",
  "/training-on-2nd-september-2017": "/events",
  "/training-on-12th-november-2016": "/events",
  "/training-on-2nd-april-2016": "/events",

  /* ---- news ---- */
  "/new-a-level-guidelines": "/news/new-a-level-guidelines",
  "/a-level-guidelines": "/news/new-a-level-guidelines",
  "/e-newsletters": "/news?category=Newsletters",
  "/enewsletters": "/news?category=Newsletters",
  "/pearson-gcse-update": "/news/pearson-gcse-specification-update",
  "/teacher-assessment-grading": "/news/teacher-assessment-grading-gcse",

  /* ---- resource lists → filtered library ---- */
  "/download-forms": "/resources?type=Membership+Forms",
  "/membership-2": "/membership",
  "/general-meetings": "/resources?type=Governance",
  "/importance-of-gujarati": "/resources?type=Press+Coverage",
  "/the-importance-of-gujarati": "/resources?type=Press+Coverage",

  "/information-about-gujarati-schools": "/resources?audience=Parents&type=Useful+Links",
  "/how-parents-can-help-infant-children": "/resources?audience=Parents",
  "/useful-links-for-gujarati-websites": "/resources?type=Useful+Links",
  "/resource-list-for-teaching-gujarati": "/resources?type=Teaching+Materials",

  /* teaching guidance */
  "/assessment": "/resources?type=Teaching+Materials",
  "/behaviour": "/resources?type=Teaching+Materials",
  "/gujarati-grammar": "/resources?type=Teaching+Materials",
  "/planning": "/resources?type=Teaching+Materials",
  "/planning-lesson-planning": "/resources?type=Teaching+Materials",
  "/resources-for-teachers": "/resources?audience=Teachers",
  "/resources-for-gcse-theme-five": "/resources?type=Teaching+Materials",
  "/administration-of-a-school": "/resources?audience=Leaders",
  "/school-leadership-management": "/resources?audience=Leaders",

  /* exams */
  "/category/gcse-and-a-level": "/resources?type=Exam+Information",
  "/gcse-exam-entries": "/resources?type=Exam+Information",
  "/gcse-and-a-level-gujarati-results": "/resources?type=Exam+Information",
  "/gujarati-gcse-and-a-level-examination-dates-for-2020": "/resources?type=Exam+Information",
  "/setting-up-an-examination-centre": "/resources?audience=Leaders",
  "/gcse-speaking": "/resources?exam=GCSE",
  "/gcse-2018-gujarati": "/resources?exam=GCSE",
  "/gce-gujarati-a-level": "/resources?exam=A+Level",
  "/new-a-level-spec-and-sam": "/resources?exam=A+Level&type=Exam+Specifications",

  /* specifications */
  "/ocr-gcse": "/resources?board=OCR&exam=GCSE&type=Exam+Specifications",
  "/ocr-a-level": "/resources?board=OCR&exam=A+Level&type=Exam+Specifications",
  "/category/ocr-gcse": "/resources?board=OCR&exam=GCSE",
  "/category/ocr-a-level": "/resources?board=OCR&exam=A+Level",
  "/sample-assessment-material-sam": "/resources?board=OCR&exam=GCSE&type=Exam+Specifications",
  "/sample-assessment-materials-sams-for-ocr-a-level":
    "/resources?board=OCR&exam=A+Level&type=Exam+Specifications",

  /* past papers, by session */
  "/category/ocr-gcse/past-papers-ocr-gcse": "/resources?type=Past+Papers&exam=GCSE",
  "/category/ocr-a-level/past-papers-ocr-a-level": "/resources?type=Past+Papers&exam=A+Level",
  "/past-papers-for-2012-session": "/resources?type=Past+Papers&exam=A+Level&year=2012",
  "/past-papers-for-2013-session": "/resources?type=Past+Papers&exam=A+Level&year=2013",
  "/past-papers-for-2014-session": "/resources?type=Past+Papers&exam=A+Level&year=2014",
  "/past-papers-for-2015-session": "/resources?type=Past+Papers&exam=A+Level&year=2015",
  "/past-papers-for-2016-session": "/resources?type=Past+Papers&exam=A+Level&year=2016",
  "/past-papers-for-2017-session": "/resources?type=Past+Papers&exam=A+Level&year=2017",
  "/past-papers-for-2018-session": "/resources?type=Past+Papers&exam=A+Level&year=2018",
  "/past-papers-for-2013-session-ocr-gcse": "/resources?type=Past+Papers&exam=GCSE&year=2013",
  "/past-papers-for-2014-session-ocr-gcse": "/resources?type=Past+Papers&exam=GCSE&year=2014",
  "/past-papers-for-2015-session-ocr-gcse": "/resources?type=Past+Papers&exam=GCSE&year=2015",
  "/past-papers-for-2016-session-ocr-gcse": "/resources?type=Past+Papers&exam=GCSE&year=2016",
  "/past-papers-for-2017-session-ocr-gcse": "/resources?type=Past+Papers&exam=GCSE&year=2017",
  "/past-papers-for-2018-session-ocr-gcse": "/resources?type=Past+Papers&exam=GCSE&year=2018",

  /* individual schools */
  "/shree-ram-mandir-gujarati-classes-in-walsall-west-midlands":
    "/resources?audience=Parents&type=Useful+Links",
  "/shree-bharatiya-mandal-tameside-indian-association":
    "/resources?audience=Parents&type=Useful+Links",

  /* gallery */
  "/gallery-2": "/gallery",
  "/photos": "/gallery",

  /* dead WordPress commerce pages from the old theme */
  "/user-account": "/",
  "/user-public-account": "/",
  "/wishlist": "/",
  "/checkout-2": "/",
};
