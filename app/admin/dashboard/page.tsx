'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Product, Promotion } from '@/lib/firebase';

interface Location {
  id: string;
  name: string;
  nameEn: string;
  address: string;
  addressEn: string;
  mapUrl: string;
  days: string;
  daysEn: string;
  image: string;
}

interface ScheduleItem {
  id?: string;
  day: string;
  time: string;
  program: string;
  location: string;
  spots: string;
}

interface Registration {
  id?: string;
  name: string;
  age: string;
  category: string;
  phone: string;
  line: string;
  createdAt: string;
  status: string;
}

interface CourseRegistration {
  id?: string;
  parentName: string;
  studentName: string;
  age: string;
  phone: string;
  line: string;
  program: string;
  schedule: string;
  coach: string;
  price: number;
  note: string;
  createdAt: string;
  status: string;
}

const categories = [
  { key: 'bike', label: 'จักรยาน' },
  { key: 'helmets', label: 'หมวก' },
  { key: 'gloves', label: 'ถุงมือ' },
  { key: 'knee-pads', label: 'เสื่อเข่า' },
  { key: 'elbow-pads', label: 'เสื่อข้อศอก' },
  { key: 'shin-guards', label: 'เสื่อน่อง' },
  { key: 'body-armor', label: 'เกราะ' },
  { key: 'neck-brace', label: 'ปกคอ' },
];

