
export default function RefundPolicyPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Refund & Cancellation Policy</h1>
      <section className="mb-8">
        <p className="mb-4 text-lg text-gray-700">
          Raqlin (Jithin/Afeef, 7907575484 | 7012953286) believes in helping its customers as far as possible, and has a liberal cancellation and refund policy. Please read below for details:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Cancellations will be considered only if the request is made at least 3-5 days before your scheduled trip. However, requests may not be entertained if the booking process has already commenced or services have been initiated.</li>
          <li>Refunds/replacements can be made if the customer establishes that the quality of service delivered is not as promised. Please report any issues within 3-5 days of receipt.</li>
          <li>For complaints regarding services with manufacturer warranties, please refer the issue to them directly.</li>
          <li>Any approved refunds will be processed within 3-5 business days.</li>
          <li><strong>100% Refund:</strong> Cancel at least 5 days before your scheduled trip.</li>
          <li><strong>50% Refund:</strong> Cancel at least 72 hours before your scheduled trip.</li>
          <li><strong>25% Refund:</strong> Cancel at least 24 hours before your scheduled trip.</li>
          <li><strong>No Refund:</strong> Cancellations made less than 24 hours before the trip or after commencement are not eligible for a refund unless otherwise specified.</li>
        </ul>
        <p className="mt-4 text-gray-700">
          For any questions, complaints, or special circumstances, please <a href="/contact" className="text-brand-yellow underline">contact our team</a>. We’re here to assist you and make the process smooth.
        </p>
      </section>
    </main>
  );
}
