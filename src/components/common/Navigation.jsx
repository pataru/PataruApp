import { Menu, ShoppingCart } from "lucide-react"

const Navigation = ( { currentPage, setCurrentPage, cart, setShowCart, isMenuOpen, setIsMenuOpen } ) => (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-orange-600 cursor-pointer" onClick={() => setCurrentPage("home")}>
            Kurir Express
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => setCurrentPage("home")} className={`font-medium ${currentPage === "home" ? "text-orange-600" : "text-gray-700 hover:text-orange-600"}`}>
              Beranda
            </button>
            <button onClick={() => setCurrentPage("merchants")} className={`font-medium ${currentPage === "merchants" || currentPage === "menu" ? "text-orange-600" : "text-gray-700 hover:text-orange-600"}`}>
              Pesan Makanan
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setShowCart(true)} className="relative p-2 text-gray-700 hover:text-orange-600">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>}
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <button
              onClick={() => {
                setCurrentPage("home")
                setIsMenuOpen(false)
              }}
              className="block w-full text-left py-2 text-gray-700 hover:text-orange-600"
            >
              Beranda
            </button>
            <button
              onClick={() => {
                setCurrentPage("merchants")
                setIsMenuOpen(false)
              }}
              className="block w-full text-left py-2 text-gray-700 hover:text-orange-600"
            >
              Pesan Makanan
            </button>
          </div>
        )}
      </div>
    </nav>
  )

  export default Navigation;