
export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <section className="mb-8">
        <p className="mb-4 text-lg text-gray-700">Your privacy matters to us. At Raqlin, we are committed to protecting your personal information and ensuring your data is handled responsibly.</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>We only collect information necessary for booking and customer service.</li>
          <li>Your data is never shared with third parties except as required for your travel arrangements.</li>
          <li>We use secure technology to safeguard your information.</li>
          <li>You can request, update, or delete your data at any time by contacting us.</li>
        </ul>
        <p className="mt-4 text-gray-700">For more details or concerns, please <a href="/contact" className="text-brand-yellow underline">reach out to our team</a>. Your trust is our top priority.</p>
      </section>
    </main>
  );
}
