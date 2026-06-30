export const metadata = {
  title: "المنقذ — يلقّى لك وظيفتك بالذكاء",
  description: "أول موقع تفكر فيه لمّا تبي تتوظّف في السعودية: بحث ذكي، مطابقة، سيرة، ومقابلة.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, background: "#0C1118" }}>{children}</body>
    </html>
  );
}
