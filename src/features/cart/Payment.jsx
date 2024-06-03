import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useOrder } from "../../services/useOrder";
import Spinner from "../../ui/Spinner";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51OwrHqCHuNmzsv6CGj3Brb6oiNEICPgysJ05vFdjBIohRC87t2imENLGXTCWyfFFH13elj5z9sNdCb9NmClPq90z004uLf9muV"
);

function Payment() {
  const { order, isLoading } = useOrder();

  if (isLoading) return <Spinner />;
  const { clientSecret } = order;

  return (
    <>
      {clientSecret && (
        <Elements
          options={{ appearance: { theme: "stripe" }, clientSecret }}
          stripe={stripePromise}
        >
          <PaymentForm order={order} />
        </Elements>
      )}
    </>
  );
}

export default Payment;
