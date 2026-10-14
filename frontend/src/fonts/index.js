import localFont from 'next/font/local';

export const montserrat = localFont({
  src: [
    {
      path: './Montserrat-Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: './Montserrat-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './Montserrat-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './Montserrat-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './Montserrat-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
  variable: '--font-montserrat'
});
