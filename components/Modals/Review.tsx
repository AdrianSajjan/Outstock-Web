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
  useToast,
} from "@chakra-ui/react";
import { StarRating } from "@components/Rating";
import * as React from "react";
import { NextPage } from "next";
import { useMutation } from "@tanstack/react-query";
import { addReview } from "@shared/api";
import { AddReviewState, GenericErrorResponse, Product } from "@shared/interface";
import queryClient from "@shared/api/client";

interface ReviewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: NextPage<ReviewModalProps> = ({ isOpen, onClose, product }) => {
  const [error, setError] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");

  const toast = useToast({ variant: "left-accent", position: "top", isClosable: true });

  const handleComment: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setError("");
    setComment(e.target.value);
  };

  const addReviewMutation = useMutation<void, GenericErrorResponse, AddReviewState>({ mutationFn: addReview });

  const handleSubmit = () => {
    if (rating === 0) return setError("Please provide a rating");
    setError("");
    addReviewMutation.mutate(
      { product: product._id, rating, comment },
      {
        onSuccess: () => {
          toast({ title: "Review Added", description: `Review has been submitted for product ${product.name}`, status: "success" });
          queryClient.invalidateQueries(["product", product.slug]);
        },
        onError: (error) => {
          toast({ title: "Coudn't submit review", description: error.message, status: "error" });
        },
      }
    );
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
          <Button mr={3} onClick={handleSubmit} isLoading={addReviewMutation.isLoading}>
            Submit Review
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;
