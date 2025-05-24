export const ROUTES = {
  main: '/',
  products: '/products',
  about: '/about',
  menu: '/menu',
  locations: '/locations',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  cart: '/cart',
  profile: '/profile',
  contact: '/contact',
  notFound: '*',
};

export const LABELS = {
  home: 'Home',
  about: 'About',
  menu: 'Menu',
  products: 'Products',
  locations: 'Locations',
  login: 'Login',
  register: 'Register',
  contact: 'CONTACT',
};
export const footerNavList = [
  { route: ROUTES.main, label: LABELS.home },
  { route: ROUTES.about, label: LABELS.about },
  { route: ROUTES.menu, label: LABELS.menu },
  { route: ROUTES.products, label: LABELS.products },
  { route: ROUTES.locations, label: LABELS.locations },
];
