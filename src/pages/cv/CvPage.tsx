/**
 * CV page: the vendored static export of jcdbautista/cv (public/cv/) rendered
 * inside the portfolio shell, so the tab keeps the site header while the CV
 * itself stays a 100% parity copy of https://jcdbautista.github.io/cv/.
 */
export function CvPage() {
  return (
    <iframe
      src="/cv/"
      title="CV — Julius Christopher Dizon Bautista"
      // Fill the viewport below the sticky h-14 header; the CV scrolls inside.
      className="block h-[calc(100dvh-3.5rem)] w-full border-0 bg-white"
    />
  )
}
