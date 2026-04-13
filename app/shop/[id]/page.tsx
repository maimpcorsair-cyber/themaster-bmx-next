'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

// Product data (same as shop page)
const completeBikes = [
  { id: 1, name: 'Kink Carve 16"', brand: 'KINK', price: 7499, image: '/bikes_kink_carve_16.jpg', size: '16"', age: '5-7 ปี', rating: 5.0, reviews: 12, 
    descTh: 'จักรยานสำหรับเด็กเริ่มต้น ขนาด 16 นิ้ว เหมาะสำหรับอายุ 5-7 ปี มาพร้อมล้อและยางคุณภาพสูง ขอบเฟรมทำจากอลูมิเนียมทนทาน',
    descEn: 'Perfect starter bike for kids. 16 inch size, suitable for ages 5-7 years. Comes with high-quality wheels and tires. Aluminum frame for durability.',
    specs: { frame: 'Aluminum', wheel: '16"', weight: '10kg', brake: 'Caliper' },
    images: ['/bikes_kink_carve_16.jpg'] },
  { id: 2, name: 'Kink Kicker 18"', brand: 'KINK', price: 8999, image: '/bikes_kink_kicker_18.jpg', size: '18"', age: '7-10 ปี', rating: 5.0, reviews: 8,
    descTh: 'จักรยานขนาด 18 นิ้ว สำหรับเด็กโต มาพร้อมชุดเกียร์และเบรกคุณภาพ เหมาะสำหรับการฝึกฝนทักษะขั้นกลาง',
    descEn: '18 inch bike for older kids. Comes with quality gear and brake set. Perfect for intermediate skill training.',
    specs: { frame: 'Chromoly', wheel: '18"', weight: '12kg', brake: 'U-Brake' },
    images: ['/bikes_kink_kicker_18.jpg'] },
  { id: 3, name: 'Kink Curb 20"', brand: 'KINK', price: 10499, image: '/bikes_kink_curb_20.jpg', size: '20"', age: '10+ ปี', rating: 4.9, reviews: 24,
    descTh: 'จักรยาน BMX ยอดนิยม ขนาด 20 นิ้ว เหมาะสำหรับทั้งเริ่มต้นและขั้นกลาง มาพร้อมล้อชุดใหญ่และเบรกดิสก์',
    descEn: 'Most popular BMX bike. 20 inch size, perfect for beginners and intermediate riders. Comes with large wheels and disc brake.',
    specs: { frame: 'Chromoly', wheel: '20"', weight: '13kg', brake: 'Disc' },
    images: ['/bikes_kink_curb_20.jpg'] },
  { id: 4, name: 'Kink Launch 20.25"', brand: 'KINK', price: 9499, image: '/bikes_kink_launch_2025.jpg', size: '20.25"', age: '12+ ปี', rating: 5.0, reviews: 15,
    descTh: 'จักรยานสำหรับเรียนรู้ท่ากระโดด ด้วยขนาด 20.25 นิ้วที่เหมาะสม มาพร้อมชุดไฮเปอร์และเบรกคู่',
    descEn: 'Bike designed for learning tricks with perfect 20.25 inch size. Comes with gyro and double brake setup.',
    specs: { frame: 'Chromoly', wheel: '20.25"', weight: '12.5kg', brake: 'Gyro' },
    images: ['/bikes_kink_launch_2025.jpg'] },
  { id: 5, name: 'Kink Setup 20.5"', brand: 'KINK', price: 14500, image: '/bikes_kink_setup_205.jpg', size: '20.5"', age: '13+ ปี', rating: 5.0, reviews: 6,
    descTh: 'จักรยานคุณภาพสูงสำหรับนักแข่ง ขนาด 20.5 นิ้ว มาพร้อมอะไหล่คุณภาพและชุดเบรกอัลลอย',
    descEn: 'High-quality bike for competitive riders. 20.5 inch size. Comes with quality parts and alloy brake.',
    specs: { frame: 'Full Chromoly', wheel: '20.5"', weight: '11.8kg', brake: 'Alloy U-Brake' },
    images: ['/bikes_kink_setup_205.jpg'] },
  { id: 6, name: 'Kink Setup XL 21"', brand: 'KINK', price: 16500, image: '/bikes_kink_setup_xl.jpg', size: '21"', age: '14+ ปี', rating: 4.8, reviews: 4,
    descTh: 'จักรยานสำหรับผู้ใหญ่หรือวัยรุ่นที่ต้องการขนาดใหญ่กว่า มาพร้อมชุดอะไหล่ครบและคุณภาพสูง',
    descEn: 'Bike for adults or teens who need a larger size. Comes with complete quality parts kit.',
    specs: { frame: 'Full Chromoly', wheel: '21"', weight: '12kg', brake: 'Alloy U-Brake' },
    images: ['/bikes_kink_setup_xl.jpg'] },
  { id: 7, name: 'Kink Downside 20.75"', brand: 'KINK', price: 26000, image: '/bikes_kink_downside.jpg', size: '20.75"', age: '14+ ปี', rating: 5.0, reviews: 2, badge: 'BEST',
    descTh: 'จักรยานระดับโปร ออกแบบสำหรับการแข่งขันและท่ายาก มาพร้อมเทคโนโลยีล้ำสมัยและอะไหล่ชั้นนำ',
    descEn: 'Professional level bike designed for competition and advanced tricks. Comes with cutting-edge technology and top-tier parts.',
    specs: { frame: 'Full Chromoly', wheel: '20.75"', weight: '10.5kg', brake: 'Integrated' },
    images: ['/bikes_kink_downside.jpg'] },
  { id: 8, name: 'Kink Switch 20.75"', brand: 'KINK', price: 22000, image: '/bikes_kink_switch.jpg', size: '20.75"', age: '14+ ปี', rating: 4.9, reviews: 3,
    descTh: 'จักรยานที่ออกแบบมาสำหรับการเล่นฟรีสไตล์ ด้วยความสมดุลและการควบคุมที่ดีเยี่ยม',
    descEn: 'Bike designed for street/freestyle riding with excellent balance and control.',
    specs: { frame: 'Full Chromoly', wheel: '20.75"', weight: '11kg', brake: 'Gyro' },
    images: ['/bikes_kink_switch.jpg'] },
  { id: 9, name: 'Kink Williams 20.75" Pro', brand: 'KINK', price: 30000, image: '/bikes_kink_williams.jpg', size: '20.75"', age: '14+ ปี', rating: 5.0, reviews: 18, badge: 'PRO',
    descTh: 'จักรยานระดับพรีเมียม ออกแบบร่วมกับนักกีฬามืออาชีพ มาพร้อมอะไหล่ที่ดีที่สุดในตลาด',
    descEn: 'Premium bike designed with professional athletes. Comes with the best parts on the market.',
    specs: { frame: 'Full Chromoly', wheel: '20.75"', weight: '9.8kg', brake: 'Mid BB' },
    images: ['/bikes_kink_williams.jpg'] },
  { id: 10, name: 'WeThePeople CRS 20.25"', brand: 'WETHEPEOPLE', price: 12500, image: '/bikes_wtp_crs.jpg', size: '20.25"', age: '12+ ปี', rating: 5.0, reviews: 9,
    descTh: 'จักรยานจากแบรนด์ชื่อดัง WeThePeople มาพร้อมคุณภาพระดับยุโรปและการออกแบบที่แข็งแกร่ง',
    descEn: 'Bike from famous brand WeThePeople with European quality and robust design.',
    specs: { frame: 'Chromoly', wheel: '20.25"', weight: '11.5kg', brake: 'U-Brake' },
    images: ['/bikes_wtp_crs.jpg'] },
  { id: 11, name: 'WeThePeople Battleship 20.75"', brand: 'WETHEPEOPLE', price: 22000, image: '/bikes_wtp_battleship.jpg', size: '20.75"', age: '14+ ปี', rating: 4.7, reviews: 5,
    descTh: 'จักรยานระดับสูงจาก WeThePeople เหมาะสำหรับการแข่งขันและฝึกฝนขั้นสูง',
    descEn: 'High-end bike from WeThePeople. Perfect for competition and advanced training.',
    specs: { frame: 'Full Chromoly', wheel: '20.75"', weight: '10.2kg', brake: 'Gyro' },
    images: ['/bikes_wtp_battleship.jpg'] },
];

