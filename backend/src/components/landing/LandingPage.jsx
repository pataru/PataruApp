import { Award, Shield, Truck } from "lucide-react"

const LandingPage = ({ setCurrentPage }) => (
  <div className="min-h-screen">
    {/* Hero Section */}
    <section className="bg-gradient-to-br from-orange-500 to-red-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Kurir Express</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Layanan kurir terpercaya dengan sistem pemesanan makanan online. Pesan makanan favorit Anda dan nikmati layanan antar yang cepat!</p>
        <button onClick={() => setCurrentPage("merchants")} className="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
          Mulai Pesan Sekarang
        </button>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Mengapa Pilih Kami?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Pengiriman Cepat</h3>
            <p className="text-gray-600">Makanan diantar dalam waktu 15-35 menit ke lokasi Anda</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Aman & Terpercaya</h3>
            <p className="text-gray-600">Makanan dikemas dengan aman dan kurir terpercaya</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Kualitas Terbaik</h3>
            <p className="text-gray-600">Bermitra dengan merchant pilihan dengan rating tinggi</p>
          </div>
        </div>
      </div>
    </section>

    {/* Coverage Area */}
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Area Layanan</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-600 mb-8">Kami melayani pengiriman di area Panyabungan, Siabu, dan Kotanopan</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Jam Operasional</h3>
              <p className="text-gray-600">Senin - Minggu: 08:00 - 22:00 WIB</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Biaya Pengiriman</h3>
              <p className="text-gray-600">Mulai dari Rp 5.000 (tergantung jarak)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

export default LandingPage
