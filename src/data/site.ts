/* ============================================================
   Static site copy, the single source of truth for anything
   that isn't markdown. Committee, contact details, mission.
   Verbatim client copy is marked; nothing here is invented.
   ============================================================ */

export const site = {
  name: "Consortium of Gujarati Schools",
  shortName: "CGS",
  tagline: "Inspiring Gujarati Teachers and Students",
  description:
    "A UK educational charity supporting the teaching and learning of Gujarati for children aged 5 to 16.",
  url: "https://www.gujaratischools.org",
};

export const contact = {
  chair: "Jayant Tanna",
  chairRole: "Chair",
  phone: "+44 (0)7711 372 853",
  phoneHref: "tel:+447711372853",
  email: "jayant.tanna@gujaratischools.org",
  membershipContact: "Vijyaben Bhanderi",
  membershipRole: "Secretary",
  membershipEmail: "vijya.bhanderi@gujaratischools.org",
};

export const social = {
  facebook: "https://www.facebook.com/gujaratischoolsuk",
  twitter: "https://twitter.com/gujaratischools",
  youtube: "https://www.youtube.com/channel/UCUWtYiPxTcErR4G7gAQhk9g",
  newsletter: "https://eepurl.com/gSEMzn",
};

/* Verbatim client copy. */
export const mission = {
  aim: "We aim to encourage and inspire our teachers to teach with confidence and intelligence to enable all their students to learn and achieve excellence in Gujarati.",
  secondary: "To be happy and successful is to know who you are.",
  purpose:
    "The Consortium of Gujarati School aims to inspire Gujarati teachers and students, by providing excellent learning resources.",
};

/* The four themes, with the client's verbatim descriptions. */
export const themes = [
  {
    key: "resources",
    title: "Learning resources",
    blurb:
      "Check out our growing body of Gujarati learning resources, including past exam papers and educational videos.",
    to: "/resources",
    accent: "var(--indigo)",
    feature: true,
  },
  {
    key: "courses",
    title: "Teacher training courses",
    blurb:
      "Information on latest teacher training courses, to empower Gujarati teachers with the latest techniques and syllabus.",
    to: "/events",
    accent: "var(--marigold)",
  },
  {
    key: "teachers",
    title: "Excellent teachers",
    blurb:
      "Get professional education and reliable consultation from our team of excellent Gujarati teachers.",
    to: "/teachers",
    accent: "var(--gold-hair)",
  },
  {
    key: "about",
    title: "About the Consortium",
    blurb:
      "Learn about the work the Consortium of Gujarati School does with many Gujarati schools across the UK.",
    to: "/about",
    accent: "var(--leaf)",
  },
] as const;

/* The three doors on the home page, the fix for the navigation
   complaint. Each goes straight into a pre-filtered library view. */
export const audienceDoors = [
  {
    key: "Teachers",
    title: "I teach Gujarati",
    blurb: "Lesson material, past papers, training packs and exam guidance.",
    to: "/resources?audience=Teachers",
    accent: "var(--aud-teachers)",
  },
  {
    key: "Leaders",
    title: "I lead a school",
    blurb: "Membership forms, governance, and running a Gujarati school.",
    to: "/resources?audience=Leaders",
    accent: "var(--aud-leaders)",
  },
  {
    key: "Parents",
    title: "I'm a parent",
    blurb: "Finding a school near you, and helping your child at home.",
    to: "/resources?audience=Parents",
    accent: "var(--aud-parents)",
  },
] as const;

/* Verbatim heritage passage. */
export const heritage = {
  title: "Gujarati, and why it is worth keeping",
  body: "Gujarati is an Indo-Aryan language native to the Indian state of Gujarat and spoken predominantly by the Gujarati people. Gujarati is part of the greater Indo-European language family. Gujarati is descended from Old Gujarati (circa 1100 to 1500 AD). In India, it is the official language in the state of Gujarat, as well as an official language in the union territories of Daman and Diu and Dadra and Nagar Haveli. As of 2011, Gujarati is the 6th most widely spoken language in India by number of native speakers, spoken by 55.5 million speakers which amounts to about 4.5% of the total Indian population. It is the 26th most widely spoken language in the world by number of native speakers as of 2007.",
  youtubeId: "IKvVM5FetQ8",
  youtubeTitle: "Inspiring Gujarati Learning",
};

