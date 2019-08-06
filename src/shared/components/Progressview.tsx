import React from 'react';
import { Loading } from './loading';

interface ProgressViewProps {
  transparent?: boolean;
  className?: string;
  loadingText?: string;
  loading: boolean;
  children: JSX.Element;
}
export function ProgressView(props: ProgressViewProps) {
  return props.loading ? (
    <Loading
      transparent={props.transparent}
      loadingText={props.loadingText}
      className={props.className}
    />
  ) : (
    props.children
  );
}