const defaultProducts: Product[] = [
  { id: '1', name: 'Kink Carve 16"', brand: 'KINK', price: 7499, category: 'bike', stock: 5, image: '/bikes_kink_carve_16.jpg', description: 'จักรยาน BMX สำหรับเด็ก', rating: 5.0, reviews: 12 },
  { id: '2', name: 'Kink Kicker 18"', brand: 'KINK', price: 8999, category: 'bike', stock: 3, image: '/bikes_kink_kicker_18.jpg', description: 'จักรยาน BMX สำหรับเด็กโต', rating: 5.0, reviews: 8 },
  { id: '3', name: 'Kink Curb 20"', brand: 'KINK', price: 10499, category: 'bike', stock: 7, image: '/bikes_kink_curb_20.jpg', description: 'จักรยาน BMX สำหรับเด็กโต', rating: 4.9, reviews: 24 },
  { id: '4', name: 'Kink Launch 20.25"', brand: 'KINK', price: 9499, category: 'bike', stock: 4, image: '/bikes_kink_launch_2025.jpg', description: 'จักรยาน BMX สำหรับวัยรุ่น', rating: 5.0, reviews: 15 },
  { id: '5', name: 'Kink Setup 20.5"', brand: 'KINK', price: 14500, category: 'bike', stock: 2, image: '/bikes_kink_setup_205.jpg', description: 'จักรยาน BMX ระดับกลาง', rating: 5.0, reviews: 6 },
  { id: '6', name: 'Kink Setup XL 21"', brand: 'KINK', price: 16500, category: 'bike', stock: 1, image: '/bikes_kink_setup_xl.jpg', description: 'จักรยาน BMX ระดับสูง', rating: 4.8, reviews: 4 },
  { id: '7', name: 'Kink Downside 20.75"', brand: 'KINK', price: 26000, category: 'bike', stock: 2, image: '/bikes_kink_downside.jpg', description: 'จักรยาน BMX ระดับสูง', rating: 5.0, reviews: 2, badge: 'BEST' },
  { id: '8', name: 'Kink Switch 20.75"', brand: 'KINK', price: 22000, category: 'bike', stock: 3, image: '/bikes_kink_switch.jpg', description: 'จักรยาน BMX ระดับสูง', rating: 4.9, reviews: 3 },
  { id: '9', name: 'Kink Williams 20.75" Pro', brand: 'KINK', price: 30000, category: 'bike', stock: 1, image: '/bikes_kink_williams.jpg', description: 'จักรยาน BMX Pro', rating: 5.0, reviews: 18, badge: 'PRO' },
  { id: '10', name: 'WeThePeople CRS 20.25"', brand: 'WETHEPEOPLE', price: 12500, category: 'bike', stock: 4, image: '/bikes_wtp_crs.jpg', description: 'จักรยาน BMX คุณภาพสูง', rating: 5.0, reviews: 9 },
  { id: '11', name: 'WeThePeople Battleship 20.75"', brand: 'WETHEPEOPLE', price: 22000, category: 'bike', stock: 2, image: '/bikes_wtp_battleship.jpg', description: 'จักรยาน BMX ระดับสูง', rating: 4.7, reviews: 5 },
  { id: '101', name: 'Pro-Tec Street Helmet', brand: 'PRO-TEC', price: 2500, category: 'helmets', stock: 10, image: '/gear_helmet_protec.jpg', description: 'หมวกกันน็อคมาตรฐาน', rating: 4.9, reviews: 32 },
  { id: '102', name: 'Pro-Tec Bass Boat Helmet', brand: 'PRO-TEC', price: 2800, category: 'helmets', stock: 8, image: '/gear_helmet_bass.jpg', description: 'หมวกกันน็อคสำหรับแข่ง', rating: 5.0, reviews: 18 },
  { id: '103', name: 'Pro-Tec Sport Helmet', brand: 'PRO-TEC', price: 2200, category: 'helmets', stock: 12, image: '/gear_helmet_sport.jpg', description: 'หมวกกันน็อคสำหรับเด็ก', rating: 4.8, reviews: 24 },
  { id: '104', name: 'Triple 8 Certified Helmet', brand: 'TRIPLE 8', price: 3200, category: 'helmets', stock: 6, image: '/gear_helmet_t8.jpg', description: 'หมวกกันน็อคมาตรฐานสูง', rating: 4.9, reviews: 15 },
  { id: '105', name: 'Pro-Tec Gloves', brand: 'PRO-TEC', price: 450, category: 'gloves', stock: 25, image: '/gear_gloves_protec.jpg', description: 'ถุงมือปกป้องฝ่ามือ', rating: 4.7, reviews: 45 },
  { id: '106', name: 'FUSE Wrist Glove', brand: 'FUSE', price: 550, category: 'gloves', stock: 20, image: '/gear_gloves_fuse.jpg', description: 'ถุงมือกันบาด', rating: 4.8, reviews: 28 },
  { id: '107', name: 'BDC Gloves', brand: 'BDC', price: 380, category: 'gloves', stock: 30, image: '/gear_gloves_bdc.jpg', description: 'ถุงมือพื้นฐาน', rating: 4.6, reviews: 52 },
  { id: '108', name: 'FUSE Echo 100 Knee/Shin Pad', brand: 'FUSE', price: 1800, category: 'knee-pads', stock: 8, image: '/gear_knee_fuse_echo.jpg', description: 'เสื่อรองเข่าและน่อง', rating: 5.0, reviews: 22, badge: 'BEST' },
  { id: '109', name: 'FUSE Delta 125 Knee/Shin/Ankle', brand: 'FUSE', price: 2200, category: 'knee-pads', stock: 5, image: '/gear_knee_fuse_delta.jpg', description: 'เสื่อรองครบวงจร', rating: 4.9, reviews: 14 },
  { id: '110', name: 'Shadow Super Slim V2 Knee Pads', brand: 'SHADOW', price: 1500, category: 'knee-pads', stock: 10, image: '/gear_knee_shadow.jpg', description: 'เสื่อรองเข่าบางเบา', rating: 4.8, reviews: 19 },
  { id: '111', name: 'Stay Strong Combat Knee/Shin', brand: 'STAY STRONG', price: 1950, category: 'knee-pads', stock: 4, image: '/gear_knee_staystrong.jpg', description: 'เสื่อรองเข่าระดับโปร', rating: 4.9, reviews: 8 },
  { id: '112', name: 'Pro-Tec Elbow Pad', brand: 'PRO-TEC', price: 800, category: 'elbow-pads', stock: 15, image: '/gear_elbow_protec.jpg', description: 'เสื่อรองข้อศอก', rating: 4.7, reviews: 33 },
  { id: '113', name: 'FUSE Lomi Elbow Pads', brand: 'FUSE', price: 950, category: 'elbow-pads', stock: 12, image: '/gear_elbow_fuse.jpg', description: 'เสื่อรองข้อศอกระดับสูง', rating: 4.8, reviews: 21 },
  { id: '114', name: 'Stay Strong Shin Guards', brand: 'STAY STRONG', price: 1200, category: 'shin-guards', stock: 6, image: '/gear_shin_staystrong.jpg', description: 'เสื่อรองน่อง', rating: 4.9, reviews: 12 },
  { id: '115', name: 'Pro-Tec Body Armor', brand: 'PRO-TEC', price: 3500, category: 'body-armor', stock: 3, image: '/gear_body_protec.jpg', description: 'เกราะป้องกันร่างกาย', rating: 5.0, reviews: 9 },
  { id: '116', name: 'Leatt Neck Brace', brand: 'LEATT', price: 5500, category: 'neck-brace', stock: 2, image: '/gear_neck_leatt.jpg', description: 'ปกคอกันกระแทก', rating: 5.0, reviews: 6 },
];

