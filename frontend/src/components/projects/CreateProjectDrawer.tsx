import React, { useState } from "react";
import { Drawer } from "../ui/Drawer";
import { Input, TextArea, Select } from "../ui/Input";
import { Button } from "../ui/Button";
import { projectApi } from "../../api/project.api";
import { PROJECT_TYPES, type CreateProjectRequest } from "../../types/project";
import { useNotificationStore } from "../../store/notificationStore";

interface CreateProjectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateProjectDrawer: React.FC<CreateProjectDrawerProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { addNotification } = useNotificationStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<CreateProjectRequest>({
    name: "",
    description: "",
    type: "SOLAR",
    location: "",
    capacity: undefined,
    budget: undefined,
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value ? parseFloat(value) : undefined,
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (
      formData.endDate &&
      formData.startDate &&
      formData.endDate < formData.startDate
    ) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    try {
      const payload: CreateProjectRequest = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.endDate
          ? new Date(formData.endDate).toISOString()
          : undefined,
      };

      await projectApi.createProject(payload);

      addNotification("success", "Project created successfully!");

      // Reset form
      setFormData({
        name: "",
        description: "",
        type: "SOLAR",
        location: "",
        capacity: undefined,
        budget: undefined,
        startDate: "",
        endDate: "",
      });

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Create project error:", error);
      addNotification(
        "error",
        error.response?.data?.error || "Failed to create project",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      type: "SOLAR",
      location: "",
      capacity: undefined,
      budget: undefined,
      startDate: "",
      endDate: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Project"
      width="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Name */}
        <Input
          label="Project Name *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter project name"
          error={errors.name}
        />

        {/* Description */}
        <TextArea
          label="Description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Enter project description"
          rows={3}
        />

        {/* Project Type */}
        <Select
          label="Project Type *"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={PROJECT_TYPES}
        />

        {/* Location */}
        <Input
          label="Location *"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter project location"
          error={errors.location}
        />

        {/* Capacity & Budget */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Capacity (MW)"
            name="capacity"
            type="number"
            step="0.01"
            min="0"
            value={formData.capacity || ""}
            onChange={handleNumberChange}
            placeholder="e.g., 50"
          />
          <Input
            label="Budget (USD)"
            name="budget"
            type="number"
            step="0.01"
            min="0"
            value={formData.budget || ""}
            onChange={handleNumberChange}
            placeholder="e.g., 1000000"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Start Date *"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            error={errors.startDate}
          />
          <Input
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate || ""}
            onChange={handleChange}
            error={errors.endDate}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-[#404040]">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="flex-1"
          >
            Create Project
          </Button>
        </div>
      </form>
    </Drawer>
  );
};
