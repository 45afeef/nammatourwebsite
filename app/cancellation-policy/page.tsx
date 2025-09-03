
export default function CancellationPolicyPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Cancellation Policy</h1>
      <section className="mb-8">
        <p className="mb-4 text-lg text-gray-700">We know travel plans can change. Our cancellation policy is designed to be flexible and fair, so you can book with confidence.</p>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>100% Refund:</strong> Cancel at least 5 days before your scheduled trip.</li>
          <li><strong>50% Refund:</strong> Cancel at least 72 hours before your scheduled trip.</li>
          <li><strong>25% Refund:</strong> Cancel at least 24 hours before your scheduled trip.</li>
          <li><strong>No Refund:</strong> Cancellations made less than 24 hours before the trip or after commencement are not eligible for a refund unless otherwise specified.</li>
        </ul>
        <p className="mt-4 text-gray-700">If you need to cancel, please <a href="/contact" className="text-brand-yellow underline">contact our team</a> as soon as possible. We’re here to assist you and make the process smooth.</p>
      </section>
    </main>
  );
}
