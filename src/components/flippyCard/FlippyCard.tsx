import React from "react";

// FlippyCard component types
export interface FlippyCardProps {
  children: React.ReactNode;
  className?: string;
  cardType: "front" | "back";
  style?: React.CSSProperties;
  elementType?: string;
  animationDuration?: number;
  isFlipped?: boolean;
  [key: string]: any; // For rest props
}

export interface FlippySideProps {
  children: React.ReactNode;
  isFlipped?: boolean;
  style?: React.CSSProperties;
  className?: string;
  animationDuration?: number;
  [key: string]: any; // For rest props
}

class FlippyCard extends React.Component<FlippyCardProps> {
  static defaultProps: Partial<FlippyCardProps> = {
    animationDuration: 600,
  };

  render(): React.ReactElement {
    const {
      className,
      cardType,
      style,
      elementType,
      animationDuration,
      children,
      ...rest
    } = this.props;

    return React.createElement(
      elementType || "div",
      {
        className: `flippy-card flippy-${cardType} ${className || ""}`,
        ...rest,
        style: {
          ...(style || {}),
          transitionDuration: `${(animationDuration || 600) / 1000}s`,
        },
      },
      children
    );
  }
}

export const FrontSide: React.FC<FlippySideProps> = ({
  isFlipped,
  style,
  animationDuration = 600,
  ...props
}) => (
  <FlippyCard
    {...props}
    style={{
      ...(style || {}),
    }}
    animationDuration={animationDuration}
    cardType="front"
  />
);

export const BackSide: React.FC<FlippySideProps> = ({
  isFlipped,
  style,
  ...props
}) => (
  <FlippyCard
    {...props}
    style={{
      ...(style || {}),
    }}
    cardType="back"
  />
);

export default FlippyCard;
