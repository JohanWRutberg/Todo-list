import "./global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-blue-50 to-indigo-100 text-gray-900 min-h-screen font-sans">
        <div className="container mx-auto px-4 py-10">
          {children}
        </div>
      </body>
    </html>
  );
}
