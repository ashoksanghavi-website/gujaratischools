import NewsDetail from "./NewsDetail";

/* Training events share the article page; only the breadcrumb differs. */
export default function EventDetail() {
  return <NewsDetail kind="events" />;
}
