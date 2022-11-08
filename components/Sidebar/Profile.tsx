import * as React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useMutation } from "@tanstack/react-query";
import { ProfileSidebarProps, LoginFormProps, LoginFormState } from "@shared/interface";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { LoginFormValidation } from "@shared/validations";
import { login } from "@shared/api";
import { isFieldInvalid } from "@shared/utils";
import { useSession } from "@shared/hooks";

const LoginForm: React.FC<LoginFormProps> = ({ handleFormChange }) => {
  const [isLoading, setLoading] = React.useState(false);

  const mutatation = useMutation({ mutationFn: login });

  const initialValues: LoginFormState = {
    emailAddress: "",
    password: "",
  };

  const onSubmit = (values: LoginFormState, actions: FormikHelpers<LoginFormState>) => {
    console.log("Submit");
    setLoading(true);

    mutatation.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
      },
      onError: () => {},
      onSettled: () => {
        setLoading(false);
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
                <InputGroup>
                  <Field as={Input} id="email" name="emailAddress" variant="filled" type="email" placeholder="Enter your email" />
                  <InputRightElement>
                    <FormErrorIcon color="red.500" />
                  </InputRightElement>
                </InputGroup>
                <ErrorMessage name="emailAddress" component={FormErrorMessage} />
              </FormControl>
              <FormControl mt="4" isInvalid={isFieldInvalid(formik, "password")}>
                <FormLabel textTransform="uppercase" htmlFor="password">
                  Password
                </FormLabel>
                <InputGroup>
                  <Field as={Input} id="password" name="password" variant="filled" type="password" placeholder="Enter your password" />
                  <InputRightElement>
                    <FormErrorIcon color="red.500" />
                  </InputRightElement>
                </InputGroup>
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

const RegisterForm: React.FC<LoginFormProps> = ({ handleFormChange }) => {
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
        <FormControl mt="6">
          <FormLabel textTransform="uppercase" htmlFor="first-name">
            First Name
          </FormLabel>
          <Input id="first-name" variant="filled" type="type" placeholder="Enter your first name" />
        </FormControl>
        <FormControl mt="4">
          <FormLabel textTransform="uppercase" htmlFor="last-name">
            Last Name
          </FormLabel>
          <Input id="last-name" variant="filled" type="type" placeholder="Enter your last name" />
        </FormControl>
        <FormControl mt="4">
          <FormLabel textTransform="uppercase" htmlFor="email">
            Email
          </FormLabel>
          <Input id="email" variant="filled" type="email" placeholder="Enter your email" />
        </FormControl>
        <FormControl mt="4">
          <FormLabel textTransform="uppercase" htmlFor="password">
            Password
          </FormLabel>
          <Input id="password" variant="filled" type="password" placeholder="Enter your password" />
        </FormControl>
        <FormControl mt="4">
          <FormLabel textTransform="uppercase" htmlFor="confirm-password">
            Confirm Password
          </FormLabel>
          <Input id="confirm-password" variant="filled" type="password" placeholder="Re-enter your password" />
        </FormControl>
        <Button mt="8" isFullWidth bg="black" color="white" colorScheme="blackAlpha">
          Register
        </Button>
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

const LoadingState = () => {
  return (
    <Box boxSize="full" position="relative">
      <Spinner position="absolute" top="50%" left="50%" />
    </Box>
  );
};

const Profile = () => {
  return <Box>Show Profile</Box>;
};

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ handleClose, isOpen, isLoadingComplete }) => {
  const [form, setForm] = React.useState(0);

  const session = useSession();

  const handleFormChange = () => setForm((state) => (state === 0 ? 1 : 0));

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        {!isLoadingComplete ? (
          <LoadingState />
        ) : session.isAuthenticated ? (
          <Profile />
        ) : form === 0 ? (
          <LoginForm handleFormChange={handleFormChange} />
        ) : (
          <RegisterForm handleFormChange={handleFormChange} />
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileSidebar;
