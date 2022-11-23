import { NextPage } from "next";
import { useMemo } from "react";
import { FaStar } from "react-icons/fa";
import { HStack, IconButton } from "@chakra-ui/react";

interface StarProps {
  size?: number;
  total?: number;
  rating: number;
  input?: boolean;
  setRating?: (rating: number) => void;
}

const Star: NextPage<StarProps> = ({ rating: r, total, size, setRating, input }) => {
  const rating = useMemo(() => Math.round(r), [r]);

  return (
    <HStack>
      {Array(total)
        .fill(0)
        .map((_, index) => {
          const handlePress = () => setRating && setRating(index + 1);
          const color = rating > index ? "#ECC94B" : "#CBD5E0";

          return input ? (
            <IconButton variant="ghost" onClick={handlePress} aria-label="Star" icon={<FaStar color={color} key={index} size={size} />} />
          ) : (
            <FaStar color={color} key={index} size={size} />
          );
        })}
    </HStack>
  );
};

Star.defaultProps = {
  size: 20,
  total: 5,
};

export default Star;
