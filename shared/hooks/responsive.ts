import { useMediaQuery } from "@chakra-ui/react";

export const useHeroResponseGrid = () => {
  const [isLessThan1366px] = useMediaQuery("(max-width: 1366px");

  return isLessThan1366px ? "repeat(2, 1fr)" : "repeat(4, 1fr)";
};

export const use4ColumnResponseGrid = () => {
  const [isLessThan1366px] = useMediaQuery("(max-width: 1366px");
  const [isLessThan768px] = useMediaQuery("(max-width: 768px");
  return isLessThan768px ? "repeat(1, 1fr)" : isLessThan1366px ? "repeat(2, 1fr)" : "repeat(4, 1fr)";
};

export const use3ColumnResponseGrid = () => {
  const [isLessThan768px] = useMediaQuery("(max-width: 768px");
  const [isLessThan1366px] = useMediaQuery("(max-width: 1366px");
  return isLessThan768px ? "repeat(1, 1fr)" : isLessThan1366px ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
};

export const use2ColumnResponseGrid = () => {
  const isLessThan976px = useLessThan976px();
  return isLessThan976px ? "repeat(1, 1fr)" : "repeat(2, 1fr)";
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
