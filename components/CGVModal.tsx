import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CGV } from "@/lib/cgv";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface CGVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CGVModal({ isOpen, onClose }: CGVModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  if (!mounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`
          max-w-4xl
          ${isMobile ? 'h-[100dvh] w-full' : 'h-[85vh]'} 
          p-0 
          flex flex-col
          rounded-lg
          overflow-hidden
          border
          shadow-xl
          mx-auto
        `}
      >
        <DialogHeader className="flex-shrink-0 p-4 md:p-6 border-b relative">

          <DialogTitle
            className={`
              ${isMobile ? 'text-xl pr-6' : 'text-2xl'} 
              font-bold text-center
            `}
          >
            {CGV.title}
            <div
              className={`
                ${isMobile ? 'text-base' : 'text-lg'}
                font-medium text-gray-600 mt-1
              `}
            >
              {CGV.company}
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Fix: scroll-area avec hauteur explicite pour gérer le scroll */}
        <ScrollArea className="flex-1 overflow-y-auto px-4 py-5 md:p-6">
          <div className="space-y-6 pb-6">
            {CGV.sections.map((section) => (
              <div key={section.id} className="space-y-3">
                <h3
                  className={`
                    ${isMobile ? 'text-base' : 'text-lg'}
                    font-semibold text-gray-800
                  `}
                >
                  {section.id}. {section.title}
                </h3>
                <div
                  className={`
                    text-gray-700 
                    whitespace-pre-line 
                    ${isMobile ? 'text-sm' : 'text-base'}
                  `}
                >
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
