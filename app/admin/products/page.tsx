'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Product, Promotion } from '@/lib/firebase';

export default function AdminProductsPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'promotions'>('products');
  const [loading, setLoading] = useState(true);
  
  // New product form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    brand: '',
    price: 0,
    category: 'bike',
    stock: 0,
    image: '/placeholder.jpg',
    description: '',
    badge: '',
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
      // Fetch products
      const productsSnapshot = await getDocs(collection(db, 'products'));
      const productsData = productsSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Product[];
      setProducts(productsData.length > 0 ? productsData : []);

      // Fetch promotions
      const promosSnapshot = await getDocs(collection(db, 'promotions'));
      const promosData = promosSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Promotion[];
      setPromotions(promosData.length > 0 ? promosData : []);
    } catch (error) {
      console.log('Using default data - Firebase not connected yet');
      // Use placeholder data if Firebase not connected
      setProducts([]);
      setPromotions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    router.push('/admin/login');
  };

  const handleAddProduct = async () => {
    try {
      await addDoc(collection(db, 'products'), {
        ...newProduct,
        rating: 4.5,
        reviews: 0,
        specs: {},
      });
      setShowAddForm(false);
      setNewProduct({
        name: '',
        brand: '',
        price: 0,
        category: 'bike',
        stock: 0,
        image: '/placeholder.jpg',
        description: '',
        badge: '',
      });
      fetchData();
      alert('เพิ่มสินค้าสำเร็จ!');
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ' + error);
    }
  };

  const handleUpdateStock = async (productId: string, newStock: number) => {
    try {
      await updateDoc(doc(db, 'products', productId), { stock: newStock });
      fetchData();
    } catch (error) {
      console.log('Update failed - Firebase not connected');
    }
  };

  const handleUpdatePrice = async (productId: string, newPrice: number) => {
    try {
      await updateDoc(doc(db, 'products', productId), { price: newPrice });
      fetchData();
    } catch (error) {
      console.log('Update failed - Firebase not connected');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('ต้องการลบสินค้านี้?')) return;
    try {
      await deleteDoc(doc(db, 'products', productId));
      fetchData();
    } catch (error) {
      console.log('Delete failed - Firebase not connected');
    }
  };

  const handleTogglePromotion = async (promoId: string, currentActive: boolean) => {
    try {
      await updateDoc(doc(db, 'promotions', promoId), { active: !currentActive });
      fetchData();
    } catch (error) {
      console.log('Update failed - Firebase not connected');
    }
  };

  const handleAddPromotion = async () => {
    const code = prompt('รหัสโปรโมชั่น (เช่น NEWYEAR):');
    if (!code) return;
    const discount = parseInt(prompt('ส่วนลด % (เช่น 10):') || '0');
    if (discount <= 0) return;
    
    try {
      await addDoc(collection(db, 'promotions'), {
        code: code.toUpperCase(),
        discount,
        active: true,
      });
      fetchData();
      alert('เพิ่มโปรโมชั่นสำเร็จ!');
    } catch (error) {
      console.log('Add promo failed - Firebase not connected');
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black uppercase">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">จัดการสินค้าและโปรโมชั่น</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-gray-500 hover:text-white text-sm">
              ตารางเรียน
            </Link>
            <button
              onClick={handleLogout}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-bold"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex gap-1">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'products'
                ? 'bg-red-600 text-white'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            สินค้า ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('promotions')}
            className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'promotions'
                ? 'bg-red-600 text-white'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            โปรโมชั่น ({promotions.length})
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <p className="text-gray-500">กำลังโหลด...</p>
        ) : activeTab === 'products' ? (
          <>
            {/* Add Product Button */}
            <div className="mb-6">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-bold"
              >
                {showAddForm ? '✕ ยกเลิก' : '+ เพิ่มสินค้าใหม่'}
              </button>
            </div>

            {/* Add Product Form */}
            {showAddForm && (
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-bold mb-4">เพิ่มสินค้าใหม่</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                      ชื่อสินค้า
                    </label>
                    <input
                      type="text"
                      value={newProduct.name || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full bg-black border border-gray-800 rounded px-4 py-2 text-white"
                      placeholder="เช่น Kink Gap XL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                      แบรนด์
                    </label>
                    <input
                      type="text"
                      value={newProduct.brand || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                      className="w-full bg-black border border-gray-800 rounded px-4 py-2 text-white"
                      placeholder="เช่น Kink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                      ราคา (บาท)
                    </label>
                    <input
                      type="number"
                      value={newProduct.price || 0}
                      onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) || 0 })}
                      className="w-full bg-black border border-gray-800 rounded px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={newProduct.stock || 0}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                      className="w-full bg-black border border-gray-800 rounded px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                      หมวดหมู่
                    </label>
                    <select
                      value={newProduct.category || 'bike'}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full bg-black border border-gray-800 rounded px-4 py-2 text-white"
                    >
                      <option value="bike">จักรยาน</option>
                      <option value="helmet">หมวก</option>
                      <option value="gloves">ถุงมือ</option>
                      <option value="knee-pads">เสื่อเข่า</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Badge (เช่น BEST, SALE)
                    </label>
                    <input
                      type="text"
                      value={newProduct.badge || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                      className="w-full bg-black border border-gray-800 rounded px-4 py-2 text-white"
                      placeholder="เช่น BEST"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                    รายละเอียด
                  </label>
                  <textarea
                    value={newProduct.description || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full bg-black border border-gray-800 rounded px-4 py-2 text-white h-24"
                    placeholder="รายละเอียดสินค้า..."
                  />
                </div>
                <button
                  onClick={handleAddProduct}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded font-bold"
                >
                  บันทึกสินค้า
                </button>
              </div>
            )}

            {/* Products List */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">
                      สินค้า
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">
                      ราคา
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Stock
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">
                      หมวด
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">
                        ยังไม่มีสินค้า กด "+ เพิ่มสินค้าใหม่" เพื่อเริ่มต้น
                        <br/>
                        <span className="text-sm text-gray-600">
                          (Firebase ยังไม่ได้เชื่อมต่อ - ต้องเพิ่ม Firebase Config ก่อน)
                        </span>
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-800 rounded overflow-hidden">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-bold">{product.name}</p>
                              <p className="text-gray-500 text-sm">{product.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">฿{product.price.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`font-bold ${
                            product.stock > 5 ? 'text-green-500' :
                            product.stock > 0 ? 'text-yellow-500' : 'text-red-500'
                          }`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="bg-gray-800 px-3 py-1 rounded text-xs">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => {
                              const newStock = prompt('อัพเดท Stock:', product.stock.toString());
                              if (newStock && product.id) {
                                handleUpdateStock(product.id, parseInt(newStock));
                              }
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm mr-2"
                          >
                            แก้ Stock
                          </button>
                          <button
                            onClick={() => {
                              const newPrice = prompt('อัพเดท ราคา:', product.price.toString());
                              if (newPrice && product.id) {
                                handleUpdatePrice(product.id, parseInt(newPrice));
                              }
                            }}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm mr-2"
                          >
                            แก้ ราคา
                          </button>
                          <button
                            onClick={() => product.id && handleDeleteProduct(product.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                          >
                            ลบ
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            {/* Promotions Tab */}
            <div className="mb-6">
              <button
                onClick={handleAddPromotion}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-bold"
              >
                + เพิ่มโปรโมชั่นใหม่
              </button>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">
                      รหัส
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">
                      ส่วนลด
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">
                      สถานะ
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {promotions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500">
                        ยังไม่มีโปรโมชั่น กด "+ เพิ่มโปรโมชั่นใหม่" เพื่อเริ่มต้น
                      </td>
                    </tr>
                  ) : (
                    promotions.map((promo) => (
                      <tr key={promo.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                        <td className="py-4 px-6">
                          <span className="bg-red-600/20 text-red-500 px-3 py-1 rounded font-bold">
                            {promo.code}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-lg font-bold">{promo.discount}%</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded text-sm ${
                            promo.active ? 'bg-green-600/20 text-green-500' : 'bg-gray-600/20 text-gray-500'
                          }`}>
                            {promo.active ? 'เปิดใช้งาน' : 'ปิด'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => promo.id && handleTogglePromotion(promo.id, promo.active)}
                            className={`px-3 py-1 rounded text-sm mr-2 ${
                              promo.active
                                ? 'bg-gray-600 hover:bg-gray-700 text-white'
                                : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                          >
                            {promo.active ? 'ปิดใช้งาน' : 'เปิดใช้งาน'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
