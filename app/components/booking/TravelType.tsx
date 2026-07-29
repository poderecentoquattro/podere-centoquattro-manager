"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, User, House } from "lucide-react";
import { cn } from "@/lib/utils";

export type TravelTypeValue = "solo" | "family" | "group";

interface TravelTypeProps {
  value: TravelTypeValue;
  onChange: (value: TravelTypeValue) => void;
}

const options = [
  {
    value: "solo",
    title: "Solo",
    icon: User,
  },
  {
    value: "family",
    title: "Famiglia",
    icon: House,
  },
  {
    value: "group",
    title: "Gruppo",
    icon: Users,
  },
] as const;

export default function TravelType({
  value,
  onChange,
}: TravelTypeProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">
        Tipo di viaggio
      </h3>

      <div className="grid gap-3 md:grid-cols-3">
        {options.map((option) => {
          const Icon = option.icon;

          return (
            <Card
              key={option.value}
              onClick={() => onChange(option.value)}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                value === option.value
                  ? "border-primary ring-2 ring-primary"
                  : "border-muted"
              )}
            >
              <CardContent className="flex items-center gap-3 p-5">
                <Icon className="h-6 w-6" />
                <span className="font-medium">
                  {option.title}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}