
export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <section className="mb-8">
        <p className="mb-4 text-lg text-gray-700">By using Raqlin’s website and services, you agree to the following terms. We strive to provide a seamless and enjoyable experience for all our customers.</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>All bookings are subject to availability and confirmation.</li>
          <li>Prices and inclusions are clearly listed for each package; please review before booking.</li>
          <li>Customers are responsible for providing accurate information during booking.</li>
          <li>Our cancellation and refund policies apply to all bookings. See <a href="/refund-policy" className="text-brand-yellow underline">Refund Policy</a> for details.</li>
          <li>We reserve the right to update these terms at any time. Changes will be posted on this page.</li>
        </ul>
        <p className="mt-4 text-gray-700">If you have any questions about our terms, please <a href="/contact" className="text-brand-yellow underline">contact us</a>. We value transparency and your trust.</p>
      </section>
    </main>
  );
}
