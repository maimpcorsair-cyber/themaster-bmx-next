// Export helpers utility

export async function exportCourseRegistrationsExcel(courseRegistrations: any[]) {
  const XLSX = (await import('xlsx')).default;
  const data = courseRegistrations.map((r: any, i: number) => ({
    'ลำดับ': i + 1,
    'ผู้ปกครอง': r.parentName,
    'นักเรียน': r.studentName,
    'อายุ': r.age,
    'โทร': r.phone,
    'LINE': r.line,
    'คอร์ส': r.program,
    'ตาราง': r.schedule,
    'โค้ช': r.coach,
    'ราคา': r.price,
    'สถานะ': r.status === 'confirmed' ? 'ยืนยันแล้ว' : r.status === 'contacted' ? 'ติดต่อแล้ว' : 'รอติดต่อ',
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Course Registrations');
  XLSX.writeFile(wb, 'course_registrations.xlsx');
}

export async function exportCourseRegistrationsPDF(courseRegistrations: any[]) {
  const jsPDF = (await import('jspdf')).default;
  const autoTable = (await import('jspdf-autotable')).default;
  const doc = new jsPDF();
  autoTable(doc, {
    head: [['ลำดับ', 'ผู้ปกครอง', 'นักเรียน', 'อายุ', 'โทร', 'คอร์ส', 'ตาราง', 'โค้ช', 'ราคา', 'สถานะ']],
    body: courseRegistrations.map((r: any, i: number) => [
      i + 1, r.parentName, r.studentName, r.age, r.phone, r.program, r.schedule, r.coach || '-', r.price,
      r.status === 'confirmed' ? 'ยืนยันแล้ว' : r.status === 'contacted' ? 'ติดต่อแล้ว' : 'รอติดต่อ',
    ]),
  });
  doc.save('course_registrations.pdf');
}