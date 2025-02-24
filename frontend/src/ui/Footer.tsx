function Footer() {
    return (
      <div className="bg-pink-200 w-full text-center pt-10 pb-6">
        <div className="flex flex-col md:flex-row items-center justify-evenly space-y-8 md:space-y-0 px-4 sm:px-8">
          {/* Contact Us Section */}
          <div>
            <h4 className="text-lg font-semibold pb-3">Contact Us</h4>
            <p className="pb-1">123 Sweet Street, Dessert City</p>
            <p className="pb-1">Phone: +1 234 567 890</p>
            <p className="pb-2">Email: info@cakestore.com</p>
            <div className="flex justify-center space-x-4">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
  
          {/* Operating Hours Section */}
          <div>
            <h4 className="text-lg font-semibold pb-3">Operating Hours</h4>
            <p className="pb-1">Monday - Friday: 9 AM - 7 PM</p>
            <p className="pb-1">Saturday: 10 AM - 5 PM</p>
            <p className="pb-2">Sunday: Closed</p>
          </div>
  
          {/* Subscribe Section */}
          <div>
            <h4 className="text-lg font-semibold pb-3">Subscribe</h4>
            <p className="pb-2">
              Get the latest updates and offers directly to your inbox!
            </p>
            <form className="flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded border border-gray-300 w-full sm:w-auto"
              />
              <button
                type="submit"
                className="p-2 bg-pink-500 text-white rounded w-full sm:w-auto"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  export default Footer;
  