export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Creators Hub. Built with care by the team.</p>
      </div>
    </footer>
  );
}
