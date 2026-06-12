import '../assets/style.css';

export const metadata = {
  title: 'Ready-slate',
  meta: [
    {
      charSet: 'UTF-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, minimum-scale=1.0',
    },
  ],
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default RootLayout;
