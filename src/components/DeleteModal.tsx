import React from 'react';
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
        <ModalFooter gap={2}>
          <Button
            variant='solid'
            bgColor='red.400'
            _hover={{
              backgroundColor: 'red.500',
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            variant='outline'
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
