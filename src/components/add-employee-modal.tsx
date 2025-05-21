import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Employee, StatusType } from "@/shared/types";
import { cn, getDisplayStatus } from "@/lib/utils";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee: (employee: Omit<Employee, "id">) => void;
}

export function AddEmployeeModal({
  isOpen,
  onClose,
  onAddEmployee,
}: AddEmployeeModalProps) {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(
    "/src/assets/avatar-placeholder.png"
  );
  const [status, setStatus] = useState<StatusType>("Working");
  const [errors, setErrors] = useState<{ name?: string; avatar?: string }>({});

  const statusOptions: StatusType[] = [
    "Working",
    "OnVacation",
    "BusinessTrip",
    "LunchTime",
  ];

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case "Working":
        return "bg-green-500";
      case "OnVacation":
        return "bg-red-500";
      case "BusinessTrip":
        return "bg-purple-500";
      case "LunchTime":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; avatar?: string } = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddEmployee({
      name,
      avatar: avatarUrl,
      status,
    });

    setName("");
    setAvatarUrl("/placeholder.svg?height=200&width=200");
    setStatus("Working");
    setErrors({});
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setErrors({ ...errors, avatar: "Image must be less than 5MB" });
      return;
    }

    if (errors.avatar) {
      setErrors({ ...errors, avatar: undefined });
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "sm:max-w-[425px]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          "duration-300"
        )}
      >
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar">Upload Avatar (optional)</Label>
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden border border-gray-200">
                <img
                  src={avatarUrl || "/src/assets/avatar-placeholder.png"}
                  alt="Avatar preview"
                  className="h-full w-full object-cover"
                />
              </div>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className={cn("flex-1", errors.avatar ? "border-red-500" : "")}
                onChange={handleImageUpload}
              />
            </div>
            {errors.avatar ? (
              <p className="text-red-500 text-sm">{errors.avatar}</p>
            ) : (
              <p className="text-xs text-gray-500">
                Upload an image (max 5MB) or leave empty for a placeholder
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <RadioGroup
              value={status}
              onValueChange={(value) => setStatus(value as StatusType)}
              className="flex flex-col space-y-1"
            >
              {statusOptions.map((statusOption) => (
                <div key={statusOption} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={statusOption}
                    id={statusOption.toLowerCase()}
                  />
                  <Label
                    htmlFor={statusOption.toLowerCase()}
                    className="flex items-center"
                  >
                    <span
                      className={cn(
                        "h-2.5 w-2.5 rounded-full mr-2",
                        getStatusColor(statusOption)
                      )}
                    ></span>
                    {getDisplayStatus(statusOption)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
              Add Employee
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
