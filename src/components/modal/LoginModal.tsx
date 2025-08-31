import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type LoginPromptModalProps = {
  show: boolean;
  onClose?: () => void; 
};

export function LoginPromptModal({ show, onClose }: LoginPromptModalProps) {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/auth");
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
        <Button variant="secondary" onClick={handleClose}>
           Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
