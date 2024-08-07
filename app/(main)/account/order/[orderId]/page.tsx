import PlacedOrder from "@/app/_components/PlacedOrder";
import { getSingleOrder } from "@/app/_lib/ordersController";

export const metadata = {
  title: "Your order",
};

async function Page({ params }: { params: { orderId: string } }) {
  const { orderId } = params;
  const { order } = await getSingleOrder({ orderId });

  return <PlacedOrder order={order} />;
}

export default Page;
