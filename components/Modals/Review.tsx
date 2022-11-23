import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { StarRating } from "@components/Rating";
import * as React from "react";
import { NextPage } from "next";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: NextPage<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [error, setError] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");

  const handleComment: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => setComment(e.target.value);

  const handleSubmit = () => {
    if (rating === 0) setError("Please provide a rating");
    else setError("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Write a Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isInvalid={!!error}>
            <FormLabel>Rating</FormLabel>
            <StarRating rating={rating} setRating={setRating} input />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Comment</FormLabel>
            <Textarea value={comment} onChange={handleComment} placeholder="Write your review..." />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={handleSubmit}>
            Submit Review
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;
