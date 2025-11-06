import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (projectName: string) => void;
}

const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Project name is required" })
    .max(50, { message: "Project name must be less than 50 characters" }),
});

export const CreateProjectModal = ({ open, onOpenChange, onSuccess }: CreateProjectModalProps) => {
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreate = () => {
    setError("");
    
    // Validate input
    const result = projectSchema.safeParse({ name: projectName });
    
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsCreating(true);
    
    const createdProjectName = projectName;
    
    // Simulate project creation
    setTimeout(() => {
      toast({
        title: "Project Created",
        description: `"${createdProjectName}" has been created successfully.`,
      });
      
      setIsCreating(false);
      setProjectName("");
      onOpenChange(false);
      
      // Navigate after modal closes
      setTimeout(() => {
        if (onSuccess) {
          onSuccess(createdProjectName);
        }
      }, 300);
    }, 1000);
  };

  const handleClose = () => {
    setProjectName("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setError("");
              }}
              maxLength={50}
              className={error ? "border-destructive" : ""}
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={isCreating}
            className="bg-primary hover:bg-primary/90"
          >
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
