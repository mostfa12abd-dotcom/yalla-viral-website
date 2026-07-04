import { useState, lazy, Suspense } from "react";
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { Services } from "./sections/Services";
import { DashboardHighlight } from "./sections/DashboardHighlight";
import { WebDemos } from "./sections/WebDemos";
import { Footer } from "./sections/Footer";

const BookingModal = lazy(() => import("./components/BookingModal").then(m => ({ default: m.BookingModal })));

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />
      <Hero onOpenAudit={openBooking} />
      <Services />
      <DashboardHighlight />
      <WebDemos />
      <Footer />

      {bookingOpen && (
        <Suspense fallback={null}>
          <BookingModal
            open={bookingOpen}
            onClose={closeBooking}
          />
        </Suspense>
      )}
    </div>
  );
}
