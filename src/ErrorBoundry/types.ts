/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface ErrorBoundaryFCProps {
  children: ReactNode;
}

export interface UnexpectedErrorProps {
  error: any;
  resetErrorBoundary: (...args: any[]) => void;
}