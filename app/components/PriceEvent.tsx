type Props = {
  platformPrice?: number | null;
  websitePrice?: number | null;
};

export default function PriceEvent({
  platformPrice,
  websitePrice,
}: Props) {
 const price = prices.find(
  (p) => p.date === arg.event.startStr
);

return (
  <PriceEvent
    platformPrice={price?.platform_price}
    websitePrice={price?.website_price}
  />
);