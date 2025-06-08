import { Phone } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Pataru</h3>
            <p className="text-gray-400 mb-4">Layanan kurir dan pemesanan makanan online terpercaya di Indonesia.</p>
            <div className="flex items-center gap-2 text-gray-400">
              <Phone className="w-4 h-4" />
              <span>+62 822-7336-6718</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Delivery Makanan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Kurir Express
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Daftar Merchant
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Kemitraan
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Bantuan</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cara Pesan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Area Layanan</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Panyabungan</li>
              <li>Siabu</li>
              <li>Kotanopan</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Pataru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
