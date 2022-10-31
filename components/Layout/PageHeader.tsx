import { NextPage } from "next";
import NextLink from "next/link";
import { HiChevronRight } from "react-icons/hi";
import { BreadCrumbProp } from "@shared/interface";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Heading } from "@chakra-ui/react";

interface PageHeaderProps {
  title: string;
  breadcrumbs: Array<BreadCrumbProp>;
}

const PageHeader: NextPage<PageHeaderProps> = ({ title, breadcrumbs }) => {
  return (
    <Box as="section" bg="gray.100">
      <Container maxW="container.2xl" pt="4" pb="8">
        <Breadcrumb separator={<HiChevronRight />}>
          {breadcrumbs.map(({ name, url, isCurrentPage }, index) => (
            <BreadcrumbItem key={`${name}-${index}`}>
              <NextLink href={url} passHref>
                <BreadcrumbLink {...{ fontWeight: isCurrentPage ? "semibold" : "normal", isCurrentPage, textTransform: "capitalize" }}>
                  {name}
                </BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        <Heading size="lg" textTransform="uppercase" mt="4" textAlign="center">
          {title}
        </Heading>
      </Container>
    </Box>
  );
};

export default PageHeader;
