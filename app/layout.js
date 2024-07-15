import "./globals.css";

export const metadata = {
  title: "Flux",
  description: "좋아하는 거, 뭐든지 저장.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
