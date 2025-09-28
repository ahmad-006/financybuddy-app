function Footer() {
  return (
    <footer className="py-8 px-4 text-center border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} FinancyBuddy. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
