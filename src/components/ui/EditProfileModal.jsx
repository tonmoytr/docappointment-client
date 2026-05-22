"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Image as ImageIcon, Edit3 } from "lucide-react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { authClient } from "@/utils/auth-client";

export default function EditProfileModal({ user }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleProfileUpdateSubmission = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   const formData = new FormData(e.target);
  //   const updatedProfile = {
  //     name: formData.get("name"),
  //     image: formData.get("image"),
  //   };

  //   const { data: tokenData } = await authClient.token();

  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Bearer ${tokenData?.token}`,
  //       },
  //       body: JSON.stringify(updatedProfile),
  //     },
  //   );

  //   const data = await res.json();
  //   if (res.ok && data.success) {
  //     await authClient.getSession({
  //       fetchOptions: {
  //         force: true,
  //       },
  //     });

  //     toast.success("Profile credentials updated successfully!");

  //     router.refresh();
  //     setIsOpen(false);
  //   } else {
  //     // If matchedCount was 0, it will display the specific warning message here
  //     toast.error(data.message || "Failed to update profile values.");
  //   }
  //   setIsSubmitting(false);
  // };

  const handleProfileUpdateSubmission = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const updatedName = formData.get("name");
    const updatedImage = formData.get("image");

    try {
      const { data, error } = await authClient.updateUser({
        name: updatedName,
        image: updatedImage,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile values.");
        setIsSubmitting(false);
        return;
      }

      toast.success("Profile credentials updated successfully!");

      router.refresh();
      setIsOpen(false);
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Primary Trigger Button placed beautifully inside the Profile Tab Sheet */}

      {/* Controlled Master Layer Sync */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button
          variant="secondary"
          onClick={() => setIsOpen(true)}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold uppercase tracking-widest text-xs py-3 px-6 transition-all shadow-sm rounded-none cursor-pointer active:scale-98"
        >
          Update Profile Information
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger onClick={() => setIsOpen(false)} />

              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <User className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Edit Profile</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Modify your public display identity parameters across the
                  workspace system database.
                </p>
              </Modal.Header>

              <form onSubmit={handleProfileUpdateSubmission}>
                <Modal.Body className="p-6">
                  <Surface variant="default">
                    <div className="flex flex-col gap-4">
                      {/* EDITABLE FIELD 1: Full Display Name */}
                      <TextField
                        className="w-full"
                        name="name"
                        type="text"
                        variant="secondary"
                        defaultValue={user?.name || ""}
                        isRequired
                      >
                        <Label className="flex items-center gap-1.5">
                          <User className="size-3.5 text-muted" /> Full Display
                          Name
                        </Label>
                        <Input placeholder="Enter your display name" />
                      </TextField>

                      {/* EDITABLE FIELD 2: Profile Image URL String */}
                      <TextField
                        className="w-full"
                        name="image"
                        type="url"
                        variant="secondary"
                        defaultValue={user?.image || ""}
                        isRequired
                      >
                        <Label className="flex items-center gap-1.5">
                          <ImageIcon className="size-3.5 text-muted" /> Profile
                          Image URL
                        </Label>
                        <Input placeholder="https://images.unsplash.com/your-avatar" />
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
                    {isSubmitting ? "Saving Changes..." : "Save Profile"}
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
