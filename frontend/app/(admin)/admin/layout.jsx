import '../../globals.css';

export const metadata = {
  title: 'Yönetim | Dr. Buket Bayram',
  robots: {
    index: false,
    follow: false,
    nocache: true
  }
};

export default function AdminLayout({children}) {
  return (
    <html lang="tr">
      <body className="bg-white">{children}</body>
    </html>
  );
}
