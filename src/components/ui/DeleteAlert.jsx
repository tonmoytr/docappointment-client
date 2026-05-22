"use client";

import { authClient } from "@/utils/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

export function DeleteAlert({ appointment }) {
  const router = useRouter();

  //   console.log("object", appointment);
  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointments/${appointment._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
      },
    );

    const data = await res.json();

    if (res.ok) {
      toast.success("Appointment has been cancelled successfully!");
      router.refresh();
    } else {
      toast.error(data.message || "Failed to delete appointment");
    }
  };

  return (
    <AlertDialog>
      <Button className="flex-1 py-4 md:py-0 md:h-1/2 w-full rounded-none bg-zinc-50 hover:bg-red-50 dark:hover:bg-red-950/20 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer flex items-center justify-center gap-x-2">
        <FiTrash2 size={13} />
        <span>Cancel</span>
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete your appointment permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete{" "}
                <strong>
                  {appointment.doctorName}&apos;s appointment {}
                </strong>
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Appointment
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
