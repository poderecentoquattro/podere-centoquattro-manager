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
    <div className="flex flex-col items-center text-center">
      <Image
        src="/logo.png"
        alt="Podere Centoquattro"
        width={size}
        height={size}
        priority
      />

      {showText && (
        <div className="mt-4">
          <h1 className="text-4xl font-serif leading-none text-inherit">
            Podere
          </h1>

          <h2 className="mt-1 text-3xl font-serif leading-none text-inherit">
            Centoquattro
          </h2>

          <p className="mt-4 text-xs uppercase tracking-[0.45em] text-green-100">
            Gestionale
          </p>
        </div>
      )}
    </div>
  );
}