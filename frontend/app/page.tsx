"use client";
import { TrendyMovies } from "@/components/global/trendy-movies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DownloadIcon, MoreHorizontalIcon, PlayIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative w-full rounded-3xl">
        <Image
          src="mavka.jpeg"
          width={100}
          height={100}
          alt="Mavka"
          className="w-full h-full rounded-3xl"
        />
        <Badge name="🔥 Popular" className="absolute top-10 left-10" />
        <div className="absolute flex flex-col gap-2 bottom-10 left-10">
          <div className="flex items-center gap-3">
            <Badge name="Drama" />
            <Badge name="Fantasy" />
          </div>
          <h3 className="text-lg font-bold">Mavka</h3>
          <p className="w-2/3 font-light">
            Mavka, a naive young forest spirit, develops feelings for a human
            musician, Lukas. As they grow closer, an inevitable situation forces
            Mavka to choose between her love and her duty as forest guardian.
          </p>
          <div className="flex items-center gap-2">
            <Button className="bg-white rounded-full text-light text-primary">
              <PlayIcon size={18} fill="black" />
              <span className="ml-2">Watch Now</span>
            </Button>
            <Button className="rounded-full text-light">
              <DownloadIcon size={18} />
              <span className="ml-2">Download</span>
            </Button>
            <Button className="p-0 rounded-full text-light aspect-square">
              <MoreHorizontalIcon size={18} />
            </Button>
          </div>
        </div>
      </div>
      <TrendyMovies />
    </>
  );
}
