import React from 'react';
import { Button as BSButton, Modal as BSModal } from 'react-bootstrap';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

interface DeleteModalProps {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ show, handleClose, handleDelete }) => {
  return (
    <Modal
      isOpen={show}
      onClose={handleClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure you want to delete this note?</ModalHeader>
        <ModalCloseButton />
        <ModalFooter>
          <Button
            variant='outline'
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            variant='fiilled'
            onClick={handleClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
