type Props = {
  platformPrice?: number | null;
  websitePrice?: number | null;
};

export default function PriceEvent({
  platformPrice,
  websitePrice,
}: Props) {
  return (
    <div className="text-[10px] leading-tight">
      {platformPrice != null && (
        <div className="rounded bg-blue-100 px-1 text-blue-700">
          OTA €{platformPrice}
        </div>
      )}

      {websitePrice != null && (
        <div className="mt-1 rounded bg-green-100 px-1 text-green-700">
          WEB €{websitePrice}
        </div>
      )}
    </div>
  );
}