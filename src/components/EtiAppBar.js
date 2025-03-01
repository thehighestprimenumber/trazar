import * as React from 'react';
import { useEffect, useState } from 'react';

import { AppBar, Avatar, Box, Button, Link, Menu, Toolbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import { auth } from '../etiFirebase';
import { useTranslation } from 'react-i18next';
import { SCOPES } from 'helpers/constants/i18n.ts';
import { PRIVATE_ROUTES, ROUTES } from '../App.js';
import { useLocation } from 'react-router-dom';

const EtiAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [isSignedIn, setIsSignedIn] = useState(!!auth.currentUser); // Local signed-in state.

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { t } = useTranslation(SCOPES.COMPONENTS.BAR, { useSuspense: false });
  const { pathname: currentRoute } = useLocation();
  const links = [
    { href: '/historia-del-eti', label: t('history') },
    { href: '/manifiesto-etiano', label: t('manifest') }
    // {href: "/", title: "Comisión de Género"} // Esto se agregará más adelante
  ];

  const [anchorElNavGender, setAnchorElNavGender] = React.useState(null);
  const openGenderMenu = Boolean(anchorElNavGender);
  const handleOpenNavGenderMenu = (event) => {
    setAnchorElNavGender(event.currentTarget);
  };
  const handleCloseNavGenderMenu = () => {
    setAnchorElNavGender(null);
  };
  const linksGender = [
    { href: '/comision-de-genero-who', label: t('genderWho') },
    { href: '/comision-de-genero-protocol', label: t('genderProtocol') },
    { href: '/comision-de-genero-contact', label: t('genderContact') }
  ];

  return (
    <AppBar
      elevation={0}
      position="static"
      sx={{ backgroundColor: 'white', paddingX: 2 }}
      id="appbar"
    >
      <Container maxWidth="xl" id="container">
        <Toolbar
          disableGutters
          id="toolbar"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Link href="/">
            <Avatar
              src="/img/icon/ETI_logo_1.png"
              alt="ETI"
              sx={{ width: '100px', height: '100px' }}
            />
          </Link>

          <Box
            sx={{
              flexGrow: 2,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'space-around'
            }}
          >
            {links.map((link) => (
              <Link
                className="appBarLink"
                variant="h6"
                underline="none"
                color="black"
                href={link.href}
                sx={{ fontSize: 14 }}
                key={link.href}
                display="flex"
                padding="5px"
              >
                {link.title}
              </Link>
            ))}
            <Button
              sx={{ fontSize: 14 }}
              id="gender-button"
              aria-controls={openGenderMenu ? 'gender-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openGenderMenu ? 'true' : undefined}
              onClick={handleOpenNavGenderMenu}
            >
              {t('gender')}
            </Button>
            <Menu
              id="gender-menu"
              anchorEl={anchorElNavGender}
              open={openGenderMenu}
              onClose={handleCloseNavGenderMenu}
              anchorReference={'anchorEl'}
              MenuListProps={{
                'aria-labelledby': 'gender-button'
              }}
            >
              {linksGender.map((link) => (
                <Link
                  variant="h6"
                  underline="none"
                  color="black"
                  href={link.href}
                  sx={{ fontSize: 14 }}
                  key={link.href}
                  display="flex"
                  padding="5px"
                >
                  {link.title}
                </Link>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{ flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'flex-end' }}
            display={'flex'}
            id="botonera"
          >
            {isSignedIn ? (
              !PRIVATE_ROUTES.includes(currentRoute) && (
                <>
                  <Button
                    color="secondary"
                    variant="contained"
                    underline="none"
                    href={ROUTES.USER_HOME}
                    key={'profile'}
                  >
                    {t('controlPanel').toUpperCase()}
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    underline="none"
                    onClick={() => auth.signOut()}
                    href={'/'}
                    key={'signout'}
                  >
                    {t('logout').toUpperCase()}
                  </Button>
                </>
              )
            ) : (
              <Button
                color="secondary"
                variant="contained"
                underline="none"
                onClick={() => auth.signIn()}
                href={'/sign-in'}
                key={'sign-in'}
                sx={{ fontSize: 12, align: 'center', margin: '3px', textAlign: 'center' }}
              >
                {t('signin').toUpperCase()}
              </Button>
            )}
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="more about ETI"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: '#000000' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {links.map((link) => (
                <Link
                  variant="h6"
                  underline="none"
                  color="black"
                  href={link.href}
                  sx={{ fontSize: 14 }}
                  key={link.href}
                  display="flex"
                  padding="5px"
                >
                  {link.title}
                </Link>
              ))}
              <Button
                id="gender-button"
                aria-controls={openGenderMenu ? 'gender-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openGenderMenu ? 'true' : undefined}
                onClick={handleOpenNavGenderMenu}
              >
                {t('gender')}
              </Button>
              <Menu
                id="gender-menu"
                anchorEl={anchorElNavGender}
                open={openGenderMenu}
                onClose={handleCloseNavGenderMenu}
                anchorReference={'anchorEl'}
                MenuListProps={{
                  'aria-labelledby': 'gender-button'
                }}
              >
                {linksGender.map((link) => (
                  <Link
                    variant="h6"
                    underline="none"
                    color="black"
                    href={link.href}
                    sx={{ fontSize: 14 }}
                    key={link.href}
                    display="flex"
                    padding="5px"
                  >
                    {link.title}
                  </Link>
                ))}
              </Menu>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default EtiAppBar;