const safetyGear = [
  { id: 101, name: 'Pro-Tec Street Helmet', brand: 'PRO-TEC', price: 2500, image: '/gear_helmet_protec.jpg', category: 'helmets', rating: 4.9, reviews: 32,
    descTh: 'หมวกกันเจาะคุณภาพสูง ออกแบบสำหรับการขี่ในเมือง มาพร้อมระบบระบายอากาศและฟองน้ำที่สบาย',
    descEn: 'High-quality impact-resistant helmet designed for street riding. Comes with ventilation system and comfortable foam.',
    specs: { size: 'S/M/L/XL', weight: '350g', material: 'ABS' },
    images: ['/gear_helmet_protec.jpg'] },
  { id: 102, name: 'Pro-Tec Bass Boat Helmet', brand: 'PRO-TEC', price: 2800, image: '/gear_helmet_bass.jpg', category: 'helmets', rating: 5.0, reviews: 18,
    descTh: 'หมวกสไตล์คลาสสิค ดีไซน์เรียบง่ายแต่ปกป้องได้ดีเยี่ยม เหมาะสำหรับทุกระดับ',
    descEn: 'Classic style helmet with simple design but excellent protection. Suitable for all levels.',
    specs: { size: 'S/M/L/XL', weight: '400g', material: 'ABS' },
    images: ['/gear_helmet_bass.jpg'] },
  { id: 103, name: 'Pro-Tec Sport Helmet', brand: 'PRO-TEC', price: 2200, image: '/gear_helmet_sport.jpg', category: 'helmets', rating: 4.8, reviews: 24,
    descTh: 'หมวกสปอร์ต ออกแบบเพื่อความเบาและการระบายอากาศที่ดี',
    descEn: 'Sport helmet designed for lightweight and excellent ventilation.',
    specs: { size: 'S/M/L/XL', weight: '280g', material: 'Polycarbonate' },
    images: ['/gear_helmet_sport.jpg'] },
  { id: 104, name: 'Triple 8 Certified Helmet', brand: 'TRIPLE 8', price: 3200, image: '/gear_helmet_t8.jpg', category: 'helmets', rating: 4.9, reviews: 15,
    descTh: 'หมวกที่ผ่านมาตรฐานความปลอดภัยระดับสากล เหมาะสำหรับการแข่งขัน',
    descEn: 'Helmet certified to international safety standards. Perfect for competition.',
    specs: { size: 'S/M/L/XL', weight: '320g', material: 'ABS + EPS' },
    images: ['/gear_helmet_t8.jpg'] },
  { id: 105, name: 'Pro-Tec Gloves', brand: 'PRO-TEC', price: 450, image: '/gear_gloves_protec.jpg', category: 'gloves', rating: 4.7, reviews: 45,
    descTh: 'ถุงมือปกป้องฝ่ามือและข้อมือ มาพร้อมฟองน้ำดูดซับแรงกระแทก',
    descEn: 'Gloves that protect palms and wrists with shock-absorbing foam.',
    specs: { size: 'S/M/L/XL', material: 'Amara' },
    images: ['/gear_gloves_protec.jpg'] },
  { id: 106, name: 'FUSE Wrist Glove', brand: 'FUSE', price: 550, image: '/gear_gloves_fuse.jpg', category: 'gloves', rating: 4.8, reviews: 28,
    descTh: 'ถุงมือพร้อมปกป้องข้อมือเพิ่มเติม ออกแบบสำหรับนักกีฬา',
    descEn: 'Gloves with extra wrist protection. Designed for athletes.',
    specs: { size: 'S/M/L/XL', material: 'Amara + TPU' },
    images: ['/gear_gloves_fuse.jpg'] },
  { id: 107, name: 'BDC Gloves', brand: 'BDC', price: 380, image: '/gear_gloves_bdc.jpg', category: 'gloves', rating: 4.6, reviews: 52,
    descTh: 'ถุงมือราคาคุ้มค่า คุณภาพดี เหมาะสำหรับผู้เริ่มต้น',
    descEn: 'Best value gloves with good quality. Perfect for beginners.',
    specs: { size: 'S/M/L/XL', material: 'Synthetic' },
    images: ['/gear_gloves_bdc.jpg'] },
  { id: 108, name: 'FUSE Echo 100 Knee/Shin Pad', brand: 'FUSE', price: 1800, image: '/gear_knee_fuse_echo.jpg', category: 'knee-pads', rating: 5.0, reviews: 22, badge: 'BEST',
    descTh: 'เสื่อรองเข่าและน่องคุณภาพสูง ด้วยเทคโนโลยี SAS-TEC ปกป้องได้ดีเยี่ยม',
    descEn: 'High-quality knee and shin pad with SAS-TEC technology for excellent protection.',
    specs: { size: 'S/M/L/XL', weight: '715g', material: 'Neoprene + Cordura' },
    images: ['/gear_knee_fuse_echo.jpg'] },
  { id: 109, name: 'FUSE Delta 125 Knee/Shin/Ankle', brand: 'FUSE', price: 2200, image: '/gear_knee_fuse_delta.jpg', category: 'knee-pads', rating: 4.9, reviews: 14,
    descTh: 'เสื่อรองครบชุด เข่า น่อง และข้อเท้า สำหรับการปกป้องสูงสุด',
    descEn: 'Complete pad set for knee, shin, and ankle. For maximum protection.',
    specs: { size: 'S/M/L/XL', weight: '850g', material: 'Duratex + Air Plush' },
    images: ['/gear_knee_fuse_delta.jpg'] },
  { id: 110, name: 'Shadow Super Slim V2 Knee Pads', brand: 'SHADOW', price: 1500, image: '/gear_knee_shadow.jpg', category: 'knee-pads', rating: 4.8, reviews: 19,
    descTh: 'เสื่อรองเข่าบางเฉียบ พกพาสะดวก สวมใส่สบายใต้กางเกง',
    descEn: 'Ultra-slim knee pads. Easy to carry and comfortable to wear under pants.',
    specs: { size: 'S/M/L/XL', weight: '250g', material: 'EVA' },
    images: ['/gear_knee_shadow.jpg'] },
  { id: 111, name: 'Stay Strong Combat Knee/Shin', brand: 'STAY STRONG', price: 1950, image: '/gear_knee_staystrong.jpg', category: 'knee-pads', rating: 4.9, reviews: 8,
    descTh: 'เสื่อรองทหาร ออกแบบมาเพื่อความทนทานและการปกป้องสูงสุด',
    descEn: 'Military-grade pads designed for maximum durability and protection.',
    specs: { size: 'S/M/L/XL', weight: '600g', material: 'E3T Foam + Lycra' },
    images: ['/gear_knee_staystrong.jpg'] },
  { id: 112, name: 'Pro-Tec Elbow Pad', brand: 'PRO-TEC', price: 800, image: '/gear_elbow_protec.jpg', category: 'elbow-pads', rating: 4.7, reviews: 33,
    descTh: 'เสื่อรองข้อศอก ปกป้องได้ดี สวมใส่สบาย',
    descEn: 'Elbow pads with excellent protection and comfortable wear.',
    specs: { size: 'S/M/L/XL', material: 'EVA + Polyester' },
    images: ['/gear_elbow_protec.jpg'] },
  { id: 113, name: 'FUSE Lomi Elbow Pads', brand: 'FUSE', price: 950, image: '/gear_elbow_fuse.jpg', category: 'elbow-pads', rating: 4.8, reviews: 21,
    descTh: 'เสื่อรองข้อศอกระดับพรีเมียม ด้วยวัสดุคุณภาพสูง',
    descEn: 'Premium elbow pads with high-quality materials.',
    specs: { size: 'S/M/L/XL', material: 'Memory Foam + Lycra' },
    images: ['/gear_elbow_fuse.jpg'] },
  { id: 114, name: 'Stay Strong Shin Guards', brand: 'STAY STRONG', price: 1200, image: '/gear_shin_staystrong.jpg', category: 'shin-guards', rating: 4.9, reviews: 12,
    descTh: 'เสื่อรองน่อง ออกแบบพิเศษเพื่อการปกป้องที่สมบูรณ์',
    descEn: 'Shin guards specially designed for complete protection.',
    specs: { size: 'S/M/L/XL', material: 'E3T Foam + Neoprene' },
    images: ['/gear_shin_staystrong.jpg'] },
  { id: 115, name: 'Pro-Tec Body Armor', brand: 'PRO-TEC', price: 3500, image: '/gear_body_protec.jpg', category: 'body-armor', rating: 5.0, reviews: 9,
    descTh: 'เกราะป้องกันลำตัว ปกป้องหลัง อก และไหล่',
    descEn: 'Body armor protecting back, chest, and shoulders.',
    specs: { size: 'S/M/L/XL', weight: '1.2kg', material: 'EVA + Mesh' },
    images: ['/gear_body_protec.jpg'] },
  { id: 116, name: 'Leatt Neck Brace', brand: 'LEATT', price: 5500, image: '/gear_neck_leatt.jpg', category: 'neck-brace', rating: 5.0, reviews: 6,
    descTh: 'ปกคอมาตรฐานระดับโลก ผ่านการทดสอบในการแข่งขันมอเตอร์สปอร์ต',
    descEn: 'World-standard neck brace tested in motorsport competition.',
    specs: { size: 'S/M/L/XL', weight: '800g', material: 'Carbon Fiber' },
    images: ['/gear_neck_leatt.jpg'] },
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

// YouTube Video IDs for bikes
const bikeVideos: { [key: number]: string } = {
  1: 'nLcI8ujQLrk',
  2: 'nLcI8ujQLrk',
  3: 'nLcI8ujQLrk',
  4: 'cE1GHN3KfF4',
  5: 'uB7A448P_Ko',
  6: 'uB7A448P_Ko',
  7: 'cE1GHN3KfF4',
  8: 'PBk95zNvtW0',
  9: 'uB7A448P_Ko',
  10: 'nLcI8ujQLrk',
  11: 'cE1GHN3KfF4',
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { t, lang } = useLanguage();
  const [qty, setQty] = useState(1);
  
  const productId = parseInt(params.id);
  const allProducts = [...completeBikes, ...safetyGear];
  const product = allProducts.find(p => p.id === productId);
  
  if (!product) {
    notFound();
  }

  const isBike = productId < 100;
  const isGear = productId >= 100;

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Breadcrumb */}
      <section className="py-4 px-6 bg-gray-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-white">{lang === 'th' ? 'หน้าแรก' : 'Home'}</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white">{lang === 'th' ? 'ร้านค้า' : 'Shop'}</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="relative aspect-square bg-gray-900 border border-gray-800 overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-white text-black text-sm font-bold px-3 py-1 uppercase">
                    {product.badge}
                  </span>
                )}
              </div>
              
              {/* Thumbnail Row */}
              <div className="flex gap-2 mt-4">
                {(product as any).images?.map((img: string, i: number) => (
                  <div key={i} className="w-20 h-20 border border-gray-800 bg-gray-900">
                    <Image src={img} alt="" width={80} height={80} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <StarRating rating={product.rating} />
                <span className="text-gray-500 text-sm">{product.rating} ({product.reviews} {lang === 'th' ? 'รีวิว' : 'reviews'})</span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl font-black">฿{product.price.toLocaleString()}</span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-gray-400 leading-relaxed">
                  {lang === 'th' ? (product as any).descTh : (product as any).descEn}
                </p>
              </div>

              {/* Specs */}
              {(product as any).specs && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
                    {lang === 'th' ? 'สเปค' : 'Specifications'}
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries((product as any).specs).map((item: [string, unknown]) => {
                      const [key, value] = item;
                      return (
                        <div key={key} className="flex justify-between bg-gray-900 p-3">
                          <span className="text-gray-500 text-sm uppercase">{key}</span>
                          <span className="font-bold text-sm">{value?.toString() ?? ''}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size for bikes */}
              {isBike && (product as any).size && (
                <div className="mb-8">
                  <p className="text-sm font-bold uppercase mb-2">{lang === 'th' ? 'ขนาด' : 'Size'}: {(product as any).size}</p>
                  <p className="text-sm text-gray-500">{lang === 'th' ? 'อายุ' : 'Age'}: {(product as any).age}</p>
                </div>
              )}

              {/* YouTube Video */}
              {isBike && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
                    {lang === 'th' ? 'วิดีโอสินค้า' : 'Product Video'}
                  </h3>
                  <div className="aspect-video bg-gray-900 overflow-hidden">
                    <iframe 
                      src={`https://www.youtube.com/embed/${bikeVideos[productId] || 'nLcI8ujQLrk'}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-2 text-center">
                    {lang === 'th' ? 'ดูรีวิวจาก YouTube' : 'Watch review on YouTube'}
                  </p>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-sm font-bold uppercase mb-2">{lang === 'th' ? 'จำนวน' : 'Quantity'}</p>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 bg-gray-800 text-white font-bold text-xl hover:bg-gray-700"
                  >-</button>
                  <span className="w-12 text-center text-xl font-bold">{qty}</span>
                  <button 
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-10 bg-gray-800 text-white font-bold text-xl hover:bg-gray-700"
                  >+</button>
                </div>
              </div>

              {/* Total */}
              <div className="mb-8">
                <div className="flex justify-between items-center border-t border-b border-gray-800 py-4">
                  <span className="text-lg font-bold uppercase">{lang === 'th' ? 'รวม' : 'Total'}</span>
                  <span className="text-2xl font-black">฿{(product.price * qty).toLocaleString()}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://line.me/R/ti/p/@rushfest" 
                  target="_blank"
                  className="flex-1 bg-green-600 text-white font-bold py-4 text-center hover:bg-green-700 transition-colors uppercase tracking-widest"
                >
                  {lang === 'th' ? 'สั่งซื้อผ่าน LINE' : 'Order via LINE'}
                </a>
                <button className="flex-1 bg-white text-black font-bold py-4 hover:bg-gray-200 transition-colors uppercase tracking-widest">
                  {lang === 'th' ? 'เพิ่มลงตะกร้า' : 'Add to Cart'}
                </button>
              </div>

              {/* Stock Status */}
              <div className="mt-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-green-500 text-sm font-bold uppercase">{lang === 'th' ? 'พร้อมส่ง' : 'In Stock'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 px-6 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-black uppercase tracking-tight mb-6">
            {lang === 'th' ? 'สินค้าที่เกี่ยวข้อง' : 'Related Products'}
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {allProducts
              .filter(p => p.id !== productId && (isBike ? p.id < 100 : p.id >= 100))
              .slice(0, 4)
              .map((p) => (
                <Link key={p.id} href={`/shop/${p.id}`} className="bg-black border border-gray-800 hover:border-white transition-all">
                  <div className="aspect-square bg-gray-900 p-4">
                    <Image 
                      src={p.image} 
                      alt={p.name} 
                      width={200}
                      height={200}
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <div className="p-4 border-t border-gray-800">
                    <p className="text-gray-500 text-xs uppercase mb-1">{p.brand}</p>
                    <h3 className="font-bold text-sm mb-2">{p.name}</h3>
                    <p className="font-bold">฿{p.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
