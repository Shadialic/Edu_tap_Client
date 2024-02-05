import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { apporvTutor } from "../../../api/adminApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function TuotoApporuval({ setOpn, filter }) {
  const [open, setOpen] = useState(true);

  const handleClose = async (userId) => {
    let data='rejected'
    await apporvTutor({ _id: userId,data }).then((res) => {
      toast(res.data.alert);
      console.log(res, "pdpdpdpdp");
    });
    setOpn(false);
  };

  const handelapproval = async (userId) => {
    let data='approved';
    await apporvTutor({ _id: userId,data }).then((res) => {
      toast(res.data.alert);
      console.log(res, "pdpdpdpdp");
    });
    setOpn(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleClose(filter._id);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [filter._id]); // Added filter._id as a dependency to useEffect

  return (
    <Dialog open={open} onClose={() => handleClose(filter._id)} width="1/2">
      <DialogHeader>Tutor Approval Request</DialogHeader>
      <DialogBody>
        <p>
          You have received a tutor approval request. Please review the details
          and decide whether to approve this tutor.
        </p>
        <p>
          <strong>Tutor Name:</strong> {filter.tutorName}
        </p>
        <p>
          <strong>Email:</strong> {filter.email}
        </p>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() => handleClose(filter._id)}
          className="mr-1"
        >
          <span>Reject</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() => handelapproval(filter._id)}
        >
          <span>Approve</span>
        </Button>
      </DialogFooter>
      <ToastContainer />
    </Dialog>
  );
}
