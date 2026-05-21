"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Calendar, Clock, Phone } from "lucide-react";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

export default function BookingController({ doctor, currentUser }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleModalOpenTrigger = () => {
    if (!currentUser) {
      toast.error("Please login to request an appointment slot.");
      router.push("/login");
      return;
    }
    setIsOpen(true);
  };

  const handleBookingFormSubmission = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Your session expired. Please log in again.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.target);

    // Exact data model mapping requirements
    const bookingData = {
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userPhone: formData.get("userPhone"),
      doctorId: doctor?._id || doctor?.id,
      doctorName: doctor?.name,
      doctorSpeciality: doctor?.specialty,
      appointmentDate: formData.get("appointmentDate"),
      appointmentTime: formData.get("appointmentTime"),
      fee: doctor?.fee,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    // console.log("dataaaaaaaa",bookingData);

    try {
      const res = await fetch("http://localhost:4000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (res.ok && data.insertedId) {
        toast.success(
          `Successfully booked appointment with ${doctor.name}!`,
        );
        setIsOpen(false);
      } else {
        toast.error(data.message || "Booking submission failure.");
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
      {/* Trigger Button */}
      <Button
        variant="secondary"
        onClick={handleModalOpenTrigger}
        className="p-0 border-none rounded-none cursor-pointer w-full h-auto"
      >
        <span className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 block transition-colors duration-200">
          Book Appointment
        </span>
      </Button>

      {/* Controlled HeroUI Modal Context */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger onClick={() => setIsOpen(false)} />

              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <Envelope className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Request Appointment</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Schedule your consultation slot with{" "}
                  <strong> {doctor?.name}</strong> ({doctor?.specialty}).
                  Consultation Fee: <strong>${doctor?.fee}</strong>
                </p>
              </Modal.Header>

              {/* Booking Submission Form Wrapper */}
              <form onSubmit={handleBookingFormSubmission}>
                <Modal.Body className="p-6">
                  <Surface variant="default">
                    <div className="flex flex-col gap-4">
                      {/* Read Only Context Items from current User */}
                      <TextField
                        className="w-full"
                        isDisabled
                        variant="secondary"
                      >
                        <Label>Patient Name</Label>
                        <Input value={currentUser?.name || ""} readOnly />
                      </TextField>

                      <TextField
                        className="w-full"
                        isDisabled
                        variant="secondary"
                      >
                        <Label>Email Address</Label>
                        <Input value={currentUser?.email || ""} readOnly />
                      </TextField>

                      {/* Required Phone Number Field */}
                      <TextField
                        className="w-full"
                        name="userPhone"
                        type="tel"
                        variant="secondary"
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

                      {/* Appointment Date Field */}
                      <TextField
                        className="w-full"
                        name="appointmentDate"
                        type="date"
                        variant="secondary"
                        isRequired
                      >
                        <Label className="flex items-center gap-1.5">
                          <Calendar className="size-3.5 text-muted" />{" "}
                          Appointment Date
                        </Label>
                        <Input required />
                      </TextField>

                      {/* Appointment Time Field */}
                      <TextField
                        className="w-full"
                        name="appointmentTime"
                        type="time"
                        variant="secondary"
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
                    {isSubmitting ? "Processing..." : "Confirm Booking"}
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