const defaultLocations: Location[] = [
  { id: 'rush', name: 'Rush Bike Shop', nameEn: 'Rush Bike Shop', address: '999 หมู่ 4 ตำบลบางแค อำเภอบางแค กรุงเทพฯ 10160', addressEn: '999 Moo 4, Bang Khae, Bangkok 10160', mapUrl: 'https://maps.google.com/?q=13.7231,100.4194', days: 'จันทร์-ศุกร์', daysEn: 'Mon-Fri', image: '/schedule_rush.jpg' },
  { id: 'bang', name: 'The Master BMX @ Bang', nameEn: 'The Master BMX @ Bang', address: '888 หมู่ 5 ตำบลบางกะอี อำเภอคลองหลวง ปทุมธานี 12120', addressEn: '888 Moo 5, Bang Klate, Pathum Thani 12120', mapUrl: 'https://maps.google.com/?q=14.0201,100.6134', days: 'เสาร์-อาทิตย์', daysEn: 'Sat-Sun', image: '/schedule_bang.jpg' },
  { id: 'pattaya', name: 'The Master BMX @ Pattaya', nameEn: 'The Master BMX @ Pattaya', address: '777 หมู่ 3 ตำบลนาเกลือ อำเภอบางละมุง พัทยา 20150', addressEn: '777 Moo 3, Na Klua, Pattaya 20150', mapUrl: 'https://maps.google.com/?q=12.9214,100.8824', days: 'เสาร์-อาทิตย์', daysEn: 'Sat-Sun', image: '/schedule_pattaya.jpg' },
];

