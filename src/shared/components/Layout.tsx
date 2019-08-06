import classNames from 'classnames';
import { AppContext } from 'core/AppContextProvider';
import React, { PropsWithChildren, useContext } from 'react';
import './Layout.css';
import { MainAppBar } from './MainAppBar';

type LayoutProps = PropsWithChildren<{}>;
export function Layout(props: LayoutProps) {
  const { theme } = useContext(AppContext);
  return (
    <div className={classNames('Layout', theme.background)}>
      <MainAppBar className={classNames(theme.MainAppBar, 'MainAppBar')} />
      {props.children}
    </div>
  );
}
