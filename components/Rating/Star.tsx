import { NextPage } from "next";
import { FaStar } from "react-icons/fa";
import { HStack } from "@chakra-ui/react";

interface StarProps {
  size?: number;
  total: number;
  rating: number;
}

const Star: NextPage<StarProps> = ({ rating, total, size }) => {
  return (
    <HStack>
      {Array(total)
        .fill(0)
        .map((_, index) => {
          const color = rating > index ? "#ECC94B" : "#CBD5E0";
          return <FaStar color={color} key={index} size={size || 20} />;
        })}
    </HStack>
  );
};

export default Star;
