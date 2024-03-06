import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { apporvTutor } from "../../../api/AdminApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function TuotoApporuval({ setOpn, filter }) {
  const handleReject = async (userId) => {
    const data = "rejected";
    await apporvTutor({ _id: userId, data }).then((res) => {
      toast(res.data.alert);
      setOpn(false);
    });
  };

  const handleApproval = async (userId) => {
    const data = "approved";
    await apporvTutor({ _id: userId, data }).then((res) => {
      toast(res.data.alert);
      setOpn(false);
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpn(false);
    }, 5000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [setOpn]);

  return (
    <Dialog open={setOpn} onClose={() => setOpn(false)} width="1/2">
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
          onClick={() => handleReject(filter._id)}
          className="mr-1"
        >
          <span>Reject</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() => handleApproval(filter._id)}
        >
          <span>Approve</span>
        </Button>
      </DialogFooter>
      <ToastContainer />
    </Dialog>
  );
}
