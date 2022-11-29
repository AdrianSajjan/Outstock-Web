import { Box, Button, Container, FormControl, FormErrorMessage, FormLabel, HStack, Input, SimpleGrid, VStack } from "@chakra-ui/react";
import { PageHeader } from "@components/Layout";
import { containerPadding } from "@shared/constants";
import { useAuthenticationStore } from "@shared/hooks";
import { isFieldInvalid } from "@shared/utils";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { isLoading, user } = useAuthenticationStore();

  if (isLoading) return null;

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    emailAddress: user?.emailAddress,
    phoneNumber: user?.phoneNumber,
  };

  const onSubmit = () => {};

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <PageHeader title="Profile" pathname={router.pathname} query={router.query} />
      <Box as="section" bg="white">
        <Container px={containerPadding} maxW="container.lg" pt="16" pb="16">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="12">
            <VStack spacing="8" mt="2">
              <Box position="relative" h="48" w="48">
                <Image src="http://localhost:5000/static/profile/default-avatar.jpg" layout="fill" objectFit="cover" />
              </Box>
              <HStack spacing="0" rowGap="2" alignItems="center" justifyContent="center" flexWrap="wrap">
                <Button variant="outline">Select Picture</Button>
                <Button>Update Picture</Button>
              </HStack>
            </VStack>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {(formik) => (
                <Form>
                  <FormControl isInvalid={isFieldInvalid(formik, "firstName")}>
                    <FormLabel textTransform="uppercase" htmlFor="full-name">
                      First Name
                    </FormLabel>
                    <Field as={Input} name="firstName" id="first-name" variant="filled" placeholder="Enter your first name" />
                    <ErrorMessage name="firstName" component={FormErrorMessage} />
                  </FormControl>
                  <FormControl mt="6" isInvalid={isFieldInvalid(formik, "lastName")}>
                    <FormLabel textTransform="uppercase" htmlFor="last-name">
                      Last Name
                    </FormLabel>
                    <Field as={Input} name="lastName" id="last-name" variant="filled" placeholder="Enter your last name" />
                    <ErrorMessage name="lastName" component={FormErrorMessage} />
                  </FormControl>
                  <FormControl mt="6" isInvalid={isFieldInvalid(formik, "phoneNumber")}>
                    <FormLabel textTransform="uppercase" htmlFor="phone-number">
                      Phone Number
                    </FormLabel>
                    <Field as={Input} name="phoneNumber" id="phone-number" variant="filled" placeholder="Enter your phone number" />
                    <ErrorMessage name="phoneNumber" component={FormErrorMessage} />
                  </FormControl>
                  <FormControl mt="6" isInvalid={isFieldInvalid(formik, "emailAddress")}>
                    <FormLabel textTransform="uppercase" htmlFor="email">
                      Email Address
                    </FormLabel>
                    <Field as={Input} name="emailAddress" id="email" variant="filled" placeholder="Enter your email address" />
                    <ErrorMessage name="emailAddress" component={FormErrorMessage} />
                  </FormControl>
                  <Button isFullWidth type="submit" bg="black" color="white" colorScheme="blackAlpha" mt="10">
                    Update Profile
                  </Button>
                </Form>
              )}
            </Formik>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default ProfilePage;
