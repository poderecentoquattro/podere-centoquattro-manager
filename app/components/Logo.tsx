import Image from "next/image";

type LogoProps = {
  size?: number;
  showText?: boolean;
};

export default function Logo({
  size = 90,
  showText = true,
}: LogoProps) {
  return (
    <div className="flex items-center gap-5">

      <Image
        src="/logo.png"
        alt="Podere Centoquattro"
        width={size}
        height={size}
        priority
      />

      {showText && (
        <div>

          <h1 className="text-4xl font-serif leading-none text-inherit">
            Podere
          </h1>

          <h2 className="text-3xl font-serif leading-none mt-1 text-inherit">
            Centoquattro
          </h2>

          <p className="text-xs tracking-[0.35em] mt-3 text-green-100 uppercase">
            Gestionale
          </p>

        </div>
      )}

    </div>
  );
}