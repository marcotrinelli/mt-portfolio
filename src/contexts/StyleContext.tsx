import React from "react";

interface StyleContextType {
  // Define the shape of your style context here
  // This is a placeholder - update based on what you actually store in this context
  theme?: string;
  [key: string]: any;
}

const StyleContext = React.createContext<StyleContextType | undefined>(
  undefined
);

export const StyleProvider = StyleContext.Provider;
export const StyleConsumer = StyleContext.Consumer;

export default StyleContext;
