import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface DeleteModalProps {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ show, handleClose, handleDelete }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header
        className='text-danger'
        closeButton
      >
        Delete Action
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-danger'
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          variant='primary'
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
