import { router } from '@src/router/router';

declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router;
  }
}
