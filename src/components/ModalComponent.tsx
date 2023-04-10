import { ReactNode, PropsWithChildren } from "react";

import { Modal, Box } from "@mui/material";
import { modalStyles } from "../styles";

interface ModalProps extends PropsWithChildren {
  children: ReactNode;
  opened: boolean;
  close: Function;
}

const ModalComponent = ({ children, opened, close }: ModalProps) => {
  return (
    <>
      <Modal open={opened} onClose={() => close()}>
        <Box sx={modalStyles}>{children}</Box>
      </Modal>
    </>
  );
};

export default ModalComponent;