/* The cultural heart of the home page. Verbatim, set in Noto Sans Gujarati. */
export const gandhiji = {
  heading: "માતૃભાષા અને વિશ્વભાષા",
  headingEn: "Mother tongue and world languages",
  attribution: "ગાંધીજી",
  attributionEn: "Gandhiji",
  text: "હું મારા ઘરની આસપાસ દીવાલ ચણી લેવા તથા મારી બારીઓ બંધ કરી દેવા નથી માગતો. મારા ઘરની આસ પાસ સઘળા દેશોની સંસ્કૃતિના પવનની લહેરીઓ છૂટથી વાતી રહે એમ ઇચ્છું છું. પણ પવનની એવી કોઇ લહેરી દ્વારા જમીનથી અધ્ધર થઇ જવાનો હું ઇનકાર કરું છું. સાહિત્યમાં રસ ધરાવતાં આપણાં તરુણ સ્ત્રીપુરુષો અંગ્રેજી તેમજ બીજી વિશ્વભાષાઓ પેટ ભરીને શીખે એમ હું ઇચ્છું છું. અને પછી તેઓ જગદીશચંદ્ર બોઝ, પ્રફુલચંદ્ર રોય અને કવિવર રવીંદ્રનાથ ટાગોરની પેઠે પોતાના અભ્યાસનો લાભ હિંદને તથા દુનિયાને આપે એવી તેમની પાસેથી અપેક્ષા રાખું છું. પરંતુ એક પણ હિંદવાસી પોતાની માતૃભાષાને ભુલે, તેની અવગણના કરે કે તેનાથી શરમાય, અથવા પોતાની માતૃભાષામાં પોતે વિચાર કરી શકતો નથી કે પોતાના વિચારો સારામાં સારી રીતે દર્શાવી શકતો નથી એમ તેને લાગે, એમ હું ઇચ્છતો નથી.",
};

/* The Pearson GCSE specification changes, verbatim in substance. */
export const examUpdate = {
  title: "Two changes to the Pearson GCSE Gujarati specification",
  intro: "Pearson have made two small changes in the GCSE Gujarati specification.",
  points: [
    "Assessment information for Paper 2 has been amended with updated guidance on how to submit recordings of the speaking assessment. Complete, unedited recordings of all assessments must be submitted to Pearson via the online Learner Work Transfer portal (page 14).",
    "Appendix 3, the vocabulary list, has been updated and minor errors corrected (page 76).",
  ],
  specUrl:
    "https://qualifications.pearson.com/en/qualifications/edexcel-gcses/gujarati-2017.html",
  specLabel: "Pearson GCSE Gujarati specification",
  gradingTitle: "Teacher assessment grading for GCSE Gujarati",
  gradingBody:
    "An important update on teacher assessment grading for GCSE Gujarati, from training held on 20 April 2021.",
  gradingVideoId: "mcf6rtgdp5U",
};

/* Membership, verbatim in substance. */
export const membership = {
  intro:
    "Membership is open to individual teachers, parents and supporters, and to Gujarati schools, temples and community organisations across the UK.",
  steps: [
    "Download and complete the appropriate membership form.",
    "Save it with a new name.",
    `Email the completed form to ${contact.membershipContact}, our membership secretary (address below).`,
    "Please make the subscription payment online too, if possible.",
  ],
  forms: [
    {
      title: "Individual Membership Form",
      description: "For individual teachers, parents and supporters.",
      fileUrl: "/documents/2020/08/CGS-Membership-Form-Fill-2020-2022-Individual.pdf",
    },
    {
      title: "Organisation Membership Form",
      description: "For Gujarati schools, temples and community organisations.",
      fileUrl: "/documents/2020/08/CGS-Membership-Form-Fill-2020-2022-Organisation.pdf",
    },
    {
      title: "School Information Form",
      description: "Tell us about your school so we can support you and list you in our network.",
      fileUrl: "/documents/2020/08/Schools-Info-Form-Formfill-Sep-2020.pdf",
    },
  ],
};

