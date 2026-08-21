"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order_id");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Payment Processing
        </h1>

        <p className="mt-2">
          Your payment is being verified.
        </p>

        {orderId && (
          <p className="mt-2 text-sm">
            Order ID: {orderId}
          </p>
        )}
      </div>
    </div>
  );
}