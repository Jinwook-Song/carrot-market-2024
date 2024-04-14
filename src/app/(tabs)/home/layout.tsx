import { Fragment } from 'react';

interface HomeLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function HomeLayout({ children, modal }: HomeLayoutProps) {
  return (
    <Fragment>
      {modal}
      {children}
    </Fragment>
  );
}
