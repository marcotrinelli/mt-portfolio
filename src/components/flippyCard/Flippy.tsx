import React from "react";
import FlippyFooter from "./FlippyFooter";
import { FlippyProps, FlippyState } from "./types";
import "./styles.css";

export default class Flippy extends React.Component<FlippyProps, FlippyState> {
  static defaultProps: Partial<FlippyProps> = {
    showNavigation: false,
    flipDirection: "horizontal",
    flipOnHover: false,
    flipOnClick: true,
    usePrettyStyle: true,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onTouchStart: () => {},
    onTouchEnd: () => {},
    onClick: () => {},
  };

  constructor(props: FlippyProps) {
    super(props);
    this.state = {
      isFlipped: false,
      isTouchDevice: false,
    };
  }

  static getDerivedStateFromProps(
    props: FlippyProps,
    state: FlippyState
  ): FlippyState {
    return {
      ...state,
      isFlipped:
        typeof props.isFlipped === "boolean"
          ? props.isFlipped
          : state.isFlipped,
    };
  }

  toggle = (): void => {
    this.setState({
      isFlipped: !this.state.isFlipped,
    });
  };

  handleFooterDotClick = (
    newCardIndex: number,
    event: React.MouseEvent<HTMLSpanElement>
  ): void => {
    this.setState({
      isFlipped: newCardIndex === 0,
    });
  };

  handleHoverOn = (event: React.MouseEvent<HTMLDivElement>): void => {
    this.setState({
      isFlipped: true,
    });
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  };

  handleTouchStart = (event: React.TouchEvent<HTMLDivElement>): void => {
    this.setState({
      isFlipped: true,
      isTouchDevice: true,
    });
    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
  };

  handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>): void => {
    this.setState({
      isFlipped: false,
    });
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  };

  handleHoverOff = (event: React.MouseEvent<HTMLDivElement>): void => {
    this.setState({
      isFlipped: false,
    });
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };

  render(): React.ReactElement {
    const {
      children,
      style,
      flipDirection,
      flipOnHover,
      flipOnClick,
      showNavigation,
    } = this.props;
    const { isFlipped, activeCardIndex, isTouchDevice } = this.state;

    const methods = flipOnHover
      ? {
          onMouseEnter: this.handleHoverOn,
          onMouseLeave: this.handleHoverOff,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd,
        }
      : flipOnClick
      ? {
          onClick: this.toggle,
        }
      : {};

    return (
      <div
        className="flippy-container"
        style={{
          ...style,
        }}
        {...methods}
      >
        <div className={`flippy-cardContainer-wrapper ${flipDirection}`}>
          <div
            className={`flippy-cardContainer ${isFlipped ? "isActive" : ""} ${
              isTouchDevice ? "istouchdevice" : ""
            }`}
          >
            {children}
          </div>
          {showNavigation && (
            <FlippyFooter
              onDotClick={this.handleFooterDotClick}
              activeCardIndex={activeCardIndex}
              cards={React.Children.toArray(children)}
            />
          )}
        </div>
      </div>
    );
  }
}
