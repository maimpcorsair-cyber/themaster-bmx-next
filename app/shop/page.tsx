'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { db, collection, getDocs, Product } from '@/lib/firebase';

// === DEFAULT PRODUCTS DATA ===
const defaultBikes = [
  { id: '1', name: 'Kink Carve 16"', brand: 'KINK', price: 7499, image: '/bikes_kink_carve_16.jpg', size: '16"', age: '5-7 ปี', rating: 5.0, reviews: 12, stock: 5 },
  { id: '2', name: 'Kink Kicker 18"', brand: 'KINK', price: 8999, image: '/bikes_kink_kicker_18.jpg', size: '18"', age: '7-10 ปี', rating: 5.0, reviews: 8, stock: 3 },
  { id: '3', name: 'Kink Curb 20"', brand: 'KINK', price: 10499, image: '/bikes_kink_curb_20.jpg', size: '20"', age: '10+ ปี', rating: 4.9, reviews: 24, stock: 7 },
  { id: '4', name: 'Kink Launch 20.25"', brand: 'KINK', price: 9499, image: '/bikes_kink_launch_2025.jpg', size: '20.25"', age: '12+ ปี', rating: 5.0, reviews: 15, stock: 4 },
  { id: '5', name: 'Kink Setup 20.5"', brand: 'KINK', price: 14500, image: '/bikes_kink_setup_205.jpg', size: '20.5"', age: '13+ ปี', rating: 5.0, reviews: 6, stock: 2 },
  { id: '6', name: 'Kink Setup XL 21"', brand: 'KINK', price: 16500, image: '/bikes_kink_setup_xl.jpg', size: '21"', age: '14+ ปี', rating: 4.8, reviews: 4, stock: 1 },
  { id: '7', name: 'Kink Downside 20.75"', brand: 'KINK', price: 26000, image: '/bikes_kink_downside.jpg', size: '20.75"', age: '14+ ปี', rating: 5.0, reviews: 2, badge: 'BEST', stock: 2 },
  { id: '8', name: 'Kink Switch 20.75"', brand: 'KINK', price: 22000, image: '/bikes_kink_switch.jpg', size: '20.75"', age: '14+ ปี', rating: 4.9, reviews: 3, stock: 3 },
  { id: '9', name: 'Kink Williams 20.75" Pro', brand: 'KINK', price: 30000, image: '/bikes_kink_williams.jpg', size: '20.75"', age: '14+ ปี', rating: 5.0, reviews: 18, badge: 'PRO', stock: 1 },
  { id: '10', name: 'WeThePeople CRS 20.25"', brand: 'WETHEPEOPLE', price: 12500, image: '/bikes_wtp_crs.jpg', size: '20.25"', age: '12+ ปี', rating: 5.0, reviews: 9, stock: 4 },
  { id: '11', name: 'WeThePeople Battleship 20.75"', brand: 'WETHEPEOPLE', price: 22000, image: '/bikes_wtp_battleship.jpg', size: '20.75"', age: '14+ ปี', rating: 4.7, reviews: 5, stock: 2 },
];

