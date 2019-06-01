import React from 'react';
import { Loading } from './loading';

export function ProgressView(props){
  return props.loading ? <Loading/> : props.children;
}