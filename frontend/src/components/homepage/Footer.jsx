function Footer() {
  return (
    <footer className="py-5 px-4 text-center m-0 text-gray-400 border-t border-gray-800/50 bg-gray-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Finance Manager. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
