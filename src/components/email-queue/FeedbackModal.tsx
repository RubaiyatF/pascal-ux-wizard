import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface FeedbackModalProps {
  isOpen: boolean;
  selectedCount: number;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
}

export const FeedbackModal = ({
  isOpen,
  selectedCount,
  onClose,
  onSubmit,
}: FeedbackModalProps) => {
  const [feedback, setFeedback] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback("");
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="p-6 max-w-lg w-full">
        <h3 className="text-lg font-semibold mb-4">
          Batch Feedback - Rejecting {selectedCount} email(s)
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Provide feedback for AI learning:
        </p>
        <Textarea
          placeholder="E.g., Too aggressive. Soften tone for technical users."
          className="mb-4"
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <p className="text-xs text-muted-foreground mb-4">
          This feedback will improve future emails for similar patterns.
        </p>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Feedback</Button>
        </div>
      </Card>
    </div>
  );
};
