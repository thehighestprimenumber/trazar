import React from 'react';
import UserNavBar from '../components/navBar/UserNavBar';
import { Container } from '@mui/material';

export default function withUserMenu(Screen: React.ComponentType<any>) {
  function WithUserMenu(props: any) {
    return (
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', px: 5 }}>
        <UserNavBar />
        <Screen {...props} />
      </Container>
    );
  }
  return WithUserMenu;
}
