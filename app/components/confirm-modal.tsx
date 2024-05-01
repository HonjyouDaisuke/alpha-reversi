import Button from "./button/button";
import Modal from "./modal/modal";

interface Props {
  title: string | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseAction?: (() => void) | null;
  children: React.ReactNode;
}

export default function ConfirmModal({
  title,
  isOpen,
  setIsOpen,
  onCloseAction,
  children,
}: Props) {
  function handleClose() {
    setIsOpen(false);
    if (onCloseAction) {
      onCloseAction();
    }
  }

  const header = (
    <h3 className="text-xl font-bold text-center w-full">{title}</h3>
  );

  const footer = (
    <Button color="primary" className="block w-full" onClick={handleClose}>
      OK
    </Button>
  );

  return (
    <Modal
      open={isOpen}
      slots={{ header, footer }}
      slotClasses={{ body: "text-left" }}
      onModalClose={handleClose}
    >
      {children}
    </Modal>
  );
}
