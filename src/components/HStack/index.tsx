import { forwardRef } from "react";
import { FlexProps } from "../Flex";
import Flex from "../Flex";

const HStack = forwardRef<HTMLDivElement, Omit<FlexProps, 'direction'>>(
  (props, ref) => (
    <Flex ref={ref} direction="row" {...props} />
  )
);

HStack.displayName = 'HStack';

export { HStack };