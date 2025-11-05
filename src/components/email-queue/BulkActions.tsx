import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface BulkActionsProps {
  selectedCount: number;
  totalCount: number;
  allSelected: boolean;
  onApprove: () => void;
  onReject: () => void;
  onSelectAll: () => void;
}

export const BulkActions = ({ 
  selectedCount, 
  totalCount,
  allSelected,
  onApprove, 
  onReject,
  onSelectAll 
}: BulkActionsProps) => {
  return (
    <Card className="p-4 bg-primary/5 border-primary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Checkbox 
            checked={allSelected}
            onCheckedChange={onSelectAll}
            id="select-all"
          />
          <label htmlFor="select-all" className="font-medium cursor-pointer">
            {selectedCount > 0 
              ? `${selectedCount} email(s) selected` 
              : `Select all ${totalCount} emails`
            }
          </label>
        </div>
        {selectedCount > 0 && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={onApprove}>
              Approve Selected
            </Button>
            <Button size="sm" variant="outline" onClick={onReject}>
              Reject with Feedback
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
