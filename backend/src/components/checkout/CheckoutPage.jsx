import { MessageCircle } from "lucide-react"

const CheckoutPage = ({ cart, cartTotal, customerData, setCustomerData, sendToWhatsApp }) => (
  <div className="min-h-screen bg-grey-50 pt-8">
    <div className="container mx-auto px-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Detail Pesanan</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <span>
              {item.name} x{item.quantity}
            </span>
            <span className="font-semibold">Rp{(item.price * item.quantity).toLocaleString("id-ID")}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span className="text-orange-600">Rp{cartTotal.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Informasi Customer</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
            <input type="text" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" value={customerData.name} onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Nomor HP</label>
            <input
              type="tel"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={customerData.phone}
              onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Alamat Lengkap</label>
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows="3"
              value={customerData.address}
              onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Metode Pembayaran</label>
            <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" value={customerData.paymentMethod} onChange={(e) => setCustomerData({ ...customerData, paymentMethod: e.target.value })}>
              <option value="COD">Cash on Delivery (COD)</option>
              <option value="Transfer">Transfer Bank</option>
            </select>
          </div>
        </form>

        <button
          onClick={sendToWhatsApp}
          disabled={!customerData.name || !customerData.phone || !customerData.address}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Kirim Pesanan ke WhatsApp
        </button>
      </div>
    </div>
  </div>
)

export default CheckoutPage