/* The governing document, recovered from the live site. */
export const rulesDoc = {
  title: "CGS Rules, adopted 22 April 2018",
  fileUrl: "/documents/2019/12/CGS-Rules-adopter-22nd-April-2018.pdf",
};

/* ---------- Committee ----------
   Names, roles and portraits migrated from the live site. */
export interface Member {
  name: string;
  role: string;
  photo?: string;
}

export const committeeCurrent = {
  term: "2024-2026",
  members: [
    { name: "Jayantilal Tanna", role: "Chairperson", photo: "/images/uploads/2024/11/Jayant-Tanna.jpg" },
    { name: "Shobhaben Joshi", role: "Vice Chair, Midlands", photo: "/images/uploads/2024/11/Shobhaben-Joshi.jpg" },
    { name: "Chetana Bhatt-Shah", role: "Vice Chair, Northwest", photo: "/images/uploads/2024/11/Chetana-Bhatt-Shah.jpg" },
    { name: "Vijyaben Bhanderi", role: "Secretary", photo: "/images/uploads/2024/11/Vijyaben-Bhanderi.jpg" },
    { name: "Rekhaben Patel", role: "Treasurer", photo: "/images/uploads/2024/11/Rekhaben-Patel.jpg" },
    { name: "Sonalben R. Shah", role: "Immediate Past Chair", photo: "/images/uploads/2024/11/Sonalben-R.Shah_.jpg" },
    { name: "Dipaben Chhatralia", role: "Committee Member", photo: "/images/uploads/2024/11/Dipaben-Chhatralia.jpg" },
    { name: "Hasvinaben Shah", role: "Committee Member", photo: "/images/uploads/2024/11/Hasvinaben-Shah.jpg" },
    { name: "Jatinbhai Shah", role: "Committee Member", photo: "/images/uploads/2024/11/Jatinbhai-Shah.jpg" },
    { name: "Rekha Patel", role: "Committee Member", photo: "/images/uploads/2024/11/Rekha-Patel.jpg" },
    { name: "Ritaben Kamdar", role: "Committee Member", photo: "/images/uploads/2024/11/Ritaben-Kamdar.jpg" },
    { name: "Tusharbhai Shah", role: "Committee Member", photo: "/images/uploads/2024/11/Tusharbhai-Shah.jpg" },
    { name: "Ritaben Patel", role: "Committee Member", photo: "/images/uploads/2024/11/Ritaben-Patel.jpg" },
  ] as Member[],
};

export const committeeArchive = {
  term: "2020-2022",
  members: [
    { name: "Jayantilal Tanna", role: "Chairperson", photo: "/images/uploads/2020/11/Jayantilal-Tanna.jpg" },
    { name: "Vijyaben Bhanderi", role: "Secretary", photo: "/images/uploads/2020/11/Vijyaben-Bhanderi.png" },
    { name: "Rekhaben Patel", role: "Treasurer", photo: "/images/uploads/2020/11/Rekhaben-Patel.jpg" },
    { name: "Hasvinaben Shah", role: "Committee Member", photo: "/images/uploads/2020/11/Hasvinaben-Shah.jpg" },
    { name: "Dr Mahendrabhai Nathadwarawala", role: "Committee Member", photo: "/images/uploads/2020/11/Mahendrabhai-Nathadwarawala.jpg" },
    { name: "Prabhavatiben Jivan", role: "Committee Member", photo: "/images/uploads/2020/11/Prabhavatiben-Jivan.png" },
    { name: "Rekhaben L. Shah", role: "Committee Member", photo: "/images/uploads/2020/11/Rekhaben-L-Shah.png" },
    { name: "Rekhaben M. Shah", role: "Committee Member", photo: "/images/uploads/2020/11/Rekhaben-M-Shah.jpg" },
    { name: "Sonalben R. Shah", role: "Committee Member", photo: "/images/uploads/2020/11/Sonalben-R.-Shah.png" },
    { name: "Tusharbhai Shah", role: "Committee Member", photo: "/images/uploads/2020/11/Tusharbhai-Shah.jpg" },
  ] as Member[],
};

