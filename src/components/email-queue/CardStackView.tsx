import { QueuedEmail } from "./EmailCard";
import { SwipeableEmailCard } from "./SwipeableEmailCard";
import { Button } from "@/components/ui/button";
import { X, Check, RotateCcw } from "lucide-react";
import { useState } from "react";

interface CardStackViewProps {
  emails: QueuedEmail[];
  onApprove: (id: string) => void;
  onEdit: (id: string) => void;
  onReject: (id: string) => void;
  onViewRecording: (id: string) => void;
}

export const CardStackView = ({
  emails,
  onApprove,
  onEdit,
  onReject,
  onViewRecording,
}: CardStackViewProps) => {
  const visibleCards = emails.slice(0, 3);
  const [isTopCardExpanded, setIsTopCardExpanded] = useState(false);

  if (emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <Check className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
        <p className="text-muted-foreground">No more emails in the queue</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Card Stack Container */}
      <div className={`relative max-w-2xl mx-auto transition-all duration-300 ${isTopCardExpanded ? 'h-[700px]' : 'h-[450px]'}`}>
        {visibleCards.map((email, index) => {
          const scale = 1 - index * 0.05;
          const yOffset = index * 8;
          const opacity = 1 - index * 0.2;

          return (
            <SwipeableEmailCard
              key={email.id}
              email={email}
              onApprove={onApprove}
              onEdit={onEdit}
              onReject={onReject}
              onViewRecording={onViewRecording}
              zIndex={visibleCards.length - index}
              isExpanded={index === 0 ? isTopCardExpanded : false}
              onExpandChange={index === 0 ? setIsTopCardExpanded : undefined}
              style={{
                transform: `translateY(${yOffset}px) scale(${scale})`,
                opacity,
                transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
              }}
            />
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-6 pt-8 mt-8 border-t border-border bg-card/50 backdrop-blur-sm pb-4 relative z-50">
        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-16 h-16 p-0 border-2 border-destructive text-destructive hover:bg-destructive hover:text-white"
          onClick={() => onReject(emails[0].id)}
        >
          <X className="w-8 h-8" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-16 h-16 p-0"
          onClick={() => onEdit(emails[0].id)}
        >
          <RotateCcw className="w-6 h-6" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-16 h-16 p-0 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          onClick={() => onApprove(emails[0].id)}
        >
          <Check className="w-8 h-8" />
        </Button>
      </div>

      {/* Counter */}
      <div className="text-center text-sm text-muted-foreground">
        {emails.length} email{emails.length !== 1 ? "s" : ""} remaining
      </div>
    </div>
  );
};
