import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BulkActionsProps {
  selectedCount: number;
  onApprove: () => void;
  onReject: () => void;
}

export const BulkActions = ({ selectedCount, onApprove, onReject }: BulkActionsProps) => {
  if (selectedCount === 0) return null;

  return (
    <Card className="p-4 bg-primary/5 border-primary/20">
      <div className="flex items-center justify-between">
        <p className="font-medium">
          {selectedCount} email(s) selected
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={onApprove}>
            Approve Selected
          </Button>
          <Button size="sm" variant="outline" onClick={onReject}>
            Reject with Feedback
          </Button>
        </div>
      </div>
    </Card>
  );
};
