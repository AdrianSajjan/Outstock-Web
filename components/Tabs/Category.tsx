import * as React from "react";
import { Button, useMultiStyleConfig, useTab } from "@chakra-ui/react";

const Category = React.forwardRef<any, any>((props, ref) => {
  const tabProps = useTab({ ...props, ref });
  const isSelected = tabProps["aria-selected"];

  const styles = useMultiStyleConfig("Tabs", { ...tabProps, variant: "unstyled" });

  return (
    <Button
      __css={styles.tab}
      p="0"
      fontWeight="semibold"
      letterSpacing={1}
      textTransform="uppercase"
      color={isSelected ? "black" : "gray.400"}
      {...tabProps}
    >
      {tabProps.children}
    </Button>
  );
});

export default Category;
