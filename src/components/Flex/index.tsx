import { createElement, CSSProperties, ElementType, forwardRef, ReactNode } from "react";

export interface FlexProps {
    as?: ElementType;
    direction?: "row" | "column";
    justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
    align?: "flex-start" | "flex-end" | "center" | "stretch";
    wrap?: "wrap" | "nowrap";
    gap?: number;
    className?: string;
    children?: ReactNode;
    style?: CSSProperties;
}

const Flex = forwardRef<HTMLDivElement, FlexProps>(({
    as: Component = "div",
    direction,
    justify,
    align,
    wrap,
    gap,
    className,
    children,
    style,
    ...rest
}, ref) => {
    const element = createElement(Component, {
        ref,
        className,
        style: {
            display: "flex",
            flexDirection: direction,
            justifyContent: justify,
            alignItems: align,
            flexWrap: wrap,
            gap: gap,
            ...style,
        },
        ...rest
    }, children);

    return element;
});

Flex.displayName = 'Flex';

export default Flex;
