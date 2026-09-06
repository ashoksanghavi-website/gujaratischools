/* ============================================================
   Gallery manifest.
   Photographs migrated from the CGS website and the photos
   subdomain, grouped by event. To add more: drop files into
   public/images/ and add an entry here.
   ============================================================ */

export interface GalleryPhoto {
  src: string;
  w: number;
  h: number;
  alt: string;
  caption: string;
  event: string;
  date: string;
}

export const gallery: GalleryPhoto[] = [
  {
    src: "/images/uploads/2020/12/Speaking-Endorsement-_-28-November-2020.jpg",
    w: 1200, h: 800,
    alt: "Teachers at the Speaking Endorsement training session",
    caption: "Speaking Endorsement training",
    event: "Teacher training",
    date: "2020-11-28",
  },
  {
    src: "/images/uploads/2020/03/DSC0023.jpg",
    w: 1200, h: 800,
    alt: "Gujarati teachers working together at a training day",
    caption: "Teachers working through the course material",
    event: "Teacher training",
    date: "2019-07-21",
  },
  {
    src: "/images/uploads/2020/03/IMG_3144.jpg",
    w: 1200, h: 800,
    alt: "Training session at Oshwal Ekta Centre",
    caption: "Training day at Oshwal Ekta Centre",
    event: "Teacher training",
    date: "2019-07-21",
  },
  {
    src: "/images/uploads/2020/01/Wembley-Oct-2018-1.jpg",
    w: 1200, h: 800,
    alt: "Teachers at the Wembley training day",
    caption: "Training day in Wembley",
    event: "Teacher training",
    date: "2018-10-27",
  },
  {
    src: "/images/uploads/2020/01/CGS-Training-160402-6.jpg",
    w: 1200, h: 800,
    alt: "Teachers at a CGS training session in 2016",
    caption: "Teacher training session",
    event: "Teacher training",
    date: "2016-04-02",
  },
  {
    src: "/images/uploads/2019/12/CGS-Meeting-170902.jpg",
    w: 1200, h: 800,
    alt: "Members at a Consortium general meeting",
    caption: "General meeting",
    event: "Meetings",
    date: "2017-09-02",
  },
  {
    src: "/images/uploads/2019/12/CGS-Meeting-151030-12.jpg",
    w: 1200, h: 800,
    alt: "The meeting at which the Consortium of Gujarati Schools was founded",
    caption: "The meeting at which CGS was founded",
    event: "Meetings",
    date: "2015-10-30",
  },
  {
    src: "/images/uploads/2019/12/CGS-Team-1024x640.jpg",
    w: 1024, h: 640,
    alt: "The Consortium of Gujarati Schools committee",
    caption: "The CGS committee",
    event: "Meetings",
    date: "2019-12-01",
  },
  {
    src: "/images/uploads/2019/12/CGS-Aboutus.jpg",
    w: 1200, h: 800,
    alt: "Members of the Consortium of Gujarati Schools",
    caption: "Members of the Consortium",
    event: "Meetings",
    date: "2019-12-01",
  },
  {
    src: "/images/uploads/2020/01/Parents-1.jpg",
    w: 1200, h: 800,
    alt: "A parent reading Gujarati with a young child",
    caption: "Learning Gujarati at home",
    event: "In the classroom",
    date: "2020-01-01",
  },
  {
    src: "/images/uploads/2020/01/Parents-4.jpg",
    w: 1200, h: 800,
    alt: "Children in a Gujarati class",
    caption: "A Gujarati class",
    event: "In the classroom",
    date: "2020-01-01",
  },
  {
    src: "/images/uploads/2019/12/CGS-Importance.jpg",
    w: 1200, h: 800,
    alt: "Students studying Gujarati",
    caption: "Students studying Gujarati",
    event: "In the classroom",
    date: "2019-12-01",
  },
];

export const galleryEvents = Array.from(new Set(gallery.map((g) => g.event)));
