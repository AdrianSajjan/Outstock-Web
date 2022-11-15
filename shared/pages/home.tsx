import { Box, GridItem, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface HeroSmallCardProp {
  image: string;
  title: string;
  url: string;
  colSpan: number;
}

export const HeroSmallCard: NextPage<HeroSmallCardProp> = ({ image, title, url, colSpan }) => {
  return (
    <Link href={url} passHref>
      <GridItem colSpan={colSpan} rowSpan={1} position="relative" as="a">
        <Box boxSize="full" position="relative">
          <Image layout="fill" src={image} objectFit="cover" />
        </Box>
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" bg="white" py="3" px="9" borderRadius="sm">
          <Heading textTransform="uppercase" size="md" textAlign="center">
            {title}
          </Heading>
        </Box>
      </GridItem>
    </Link>
  );
};
