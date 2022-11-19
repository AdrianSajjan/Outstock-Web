import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  SkeletonText,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import Image from "next/image";
import { login, logout, register } from "@shared/api";
import { useSessionStore } from "@shared/store";
import { useMutation } from "@tanstack/react-query";
import { destroySession, isFieldInvalid, setSession } from "@shared/utils";
import { LoginFormValidation, RegistrationFormValidation } from "@shared/validations";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import {
  ProfileFormProps,
  LoginFormState,
  LoginSuccess,
  ProfileSidebarProps,
  RegistrationFormState,
  RegistrationSuccess,
  LogoutSuccess,
  GenericErrorResponse,
} from "@shared/interface";
import { useLessThan576px } from "@shared/hooks";
import NextLink from "next/link";

const LoginForm: React.FC<ProfileFormProps> = ({ handleFormChange }) => {
  const toast = useToast({ variant: "left-accent", position: "top", isClosable: true });

  const [isLoading, setLoading] = React.useState(false);

  const { initializeSession } = useSessionStore();

  const mutatation = useMutation<LoginSuccess, GenericErrorResponse, LoginFormState>({ mutationFn: login });

  const initialValues: LoginFormState = {
    emailAddress: "",
    password: "",
  };

  const onSubmit = (values: LoginFormState, actions: FormikHelpers<LoginFormState>) => {
    setLoading(true);
    mutatation.mutate(values, {
      onSuccess: (data) => {
        setLoading(false);
        toast({ title: "Login Success", description: "You have been successfully logged in", status: "success" });
        actions.resetForm();
        setSession(data.accessToken, data.refreshToken);
        initializeSession({ ...data });
      },
      onError: (error) => {
        setLoading(false);
        if (!Array.isArray(error.message)) return toast({ title: "Login Failed", description: error.message, status: "error" });
      },
    });
  };

  return (
    <>
      <HStack bg="black" px="6" h="14" justifyContent="space-between" alignItems="center">
        <Text size="lg" fontWeight="medium" color="white" textTransform="uppercase">
          Login
        </Text>
        <DrawerCloseButton color="white" position="initial" />
      </HStack>
      <DrawerBody pt="6">
        <Text align="center">If you have an account with us, please log in.</Text>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={LoginFormValidation}>
          {(formik) => (
            <Form>
              <FormControl mt="6" isInvalid={isFieldInvalid(formik, "emailAddress")}>
                <FormLabel textTransform="uppercase" htmlFor="email">
                  Email
                </FormLabel>
                <Field as={Input} id="email" name="emailAddress" variant="filled" type="email" placeholder="Enter your email" />
                <ErrorMessage name="emailAddress" component={FormErrorMessage} />
              </FormControl>
              <FormControl mt="4" isInvalid={isFieldInvalid(formik, "password")}>
                <FormLabel textTransform="uppercase" htmlFor="password">
                  Password
                </FormLabel>
                <Field as={Input} id="password" name="password" variant="filled" type="password" placeholder="Enter your password" />
                <ErrorMessage name="password" component={FormErrorMessage} />
              </FormControl>
              <Button isLoading={isLoading} mt="6" type="submit" isFullWidth bg="black" color="white" colorScheme="blackAlpha">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </DrawerBody>
      <DrawerFooter flexDir="column">
        <Text align="center">New Customer?</Text>
        <Button isFullWidth mt="2" onClick={handleFormChange}>
          Create Account
        </Button>
      </DrawerFooter>
    </>
  );
};

const RegisterForm: React.FC<ProfileFormProps> = ({ handleFormChange }) => {
  const toast = useToast({ variant: "left-accent", position: "top", isClosable: true });

  const [isLoading, setLoading] = React.useState(false);

  const { initializeSession } = useSessionStore();
  const mutatation = useMutation<RegistrationSuccess, GenericErrorResponse, RegistrationFormState>({ mutationFn: register });

  const initialValues: RegistrationFormState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values: RegistrationFormState, actions: FormikHelpers<RegistrationFormState>) => {
    setLoading(true);
    mutatation.mutate(
      { ...values, phoneNumber: `+91${values.phoneNumber}` },
      {
        onSuccess: (data) => {
          setLoading(false);
          toast({ title: "Registration Success", description: "You have been successfully registered", status: "success" });
          actions.resetForm();
          setSession(data.accessToken, data.refreshToken);
          initializeSession({ ...data });
        },
        onError: (error) => {
          setLoading(false);
          if (!Array.isArray(error.message)) return toast({ title: "Registration Failed", description: error.message, status: "error" });
        },
      }
    );
  };

  return (
    <>
      <HStack bg="black" px="6" h="14" justifyContent="space-between" alignItems="center">
        <Text size="lg" fontWeight="medium" color="white" textTransform="uppercase">
          Register
        </Text>
        <DrawerCloseButton color="white" position="initial" />
      </HStack>
      <DrawerBody pt="6">
        <Text align="center">If you dont&apos;t have an account with us, register.</Text>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={RegistrationFormValidation}>
          {(formik) => (
            <Form>
              <FormControl mt="6" isInvalid={isFieldInvalid(formik, "firstName")}>
                <FormLabel textTransform="uppercase" htmlFor="first-name">
                  First Name
                </FormLabel>
                <Field as={Input} name="firstName" id="first-name" variant="filled" type="type" placeholder="Enter your first name" />
                <ErrorMessage name="firstName" component={FormErrorMessage} />
              </FormControl>
              <FormControl mt="4" isInvalid={isFieldInvalid(formik, "lastName")}>
                <FormLabel textTransform="uppercase" htmlFor="last-name">
                  Last Name
                </FormLabel>
                <Field as={Input} name="lastName" id="last-name" variant="filled" type="type" placeholder="Enter your last name" />
                <ErrorMessage name="lastName" component={FormErrorMessage} />
              </FormControl>
              <FormControl mt="4" isInvalid={isFieldInvalid(formik, "emailAddress")}>
                <FormLabel textTransform="uppercase" htmlFor="email">
                  Email
                </FormLabel>
                <Field as={Input} name="emailAddress" id="email" variant="filled" type="email" placeholder="Enter your email" />
                <ErrorMessage name="emailAddress" component={FormErrorMessage} />
              </FormControl>
              <FormControl mt="4" isInvalid={isFieldInvalid(formik, "phoneNumber")}>
                <FormLabel textTransform="uppercase" htmlFor="phone-number">
                  Phone Number
                </FormLabel>
                <Field as={Input} name="phoneNumber" id="phone-number" variant="filled" type="number" placeholder="Enter your phone number" />
                <ErrorMessage name="phoneNumber" component={FormErrorMessage} />
              </FormControl>
              <FormControl mt="4" isInvalid={isFieldInvalid(formik, "password")}>
                <FormLabel textTransform="uppercase" htmlFor="password">
                  Password
                </FormLabel>
                <Field as={Input} name="password" id="password" variant="filled" type="password" placeholder="Enter your password" />
                <ErrorMessage name="password" component={FormErrorMessage} />
              </FormControl>
              <FormControl mt="4" isInvalid={isFieldInvalid(formik, "confirmPassword")}>
                <FormLabel textTransform="uppercase" htmlFor="confirm-pwd">
                  Confirm Password
                </FormLabel>
                <Field as={Input} name="confirmPassword" id="confirm-pwd" variant="filled" type="password" placeholder="Re-enter your password" />
                <ErrorMessage name="confirmPassword" component={FormErrorMessage} />
              </FormControl>
              <Button mt="8" isLoading={isLoading} type="submit" isFullWidth bg="black" color="white" colorScheme="blackAlpha">
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </DrawerBody>
      <DrawerFooter flexDir="column">
        <Text align="center">Have An Account?</Text>
        <Button isFullWidth mt="2" onClick={handleFormChange}>
          Login
        </Button>
      </DrawerFooter>
    </>
  );
};

const Profile = () => {
  const isLessThan576px = useLessThan576px();

  const { reauthenticateSession, user } = useSessionStore();
  const toast = useToast({ variant: "left-accent", position: "top", isClosable: true });
  const mutation = useMutation<LogoutSuccess, GenericErrorResponse>({ mutationFn: logout });

  const handleLogout = () =>
    mutation.mutate(undefined, {
      onSettled: () => {
        toast({ title: "Logout Success", description: "You have been logged out from your session", status: "success" });
        destroySession();
        reauthenticateSession();
      },
    });

  return (
    <>
      <HStack bg="black" px="6" h="14" justifyContent="space-between" alignItems="center">
        <Text size="lg" fontWeight="medium" color="white" textTransform="uppercase">
          Profile
        </Text>
        <DrawerCloseButton color="white" position="initial" />
      </HStack>
      <DrawerBody>
        <Stack direction={isLessThan576px ? "column" : "row"} mt="6" alignItems="center" spacing="4">
          <Box position="relative" h="28" w="28">
            <Image src="http://localhost:5000/static/profile/default-avatar.jpg" layout="fill" objectFit="cover" />
          </Box>
          <Box>
            <HStack>
              <Text fontWeight="semibold">Full Name</Text>
              <Text>
                {user!.firstName} {user!.lastName}
              </Text>
            </HStack>
            <Flex wrap="wrap" columnGap="2">
              <Text fontWeight="semibold">Email</Text>
              <Text>{user!.emailAddress}</Text>
            </Flex>
            <HStack>
              <Text fontWeight="semibold">Phone Number</Text>
              <Text>{user!.phoneNumber}</Text>
            </HStack>
          </Box>
        </Stack>
        <VStack spacing="4" mt="8">
          <NextLink href="/profile" passHref>
            <Button as="a" isFullWidth>
              Edit Profile
            </Button>
          </NextLink>
          <NextLink href="/orders" passHref>
            <Button as="a" isFullWidth>
              My Orders
            </Button>
          </NextLink>
          <NextLink href="/payments" passHref>
            <Button as="a" isFullWidth>
              My Payments
            </Button>
          </NextLink>
        </VStack>
      </DrawerBody>
      <DrawerFooter>
        <Button isFullWidth mt="2" bg="black" color="white" colorScheme="blackAlpha" onClick={handleLogout}>
          Logout
        </Button>
      </DrawerFooter>
    </>
  );
};

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ handleClose, isOpen, isLoadingComplete }) => {
  const [form, setForm] = React.useState(0);

  const { isAuthenticated } = useSessionStore();

  const handleFormChange = () => setForm((state) => (state === 0 ? 1 : 0));

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} size="sm">
      <DrawerOverlay />
      <SkeletonText noOfLines={8} skeletonHeight="4" spacing="4" isLoaded={isLoadingComplete}>
        <DrawerContent>
          {isAuthenticated ? (
            <Profile />
          ) : form === 0 ? (
            <LoginForm handleFormChange={handleFormChange} />
          ) : (
            <RegisterForm handleFormChange={handleFormChange} />
          )}
        </DrawerContent>
      </SkeletonText>
    </Drawer>
  );
};

export default ProfileSidebar;