const defaultSafetyGear = [
  { id: '101', name: 'Pro-Tec Street Helmet', brand: 'PRO-TEC', price: 2500, image: '/gear_helmet_protec.jpg', category: 'helmets', rating: 4.9, reviews: 32, stock: 10 },
  { id: '102', name: 'Pro-Tec Bass Boat Helmet', brand: 'PRO-TEC', price: 2800, image: '/gear_helmet_bass.jpg', category: 'helmets', rating: 5.0, reviews: 18, stock: 8 },
  { id: '103', name: 'Pro-Tec Sport Helmet', brand: 'PRO-TEC', price: 2200, image: '/gear_helmet_sport.jpg', category: 'helmets', rating: 4.8, reviews: 24, stock: 12 },
  { id: '104', name: 'Triple 8 Certified Helmet', brand: 'TRIPLE 8', price: 3200, image: '/gear_helmet_t8.jpg', category: 'helmets', rating: 4.9, reviews: 15, stock: 6 },
  { id: '105', name: 'Pro-Tec Gloves', brand: 'PRO-TEC', price: 450, image: '/gear_gloves_protec.jpg', category: 'gloves', rating: 4.7, reviews: 45, stock: 25 },
  { id: '106', name: 'FUSE Wrist Glove', brand: 'FUSE', price: 550, image: '/gear_gloves_fuse.jpg', category: 'gloves', rating: 4.8, reviews: 28, stock: 20 },
  { id: '107', name: 'BDC Gloves', brand: 'BDC', price: 380, image: '/gear_gloves_bdc.jpg', category: 'gloves', rating: 4.6, reviews: 52, stock: 30 },
  { id: '108', name: 'FUSE Echo 100 Knee/Shin Pad', brand: 'FUSE', price: 1800, image: '/gear_knee_fuse_echo.jpg', category: 'knee-pads', rating: 5.0, reviews: 22, badge: 'BEST', stock: 8 },
  { id: '109', name: 'FUSE Delta 125 Knee/Shin/Ankle', brand: 'FUSE', price: 2200, image: '/gear_knee_fuse_delta.jpg', category: 'knee-pads', rating: 4.9, reviews: 14, stock: 5 },
  { id: '110', name: 'Shadow Super Slim V2 Knee Pads', brand: 'SHADOW', price: 1500, image: '/gear_knee_shadow.jpg', category: 'knee-pads', rating: 4.8, reviews: 19, stock: 10 },
  { id: '111', name: 'Stay Strong Combat Knee/Shin', brand: 'STAY STRONG', price: 1950, image: '/gear_knee_staystrong.jpg', category: 'knee-pads', rating: 4.9, reviews: 8, stock: 4 },
  { id: '112', name: 'Pro-Tec Elbow Pad', brand: 'PRO-TEC', price: 800, image: '/gear_elbow_protec.jpg', category: 'elbow-pads', rating: 4.7, reviews: 33, stock: 15 },
  { id: '113', name: 'FUSE Lomi Elbow Pads', brand: 'FUSE', price: 950, image: '/gear_elbow_fuse.jpg', category: 'elbow-pads', rating: 4.8, reviews: 21, stock: 12 },
  { id: '114', name: 'Stay Strong Shin Guards', brand: 'STAY STRONG', price: 1200, image: '/gear_shin_staystrong.jpg', category: 'shin-guards', rating: 4.9, reviews: 12, stock: 6 },
  { id: '115', name: 'Pro-Tec Body Armor', brand: 'PRO-TEC', price: 3500, image: '/gear_body_protec.jpg', category: 'body-armor', rating: 5.0, reviews: 9, stock: 3 },
  { id: '116', name: 'Leatt Neck Brace', brand: 'LEATT', price: 5500, image: '/gear_neck_leatt.jpg', category: 'neck-brace', rating: 5.0, reviews: 6, stock: 2 },
];

// === REVIEWS ===
const reviews = [
  { id: 1, name: 'คุณแม่น้องไนซ์', location: 'กรุงเทพฯ', textTh: 'ลูกชอบมากค่ะ โค้ชใจดีสอนเข้าใจง่าย เด็กๆ มีความสุขมาก', textEn: 'My son loves it! Coach is kind and patient. Kids are very happy.', rating: 5, program: 'Little Rider', avatar: 'N' },
  { id: 2, name: 'คุณพ่อน้องมาร์ค', location: 'พัทยา', textTh: 'ลูกเริ่มแข่งได้แล้ว ภูมิใจมากที่ได้ส่งมาเรียนที่นี่', textEn: "My child can compete now. So proud to have enrolled here.", rating: 5, program: 'Competitor', avatar: 'M' },
  { id: 3, name: 'คุณแม่น้องเจน', location: 'รัชดา', textTh: 'สนามฝึกสอนดีมาก ปลอดภัย พี่เบียร์สอนเก่งมาก', textEn: 'Great training ground. Safe environment. Coach Beer teaches very well.', rating: 5, program: 'Junior Rider', avatar: 'J' },
  { id: 4, name: 'นายธนกฤต', location: 'บางแค', textTh: 'อายุ 15 ปีเริ่มใหม่ สอนจากศูนย์จนแข่งได้ ประทับใจมาก', textEn: 'Started at 15, from zero to competing. Very impressed.', rating: 5, program: 'Competitor', avatar: 'T' },
];

const categories = [
  { key: 'all', labelTh: 'ทั้งหมด', labelEn: 'All' },
  { key: 'helmets', labelTh: 'หมวก', labelEn: 'Helmets' },
  { key: 'gloves', labelTh: 'ถุงมือ', labelEn: 'Gloves' },
  { key: 'knee-pads', labelTh: 'เสื่อรองเข่า', labelEn: 'Knee Pads' },
  { key: 'elbow-pads', labelTh: 'เสื่อรองข้อศอก', labelEn: 'Elbow Pads' },
  { key: 'shin-guards', labelTh: 'เสื่อรองน่อง', labelEn: 'Shin Guards' },
  { key: 'body-armor', labelTh: 'เกราะป้องกัน', labelEn: 'Body Armor' },
  { key: 'neck-brace', labelTh: 'ปกคอ', labelEn: 'Neck Brace' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? "text-black text-sm" : "text-gray-600 text-sm"}>★</span>
      ))}
    </div>
  );
}

