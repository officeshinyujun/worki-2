import { forwardRef } from "react";
import { FlexProps } from "../Flex";
import Flex from "../Flex";

const VStack = forwardRef<HTMLDivElement, Omit<FlexProps, 'direction'>>(
  (props, ref) => (
    <Flex ref={ref} direction="column" {...props} />
  )
);

VStack.displayName = 'VStack';

export { VStack };