import { useMediaQuery } from "@chakra-ui/react";

export const useResponseGrid = () => {
  const [isLessThan1366px] = useMediaQuery("(max-width: 1366px");
  const [isLessThan768px] = useMediaQuery("(max-width: 768px");

  return isLessThan768px ? "repeat(1, 1fr)" : isLessThan1366px ? "repeat(2, 1fr)" : "repeat(4, 1fr)";
};

export const useLessThan1366px = () => {
  const [isLessThan1366px] = useMediaQuery("(max-width: 1366px");
  return isLessThan1366px;
};

export const useLessThan576px = () => {
  const [isLessThan576px] = useMediaQuery("(max-width: 576px");
  return isLessThan576px;
};

export const useLessThan768px = () => {
  const [isLessThan768px] = useMediaQuery("(max-width: 768px");
  return isLessThan768px;
};

export const useLessThan976px = () => {
  const [isLessThan976px] = useMediaQuery("(max-width: 976px");
  return isLessThan976px;
};
