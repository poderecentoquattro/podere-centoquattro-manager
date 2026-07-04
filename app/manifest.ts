import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Podere Centoquattro Manager",
    short_name: "Podere Manager",
    description: "Gestionale di Podere Centoquattro",

    start_url: "/",

    display: "standalone",

    background_color: "#F6FAF5",

    theme_color: "#0A5A34",

    orientation: "portrait",

    lang: "it",

    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}