const defaultSchedule: ScheduleItem[] = [
  { id: '1', day: 'จันทร์', time: '15:00-16:30', program: 'Little Rider', location: 'rush', spots: '10' },
  { id: '2', day: 'จันทร์', time: '16:30-18:00', program: 'Junior Rider', location: 'rush', spots: '12' },
  { id: '3', day: 'อังคาร', time: '15:00-16:30', program: 'Little Rider', location: 'rush', spots: '10' },
  { id: '4', day: 'อังคาร', time: '16:30-18:00', program: 'Competitor', location: 'rush', spots: '8' },
  { id: '5', day: 'พุธ', time: '15:00-16:30', program: 'Junior Rider', location: 'rush', spots: '12' },
  { id: '6', day: 'พุธ', time: '16:30-18:00', program: 'Competitor', location: 'rush', spots: '8' },
  { id: '7', day: 'พฤหัสบดี', time: '15:00-16:30', program: 'Little Rider', location: 'rush', spots: '10' },
  { id: '8', day: 'พฤหัสบดี', time: '16:30-18:00', program: 'Junior Rider', location: 'rush', spots: '12' },
  { id: '9', day: 'ศุกร์', time: '15:00-16:30', program: 'Little Rider', location: 'rush', spots: '10' },
  { id: '10', day: 'ศุกร์', time: '16:30-18:00', program: 'Competitor', location: 'rush', spots: '8' },
  { id: '11', day: 'เสาร์', time: '09:00-10:30', program: 'Little Rider', location: 'bang', spots: '10' },
  { id: '12', day: 'เสาร์', time: '10:30-12:00', program: 'Junior Rider', location: 'bang', spots: '12' },
  { id: '13', day: 'เสาร์', time: '13:00-14:30', program: 'Competitor', location: 'bang', spots: '8' },
  { id: '14', day: 'อาทิตย์', time: '09:00-10:30', program: 'Little Rider', location: 'bang', spots: '10' },
  { id: '15', day: 'อาทิตย์', time: '10:30-12:00', program: 'Junior Rider', location: 'bang', spots: '12' },
  { id: '16', day: 'อาทิตย์', time: '13:00-14:30', program: 'Competitor', location: 'bang', spots: '8' },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [courseRegistrations, setCourseRegistrations] = useState<CourseRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Schedule form state
  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem | null>(null);
  const [scheduleForm, setScheduleForm] = useState({
    day: '',
    time: '',
    program: '',
    location: '',
    spots: '',
  });
  
  // Location form state
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [locationForm, setLocationForm] = useState({
    name: '',
    nameEn: '',
    address: '',
    addressEn: '',
    mapUrl: '',
    days: '',
    daysEn: '',
    image: '',
  });
  
  // Form state
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    brand: '',
    price: 0,
    category: 'bike',
    stock: 0,
    image: '',
    description: '',
    badge: '',
    rating: 4.5,
    reviews: 0,
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem('admin_logged_in');
    if (!loggedIn) {
      router.push('/admin/login');
    } else {
      setIsLoggedIn(true);
      fetchData();
    }
  }, [router]);

  const fetchData = async () => {
    try {
      const productsSnapshot = await getDocs(collection(db, 'products'));
      if (!productsSnapshot.empty) {
        const productsData = productsSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        })) as Product[];
        setProducts(productsData);
      } else {
        // Use default data if Firebase is empty
        setProducts(defaultProducts);
      }

      const promosSnapshot = await getDocs(collection(db, 'promotions'));
      if (!promosSnapshot.empty) {
        setPromotions(promosSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Promotion[]);
      }

      const locationsSnapshot = await getDocs(collection(db, 'locations'));
      if (!locationsSnapshot.empty) {
        setLocations(locationsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Location[]);
      } else {
        setLocations(defaultLocations);
      }

      const scheduleSnapshot = await getDocs(collection(db, 'schedule'));
      if (!scheduleSnapshot.empty) {
        setSchedule(scheduleSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as ScheduleItem[]);
      } else {
        setSchedule(defaultSchedule);
      }

      const regsSnapshot = await getDocs(collection(db, 'registrations'));
      if (!regsSnapshot.empty) {
        setRegistrations(regsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Registration[]);
      }

      const courseRegsSnapshot = await getDocs(collection(db, 'course_registrations'));
      if (!courseRegsSnapshot.empty) {
        setCourseRegistrations(courseRegsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as CourseRegistration[]);
      }
    } catch (error) {
      console.log('Using default data - Firebase error:', error);
      setProducts(defaultProducts);
      setLocations(defaultLocations);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    router.push('/admin/login');
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      brand: '',
      price: 0,
      category: 'bike',
      stock: 0,
      image: '',
      description: '',
      badge: '',
      rating: 4.5,
      reviews: 0,
    });
    setEditingProduct(null);
  };

  const handleSaveProduct = async () => {
    try {
      if (editingProduct?.id) {
        await updateDoc(doc(db, 'products', editingProduct.id), productForm);
      } else {
        await addDoc(collection(db, 'products'), productForm);
      }
      setShowProductForm(false);
      resetForm();
      fetchData();
    } catch (error) {
      alert('Error saving product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('ลบสินค้านี้?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      fetchData();
    } catch (error) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleUpdateStock = async (id: string, newStock: number) => {
    try {
      await updateDoc(doc(db, 'products', id), { stock: newStock });
      fetchData();
    } catch (error) {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: newStock } : p));
    }
  };

  // Location handlers
  const handleSaveLocation = async () => {
    try {
      if (editingLocation?.id) {
        await updateDoc(doc(db, 'locations', editingLocation.id), locationForm);
      } else {
        await addDoc(collection(db, 'locations'), locationForm);
      }
      setEditingLocation(null);
      setLocationForm({ name: '', nameEn: '', address: '', addressEn: '', mapUrl: '', days: '', daysEn: '', image: '' });
      fetchData();
    } catch (error) {
      console.log('Error saving location');
    }
  };

  const handleDeleteLocation = async (id: string) => {
    if (!confirm('ลบสถานที่นี้?')) return;
    try {
      await deleteDoc(doc(db, 'locations', id));
      fetchData();
    } catch (error) {
      setLocations(prev => prev.filter(l => l.id !== id));
    }
  };

  const resetLocationForm = () => {
    setLocationForm({ name: '', nameEn: '', address: '', addressEn: '', mapUrl: '', days: '', daysEn: '', image: '' });
    setEditingLocation(null);
  };

  // Schedule handlers
  const handleSaveSchedule = async () => {
    try {
      if (editingSchedule?.id) {
        await updateDoc(doc(db, 'schedule', editingSchedule.id), scheduleForm);
      } else {
        await addDoc(collection(db, 'schedule'), scheduleForm);
      }
      setEditingSchedule(null);
      setScheduleForm({ day: '', time: '', program: '', location: '', spots: '' });
      fetchData();
    } catch (error) {
      console.log('Error saving schedule');
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (!confirm('ลบตารางนี้?')) return;
    try {
      await deleteDoc(doc(db, 'schedule', id));
      fetchData();
    } catch (error) {
      setSchedule(prev => prev.filter(s => s.id !== id));
    }
  };

  const resetScheduleForm = () => {
    setScheduleForm({ day: '', time: '', program: '', location: '', spots: '' });
    setEditingSchedule(null);
  };

  // Registration handlers
  const handleDeleteRegistration = async (id: string) => {
    if (!confirm('ลบการลงทะเบียนนี้?')) return;
    try {
      await deleteDoc(doc(db, 'registrations', id));
      fetchData();
    } catch (error) {
      setRegistrations(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleUpdateRegistrationStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'registrations', id), { status });
      fetchData();
    } catch (error) {
      console.log('Error updating status');
    }
  };

  // Course Registration handlers
  const handleDeleteCourseRegistration = async (id: string) => {
    if (!confirm('ลบการลงทะเบียนคอร์สนี้?')) return;
    try {
      await deleteDoc(doc(db, 'course_registrations', id));
      fetchData();
    } catch (error) {
      setCourseRegistrations(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleUpdateCourseRegistrationStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'course_registrations', id), { status });
      fetchData();
    } catch (error) {
      console.log('Error updating status');
    }
  };

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStock = products.filter(p => p.stock <= 2).length;

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black uppercase">The Master BMX Admin</h1>
            <p className="text-gray-500 text-sm">Shop Management System</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`font-bold text-sm px-3 py-1 rounded ${activeTab === 'dashboard' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              📊 Dashboard
            </button>
            <Link href="/shop" target="_blank" className="text-gray-400 hover:text-white text-sm">
              🛒 ร้านค้า
            </Link>
            <Link href="/schedule" target="_blank" className="text-gray-400 hover:text-white text-sm">
              📅 ตารางเรียน
            </Link>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-bold">
              ออก
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      {activeTab !== 'dashboard' && (
        <div className="mb-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1"
          >
            ← กลับ Dashboard
          </button>
        </div>
      )}

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">สินค้าทั้งหมด</p>
            <p className="text-3xl font-black">{products.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">มูลค่าสินค้า</p>
            <p className="text-3xl font-black">฿{(totalValue / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Stock รวม</p>
            <p className="text-3xl font-black">{totalStock}</p>
          </div>
          <div className="bg-orange-100 rounded-xl shadow-sm p-6">
            <p className="text-orange-600 text-sm uppercase tracking-wider mb-1">Stock ใกล้หมด</p>
            <p className="text-3xl font-black text-orange-600">{lowStock}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          <div className="flex border-b flex-wrap">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-4 font-bold text-sm uppercase tracking-wider ${
                activeTab === 'dashboard' ? 'bg-red-600 text-white' : 'hover:bg-gray-50'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-4 font-bold text-sm uppercase tracking-wider ${
                activeTab === 'products' ? 'bg-red-600 text-white' : 'hover:bg-gray-50'
              }`}
            >
              📦 สินค้า ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('add-product')}
              className={`px-6 py-4 font-bold text-sm uppercase tracking-wider ${
                activeTab === 'add-product' ? 'bg-red-600 text-white' : 'hover:bg-gray-50'
              }`}
            >
              ➕ เพิ่มสินค้า
            </button>
            <button
              onClick={() => setActiveTab('locations')}
              className={`px-6 py-4 font-bold text-sm uppercase tracking-wider ${
                activeTab === 'locations' || activeTab === 'add-location' ? 'bg-red-600 text-white' : 'hover:bg-gray-50'
              }`}
            >
              📍 สถานที่ ({locations.length})
            </button>
            <button
              onClick={() => setActiveTab('promo')}
              className={`px-6 py-4 font-bold text-sm uppercase tracking-wider ${
                activeTab === 'promo' ? 'bg-red-600 text-white' : 'hover:bg-gray-50'
              }`}
            >
              🎟️ โปรโมชั่น
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-6 py-4 font-bold text-sm uppercase tracking-wider ${
                activeTab === 'schedule' || activeTab === 'add-schedule' ? 'bg-red-600 text-white' : 'hover:bg-gray-50'
              }`}
            >
              📅 ตารางเรียน ({schedule.length})
            </button>
            <button
              onClick={() => setActiveTab('registrations')}
              className={`px-6 py-4 font-bold text-sm uppercase tracking-wider ${
                activeTab === 'registrations' ? 'bg-red-600 text-white' : 'hover:bg-gray-50'
              }`}
            >
              📋 ลงทะเบียน ({registrations.length})
            </button>
            <button
              onClick={() => setActiveTab('course-registrations')}
              className={`px-6 py-4 font-bold text-sm uppercase tracking-wider ${
                activeTab === 'course-registrations' ? 'bg-red-600 text-white' : 'hover:bg-gray-50'
              }`}
            >
              🎓 ลงทะเบียนคอร์ส ({courseRegistrations.length})
            </button>
          </div>

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-4 text-sm font-bold text-gray-500 uppercase">สินค้า</th>
                      <th className="pb-4 text-sm font-bold text-gray-500 uppercase">ราคา</th>
                      <th className="pb-4 text-sm font-bold text-gray-500 uppercase">Stock</th>
                      <th className="pb-4 text-sm font-bold text-gray-500 uppercase">Rating</th>
                      <th className="pb-4 text-sm font-bold text-gray-500 uppercase">Reviews</th>
                      <th className="pb-4 text-sm font-bold text-gray-500 uppercase">หมวด</th>
                      <th className="pb-4 text-sm font-bold text-gray-500 uppercase">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                              {product.image && (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              )}
                            </div>
                            <div>
                              <p className="font-bold">{product.name}</p>
                              <p className="text-gray-500 text-sm">{product.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 font-bold">฿{product.price.toLocaleString()}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => product.id && handleUpdateStock(product.id, product.stock - 1)}
                              className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded font-bold"
                            >
                              -
                            </button>
                            <span className={`font-bold w-12 text-center ${
                              product.stock <= 2 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {product.stock}
                            </span>
                            <button
                              onClick={() => product.id && handleUpdateStock(product.id, product.stock + 1)}
                              className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded font-bold"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-yellow-500">★</span> {(product.rating || 0).toFixed(1)}
                        </td>
                        <td className="py-4 text-gray-500">
                          ({product.reviews || 0})
                        </td>
                        <td className="py-4">
                          <span className="bg-gray-200 px-3 py-1 rounded text-xs font-bold">
                            {categories.find(c => c.key === product.category)?.label || product.category}
                          </span>
                        </td>
                        <td className="py-4">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setProductForm({
                                name: product.name,
                                brand: product.brand,
                                price: product.price,
                                category: product.category,
                                stock: product.stock,
                                image: product.image,
                                description: product.description,
                                badge: product.badge || '',
                                rating: product.rating || 4.5,
                                reviews: product.reviews || 0,
                              });
                              setActiveTab('add-product');
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm mr-2"
                          >
                            แก้ไข
                          </button>
                          <button
                            onClick={() => product.id && handleDeleteProduct(product.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                          >
                            ลบ
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Add/Edit Product Tab */}
          {activeTab === 'add-product' && (
            <div className="p-6">
              <h2 className="text-lg font-bold mb-6">
                {editingProduct ? '✏️ แก้ไขสินค้า' : '➕ เพิ่มสินค้าใหม่'}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">ชื่อสินค้า</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="เช่น Kink Gap XL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">แบรนด์</label>
                  <input
                    type="text"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="เช่น KINK"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">ราคา (บาท)</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: parseInt(e.target.value) || 0 })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">Stock</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value) || 0 })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">หมวดหมู่</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                  >
                    {categories.map((cat) => (
                      <option key={cat.key} value={cat.key}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">Badge (เช่น BEST, SALE)</label>
                  <input
                    type="text"
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="เช่น BEST"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">Rating (0-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={productForm.rating}
                    onChange={(e) => setProductForm({ ...productForm, rating: parseFloat(e.target.value) || 0 })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="4.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">จำนวน Reviews</label>
                  <input
                    type="number"
                    min="0"
                    value={productForm.reviews}
                    onChange={(e) => setProductForm({ ...productForm, reviews: parseInt(e.target.value) || 0 })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="0"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-600 mb-2">URL รูปภาพ</label>
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="/bikes_kink_carve_16.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-600 mb-2">รายละเอียด</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 h-24"
                    placeholder="รายละเอียดสินค้า..."
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSaveProduct}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold"
                >
                  💾 บันทึก
                </button>
                <button
                  onClick={() => { resetForm(); setActiveTab('products'); }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-bold"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          )}

          {/* Locations Tab */}
          {activeTab === 'locations' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">📍 สถานที่ฝึกสอน ({locations.length})</h2>
                <button
                  onClick={() => { setEditingLocation(null); resetLocationForm(); setActiveTab('add-location'); }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold"
                >
                  ➕ เพิ่มสถานที่ใหม่
                </button>
              </div>
              <div className="space-y-4">
                {locations.map((location) => (
                  <div key={location.id} className="border rounded-xl p-6 hover:bg-gray-50">
                    <div className="flex gap-6">
                      <div className="w-32 h-24 bg-gray-200 rounded-lg overflow-hidden">
                        {location.image && (
                          <img src={location.image} alt={location.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-black text-xl">{location.name}</h3>
                            <p className="text-gray-500 text-sm">{location.nameEn}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingLocation(location);
                                setLocationForm({
                                  name: location.name,
                                  nameEn: location.nameEn,
                                  address: location.address,
                                  addressEn: location.addressEn,
                                  mapUrl: location.mapUrl,
                                  days: location.days,
                                  daysEn: location.daysEn,
                                  image: location.image,
                                });
                                setActiveTab('add-location');
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold"
                            >
                              แก้ไข
                            </button>
                            <button
                              onClick={() => handleDeleteLocation(location.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold"
                            >
                              ลบ
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">📍 {location.address}</p>
                        <p className="text-gray-500 text-xs">{location.addressEn}</p>
                        <div className="flex gap-4 mt-3">
                          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                            {location.days}
                          </span>
                          {location.mapUrl && (
                            <a href={location.mapUrl} target="_blank" className="text-blue-600 hover:text-blue-700 text-sm font-bold">
                              📍 ดูแผนที่
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add/Edit Location Tab */}
          {activeTab === 'add-location' && (
            <div className="p-6">
              <h2 className="text-lg font-bold mb-6">
                {editingLocation ? '✏️ แก้ไขสถานที่' : '➕ เพิ่มสถานที่ใหม่'}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">ชื่อ (ไทย)</label>
                  <input
                    type="text"
                    value={locationForm.name}
                    onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="เช่น The Master BMX @ Rush"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">ชื่อ (English)</label>
                  <input
                    type="text"
                    value={locationForm.nameEn}
                    onChange={(e) => setLocationForm({ ...locationForm, nameEn: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="The Master BMX @ Rush"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-600 mb-2">ที่อยู่ (ไทย)</label>
                  <input
                    type="text"
                    value={locationForm.address}
                    onChange={(e) => setLocationForm({ ...locationForm, address: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="999 หมู่ 4 ตำบลบางแค..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-600 mb-2">ที่อยู่ (English)</label>
                  <input
                    type="text"
                    value={locationForm.addressEn}
                    onChange={(e) => setLocationForm({ ...locationForm, addressEn: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="999 Moo 4, Bang Khae..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">วันที่เปิด (ไทย)</label>
                  <input
                    type="text"
                    value={locationForm.days}
                    onChange={(e) => setLocationForm({ ...locationForm, days: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="จันทร์-ศุกร์"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">วันที่เปิด (English)</label>
                  <input
                    type="text"
                    value={locationForm.daysEn}
                    onChange={(e) => setLocationForm({ ...locationForm, daysEn: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="Mon-Fri"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-600 mb-2">Google Maps URL</label>
                  <input
                    type="text"
                    value={locationForm.mapUrl}
                    onChange={(e) => setLocationForm({ ...locationForm, mapUrl: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="https://maps.google.com/?q=..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-600 mb-2">URL รูปภาพ</label>
                  <input
                    type="text"
                    value={locationForm.image}
                    onChange={(e) => setLocationForm({ ...locationForm, image: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="/schedule_rush.jpg"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSaveLocation}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold"
                >
                  💾 บันทึก
                </button>
                <button
                  onClick={() => { setActiveTab('locations'); resetLocationForm(); }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-bold"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          )}

          {/* Promotions Tab */}
          {activeTab === 'promo' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">🎟️ โปรโมชั่น</h2>
                <button
                  onClick={async () => {
                    const code = prompt('รหัสโปรโมชั่น:');
                    if (!code) return;
                    const discount = parseInt(prompt('ส่วนลด %:') || '0');
                    if (discount <= 0) return;
                    try {
                      await addDoc(collection(db, 'promotions'), {
                        code: code.toUpperCase(),
                        discount,
                        active: true,
                      });
                      fetchData();
                    } catch (error) {
                      console.log('Error adding promo');
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold"
                >
                  ➕ เพิ่มโค้ดใหม่
                </button>
              </div>
              <div className="space-y-4">
                {['NEWRIDER', 'SIBLING', 'RUSTFEST'].map((code) => {
                  const discounts = { NEWRIDER: 10, SIBLING: 15, RUSTFEST: 20 };
                  return (
                    <div key={code} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-black">{code}</span>
                        <span className="font-bold text-2xl">{discounts[code as keyof typeof discounts]}%</span>
                      </div>
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-bold">
                        เปิดใช้งาน
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">📅 ตารางเรียน ({schedule.length})</h2>
                <button
                  onClick={() => { resetScheduleForm(); setActiveTab('add-schedule'); }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold"
                >
                  ➕ เพิ่มตารางใหม่
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-4 text-sm font-bold text-gray-500 uppercase">วัน</th>
                      <th className="pb-4 text-sm font-bold text-gray-500 uppercase">เวลา</th>
                      <th className="pb-4 text-sm font-bold text-gray-500 uppercase">โปรแกรม</th>
                      <th className="pb-4 text-sm font-bold text-gray-500 uppercase">สถานที่</th>
                      <th className="pb-4 text-sm font-bold text-gray-500 uppercase">ที่ว่าง</th>
                      <th className="pb-4 text-sm font-bold text-gray-500 uppercase">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((item) => {
                      const location = locations.find(l => l.id === item.location);
                      return (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 font-bold">{item.day}</td>
                          <td className="py-4">{item.time}</td>
                          <td className="py-4">
                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm font-bold">
                              {item.program}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className="text-gray-600">{location?.name || item.location}</span>
                          </td>
                          <td className="py-4 font-bold">{item.spots}</td>
                          <td className="py-4">
                            <button
                              onClick={() => {
                                setEditingSchedule(item);
                                setScheduleForm({
                                  day: item.day,
                                  time: item.time,
                                  program: item.program,
                                  location: item.location,
                                  spots: item.spots,
                                });
                                setActiveTab('add-schedule');
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm mr-2"
                            >
                              แก้ไข
                            </button>
                            <button
                              onClick={() => item.id && handleDeleteSchedule(item.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                            >
                              ลบ
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Add/Edit Schedule Tab */}
          {activeTab === 'add-schedule' && (
            <div className="p-6">
              <h2 className="text-lg font-bold mb-6">
                {editingSchedule ? '✏️ แก้ไขตาราง' : '➕ เพิ่มตารางใหม่'}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">วัน</label>
                  <select
                    value={scheduleForm.day}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, day: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                  >
                    <option value="">เลือกวัน...</option>
                    <option value="จันทร์">จันทร์</option>
                    <option value="อังคาร">อังคาร</option>
                    <option value="พุธ">พุธ</option>
                    <option value="พฤหัสบดี">พฤหัสบดี</option>
                    <option value="ศุกร์">ศุกร์</option>
                    <option value="เสาร์">เสาร์</option>
                    <option value="อาทิตย์">อาทิตย์</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">เวลา</label>
                  <input
                    type="text"
                    value={scheduleForm.time}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="เช่น 15:00-16:30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">โปรแกรม</label>
                  <select
                    value={scheduleForm.program}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, program: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                  >
                    <option value="">เลือกโปรแกรม...</option>
                    <option value="Little Rider">Little Rider</option>
                    <option value="Junior Rider">Junior Rider</option>
                    <option value="Competitor">Competitor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">สถานที่</label>
                  <select
                    value={scheduleForm.location}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                  >
                    <option value="">เลือกสถานที่...</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">ที่ว่าง</label>
                  <input
                    type="text"
                    value={scheduleForm.spots}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, spots: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="เช่น 10"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSaveSchedule}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold"
                >
                  💾 บันทึก
                </button>
                <button
                  onClick={() => { setActiveTab('schedule'); resetScheduleForm(); }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-bold"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          )}

          {/* Registrations Tab */}
          {activeTab === 'registrations' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">📋 ผู้ลงทะเบียนแข่งขัน RUSTFEST ({registrations.length})</h2>
              </div>
              {registrations.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-4xl mb-4">📋</p>
                  <p>ยังไม่มีผู้ลงทะเบียน</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">ชื่อ</th>
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">อายุ</th>
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">รุ่น</th>
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">เบอร์โทร</th>
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">LINE</th>
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">สถานะ</th>
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">วันที่</th>
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg) => (
                        <tr key={reg.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 font-bold">{reg.name}</td>
                          <td className="py-4">{reg.age}</td>
                          <td className="py-4">
                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm font-bold">
                              {reg.category === 'mini' ? 'Mini' : reg.category === 'jr' ? 'Junior' : 'Open'}
                            </span>
                          </td>
                          <td className="py-4">{reg.phone}</td>
                          <td className="py-4 text-blue-500">{reg.line || '-'}</td>
                          <td className="py-4">
                            <select
                              value={reg.status || 'new'}
                              onChange={(e) => reg.id && handleUpdateRegistrationStatus(reg.id, e.target.value)}
                              className={`border rounded px-2 py-1 text-sm font-bold ${
                                reg.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                                reg.status === 'contacted' ? 'bg-blue-100 text-blue-600' :
                                'bg-yellow-100 text-yellow-600'
                              }`}
                            >
                              <option value="new">รอติดต่อ</option>
                              <option value="contacted">ติดต่อแล้ว</option>
                              <option value="confirmed">ยืนยันแล้ว</option>
                            </select>
                          </td>
                          <td className="py-4 text-gray-500 text-sm">
                            {reg.createdAt ? new Date(reg.createdAt).toLocaleDateString('th-TH') : '-'}
                          </td>
                          <td className="py-4">
                            <a
                              href={`https://line.me/R/ti/p/@rushfest`}
                              target="_blank"
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm mr-2"
                            >
                              LINE
                            </a>
                            <button
                              onClick={() => reg.id && handleDeleteRegistration(reg.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                            >
                              ลบ
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Course Registrations Tab */}
          {activeTab === 'course-registrations' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">🎓 ผู้ลงทะเบียนคอร์สเรียน ({courseRegistrations.length})</h2>
              </div>
              {courseRegistrations.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-4xl mb-4">🎓</p>
                  <p>ยังไม่มีผู้ลงทะเบียนคอร์สเรียน</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">ผู้ปกครอง</th>
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">นักเรียน</th>
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">อายุ</th>
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">คอร์ส</th>
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">ตาราง</th>
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">โค้ช</th>
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">เบอร์</th>
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">สถานะ</th>
                        <th className="pb-4 text-sm font-bold text-gray-500 uppercase">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courseRegistrations.map((reg) => (
                        <tr key={reg.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 font-bold">{reg.parentName}</td>
                          <td className="py-4">{reg.studentName}</td>
                          <td className="py-4">{reg.age}</td>
                          <td className="py-4">
                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm font-bold">
                              {reg.program}
                            </span>
                          </td>
                          <td className="py-4 text-sm text-gray-600 max-w-32">{reg.schedule}</td>
                          <td className="py-4">
                            <span className="text-blue-600 font-bold">{reg.coach || '-'}</span>
                          </td>
                          <td className="py-4">{reg.phone}</td>
                          <td className="py-4">
                            <select
                              value={reg.status || 'new'}
                              onChange={(e) => reg.id && handleUpdateCourseRegistrationStatus(reg.id, e.target.value)}
                              className={`border rounded px-2 py-1 text-sm font-bold ${
                                reg.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                                reg.status === 'contacted' ? 'bg-blue-100 text-blue-600' :
                                'bg-yellow-100 text-yellow-600'
                              }`}
                            >
                              <option value="new">รอติดต่อ</option>
                              <option value="contacted">ติดต่อแล้ว</option>
                              <option value="confirmed">ยืนยันแล้ว</option>
                            </select>
                          </td>
                          <td className="py-4">
                            <a
                              href={`tel:${reg.phone}`}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm mr-2"
                            >
                              โทร
                            </a>
                            <button
                              onClick={() => reg.id && handleDeleteCourseRegistration(reg.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                            >
                              ลบ
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/shop" target="_blank" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2">🛒 หน้าร้าน</h3>
            <p className="text-gray-500 text-sm">ดูหน้าร้านค้าที่เว็ปไซต์</p>
          </Link>
          <Link href="/schedule" target="_blank" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2">📅 ตารางเรียน</h3>
            <p className="text-gray-500 text-sm">จัดการตารางเรียน</p>
          </Link>
          <Link href="/admin/products" target="_blank" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2">📦 Products API</h3>
            <p className="text-gray-500 text-sm">ดู/แก้ไขสินค้าในระบบ</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
