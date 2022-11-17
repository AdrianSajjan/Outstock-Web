import * as React from "react";
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, HStack, Text } from "@chakra-ui/react";
import { useLessThan768px } from "@shared/hooks";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const MobileSidebar: React.FC<Props> = ({ handleClose, isOpen }) => {
  const isLessThan768px = useLessThan768px();

  React.useEffect(() => {
    if (!isLessThan768px) handleClose();
  }, [isLessThan768px]);

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <HStack bg="black" px="6" h="14" justifyContent="space-between" alignItems="center">
          <Text size="lg" fontWeight="medium" color="white" textTransform="uppercase">
            Menu
          </Text>
          <DrawerCloseButton color="white" position="initial" />
        </HStack>
        <DrawerBody pt="6"></DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;
