
export default function FAQPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <section className="mb-8">
        <p className="mb-4 text-lg text-gray-700">Find answers to the most common questions about our tours, packages, bookings, and policies. If you need more help, feel free to <a href="/contact" className="text-brand-yellow underline">contact us</a>!</p>
        <ul className="space-y-6">
          <li>
            <strong>How do I book a tour package?</strong><br />
            You can easily book any package directly on our website. Just visit the <a href="/packages" className="text-brand-yellow underline">Packages</a> page, choose your preferred option, and follow the booking instructions.
          </li>
          <li>
            <strong>What is your cancellation and refund policy?</strong><br />
            We offer flexible refunds based on the time of cancellation. Please see our <a href="/refund-policy" className="text-brand-yellow underline">Refund Policy</a> and <a href="/cancellation-policy" className="text-brand-yellow underline">Cancellation Policy</a> for full details.
          </li>
          <li>
            <strong>Can I customize my travel experience?</strong><br />
            Absolutely! We specialize in personalized travel. Contact us to discuss your requirements and we’ll tailor a package just for you.
          </li>
          <li>
            <strong>How do I reach customer support?</strong><br />
            You can call us at <a href="tel:+917012953286" className="text-brand-yellow underline">+91 701 295 3286</a> or email <a href="mailto:raqlin@gmail.com" className="text-brand-yellow underline">raqlin@gmail.com</a>.
          </li>
        </ul>
      </section>
    </main>
  );
}