export default function ShopPage() {
  const { t, lang } = useLanguage();
  const [products, setProducts] = useState<any[]>(defaultBikes);
  const [safetyGear, setSafetyGear] = useState<any[]>(defaultSafetyGear);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        if (!snapshot.empty) {
          const firebaseProducts = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          
          // Separate bikes and safety gear
          const bikes = firebaseProducts.filter((p: any) => !p.category || p.category === 'bike');
          const gear = firebaseProducts.filter((p: any) => p.category && p.category !== 'bike');
          
          if (bikes.length > 0) setProducts(bikes);
          if (gear.length > 0) setSafetyGear(gear);
        }
      } catch (error) {
        console.log('Using default products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchProducts, 30000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setCart(prev => {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      });
    } else {
      setCart(prev => ({ ...prev, [id]: qty }));
    }
  };

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = [...products, ...safetyGear].find(p => p.id === id);
    return sum + (product?.price || 0) * qty;
  }, 0);

  const discountedTotal = discount > 0 ? cartTotal * (1 - discount / 100) : cartTotal;

  const validatePromo = () => {
    const codes: { [key: string]: number } = { NEWRIDER: 10, SIBLING: 15, RUSTFEST: 20 };
    if (codes[promoCode.toUpperCase()]) {
      setDiscount(codes[promoCode.toUpperCase()]);
    } else {
      alert(lang === 'th' ? 'รหัสโปรโมชั่นไม่ถูกต้อง' : 'Invalid promo code');
    }
  };

  const allProducts = selectedCategory === 'all' 
    ? [...products, ...safetyGear]
    : safetyGear.filter(p => p.category === selectedCategory);

  const getStockDisplay = (stock: number) => {
    if (stock === 0) return { text: lang === 'th' ? 'สินค้าหมด' : 'Out of Stock', color: 'text-red-500', bg: 'bg-red-100' };
    if (stock <= 2) return { text: lang === 'th' ? 'เหลือ ' + stock : 'Only ' + stock + ' left', color: 'text-orange-500', bg: 'bg-orange-100' };
    return { text: lang === 'th' ? 'มีสินค้า' : 'In Stock', color: 'text-green-500', bg: 'bg-green-100' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-500">กำลังโหลดสินค้า...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* ... Banner ... */}
      <section className="bg-red-600 py-3 px-4 text-center">
        <p className="text-sm font-bold uppercase tracking-wider">
          🎉 {lang === 'th' ? 'ลดสูงสุด 20% กับโค้ด RUSTFEST!' : 'Up to 20% off with code RUSTFEST!'}
        </p>
      </section>

      {/* Hero */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            {lang === 'th' ? 'ร้านค้า' : 'Shop'}
          </h1>
          <p className="text-gray-500 text-lg">
            {lang === 'th' 
              ? 'จักรยาน BMX และอุปกรณ์คุณภาพจากโค้ชทีมชาติ' 
              : 'Quality BMX bikes and equipment from national team coaches'}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 px-6 bg-gray-900 border-b border-gray-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat.key
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {lang === 'th' ? cat.labelTh : cat.labelEn}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {allProducts.map((product) => {
              const stockInfo = getStockDisplay(product.stock || 0);
              return (
                <div key={product.id} className="bg-white text-black rounded-xl overflow-hidden group hover:shadow-xl transition-all">
                  <div className="relative aspect-square bg-gray-100">
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {product.badge && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {product.badge}
                      </span>
                    )}
                    {product.stock <= 2 && product.stock > 0 && (
                      <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                        เหลือ {product.stock}
                      </span>
                    )}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-600 text-white font-black text-lg px-4 py-2 rounded">
                          สินค้าหมด
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{product.brand}</p>
                    <h3 className="font-bold text-sm mt-1 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <StarRating rating={product.rating || 5} />
                      <span className="text-xs text-gray-500">({product.reviews || 0})</span>
                    </div>
                    <p className="text-lg font-black mt-2">฿{product.price.toLocaleString()}</p>
                    <div className={`inline-block ${stockInfo.bg} ${stockInfo.color} text-xs font-bold px-2 py-1 rounded mt-2`}>
                      {stockInfo.text}
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={product.stock === 0}
                      className={`w-full mt-3 py-2 rounded font-bold text-sm transition-colors ${
                        product.stock === 0
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-black text-white hover:bg-gray-800'
                      }`}
                    >
                      {product.stock === 0 ? 'สินค้าหมด' : lang === 'th' ? 'เพิ่มลงตะกร้า' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-8">
            {lang === 'th' ? 'รีวิวจากลูกค้า' : 'Customer Reviews'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-black border border-gray-800 p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-xl">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-bold">{review.name}</p>
                    <p className="text-gray-500 text-sm">{review.location}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
                <p className="text-gray-300 text-sm mt-3">{lang === 'th' ? review.textTh : review.textEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Slide-out */}
      {showCart && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCart(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white text-black shadow-2xl">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black uppercase">
                  {lang === 'th' ? 'ตะกร้า' : 'Cart'}
                </h2>
                <button onClick={() => setShowCart(false)} className="text-2xl">✕</button>
              </div>
              
              {Object.keys(cart).length === 0 ? (
                <p className="text-gray-500 text-center py-8">ตะกร้าว่าง</p>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto space-y-4">
                    {Object.entries(cart).map(([id, qty]) => {
                      const product = [...products, ...safetyGear].find(p => p.id === id);
                      if (!product) return null;
                      return (
                        <div key={id} className="flex gap-4 border-b pb-4">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-sm">{product.name}</p>
                            <p className="text-lg font-black">฿{product.price.toLocaleString()}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button onClick={() => updateQty(id, qty - 1)} className="w-8 h-8 bg-gray-200 rounded font-bold">-</button>
                              <span className="font-bold">{qty}</span>
                              <button onClick={() => updateQty(id, qty + 1)} className="w-8 h-8 bg-gray-200 rounded font-bold">+</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Promo */}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        placeholder="ใส่รหัสโปรโมชั่น"
                        className="flex-1 border rounded-lg px-4 py-2"
                      />
                      <button onClick={validatePromo} className="bg-black text-white px-4 py-2 rounded-lg font-bold">ใช้</button>
                    </div>
                    {discount > 0 && <p className="text-green-600 font-bold mt-2">ลด {discount}%</p>}
                  </div>

                  <div className="border-t pt-4 mt-4">
                    {discount > 0 && (
                      <p className="text-gray-500 line-through">฿{cartTotal.toLocaleString()}</p>
                    )}
                    <p className="text-2xl font-black">฿{discountedTotal.toLocaleString()}</p>
                    <button
                      onClick={() => { setShowCart(false); setShowCheckout(true); }}
                      className="w-full bg-red-600 text-white py-4 rounded-xl font-bold mt-4"
                    >
                      {lang === 'th' ? 'สั่งซื้อ' : 'Checkout'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCheckout(false)} />
          <div className="relative bg-white text-black rounded-2xl w-full max-w-lg p-8">
            <button onClick={() => setShowCheckout(false)} className="absolute top-4 right-4 text-2xl">✕</button>
            <h2 className="text-2xl font-black uppercase mb-6">{lang === 'th' ? 'ยืนยันการสั่งซื้อ' : 'Confirm Order'}</h2>
            
            <div className="space-y-4 mb-6">
              <p className="text-lg"><strong>รวม:</strong> ฿{discountedTotal.toLocaleString()}</p>
              {discount > 0 && <p className="text-green-600">โปรโมชั่น {discount}% ลดแล้ว!</p>}
            </div>

            <a 
              href={`https://line.me/R/ti/p/@rushfest?text=${encodeURIComponent('สั่งซื้อสินค้า\nรวม ฿' + discountedTotal.toLocaleString())}`}
              target="_blank"
              className="block w-full bg-green-600 text-white text-center py-4 rounded-xl font-bold text-lg"
            >
              📱 เพิ่ม LINE @rushfest
            </a>
            
            <p className="text-gray-500 text-sm text-center mt-4">
              {lang === 'th' 
                ? 'เพิ่ม LINE เพื่อยืนยันการสั่งซื้อและชำระเงิน' 
                : 'Add LINE to confirm order and payment'}
            </p>
          </div>
        </div>
      )}

      {/* Floating Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-2xl z-40 flex items-center gap-2"
      >
        <span className="text-2xl">🛒</span>
        {Object.keys(cart).length > 0 && (
          <span className="bg-white text-black font-black text-sm w-6 h-6 rounded-full flex items-center justify-center">
            {Object.keys(cart).length}
          </span>
        )}
      </button>
    </div>
  );
}
