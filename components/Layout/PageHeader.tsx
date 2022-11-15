import _ from "lodash";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { HiChevronRight } from "react-icons/hi";
import { ParsedUrlQuery } from "querystring";
import { BreadCrumbProp } from "@shared/interface";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Heading } from "@chakra-ui/react";

interface PageHeaderProps {
  title: string;
  query: ParsedUrlQuery;
  pathname: string;
}

const PageHeader: NextPage<PageHeaderProps> = ({ title, query, pathname }) => {
  const breadcrumbs = useMemo(() => {
    const base = pathname.split("/").map((p) => {
      return /^\[.+\]$/.test(p) ? (Object.keys(query).includes(p.slice(1, -1)) ? query[p.slice(1, -1)] : p) : p;
    });

    return base.map((result, index) => ({
      name: result === "" ? "Home" : index === base.length - 1 ? _.lowerCase(title) : _.capitalize(result as string),
      url: result === "" ? "/" : (base.slice(0, index + 1).reduce((a, b) => (b === "" ? b : `${a}/${b}`), "") as string),
      isCurrentPage: index === base.length - 1,
    }));
  }, [query, pathname]);

  return (
    <Box as="section" bg="gray.100">
      <Container maxW="container.2xl" pt="4" pb="6">
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
        <Heading size="lg" textTransform="uppercase" mt="8" textAlign="center">
          {title}
        </Heading>
      </Container>
    </Box>
  );
};

export default PageHeader;