/* Photography migrated from the live site. */
export const photos = {
  hero: "/images/uploads/2020/03/DSC0023.jpg",
  heroAlt: "Gujarati teachers at a CGS training session",
  about: "/images/uploads/2019/12/CGS-Aboutus.jpg",
  team: "/images/uploads/2019/12/CGS-Team-1024x640.jpg",
  meeting: "/images/uploads/2019/12/CGS-Meeting-170902.jpg",
  training2016: "/images/uploads/2020/01/CGS-Training-160402-6.jpg",
  wembley2018: "/images/uploads/2020/01/Wembley-Oct-2018-1.jpg",
  speaking2020: "/images/uploads/2020/12/Speaking-Endorsement-_-28-November-2020.jpg",
  training3144: "/images/uploads/2020/03/IMG_3144.jpg",
  parents1: "/images/uploads/2020/01/Parents-1.jpg",
  parents3: "/images/uploads/2020/01/Parents-3.jpg",
  parents4: "/images/uploads/2020/01/Parents-4.jpg",
  parents5: "/images/uploads/2020/01/Parents-5.jpg",
  usefulWebsites: "/images/uploads/2020/01/useful-websites-e1581362699475.jpg",
  importance: "/images/uploads/2019/12/CGS-Importance.jpg",
};

/* ---------- About ----------
   Migrated verbatim from the charity's own About page. */
export const about = {
  lead: "We are a Consortium of Organisations that aim to inspire Gujarati Teachers and Students in UK to continue the teaching of the Gujarati language.",
  formation: {
    heading: "How the Consortium was formed",
    body: "The formation of Consortium of Gujarati Schools came about as a result of widespread concerns in the Gujarati community over the proposed withdrawal of Gujarati GCSE and A Level examinations in the UK by 2017. A meeting was held at Kadwa Patidar Hall on 8th May 2015. It was attended by 122 people. A committee proposed the setting up of a permanent body representing all Gujarati schools. Hence the Consortium of Gujarati Schools was born on 30th October 2015.",
  },
  aims: [
    "To promote the professional development of all teachers of Gujarati through the organisation of training and support.",
    "To develop and promote good teaching, learning, leadership and management in Gujarati supplementary schools.",
    "To act as representative of Gujarati schools in matters concerned with teaching, learning, leadership, management, curriculum, examinations, assessment, training and qualifications.",
    "To liaise with schools, examination boards, DfE, training organisations and community organisations to improve standards and to increase the numbers of pupils learning and taking external examinations in Gujarati.",
  ],
  members: {
    heading: "Who our members are",
    body: "CGS has a membership of nearly 30 organisation members running supplementary schools in London, Leicester, Birmingham, Manchester, Walsall, Bolton, Crawley, Luton and Welwyn Garden City. In addition, there are a number of Individual Members as well.",
  },
  /* Real, verifiable figures only. */
  facts: [
    { value: "2015", label: "Founded, on 30 October" },
    { value: "~30", label: "Organisation members" },
    { value: "5-16", label: "Ages supported" },
    { value: "9", label: "Towns and cities" },
  ],
};

/* ---------- Enquiry / apply forms ----------
   The "Enquire" and "Register interest" forms submit to whatever is set
   here. Leave `endpoint` empty and every form opens the visitor's email
   app with the details filled in (works everywhere, no account). To
   capture submissions without the email-app step, create a free form at
   https://formspree.io and paste its endpoint URL here, the forms will
   POST to it automatically, no other change needed. */
export const forms = {
  endpoint: "",
  schoolTo: contact.email,
  teachTo: contact.membershipEmail,
  membershipTo: contact.membershipEmail,
  /* Shown to people who apply online, and the reason online is encouraged. */
  responseNote: "We aim to get back to you within 12 hours.",
};
