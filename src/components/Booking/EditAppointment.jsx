"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Calendar, Clock, Phone, Edit3 } from "lucide-react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { FiEdit3 } from "react-icons/fi";

export default function EditAppointmentModal({ appointment }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleModalOpenTrigger = () => {
    setIsOpen(true);
  };

  const handleUpdateFormSubmission = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    // Only collect fields the user has permission to edit
    const updatedData = {
      userPhone: formData.get("userPhone"),
      appointmentDate: formData.get("appointmentDate"),
      appointmentTime: formData.get("appointmentTime"),
    };

    try {
      const res = await fetch(
        `http://localhost:4000/appointments/${appointment._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        },
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Appointment updated successfully!");
        router.refresh();
        setIsOpen(false);

        // Quietly fetch fresh data from the server layout
        startTransition(() => {});
      } else {
        toast.error(data.message || "Failed to update appointment.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network synchronization error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 1. Exact trigger layout style match for the Dashboard action panel */}
      <button
        onClick={handleModalOpenTrigger}
        className="flex-1 py-4 md:py-0 md:h-1/2 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 transition-colors border-r md:border-r-0 md:border-b border-zinc-100 dark:border-zinc-800/80 cursor-pointer flex items-center justify-center gap-x-2"
      >
        <FiEdit3 size={13} className="text-zinc-400 dark:text-zinc-500" />
        <span>Reschedule</span>
      </button>

      {/* Controlled HeroUI Modal Context (Identical to your example) */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger onClick={() => setIsOpen(false)} />

              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <Edit3 className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Reschedule Appointment</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Modifying consultation details with
                  <strong> {appointment?.doctorName}</strong> (
                  {appointment?.doctorSpeciality}).
                </p>
              </Modal.Header>

              {/* Booking Modification Form Wrapper */}
              <form onSubmit={handleUpdateFormSubmission}>
                <Modal.Body className="p-6">
                  <Surface variant="default">
                    <div className="flex flex-col gap-4">
                      {/* Read Only Context Items */}
                      <TextField
                        className="w-full"
                        isDisabled
                        variant="secondary"
                      >
                        <Label>Target Consultant</Label>
                        <Input value={appointment?.doctorName || ""} readOnly />
                      </TextField>

                      <TextField
                        className="w-full"
                        isDisabled
                        variant="secondary"
                      >
                        <Label>Patient Account Email</Label>
                        <Input value={appointment?.userEmail || ""} readOnly />
                      </TextField>

                      {/* Required Phone Number Field (Editable with default value loaded) */}
                      <TextField
                        className="w-full"
                        name="userPhone"
                        type="tel"
                        variant="secondary"
                        defaultValue={appointment?.userPhone || ""}
                        isRequired
                      >
                        <Label className="flex items-center gap-1.5">
                          <Phone className="size-3.5 text-muted" /> Phone Number
                        </Label>
                        <Input
                          placeholder="Enter your contact number"
                          required
                        />
                      </TextField>

                      {/* Appointment Date Field (Editable) */}
                      <TextField
                        className="w-full"
                        name="appointmentDate"
                        type="date"
                        variant="secondary"
                        defaultValue={appointment?.appointmentDate || ""}
                        isRequired
                      >
                        <Label className="flex items-center gap-1.5">
                          <Calendar className="size-3.5 text-muted" />{" "}
                          Appointment Date
                        </Label>
                        <Input required />
                      </TextField>

                      {/* Appointment Time Field (Editable) */}
                      <TextField
                        className="w-full"
                        name="appointmentTime"
                        type="time"
                        variant="secondary"
                        defaultValue={appointment?.appointmentTime || ""}
                        isRequired
                      >
                        <Label className="flex items-center gap-1.5">
                          <Clock className="size-3.5 text-muted" /> Preferred
                          Time Slot
                        </Label>
                        <Input required />
                      </TextField>
                    </div>
                  </Surface>
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </Modal.Footer>
              </form>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
