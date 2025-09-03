
export default function RefundPolicyPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
      <section className="mb-8">
        <p className="mb-4 text-lg text-gray-700">We understand that plans can change. Our refund policy is designed to be fair and transparent, ensuring peace of mind for every traveler.</p>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>100% Refund:</strong> Cancel at least 5 days before your scheduled trip.</li>
          <li><strong>50% Refund:</strong> Cancel at least 72 hours before your scheduled trip.</li>
          <li><strong>25% Refund:</strong> Cancel at least 24 hours before your scheduled trip.</li>
          <li><strong>No Refund:</strong> Cancellations made less than 24 hours before the trip or after commencement are not eligible for a refund unless otherwise specified.</li>
        </ul>
        <p className="mt-4 text-gray-700">For any questions or special circumstances, please <a href="/contact" className="text-brand-yellow underline">contact our support team</a>. We’re here to help!</p>
      </section>
    </main>
  );
}
