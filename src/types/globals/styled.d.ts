/*
 * @description (review) Don't want to specify the theme here, but we can do this by just
 * deleting "eslint-disable-next-line @typescript-eslint/no-empty-interface"
 * comments
 * */

declare module '@mui/material/styles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme {}
  // allow configuration using `createTheme`
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ThemeOptions {}
}
