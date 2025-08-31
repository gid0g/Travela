import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

type DeleteConfirmationModalProps = {
  show: boolean;
  onClose: () => void; 
  onDelete: () => void; 
};

export function DeleteConfirmationModal({
  show,
  onClose,
  onDelete,
}: DeleteConfirmationModalProps) {
  const [input, setInput] = useState("");

  const handleDelete = () => {
    if (input === "DELETE") {
      onDelete();
      handleClose();
    }
  };

  const handleClose = () => {
    setInput(""); 
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          This action cannot be undone. To confirm deletion, type{" "}
          <strong>DELETE</strong> below.
        </p>
        <Form.Control
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type DELETE here"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={input !== "DELETE"}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
