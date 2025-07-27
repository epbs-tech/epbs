import {Poppins} from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface HeaderProps {
    label: string;
};

export const Header = ({
    label,
                       }: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y items-center
        justify-center">
            <div className={cn(
                "text-xl font-semibold",
                font.className,
            )}>
                <div >
                    <Image
                        src="/LOGO_EPBS.png"
                        alt="EPBS Consulting"
                        width={300}
                        height={50}
                        className="object-contain max-w-full h-auto"
                    />
                </div>
            </div>
            <p className="text-muted-forground text-sm">
                {label}
            </p>
        </div>
    )
}
