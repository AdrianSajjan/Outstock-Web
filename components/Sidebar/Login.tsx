import * as React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

interface FormProps {
  handleFormChange: () => void;
}

const LoginForm: React.FC<FormProps> = ({ handleFormChange }) => {
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
        <FormControl mt="6">
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
        <Button mt="8" isFullWidth bg="black" color="white" colorScheme="blackAlpha">
          Login
        </Button>
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

const RegisterForm: React.FC<FormProps> = ({ handleFormChange }) => {
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

const LoginSidebar: React.FC<Props> = ({ handleClose, isOpen }) => {
  const [form, setForm] = React.useState(0);

  const handleFormChange = () => setForm((state) => (state === 0 ? 1 : 0));

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        {form === 0 ? <LoginForm handleFormChange={handleFormChange} /> : <RegisterForm handleFormChange={handleFormChange} />}
      </DrawerContent>
    </Drawer>
  );
};

export default LoginSidebar;
