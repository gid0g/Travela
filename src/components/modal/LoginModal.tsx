import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type LoginPromptModalProps = {
  show: boolean;
  onClose?: () => void;
};

export function LoginPromptModal({ show, onClose }: LoginPromptModalProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (onClose) onClose();
    navigate("/auth");
  };
  const handleClose = () => {
    if (onClose) onClose();
  };
  return (
    <Modal show={show} onHide={handleClose} centered className="rounded-4">
      <Modal.Header closeButton>
        <Modal.Title>Login Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You must be logged in to perform this action. Please login to continue.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleNavigate}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
