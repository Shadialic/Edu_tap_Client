import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
function GroupChat() {
  const [open, setOpen] = React.useState(false);
  const [groupName, setGroupName] = useState("");
  const [user, setUsers] = useState("");

  const createGroup = () => {
    closeDialog();
  };

  return (
    <div>
      <div className="flex items-end justify-end mr-14">
        <Dialog
          size="xs"
          open={open}
          handler={() => setOpen((cur) => !cur)}
          className="bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <form>
                <Typography variant="h6">Enter New Category</Typography>
                <Input
                  label="Category"
                  size="lg"
                  onChange={(e) => setGroupName(e.target.value)}
                  value={groupName}
                />
                <CardFooter className="pt-0 mt-5">
                  <Button
                    className="bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20 "
                    variant="gradient"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                </CardFooter>
              </form>
            </CardBody>
          </Card>
        </Dialog>
      </div>
    </div>
  );
}

export default GroupChat;
