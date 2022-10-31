import { NextPage } from "next";
import { useMemo } from "react";
import { FaStar } from "react-icons/fa";
import { HStack } from "@chakra-ui/react";

interface StarProps {
  size?: number;
  total?: number;
  rating: number;
}

const Star: NextPage<StarProps> = ({ rating: _rating, total, size }) => {
  const rating = useMemo(() => Math.round(_rating), [_rating]);

  return (
    <HStack>
      {Array(total)
        .fill(0)
        .map((_, index) => {
          const color = rating > index ? "#ECC94B" : "#CBD5E0";
          return <FaStar color={color} key={index} size={size} />;
        })}
    </HStack>
  );
};

Star.defaultProps = {
  size: 20,
  total: 5,
};

export default Star;
