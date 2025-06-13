import React, { useState } from "react"
import { ShoppingCart, Search, Star, Clock, MapPin, Phone, Users, Truck, Shield, Award, Menu, X, Plus, Minus, MessageCircle } from "lucide-react"
import CheckoutPage from "./components/checkout/CheckoutPage"
import LandingPage from "./components/landing/LandingPage"
import Navigation from "./components/common/Navigation"
import Footer from "./components/common/Footer"

// Sample data - dalam implementasi nyata ini akan dari API/database
const merchantsData = [
  {
    id: 1,
    name: "Warung Bu Sari",
    category: "Indonesian",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    rating: 4.8,
    deliveryTime: "20-30 min",
    address: "Jl. Sudirman No. 123",
    isOpen: true,
    products: [
      { id: 101, name: "Nasi Gudeg Komplit", price: 25000, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop", description: "Nasi gudeg dengan ayam, telur, dan sambal krecek" },
      { id: 102, name: "Soto Ayam", price: 18000, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop", description: "Soto ayam kuah bening dengan telur dan kerupuk" },
      { id: 103, name: "Gado-gado", price: 15000, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=200&fit=crop", description: "Gado-gado segar dengan bumbu kacang" },
    ],
  },
  {
    id: 2,
    name: "Pizza Corner",
    category: "Western",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.6,
    deliveryTime: "25-35 min",
    address: "Jl. Thamrin No. 456",
    isOpen: true,
    products: [
      { id: 201, name: "Margherita Pizza", price: 45000, image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop", description: "Pizza klasik dengan keju mozzarella dan basil" },
      { id: 202, name: "Pepperoni Pizza", price: 55000, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop", description: "Pizza dengan topping pepperoni dan keju" },
      { id: 203, name: "Chicken Wings", price: 35000, image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=300&h=200&fit=crop", description: "Sayap ayam crispy dengan saus BBQ" },
    ],
  },
  {
    id: 3,
    name: "Bubble Tea House",
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
    rating: 4.7,
    deliveryTime: "15-20 min",
    address: "Jl. Gatot Subroto No. 789",
    isOpen: true,
    products: [
      { id: 301, name: "Original Milk Tea", price: 20000, image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=300&h=200&fit=crop", description: "Milk tea original dengan bubble pearl" },
      { id: 302, name: "Taro Bubble Tea", price: 22000, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop", description: "Bubble tea rasa taro yang creamy" },
      { id: 303, name: "Fresh Fruit Tea", price: 18000, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop", description: "Teh buah segar dengan potongan buah asli" },
    ],
  },
]

const App = () => {
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedMerchant, setSelectedMerchant] = useState(null)
  const [cart, setCart] = useState([])
  const [cartMerchant, setCartMerchant] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "COD",
  })

  // Filter merchants based on search
  const filteredMerchants = merchantsData.filter((merchant) => merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) || merchant.category.toLowerCase().includes(searchTerm.toLowerCase()))

  // Add to cart function
  const addToCart = (product, merchantId) => {
    const merchant = merchantsData.find((m) => m.id === merchantId)

    // Check if cart is empty or from same merchant
    if (cartMerchant && cartMerchant.id !== merchantId) {
      if (window.confirm("Keranjang Anda berisi item dari merchant lain. Hapus item sebelumnya dan lanjutkan?")) {
        setCart([{ ...product, quantity: 1, merchantId }])
        setCartMerchant(merchant)
      }
      return
    }

    setCartMerchant(merchant)
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1, merchantId }])
    }
  }

  // Update quantity
  const updateQuantity = (productId, change) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + change
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  // Remove from cart
  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId)
    setCart(newCart)
    if (newCart.length === 0) {
      setCartMerchant(null)
    }
  }

  // Calculate total
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    if (!cartMerchant || cart.length === 0) return ""

    const items = cart.map((item) => `- ${item.name} x${item.quantity} = Rp${(item.price * item.quantity).toLocaleString("id-ID")}`).join("\n")

    const message = `*ORDER BARU*
Merchant: ${cartMerchant.name}
Customer: ${customerData.name}
Alamat: ${customerData.address}
No. HP: ${customerData.phone}

*DETAIL ORDER:*
${items}

*TOTAL: Rp${cartTotal.toLocaleString("id-ID")}*
Pembayaran: ${customerData.paymentMethod}
Waktu Order: ${new Date().toLocaleString("id-ID")}`

    return encodeURIComponent(message)
  }

  // Send to WhatsApp
  const sendToWhatsApp = () => {
    const message = generateWhatsAppMessage()
    const adminNumber = "6282273366718" // Ganti dengan nomor admin
    window.open(`https://wa.me/${adminNumber}?text=${message}`, "_blank")

    // Reset cart after order
    setCart([])
    setCartMerchant(null)
    setCustomerData({ name: "", phone: "", address: "", paymentMethod: "COD" })
    setCurrentPage("home")
  }

  // Merchants Page Component
  const MerchantsPage = () => (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Pilih Merchant</h1>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari merchant atau kategori..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMerchants.map((merchant) => (
            <div key={merchant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src={merchant.image} alt={merchant.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{merchant.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${merchant.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{merchant.isOpen ? "Buka" : "Tutup"}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{merchant.category}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{merchant.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{merchant.deliveryTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{merchant.address}</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedMerchant(merchant)
                    setCurrentPage("menu")
                  }}
                  disabled={!merchant.isOpen}
                  className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {merchant.isOpen ? "Lihat Menu" : "Sedang Tutup"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Menu Page Component
  const MenuPage = () => (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {selectedMerchant && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-start gap-4">
                <img src={selectedMerchant.image} alt={selectedMerchant.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{selectedMerchant.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{selectedMerchant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedMerchant.deliveryTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedMerchant.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedMerchant.products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-orange-600">Rp{product.price.toLocaleString("id-ID")}</span>
                      <button onClick={() => addToCart(product, selectedMerchant.id)} className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )

  // Cart Component
  const CartComponent = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Keranjang</h2>
          <button onClick={() => setShowCart(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Keranjang kosong</div>
        ) : (
          <>
            {cartMerchant && (
              <div className="p-4 bg-gray-50 border-b">
                <p className="text-sm text-gray-600">Dari:</p>
                <p className="font-semibold">{cartMerchant.name}</p>
              </div>
            )}

            <div className="p-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-orange-600 font-bold">Rp{item.price.toLocaleString("id-ID")}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center">
                        <Plus className="w-4 h-4" />
                      </button>
                      <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500 text-sm">
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}l

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-orange-600">Rp{cartTotal.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setCurrentPage("checkout")
                  setShowCart(false)
                }}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} cart={cart} setShowCart={setShowCart} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {currentPage === "home" && <LandingPage setCurrentPage={setCurrentPage} />}
      {currentPage === "merchants" && <MerchantsPage />}
      {currentPage === "menu" && <MenuPage />}
      {currentPage === "checkout" && <CheckoutPage cart={cart} cartTotal={cartTotal} customerData={customerData} setCustomerData={setCustomerData} sendToWhatsApp={sendToWhatsApp} />}

      {showCart && <CartComponent />}

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
