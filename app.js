// ============================================================================
// UMRAH TRAVEL AGENCY CRM - Production Application
// Vanilla JS + Chart.js 4.x | localStorage Persistence
// ============================================================================

// ---------------------------------------------------------------------------
// DATA MODEL CONSTANTS
// ---------------------------------------------------------------------------

const JOURNEY_STAGES = [
  { id: 'inquiry', label: 'Pertanyaan', icon: 'fa-question-circle', color: '#3B82F6' },
  { id: 'registration', label: 'Pendaftaran', icon: 'fa-clipboard-check', color: '#8B5CF6' },
  { id: 'documents', label: 'Dokumen', icon: 'fa-file-alt', color: '#F59E0B' },
  { id: 'visa', label: 'Visa', icon: 'fa-passport', color: '#EC4899' },
  { id: 'briefing', label: 'Taklimat', icon: 'fa-chalkboard-teacher', color: '#10B981' },
  { id: 'departure', label: 'Perlepasan', icon: 'fa-plane-departure', color: '#6366F1' },
  { id: 'complete', label: 'Selesai', icon: 'fa-check-circle', color: '#059669' }
];

const ACTIVITY_ICONS = {
  call: 'fa-phone',
  whatsapp: 'fab fa-whatsapp',
  note: 'fa-sticky-note',
  payment: 'fa-receipt',
  status_change: 'fa-exchange-alt',
  document: 'fa-file-alt',
  assignment: 'fa-user-tag',
  system: 'fa-robot'
};

const ACTIVITY_COLORS = {
  call: '#3B82F6',
  whatsapp: '#10B981',
  note: '#F59E0B',
  payment: '#7C3AED',
  status_change: '#EF4444',
  document: '#6366F1',
  assignment: '#EC4899',
  system: '#6B7280'
};

// ---------------------------------------------------------------------------
// DEFAULT SEED DATA
// ---------------------------------------------------------------------------

const DEFAULT_DATA = {
  packages: [
    { id: 'pkg-1', name: 'Ramadan VVIP 1448H', price: 15900, deposit: 3000, departureDate: '2027-03-15', capacity: 40 },
    { id: 'pkg-2', name: 'Cuti Sekolah Deluxe', price: 12500, deposit: 2500, departureDate: '2027-06-01', capacity: 50 },
    { id: 'pkg-3', name: 'Akhir Tahun Bajet', price: 8900, deposit: 2000, departureDate: '2027-11-20', capacity: 60 },
    { id: 'pkg-4', name: 'Umrah Ziarah Premium', price: 18500, deposit: 4000, departureDate: '2027-04-10', capacity: 30 }
  ],

  agents: [
    { id: 'agent-1', name: 'Mohammad Irfan bin MD Yusof', phone: '0129876543', activeLeadCount: 12, convertedBookings: 45, performanceRating: 4.8, themeColor: '#4C1D95' },
    { id: 'agent-2', name: 'Nurul Hidayah binti Azman', phone: '0137654321', activeLeadCount: 18, convertedBookings: 62, performanceRating: 4.9, themeColor: '#6D28D9' },
    { id: 'agent-3', name: 'Khairul Anuar bin Ibrahim', phone: '0145678901', activeLeadCount: 8, convertedBookings: 31, performanceRating: 4.5, themeColor: '#8B5CF6' },
    { id: 'agent-4', name: 'Siti Aminah binti Kamaruddin', phone: '0112345678', activeLeadCount: 15, convertedBookings: 50, performanceRating: 4.7, themeColor: '#A78BFA' },
    { id: 'agent-5', name: 'Muhammad Faiz bin Salleh', phone: '0198765432', activeLeadCount: 10, convertedBookings: 28, performanceRating: 4.4, themeColor: '#C084FC' }
  ],

  pilgrims: [
    // --- 2 at 'complete' ---
    {
      id: 'pilgrim-1',
      fullName: 'Ahmad Zulkifli bin Mohd Nasir',
      icNumber: '780315-01-5623',
      passportNumber: 'A45678901',
      passportExpiryDate: '2029-08-12',
      phoneNumber: '0121234567',
      visaStatus: 'Approved',
      familyGroupId: 'fam-001',
      packageId: 'pkg-1',
      journeyStage: 'complete',
      journeyHistory: [
        { stage: 'inquiry', date: '2026-09-01', note: 'Pertanyaan awal melalui WhatsApp' },
        { stage: 'registration', date: '2026-09-05', note: 'Borang pendaftaran lengkap' },
        { stage: 'documents', date: '2026-09-20', note: 'Semua dokumen dihantar' },
        { stage: 'visa', date: '2026-10-10', note: 'Visa diluluskan' },
        { stage: 'briefing', date: '2027-02-20', note: 'Hadir taklimat' },
        { stage: 'departure', date: '2027-03-14', note: 'Berlepas ke Jeddah' },
        { stage: 'complete', date: '2027-03-28', note: 'Selamat pulang' }
      ],
      payments: [
        { id: 'pay-101', amount: 3000, date: '2026-09-05', type: 'Deposit', reference: 'DEP-001' },
        { id: 'pay-102', amount: 5000, date: '2026-10-15', type: 'Ansuran 1', reference: 'INS-001' },
        { id: 'pay-103', amount: 5000, date: '2026-12-01', type: 'Ansuran 2', reference: 'INS-002' },
        { id: 'pay-104', amount: 2900, date: '2027-01-20', type: 'Baki Penuh', reference: 'BAL-001' }
      ],
      documents: { passport: true, visa: true, medical: true, insurance: true, photo: true },
      emergencyContact: { name: 'Noraini binti Abdullah', relationship: 'Isteri', phoneNumber: '0131234567' },
      activeAgentId: 'agent-1'
    },
    {
      id: 'pilgrim-2',
      fullName: 'Siti Rohani binti Ismail',
      icNumber: '820520-14-6789',
      passportNumber: 'A56789012',
      passportExpiryDate: '2028-11-30',
      phoneNumber: '0132345678',
      visaStatus: 'Approved',
      familyGroupId: 'fam-001',
      packageId: 'pkg-1',
      journeyStage: 'complete',
      journeyHistory: [
        { stage: 'inquiry', date: '2026-09-01', note: 'Pertanyaan bersama suami' },
        { stage: 'registration', date: '2026-09-05', note: 'Daftar bersama keluarga' },
        { stage: 'documents', date: '2026-09-22', note: 'Dokumen lengkap' },
        { stage: 'visa', date: '2026-10-10', note: 'Visa diluluskan' },
        { stage: 'briefing', date: '2027-02-20', note: 'Hadir taklimat' },
        { stage: 'departure', date: '2027-03-14', note: 'Berlepas ke Jeddah' },
        { stage: 'complete', date: '2027-03-28', note: 'Selamat pulang' }
      ],
      payments: [
        { id: 'pay-201', amount: 3000, date: '2026-09-05', type: 'Deposit', reference: 'DEP-002' },
        { id: 'pay-202', amount: 6000, date: '2026-11-01', type: 'Ansuran 1', reference: 'INS-003' },
        { id: 'pay-203', amount: 6900, date: '2027-01-10', type: 'Baki Penuh', reference: 'BAL-002' }
      ],
      documents: { passport: true, visa: true, medical: true, insurance: true, photo: true },
      emergencyContact: { name: 'Ahmad Zulkifli bin Mohd Nasir', relationship: 'Suami', phoneNumber: '0121234567' },
      activeAgentId: 'agent-1'
    },
    // --- 2 at 'departure' ---
    {
      id: 'pilgrim-3',
      fullName: 'Mohd Hafiz bin Ramli',
      icNumber: '850714-08-4321',
      passportNumber: 'A67890123',
      passportExpiryDate: '2029-03-18',
      phoneNumber: '0143456789',
      visaStatus: 'Approved',
      familyGroupId: 'fam-002',
      packageId: 'pkg-4',
      journeyStage: 'departure',
      journeyHistory: [
        { stage: 'inquiry', date: '2026-10-15', note: 'Rujukan dari rakan' },
        { stage: 'registration', date: '2026-10-20', note: 'Pendaftaran selesai' },
        { stage: 'documents', date: '2026-11-05', note: 'Dokumen dihantar' },
        { stage: 'visa', date: '2026-12-01', note: 'Visa approved' },
        { stage: 'briefing', date: '2027-03-25', note: 'Taklimat akhir selesai' },
        { stage: 'departure', date: '2027-04-08', note: 'Sedia untuk berlepas' }
      ],
      payments: [
        { id: 'pay-301', amount: 4000, date: '2026-10-20', type: 'Deposit', reference: 'DEP-003' },
        { id: 'pay-302', amount: 7000, date: '2026-12-15', type: 'Ansuran 1', reference: 'INS-004' },
        { id: 'pay-303', amount: 7500, date: '2027-02-28', type: 'Baki Penuh', reference: 'BAL-003' }
      ],
      documents: { passport: true, visa: true, medical: true, insurance: true, photo: true },
      emergencyContact: { name: 'Fatimah binti Omar', relationship: 'Ibu', phoneNumber: '0154567890' },
      activeAgentId: 'agent-2'
    },
    {
      id: 'pilgrim-4',
      fullName: 'Nurul Aisyah binti Kamal',
      icNumber: '900228-10-7654',
      passportNumber: 'A78901234',
      passportExpiryDate: '2028-06-22',
      phoneNumber: '0154567890',
      visaStatus: 'Approved',
      familyGroupId: 'fam-003',
      packageId: 'pkg-2',
      journeyStage: 'departure',
      journeyHistory: [
        { stage: 'inquiry', date: '2026-11-01', note: 'Pertanyaan online' },
        { stage: 'registration', date: '2026-11-08', note: 'Borang diisi' },
        { stage: 'documents', date: '2026-11-25', note: 'Dokumen siap' },
        { stage: 'visa', date: '2026-12-20', note: 'Visa diluluskan' },
        { stage: 'briefing', date: '2027-05-15', note: 'Taklimat dihadiri' },
        { stage: 'departure', date: '2027-05-30', note: 'Sedia berlepas' }
      ],
      payments: [
        { id: 'pay-401', amount: 2500, date: '2026-11-08', type: 'Deposit', reference: 'DEP-004' },
        { id: 'pay-402', amount: 5000, date: '2027-01-15', type: 'Ansuran 1', reference: 'INS-005' },
        { id: 'pay-403', amount: 5000, date: '2027-04-01', type: 'Baki Penuh', reference: 'BAL-004' }
      ],
      documents: { passport: true, visa: true, medical: true, insurance: true, photo: true },
      emergencyContact: { name: 'Kamal bin Hassan', relationship: 'Bapa', phoneNumber: '0165678901' },
      activeAgentId: 'agent-2'
    },
    // --- 1 at 'briefing' ---
    {
      id: 'pilgrim-5',
      fullName: 'Roslan bin Abdul Rahman',
      icNumber: '750910-04-2345',
      passportNumber: 'A89012345',
      passportExpiryDate: '2028-01-05',
      phoneNumber: '0165678901',
      visaStatus: 'Approved',
      familyGroupId: 'fam-004',
      packageId: 'pkg-3',
      journeyStage: 'briefing',
      journeyHistory: [
        { stage: 'inquiry', date: '2026-12-01', note: 'Walk-in di pejabat' },
        { stage: 'registration', date: '2026-12-10', note: 'Pendaftaran selesai' },
        { stage: 'documents', date: '2027-01-05', note: 'Dokumen dihantar' },
        { stage: 'visa', date: '2027-02-15', note: 'Visa diluluskan' },
        { stage: 'briefing', date: '2027-06-01', note: 'Sesi taklimat dijadualkan' }
      ],
      payments: [
        { id: 'pay-501', amount: 2000, date: '2026-12-10', type: 'Deposit', reference: 'DEP-005' },
        { id: 'pay-502', amount: 3000, date: '2027-02-01', type: 'Ansuran 1', reference: 'INS-006' },
        { id: 'pay-503', amount: 3000, date: '2027-04-15', type: 'Ansuran 2', reference: 'INS-007' }
      ],
      documents: { passport: true, visa: true, medical: true, insurance: true, photo: true },
      emergencyContact: { name: 'Mariam binti Yusof', relationship: 'Isteri', phoneNumber: '0176789012' },
      activeAgentId: 'agent-3'
    },
    // --- 1 at 'visa' ---
    {
      id: 'pilgrim-6',
      fullName: 'Faridah binti Mohd Ali',
      icNumber: '880425-06-8901',
      passportNumber: 'A90123456',
      passportExpiryDate: '2027-09-14',
      phoneNumber: '0176789012',
      visaStatus: 'Document Review',
      familyGroupId: 'fam-005',
      packageId: 'pkg-2',
      journeyStage: 'visa',
      journeyHistory: [
        { stage: 'inquiry', date: '2027-01-10', note: 'Pertanyaan melalui ejen' },
        { stage: 'registration', date: '2027-01-18', note: 'Borang lengkap' },
        { stage: 'documents', date: '2027-02-10', note: 'Dokumen dihantar' },
        { stage: 'visa', date: '2027-03-05', note: 'Menunggu semakan visa' }
      ],
      payments: [
        { id: 'pay-601', amount: 2500, date: '2027-01-18', type: 'Deposit', reference: 'DEP-006' },
        { id: 'pay-602', amount: 3000, date: '2027-03-01', type: 'Ansuran 1', reference: 'INS-008' }
      ],
      documents: { passport: true, visa: false, medical: true, insurance: false, photo: true },
      emergencyContact: { name: 'Mohd Ali bin Hassan', relationship: 'Bapa', phoneNumber: '0187890123' },
      activeAgentId: 'agent-4'
    },
    // --- 2 at 'documents' ---
    {
      id: 'pilgrim-7',
      fullName: 'Ibrahim bin Othman',
      icNumber: '700608-02-1234',
      passportNumber: 'A01234567',
      passportExpiryDate: '2027-07-30',
      phoneNumber: '0187890123',
      visaStatus: 'Not Applied',
      familyGroupId: 'fam-006',
      packageId: 'pkg-3',
      journeyStage: 'documents',
      journeyHistory: [
        { stage: 'inquiry', date: '2027-02-15', note: 'Rujukan anak' },
        { stage: 'registration', date: '2027-02-22', note: 'Pendaftaran selesai' },
        { stage: 'documents', date: '2027-03-10', note: 'Mengumpul dokumen' }
      ],
      payments: [
        { id: 'pay-701', amount: 2000, date: '2027-02-22', type: 'Deposit', reference: 'DEP-007' }
      ],
      documents: { passport: true, visa: false, medical: false, insurance: false, photo: true },
      emergencyContact: { name: 'Zainab binti Ismail', relationship: 'Isteri', phoneNumber: '0198901234' },
      activeAgentId: 'agent-3'
    },
    {
      id: 'pilgrim-8',
      fullName: 'Wan Norsyafiqah binti Wan Ahmad',
      icNumber: '950812-11-5678',
      passportNumber: 'A12345678',
      passportExpiryDate: '2029-04-10',
      phoneNumber: '0198901234',
      visaStatus: 'Not Applied',
      familyGroupId: 'fam-007',
      packageId: 'pkg-4',
      journeyStage: 'documents',
      journeyHistory: [
        { stage: 'inquiry', date: '2027-03-01', note: 'Pertanyaan Instagram' },
        { stage: 'registration', date: '2027-03-08', note: 'Daftar online' },
        { stage: 'documents', date: '2027-03-20', note: 'Dokumen dalam proses' }
      ],
      payments: [
        { id: 'pay-801', amount: 4000, date: '2027-03-08', type: 'Deposit', reference: 'DEP-008' }
      ],
      documents: { passport: true, visa: false, medical: true, insurance: false, photo: false },
      emergencyContact: { name: 'Wan Ahmad bin Wan Hussain', relationship: 'Bapa', phoneNumber: '0121112233' },
      activeAgentId: 'agent-5'
    },
    // --- 2 at 'registration' ---
    {
      id: 'pilgrim-9',
      fullName: 'Azman bin Zakaria',
      icNumber: '810130-05-3456',
      passportNumber: 'A23456789',
      passportExpiryDate: '2028-10-20',
      phoneNumber: '0131122334',
      visaStatus: 'Not Applied',
      familyGroupId: 'fam-008',
      packageId: 'pkg-1',
      journeyStage: 'registration',
      journeyHistory: [
        { stage: 'inquiry', date: '2027-04-01', note: 'Pertanyaan telefon' },
        { stage: 'registration', date: '2027-04-10', note: 'Borang pendaftaran dihantar' }
      ],
      payments: [
        { id: 'pay-901', amount: 3000, date: '2027-04-10', type: 'Deposit', reference: 'DEP-009' }
      ],
      documents: { passport: true, visa: false, medical: false, insurance: false, photo: false },
      emergencyContact: { name: 'Halimah binti Sulaiman', relationship: 'Isteri', phoneNumber: '0142233445' },
      activeAgentId: 'agent-4'
    },
    {
      id: 'pilgrim-10',
      fullName: 'Nur Izzati binti Hamdan',
      icNumber: '930617-03-7890',
      passportNumber: 'A34567890',
      passportExpiryDate: '2029-02-28',
      phoneNumber: '0142233445',
      visaStatus: 'Not Applied',
      familyGroupId: 'fam-008',
      packageId: 'pkg-1',
      journeyStage: 'registration',
      journeyHistory: [
        { stage: 'inquiry', date: '2027-04-01', note: 'Pertanyaan bersama suami' },
        { stage: 'registration', date: '2027-04-10', note: 'Pendaftaran selesai' }
      ],
      payments: [
        { id: 'pay-1001', amount: 3000, date: '2027-04-10', type: 'Deposit', reference: 'DEP-010' }
      ],
      documents: { passport: true, visa: false, medical: false, insurance: false, photo: false },
      emergencyContact: { name: 'Azman bin Zakaria', relationship: 'Suami', phoneNumber: '0131122334' },
      activeAgentId: 'agent-4'
    }
  ],

  leads: [
    // 3 New
    { id: 'lead-1', contactName: 'Haris bin Jaafar', phoneNumber: '0151234567', leadSource: 'Facebook', interestedPackage: 'pkg-1', status: 'New', assignedAgentId: 'agent-1', createdDate: '2027-06-28', lastContactDate: null, estimatedValue: 15900, notes: 'Berminat pakej Ramadan VVIP' },
    { id: 'lead-2', contactName: 'Zahra binti Osman', phoneNumber: '0162345678', leadSource: 'Instagram', interestedPackage: 'pkg-2', status: 'New', assignedAgentId: 'agent-2', createdDate: '2027-06-30', lastContactDate: null, estimatedValue: 12500, notes: 'Tanya harga untuk 4 orang' },
    { id: 'lead-3', contactName: 'Razif bin Sulong', phoneNumber: '0173456789', leadSource: 'Rujukan', interestedPackage: 'pkg-3', status: 'New', assignedAgentId: 'agent-5', createdDate: '2027-07-01', lastContactDate: null, estimatedValue: 8900, notes: 'Dirujuk oleh pelanggan sedia ada' },
    // 2 Contacted
    { id: 'lead-4', contactName: 'Aminah binti Yusuf', phoneNumber: '0184567890', leadSource: 'Walk-in', interestedPackage: 'pkg-4', status: 'Contacted', assignedAgentId: 'agent-3', createdDate: '2027-06-15', lastContactDate: '2027-06-20', estimatedValue: 18500, notes: 'Datang pejabat, minta brosur' },
    { id: 'lead-5', contactName: 'Kamarulzaman bin Musa', phoneNumber: '0195678901', leadSource: 'WhatsApp', interestedPackage: 'pkg-1', status: 'Contacted', assignedAgentId: 'agent-1', createdDate: '2027-06-10', lastContactDate: '2027-06-18', estimatedValue: 15900, notes: 'WhatsApp pertanyaan, sudah diberi info' },
    // 2 Negotiation
    { id: 'lead-6', contactName: 'Rosmah binti Ahmad', phoneNumber: '0126789012', leadSource: 'Facebook', interestedPackage: 'pkg-2', status: 'Negotiation', assignedAgentId: 'agent-2', createdDate: '2027-05-20', lastContactDate: '2027-06-25', estimatedValue: 25000, notes: 'Minta diskaun untuk 2 orang' },
    { id: 'lead-7', contactName: 'Faisal bin Nordin', phoneNumber: '0137890123', leadSource: 'Website', interestedPackage: 'pkg-4', status: 'Negotiation', assignedAgentId: 'agent-4', createdDate: '2027-05-25', lastContactDate: '2027-06-28', estimatedValue: 18500, notes: 'Minta jadual ansuran' },
    // 2 Booked
    { id: 'lead-8', contactName: 'Badrulhisham bin Kassim', phoneNumber: '0148901234', leadSource: 'Rujukan', interestedPackage: 'pkg-3', status: 'Booked', assignedAgentId: 'agent-3', createdDate: '2027-04-10', lastContactDate: '2027-05-15', estimatedValue: 8900, notes: 'Sudah bayar deposit, jadi jemaah' },
    { id: 'lead-9', contactName: 'Tengku Aishah binti T. Razak', phoneNumber: '0159012345', leadSource: 'Instagram', interestedPackage: 'pkg-1', status: 'Booked', assignedAgentId: 'agent-2', createdDate: '2027-04-05', lastContactDate: '2027-05-10', estimatedValue: 15900, notes: 'Confirmed booking, deposit received' },
    // 1 Lost
    { id: 'lead-10', contactName: 'Lim Ah Kow', phoneNumber: '0160123456', leadSource: 'Website', interestedPackage: 'pkg-2', status: 'Lost', assignedAgentId: 'agent-5', createdDate: '2027-03-01', lastContactDate: '2027-04-15', estimatedValue: 12500, notes: 'Pilih agensi lain kerana harga' }
  ],

  activityLog: [
    { id: 'act-1', entityType: 'lead', entityId: 'lead-1', activityType: 'system', description: 'Lead baru ditambah: Haris bin Jaafar', timestamp: '2027-06-28 10:30', agentName: 'Sistem' },
    { id: 'act-2', entityType: 'pilgrim', entityId: 'pilgrim-1', activityType: 'payment', description: 'Bayaran penuh diterima - RM2,900 (Baki Penuh)', timestamp: '2027-01-20 14:15', agentName: 'Mohammad Irfan' },
    { id: 'act-3', entityType: 'lead', entityId: 'lead-6', activityType: 'whatsapp', description: 'WhatsApp susulan mengenai diskaun kumpulan', timestamp: '2027-06-25 09:00', agentName: 'Nurul Hidayah' },
    { id: 'act-4', entityType: 'pilgrim', entityId: 'pilgrim-6', activityType: 'document', description: 'Dokumen visa dihantar untuk semakan', timestamp: '2027-03-05 11:20', agentName: 'Siti Aminah' },
    { id: 'act-5', entityType: 'lead', entityId: 'lead-4', activityType: 'call', description: 'Panggilan susulan - berminat untuk daftar', timestamp: '2027-06-20 16:45', agentName: 'Khairul Anuar' },
    { id: 'act-6', entityType: 'pilgrim', entityId: 'pilgrim-3', activityType: 'status_change', description: 'Status dikemas kini: Taklimat -> Perlepasan', timestamp: '2027-04-08 08:00', agentName: 'Nurul Hidayah' },
    { id: 'act-7', entityType: 'lead', entityId: 'lead-8', activityType: 'payment', description: 'Deposit diterima - lead ditukar ke Booked', timestamp: '2027-05-15 13:30', agentName: 'Khairul Anuar' },
    { id: 'act-8', entityType: 'pilgrim', entityId: 'pilgrim-5', activityType: 'note', description: 'Jemaah minta sesi taklimat tambahan mengenai manasik', timestamp: '2027-06-01 10:00', agentName: 'Khairul Anuar' },
    { id: 'act-9', entityType: 'lead', entityId: 'lead-2', activityType: 'system', description: 'Lead baru ditambah: Zahra binti Osman', timestamp: '2027-06-30 09:15', agentName: 'Sistem' },
    { id: 'act-10', entityType: 'pilgrim', entityId: 'pilgrim-7', activityType: 'assignment', description: 'Jemaah ditugaskan kepada Khairul Anuar', timestamp: '2027-03-10 14:00', agentName: 'Sistem' }
  ],

  templates: {
    passport: 'Assalamualaikum {name},\n\nIni peringatan bahawa pasport anda akan tamat tempoh pada *{expiryDate}*. Sila perbaharui pasport anda secepat mungkin untuk memastikan kelancaran proses Umrah.\n\nTerima kasih.\n- Agensi Umrah Kami',
    visa: 'Assalamualaikum {name},\n\nStatus visa anda sedang dalam proses semakan. Kami akan memaklumkan sebarang perkembangan.\n\nDokumen yang diperlukan:\n- Pasport asal\n- Gambar berukuran pasport\n- Salinan IC\n\nTerima kasih.',
    deposit: 'Assalamualaikum {name},\n\nTerima kasih atas minat anda untuk pakej *{package}*. Deposit sebanyak *RM{deposit}* diperlukan untuk mengesahkan tempahan anda.\n\nSila hubungi kami untuk maklumat lanjut.\n\nJazakallahu khairan.',
    briefing: 'Assalamualaikum {name},\n\nAnda dijemput ke sesi taklimat Umrah pada *{date}* di *{location}*.\n\nSila hadir tepat pada waktunya. Bawa bersama pasport asal dan dokumen berkaitan.\n\nTerima kasih.',
    custom: 'Assalamualaikum {name},\n\n[Tulis mesej anda di sini]\n\nTerima kasih.\n- Agensi Umrah Kami'
  }
};

// ---------------------------------------------------------------------------
// STATE VARIABLES
// ---------------------------------------------------------------------------

let crmData = {};
let chartInstances = {};
let currentTab = 'dashboard';
let pilgrimSearchQuery = '';
let pilgrimFilterStatus = 'all';
let activeLeadId = null;
let activePilgrimId = null;
let activeWAEntityId = null;
let activeReassignId = null;
let activeReassignType = null;

// ---------------------------------------------------------------------------
// STATE MANAGEMENT
// ---------------------------------------------------------------------------

function loadData() {
  const stored = localStorage.getItem('umrahCrmData');
  if (stored) {
    try {
      crmData = JSON.parse(stored);
    } catch (e) {
      crmData = JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
  } else {
    crmData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveData() {
  localStorage.setItem('umrahCrmData', JSON.stringify(crmData));
}

function resetDemoData() {
  if (confirm('Adakah anda pasti mahu reset semua data ke data demo asal? Semua perubahan akan hilang.')) {
    localStorage.removeItem('umrahCrmData');
    location.reload();
  }
}

function exportData() {
  const blob = new Blob([JSON.stringify(crmData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'umrah-crm-export.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Data berjaya dieksport');
}

// ---------------------------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------------------------

function switchTab(tabId) {
  currentTab = tabId;

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.toggle('active', link.dataset.tab === tabId);
  });
  document.querySelectorAll('.screen-view').forEach(view => {
    view.classList.toggle('active', view.id === tabId + '-screen');
  });

  renderActiveTab();
}

function renderActiveTab() {
  switch (currentTab) {
    case 'dashboard': renderDashboard(); break;
    case 'leads': renderLeads(); break;
    case 'pilgrims': renderPilgrims(); break;
    case 'journey': renderJourney(); break;
    case 'finance': renderFinance(); break;
    case 'agents': renderAgents(); break;
  }
}

function setViewMode(mode) {
  const shell = document.getElementById('app-shell');
  if (!shell) return;
  if (mode === 'desktop') {
    shell.classList.add('desktop-mode');
  } else {
    shell.classList.remove('desktop-mode');
  }
  const mobileBtn = document.getElementById('btn-view-mobile');
  const desktopBtn = document.getElementById('btn-view-desktop');
  if (mobileBtn) mobileBtn.classList.toggle('active', mode === 'mobile');
  if (desktopBtn) desktopBtn.classList.toggle('active', mode === 'desktop');
  renderActiveTab();
}

// ---------------------------------------------------------------------------
// UTILITIES
// ---------------------------------------------------------------------------

function getNowFormatted() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const h = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${d} ${h}:${min}`;
}

function formatRM(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return 'RM 0';
  return 'RM ' + amount.toLocaleString('en-MY');
}

function isPassportExpiring(expiryDate) {
  if (!expiryDate) return false;
  const expiry = new Date(expiryDate);
  const earliestDeparture = crmData.packages.reduce((earliest, pkg) => {
    const d = new Date(pkg.departureDate);
    return d < earliest ? d : earliest;
  }, new Date('2999-12-31'));
  const sixMonthsBefore = new Date(earliestDeparture);
  sixMonthsBefore.setMonth(sixMonthsBefore.getMonth() + 6);
  return expiry < sixMonthsBefore;
}

function getPackageName(packageId) {
  const pkg = crmData.packages.find(p => p.id === packageId);
  return pkg ? pkg.name : 'Tiada Pakej';
}

function getPackagePrice(packageId) {
  const pkg = crmData.packages.find(p => p.id === packageId);
  return pkg ? pkg.price : 0;
}

function getAgentName(agentId) {
  const agent = crmData.agents.find(a => a.id === agentId);
  return agent ? agent.name : 'Tiada Ejen';
}

function getAgentFirstName(agentId) {
  const agent = crmData.agents.find(a => a.id === agentId);
  if (!agent) return 'N/A';
  return agent.name.split(' ')[0];
}

function generateId(prefix) {
  return prefix + '-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
}

function daysSince(dateString) {
  if (!dateString) return 999;
  const then = new Date(dateString);
  const now = new Date();
  const diffMs = now - then;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 400);
  }, 2500);
}

function getStageIndex(stageId) {
  return JOURNEY_STAGES.findIndex(s => s.id === stageId);
}

function getTotalPaid(pilgrim) {
  if (!pilgrim.payments || !pilgrim.payments.length) return 0;
  return pilgrim.payments.reduce((sum, p) => sum + p.amount, 0);
}

// ---------------------------------------------------------------------------
// ACTIVITY LOGGING
// ---------------------------------------------------------------------------

function logActivity(entityType, entityId, activityType, description, agentName) {
  crmData.activityLog.push({
    id: generateId('act'),
    entityType: entityType,
    entityId: entityId,
    activityType: activityType,
    description: description,
    timestamp: getNowFormatted(),
    agentName: agentName || 'Sistem'
  });
}

function renderActivityLog(entityType, entityId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const activities = crmData.activityLog
    .filter(a => a.entityType === entityType && a.entityId === entityId)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  if (activities.length === 0) {
    container.innerHTML = '<p class="empty-state-text">Tiada aktiviti direkodkan</p>';
    return;
  }

  container.innerHTML = activities.map(act => {
    const iconClass = ACTIVITY_ICONS[act.activityType] || 'fa-circle';
    const color = ACTIVITY_COLORS[act.activityType] || '#6B7280';
    const isFab = iconClass.startsWith('fab ');
    const iconHtml = isFab
      ? `<i class="${iconClass}" style="color:${color}"></i>`
      : `<i class="fas ${iconClass}" style="color:${color}"></i>`;
    return `
      <div class="activity-item">
        <div class="activity-icon">${iconHtml}</div>
        <div class="activity-content">
          <p class="activity-desc">${act.description}</p>
          <span class="activity-meta">${act.agentName} - ${act.timestamp}</span>
        </div>
      </div>`;
  }).join('');
}

// ---------------------------------------------------------------------------
// DASHBOARD
// ---------------------------------------------------------------------------

function renderDashboard() {
  // KPI calculations
  let totalRevenue = 0;
  let totalOutstanding = 0;
  let activePilgrims = 0;

  crmData.pilgrims.forEach(p => {
    const paid = getTotalPaid(p);
    totalRevenue += paid;
    const price = getPackagePrice(p.packageId);
    const remaining = price - paid;
    if (p.journeyStage !== 'complete' || paid < price) {
      totalOutstanding += Math.max(0, remaining);
    }
    if (p.journeyStage !== 'complete') {
      activePilgrims++;
    }
  });

  const totalLeads = crmData.leads.length;
  const bookedLeads = crmData.leads.filter(l => l.status === 'Booked').length;
  const conversionRate = totalLeads > 0 ? Math.round((bookedLeads / totalLeads) * 100) : 0;

  const elRevenue = document.getElementById('kpi-revenue');
  const elOutstanding = document.getElementById('kpi-outstanding');
  const elPilgrims = document.getElementById('kpi-pilgrims');
  const elConversion = document.getElementById('kpi-conversion');

  if (elRevenue) elRevenue.textContent = formatRM(totalRevenue);
  if (elOutstanding) elOutstanding.textContent = formatRM(totalOutstanding);
  if (elPilgrims) elPilgrims.textContent = activePilgrims;
  if (elConversion) elConversion.textContent = conversionRate + '%';

  renderCharts();
  renderAlerts();
}

// ---------------------------------------------------------------------------
// CHARTS
// ---------------------------------------------------------------------------

function renderCharts() {
  // 1. Lead Funnel (Doughnut)
  const funnelCtx = document.getElementById('chart-funnel');
  if (funnelCtx) {
    if (chartInstances['chart-funnel']) chartInstances['chart-funnel'].destroy();
    const statusCounts = { New: 0, Contacted: 0, Negotiation: 0, Booked: 0, Lost: 0 };
    crmData.leads.forEach(l => { if (statusCounts.hasOwnProperty(l.status)) statusCounts[l.status]++; });
    chartInstances['chart-funnel'] = new Chart(funnelCtx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(statusCounts),
        datasets: [{
          data: Object.values(statusCounts),
          backgroundColor: ['#3B82F6', '#F59E0B', '#8B5CF6', '#10B981', '#EF4444'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { family: 'Plus Jakarta Sans', size: 11 }, padding: 12 } }
        }
      }
    });
  }

  // 2. Monthly Leads (Bar)
  const monthlyCtx = document.getElementById('chart-monthly');
  if (monthlyCtx) {
    if (chartInstances['chart-monthly']) chartInstances['chart-monthly'].destroy();
    const monthLabels = [];
    const monthData = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
      const label = d.toLocaleString('ms-MY', { month: 'short', year: '2-digit' });
      monthLabels.push(label);
      const count = crmData.leads.filter(l => l.createdDate && l.createdDate.startsWith(key)).length;
      monthData.push(count);
    }
    chartInstances['chart-monthly'] = new Chart(monthlyCtx, {
      type: 'bar',
      data: {
        labels: monthLabels,
        datasets: [{
          label: 'Lead Baru',
          data: monthData,
          backgroundColor: '#8B5CF6',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1, font: { family: 'Plus Jakarta Sans' } } },
          x: { ticks: { font: { family: 'Plus Jakarta Sans' } } }
        }
      }
    });
  }

  // 3. Agent Performance (Horizontal Bar)
  const agentsCtx = document.getElementById('chart-agents');
  if (agentsCtx) {
    if (chartInstances['chart-agents']) chartInstances['chart-agents'].destroy();
    const agentNames = crmData.agents.map(a => a.name.split(' ').slice(0, 2).join(' '));
    const agentBookings = crmData.agents.map(a => a.convertedBookings);
    const agentColors = crmData.agents.map(a => a.themeColor);
    chartInstances['chart-agents'] = new Chart(agentsCtx, {
      type: 'bar',
      data: {
        labels: agentNames,
        datasets: [{
          label: 'Tempahan',
          data: agentBookings,
          backgroundColor: agentColors,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, ticks: { font: { family: 'Plus Jakarta Sans' } } },
          y: { ticks: { font: { family: 'Plus Jakarta Sans', size: 11 } } }
        }
      }
    });
  }

  // 4. Revenue by Package (Doughnut)
  const revenueCtx = document.getElementById('chart-revenue');
  if (revenueCtx) {
    if (chartInstances['chart-revenue']) chartInstances['chart-revenue'].destroy();
    const revenueByPkg = {};
    crmData.packages.forEach(pkg => { revenueByPkg[pkg.id] = 0; });
    crmData.pilgrims.forEach(p => {
      const paid = getTotalPaid(p);
      if (revenueByPkg.hasOwnProperty(p.packageId)) {
        revenueByPkg[p.packageId] += paid;
      }
    });
    const pkgLabels = crmData.packages.map(p => p.name);
    const pkgValues = crmData.packages.map(p => revenueByPkg[p.id] || 0);
    chartInstances['chart-revenue'] = new Chart(revenueCtx, {
      type: 'doughnut',
      data: {
        labels: pkgLabels,
        datasets: [{
          data: pkgValues,
          backgroundColor: ['#3B82F6', '#8B5CF6', '#F59E0B', '#EC4899'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { family: 'Plus Jakarta Sans', size: 11 }, padding: 12 } }
        }
      }
    });
  }
}

// ---------------------------------------------------------------------------
// ALERTS
// ---------------------------------------------------------------------------

function renderAlerts() {
  const container = document.getElementById('dashboard-alerts-list');
  if (!container) return;

  const alerts = [];

  // Expiring passports
  crmData.pilgrims.forEach(p => {
    if (isPassportExpiring(p.passportExpiryDate)) {
      alerts.push({
        icon: 'fa-passport',
        color: '#EF4444',
        title: 'Pasport Hampir Tamat',
        desc: `${p.fullName} - tamat ${p.passportExpiryDate}`,
        entityId: p.id,
        phone: p.phoneNumber
      });
    }
  });

  // Pending document review
  crmData.pilgrims.forEach(p => {
    if (p.visaStatus === 'Document Review') {
      alerts.push({
        icon: 'fa-file-alt',
        color: '#F59E0B',
        title: 'Semakan Dokumen Tertunda',
        desc: `${p.fullName} - visa dalam semakan`,
        entityId: p.id,
        phone: p.phoneNumber
      });
    }
  });

  // Untouched leads
  crmData.leads.forEach(l => {
    if (l.status === 'New' && !l.lastContactDate && daysSince(l.createdDate) >= 2) {
      alerts.push({
        icon: 'fa-exclamation-triangle',
        color: '#EF4444',
        title: 'Lead Belum Dihubungi',
        desc: `${l.contactName} - ${daysSince(l.createdDate)} hari tanpa hubungan`,
        entityId: l.id,
        phone: l.phoneNumber
      });
    }
  });

  if (alerts.length === 0) {
    container.innerHTML = '<p class="empty-state-text">Tiada amaran buat masa ini</p>';
    return;
  }

  container.innerHTML = alerts.map(alert => `
    <div class="alert-card">
      <div class="alert-icon" style="color:${alert.color}">
        <i class="fas ${alert.icon}"></i>
      </div>
      <div class="alert-body">
        <strong class="alert-title">${alert.title}</strong>
        <p class="alert-desc">${alert.desc}</p>
      </div>
      <button class="btn-alert-action" onclick="openWhatsAppModal('${alert.entityId}', 'custom')" title="WhatsApp">
        <i class="fab fa-whatsapp"></i>
      </button>
    </div>
  `).join('');
}

// ---------------------------------------------------------------------------
// LEADS (KANBAN)
// ---------------------------------------------------------------------------

function renderLeads() {
  const statuses = ['New', 'Contacted', 'Negotiation', 'Booked', 'Lost'];
  const statusKeys = ['new', 'contacted', 'negotiation', 'booked', 'lost'];

  statusKeys.forEach((key, idx) => {
    const col = document.getElementById('leads-column-' + key);
    const countEl = document.getElementById('leads-count-' + key);
    if (!col) return;

    const filtered = crmData.leads.filter(l => l.status === statuses[idx]);
    if (countEl) countEl.textContent = filtered.length;

    col.innerHTML = filtered.map(lead => {
      const pkgName = getPackageName(lead.interestedPackage);
      const agentFirst = getAgentFirstName(lead.assignedAgentId);
      const agent = crmData.agents.find(a => a.id === lead.assignedAgentId);
      const agentColor = agent ? agent.themeColor : '#6B7280';
      return `
        <div class="lead-card" onclick="openLeadModal('${lead.id}')">
          <h4 class="lead-name">${lead.contactName}</h4>
          <span class="lead-source-tag">${lead.leadSource}</span>
          <p class="lead-package">${pkgName}</p>
          <div class="lead-meta">
            <span class="lead-agent">
              <span class="agent-dot" style="background:${agentColor}"></span>
              ${agentFirst}
            </span>
            <span class="lead-date">${lead.createdDate}</span>
          </div>
          <p class="lead-value">${formatRM(lead.estimatedValue)}</p>
        </div>`;
    }).join('');
  });
}

// ---------------------------------------------------------------------------
// PILGRIMS
// ---------------------------------------------------------------------------

function renderPilgrims() {
  const container = document.getElementById('pilgrims-list-container');
  if (!container) return;

  let filtered = crmData.pilgrims;

  // Search filter
  if (pilgrimSearchQuery) {
    const q = pilgrimSearchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.fullName.toLowerCase().includes(q) ||
      p.passportNumber.toLowerCase().includes(q) ||
      p.icNumber.toLowerCase().includes(q)
    );
  }

  // Status filter
  if (pilgrimFilterStatus !== 'all') {
    switch (pilgrimFilterStatus) {
      case 'visa_approved':
        filtered = filtered.filter(p => p.visaStatus === 'Approved');
        break;
      case 'visa_review':
        filtered = filtered.filter(p => p.visaStatus === 'Document Review');
        break;
      case 'visa_pending':
        filtered = filtered.filter(p => p.visaStatus === 'Not Applied');
        break;
      case 'passport_expiring':
        filtered = filtered.filter(p => isPassportExpiring(p.passportExpiryDate));
        break;
    }
  }

  if (filtered.length === 0) {
    container.innerHTML = '<p class="empty-state-text">Tiada jemaah dijumpai</p>';
    return;
  }

  container.innerHTML = filtered.map(p => {
    const visaClass = p.visaStatus.toLowerCase().replace(/\s+/g, '');
    const visaLabel = p.visaStatus;
    const pkgName = getPackageName(p.packageId);
    const agentFirst = getAgentFirstName(p.activeAgentId);
    const agent = crmData.agents.find(a => a.id === p.activeAgentId);
    const agentColor = agent ? agent.themeColor : '#6B7280';
    const stage = JOURNEY_STAGES.find(s => s.id === p.journeyStage);
    const stageLabel = stage ? stage.label : p.journeyStage;
    const stageColor = stage ? stage.color : '#6B7280';
    const expiryWarning = isPassportExpiring(p.passportExpiryDate)
      ? '<span class="expiry-warning"><i class="fas fa-exclamation-triangle"></i> Hampir tamat</span>'
      : '';

    return `
      <div class="pilgrim-card" onclick="openPilgrimModal('${p.id}')">
        <div class="pilgrim-header">
          <h4 class="pilgrim-name">${p.fullName}</h4>
          <span class="visa-badge ${visaClass}">${visaLabel}</span>
        </div>
        <div class="pilgrim-details">
          <span><i class="fas fa-id-card"></i> ${p.icNumber}</span>
          <span><i class="fas fa-passport"></i> ${p.passportNumber}</span>
          <span><i class="fas fa-calendar"></i> ${p.passportExpiryDate} ${expiryWarning}</span>
          <span><i class="fas fa-box"></i> ${pkgName}</span>
          <span><i class="fas fa-users"></i> ${p.familyGroupId}</span>
        </div>
        <div class="pilgrim-footer">
          <span class="journey-badge" style="background:${stageColor}15;color:${stageColor};border:1px solid ${stageColor}40">
            <i class="fas ${stage ? stage.icon : 'fa-circle'}"></i> ${stageLabel}
          </span>
          <span class="pilgrim-agent">
            <span class="agent-dot" style="background:${agentColor}"></span>
            ${agentFirst}
          </span>
          <div class="pilgrim-actions" onclick="event.stopPropagation()">
            <button class="btn-icon" onclick="openWhatsAppModal('${p.id}', 'custom')" title="WhatsApp">
              <i class="fab fa-whatsapp"></i>
            </button>
            <button class="btn-icon" onclick="openReassignFromPilgrim('${p.id}')" title="Tugaskan Semula">
              <i class="fas fa-user-tag"></i>
            </button>
          </div>
        </div>
      </div>`;
  }).join('');
}

// ---------------------------------------------------------------------------
// JOURNEY PIPELINE
// ---------------------------------------------------------------------------

function renderJourney() {
  // Stage summary bar
  const summaryContainer = document.getElementById('journey-stage-summary');
  if (summaryContainer) {
    summaryContainer.innerHTML = JOURNEY_STAGES.map(stage => {
      const count = crmData.pilgrims.filter(p => p.journeyStage === stage.id).length;
      return `
        <div class="stage-summary-card" style="border-top:3px solid ${stage.color}">
          <i class="fas ${stage.icon}" style="color:${stage.color}"></i>
          <span class="stage-label">${stage.label}</span>
          <span class="stage-count">${count}</span>
        </div>`;
    }).join('');
  }

  // Pipeline
  const pipelineContainer = document.getElementById('journey-pipeline-container');
  if (!pipelineContainer) return;

  pipelineContainer.innerHTML = JOURNEY_STAGES.map(stage => {
    const pilgrims = crmData.pilgrims.filter(p => p.journeyStage === stage.id);
    if (pilgrims.length === 0) return '';

    const stageIdx = getStageIndex(stage.id);
    const totalStages = JOURNEY_STAGES.length;
    const progressPct = Math.round(((stageIdx + 1) / totalStages) * 100);

    const cards = pilgrims.map(p => {
      const lastHistory = p.journeyHistory[p.journeyHistory.length - 1];
      const daysAtStage = lastHistory ? daysSince(lastHistory.date) : 0;
      const pkgName = getPackageName(p.packageId);
      return `
        <div class="pipeline-pilgrim-card">
          <div class="pipeline-pilgrim-info">
            <strong>${p.fullName}</strong>
            <span class="pipeline-pkg">${pkgName}</span>
            <span class="pipeline-days">${daysAtStage} hari di peringkat ini</span>
          </div>
          <div class="pipeline-progress-bar">
            <div class="pipeline-progress-fill" style="width:${progressPct}%;background:${stage.color}"></div>
          </div>
          <button class="btn-sm btn-outline" onclick="openPilgrimModal('${p.id}')">
            <i class="fas fa-eye"></i> Lihat
          </button>
        </div>`;
    }).join('');

    return `
      <div class="pipeline-section">
        <div class="pipeline-header" style="border-left:4px solid ${stage.color}">
          <i class="fas ${stage.icon}" style="color:${stage.color}"></i>
          <span>${stage.label}</span>
          <span class="pipeline-count">${pilgrims.length}</span>
        </div>
        <div class="pipeline-cards">${cards}</div>
      </div>`;
  }).join('');
}

// ---------------------------------------------------------------------------
// FINANCE
// ---------------------------------------------------------------------------

function renderFinance() {
  let totalCollected = 0;
  let totalOutstanding = 0;
  let fullyPaidCount = 0;

  const pilgrimFinanceData = crmData.pilgrims.map(p => {
    const paid = getTotalPaid(p);
    const price = getPackagePrice(p.packageId);
    const remaining = Math.max(0, price - paid);
    totalCollected += paid;
    totalOutstanding += remaining;
    if (paid >= price) fullyPaidCount++;
    return { pilgrim: p, paid, price, remaining };
  });

  const collectionRate = (totalCollected + totalOutstanding) > 0
    ? Math.round((totalCollected / (totalCollected + totalOutstanding)) * 100)
    : 0;

  // Stats
  const statsContainer = document.getElementById('finance-stats-container');
  if (statsContainer) {
    statsContainer.innerHTML = `
      <div class="finance-stat-card" style="border-top:3px solid #10B981">
        <span class="finance-stat-label">Jumlah Kutipan</span>
        <span class="finance-stat-value">${formatRM(totalCollected)}</span>
      </div>
      <div class="finance-stat-card" style="border-top:3px solid #F59E0B">
        <span class="finance-stat-label">Baki Belum Bayar</span>
        <span class="finance-stat-value">${formatRM(totalOutstanding)}</span>
      </div>
      <div class="finance-stat-card" style="border-top:3px solid #3B82F6">
        <span class="finance-stat-label">Kadar Kutipan</span>
        <span class="finance-stat-value">${collectionRate}%</span>
      </div>
      <div class="finance-stat-card" style="border-top:3px solid #8B5CF6">
        <span class="finance-stat-label">Bayar Penuh</span>
        <span class="finance-stat-value">${fullyPaidCount}</span>
      </div>`;
  }

  // Finance chart - Stacked bar per package
  const financeCtx = document.getElementById('chart-finance');
  if (financeCtx) {
    if (chartInstances['chart-finance']) chartInstances['chart-finance'].destroy();

    const pkgCollected = {};
    const pkgOutstanding = {};
    crmData.packages.forEach(pkg => {
      pkgCollected[pkg.id] = 0;
      pkgOutstanding[pkg.id] = 0;
    });
    pilgrimFinanceData.forEach(({ pilgrim, paid, remaining }) => {
      if (pkgCollected.hasOwnProperty(pilgrim.packageId)) {
        pkgCollected[pilgrim.packageId] += paid;
        pkgOutstanding[pilgrim.packageId] += remaining;
      }
    });

    chartInstances['chart-finance'] = new Chart(financeCtx, {
      type: 'bar',
      data: {
        labels: crmData.packages.map(p => p.name),
        datasets: [
          {
            label: 'Kutipan',
            data: crmData.packages.map(p => pkgCollected[p.id] || 0),
            backgroundColor: '#10B981',
            borderRadius: 4
          },
          {
            label: 'Baki',
            data: crmData.packages.map(p => pkgOutstanding[p.id] || 0),
            backgroundColor: '#F59E0B',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { family: 'Plus Jakarta Sans' } } }
        },
        scales: {
          x: { stacked: true, ticks: { font: { family: 'Plus Jakarta Sans', size: 10 } } },
          y: { stacked: true, beginAtZero: true, ticks: { font: { family: 'Plus Jakarta Sans' }, callback: v => formatRM(v) } }
        }
      }
    });
  }

  // Payment table
  const tableBody = document.getElementById('payment-table-body');
  if (tableBody) {
    const allPayments = [];
    crmData.pilgrims.forEach(p => {
      const price = getPackagePrice(p.packageId);
      const totalPaid = getTotalPaid(p);
      const registrationDate = p.journeyHistory && p.journeyHistory.length > 0
        ? p.journeyHistory[0].date
        : null;
      const daysRegistered = registrationDate ? daysSince(registrationDate) : 0;
      const paidPct = price > 0 ? totalPaid / price : 0;

      p.payments.forEach(pay => {
        let statusClass = 'partial';
        let statusLabel = 'Separa';
        if (totalPaid >= price) {
          statusClass = 'paid';
          statusLabel = 'Penuh';
        } else if (daysRegistered >= 30 && paidPct < 0.5) {
          statusClass = 'overdue';
          statusLabel = 'Tertunggak';
        }

        allPayments.push({
          pilgrimName: p.fullName,
          amount: pay.amount,
          type: pay.type,
          date: pay.date,
          reference: pay.reference,
          statusClass,
          statusLabel
        });
      });
    });

    allPayments.sort((a, b) => b.date.localeCompare(a.date));

    if (allPayments.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="5" class="empty-state-text">Tiada rekod bayaran</td></tr>';
    } else {
      tableBody.innerHTML = allPayments.map(pay => `
        <tr>
          <td>${pay.pilgrimName}</td>
          <td>${formatRM(pay.amount)}</td>
          <td><span class="payment-type-badge">${pay.type}</span></td>
          <td>${pay.date}</td>
          <td><span class="payment-status-badge ${pay.statusClass}">${pay.statusLabel}</span></td>
        </tr>
      `).join('');
    }
  }
}

// ---------------------------------------------------------------------------
// AGENTS
// ---------------------------------------------------------------------------

function renderAgents() {
  // Agent detail chart
  const agentDetailCtx = document.getElementById('chart-agent-detail');
  if (agentDetailCtx) {
    if (chartInstances['chart-agent-detail']) chartInstances['chart-agent-detail'].destroy();

    const agentLabels = crmData.agents.map(a => a.name.split(' ').slice(0, 2).join(' '));
    chartInstances['chart-agent-detail'] = new Chart(agentDetailCtx, {
      type: 'bar',
      data: {
        labels: agentLabels,
        datasets: [
          {
            label: 'Lead Aktif',
            data: crmData.agents.map(a => a.activeLeadCount),
            backgroundColor: '#3B82F6',
            borderRadius: 4
          },
          {
            label: 'Tempahan',
            data: crmData.agents.map(a => a.convertedBookings),
            backgroundColor: '#10B981',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { family: 'Plus Jakarta Sans' } } }
        },
        scales: {
          x: { ticks: { font: { family: 'Plus Jakarta Sans', size: 10 } } },
          y: { beginAtZero: true, ticks: { font: { family: 'Plus Jakarta Sans' } } }
        }
      }
    });
  }

  // Agent cards
  const agentsContainer = document.getElementById('agents-list-container');
  if (!agentsContainer) return;

  agentsContainer.innerHTML = crmData.agents.map(agent => {
    const maxBookings = Math.max(...crmData.agents.map(a => a.convertedBookings), 1);
    const progressPct = Math.round((agent.convertedBookings / maxBookings) * 100);
    const initials = agent.name.split(' ').slice(0, 2).map(w => w.charAt(0)).join('');
    const pilgrimCount = crmData.pilgrims.filter(p => p.activeAgentId === agent.id).length;
    const leadCount = crmData.leads.filter(l => l.assignedAgentId === agent.id).length;
    const stars = Array.from({ length: 5 }, (_, i) =>
      i < Math.round(agent.performanceRating)
        ? '<i class="fas fa-star star-filled"></i>'
        : '<i class="fas fa-star star-empty"></i>'
    ).join('');

    return `
      <div class="agent-card" style="border-left:4px solid ${agent.themeColor};cursor:pointer" onclick="openAgentModal('${agent.id}')">
        <div class="agent-avatar" style="background:${agent.themeColor}">${initials}</div>
        <div class="agent-info">
          <h4 class="agent-name">${agent.name}</h4>
          <div class="agent-stars">${stars} <span class="rating-num">${agent.performanceRating}</span></div>
          <div class="agent-stats">
            <span><i class="fas fa-user-friends"></i> Jemaah: ${pilgrimCount}</span>
            <span><i class="fas fa-bullseye"></i> Leads: ${leadCount}</span>
            <span><i class="fas fa-check-double"></i> Tempahan: ${agent.convertedBookings}</span>
          </div>
          <div class="agent-progress-bar">
            <div class="agent-progress-fill" style="width:${progressPct}%;background:${agent.themeColor}"></div>
          </div>
          <span class="agent-phone"><i class="fas fa-phone"></i> ${agent.phone}</span>
        </div>
      </div>`;
  }).join('');
}

// ---------------------------------------------------------------------------
// AGENT DETAIL MODAL
// ---------------------------------------------------------------------------

let activeAgentId = null;

function openAgentModal(agentId) {
  activeAgentId = agentId;
  const agent = crmData.agents.find(a => a.id === agentId);
  if (!agent) return;

  const el = (id) => document.getElementById(id);

  // Title
  el('agent-modal-title').textContent = agent.name;

  // Profile header
  const initials = agent.name.split(' ').slice(0, 2).map(w => w.charAt(0)).join('');
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < Math.round(agent.performanceRating)
      ? '<i class="fas fa-star star-filled"></i>'
      : '<i class="fas fa-star star-empty"></i>'
  ).join('');

  el('agent-modal-profile').innerHTML = `
    <div class="agent-modal-avatar" style="background:${agent.themeColor};border-color:rgba(255,255,255,0.4)">${initials}</div>
    <div class="agent-modal-info">
      <div class="agent-modal-name">${agent.name}</div>
      <div class="agent-modal-phone"><i class="fas fa-phone"></i> ${agent.phone}</div>
      <div class="agent-modal-stars">${stars} <span class="rating-num">${agent.performanceRating}</span></div>
    </div>`;

  // KPIs
  const agentPilgrims = crmData.pilgrims.filter(p => p.activeAgentId === agentId);
  const agentLeads = crmData.leads.filter(l => l.assignedAgentId === agentId);
  const totalRevenue = agentPilgrims.reduce((sum, p) => sum + getTotalPaid(p), 0);

  el('agent-modal-kpis').innerHTML = `
    <div class="agent-kpi-item purple">
      <span class="kpi-num">${agentPilgrims.length}</span>
      <span class="kpi-lbl">Jemaah</span>
    </div>
    <div class="agent-kpi-item blue">
      <span class="kpi-num">${agentLeads.length}</span>
      <span class="kpi-lbl">Leads</span>
    </div>
    <div class="agent-kpi-item green">
      <span class="kpi-num">${formatRM(totalRevenue)}</span>
      <span class="kpi-lbl">Kutipan</span>
    </div>`;

  // Pilgrim list
  const pilgrimListEl = el('agent-pilgrim-list');
  if (agentPilgrims.length === 0) {
    pilgrimListEl.innerHTML = '<div class="agent-empty-state">Tiada jemaah ditugaskan</div>';
  } else {
    pilgrimListEl.innerHTML = agentPilgrims.map(p => {
      const stage = JOURNEY_STAGES.find(s => s.id === p.journeyStage) || JOURNEY_STAGES[0];
      const totalPaid = getTotalPaid(p);
      const pkgPrice = getPackagePrice(p.packageId);
      const paidPct = pkgPrice > 0 ? Math.round((totalPaid / pkgPrice) * 100) : 0;
      const pInitials = p.fullName.split(' ').slice(0, 2).map(w => w.charAt(0)).join('');

      return `
        <div class="agent-client-card" onclick="closeModal('agent-modal');openPilgrimModal('${p.id}')">
          <div class="agent-client-icon" style="background:${stage.color}">${pInitials}</div>
          <div class="agent-client-info">
            <div class="agent-client-name">${p.fullName}</div>
            <div class="agent-client-meta">
              <span><i class="fas fa-box"></i> ${getPackageName(p.packageId)}</span>
              <span><i class="fas fa-receipt"></i> ${formatRM(totalPaid)} / ${formatRM(pkgPrice)} (${paidPct}%)</span>
            </div>
          </div>
          <span class="agent-client-badge stage-${p.journeyStage}">${stage.label}</span>
        </div>`;
    }).join('');
  }

  // Lead list
  const leadListEl = el('agent-lead-list');
  if (agentLeads.length === 0) {
    leadListEl.innerHTML = '<div class="agent-empty-state">Tiada lead ditugaskan</div>';
  } else {
    leadListEl.innerHTML = agentLeads.map(l => {
      const statusClass = l.status.toLowerCase().replace(/\s/g, '');
      const statusMap = { 'New': 'Baru', 'Contacted': 'Dihubungi', 'Negotiation': 'Rundingan', 'Booked': 'Booked', 'Lost': 'Gagal' };
      const lInitials = l.contactName.split(' ').slice(0, 2).map(w => w.charAt(0)).join('');

      return `
        <div class="agent-client-card" onclick="closeModal('agent-modal');openLeadModal('${l.id}')">
          <div class="agent-client-icon" style="background:var(--primary-medium)">${lInitials}</div>
          <div class="agent-client-info">
            <div class="agent-client-name">${l.contactName}</div>
            <div class="agent-client-meta">
              <span><i class="fas fa-box"></i> ${getPackageName(l.interestedPackage)}</span>
              <span><i class="fas fa-calendar"></i> ${l.createdDate}</span>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="agent-client-value">${formatRM(l.estimatedValue)}</span>
            <span class="agent-client-badge lead-${statusClass}">${statusMap[l.status] || l.status}</span>
          </div>
        </div>`;
    }).join('');
  }

  // Activity log - filter by agent's assigned entities
  const agentEntityIds = new Set([
    ...agentPilgrims.map(p => p.id),
    ...agentLeads.map(l => l.id)
  ]);
  const agentActivities = crmData.activityLog
    .filter(a => agentEntityIds.has(a.entityId) || a.agentName === agent.name)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 15);

  const activityContainer = el('agent-activity-log');
  if (agentActivities.length === 0) {
    activityContainer.innerHTML = '<div class="agent-empty-state">Tiada log aktiviti</div>';
  } else {
    activityContainer.innerHTML = agentActivities.map(act => {
      const iconClass = ACTIVITY_ICONS[act.activityType] || 'fa-circle';
      const color = ACTIVITY_COLORS[act.activityType] || '#6B7280';
      const bgColor = color + '20';
      return `
        <div class="activity-item">
          <div class="activity-icon" style="background:${bgColor};color:${color}"><i class="fas ${iconClass}"></i></div>
          <div class="activity-content">
            <div class="activity-desc">${act.description}</div>
            <div class="activity-time">${act.timestamp}</div>
          </div>
        </div>`;
    }).join('');
  }

  // Show modal
  document.getElementById('agent-modal').classList.add('active');
}

// ---------------------------------------------------------------------------
// LEAD MODAL
// ---------------------------------------------------------------------------

function openLeadModal(leadId) {
  activeLeadId = leadId;
  const lead = crmData.leads.find(l => l.id === leadId);
  if (!lead) return;

  const el = (id) => document.getElementById(id);

  el('lead-modal-title').textContent = lead.contactName;
  el('lead-modal-package').textContent = getPackageName(lead.interestedPackage);
  el('lead-modal-phone').textContent = lead.phoneNumber;
  el('lead-modal-source').textContent = lead.leadSource;
  el('lead-modal-date').textContent = lead.createdDate;
  el('lead-modal-value').textContent = formatRM(lead.estimatedValue);

  // Status dropdown
  const statusSelect = el('lead-status-select');
  if (statusSelect) {
    statusSelect.innerHTML = ['New', 'Contacted', 'Negotiation', 'Booked', 'Lost']
      .map(s => `<option value="${s}" ${s === lead.status ? 'selected' : ''}>${s}</option>`)
      .join('');
  }

  // Agent dropdown
  const agentSelect = el('lead-agent-select');
  if (agentSelect) {
    agentSelect.innerHTML = crmData.agents
      .map(a => `<option value="${a.id}" ${a.id === lead.assignedAgentId ? 'selected' : ''}>${a.name}</option>`)
      .join('');
  }

  // Clear note
  const noteInput = el('lead-note-input');
  if (noteInput) noteInput.value = '';

  // Activity log
  renderActivityLog('lead', leadId, 'lead-activity-log');

  // Show modal
  el('lead-modal').classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function saveLeadChanges() {
  const lead = crmData.leads.find(l => l.id === activeLeadId);
  if (!lead) return;

  const el = (id) => document.getElementById(id);
  const newStatus = el('lead-status-select') ? el('lead-status-select').value : lead.status;
  const newAgentId = el('lead-agent-select') ? el('lead-agent-select').value : lead.assignedAgentId;
  const note = el('lead-note-input') ? el('lead-note-input').value.trim() : '';

  // Status change
  if (newStatus !== lead.status) {
    logActivity('lead', lead.id, 'status_change',
      `Status ditukar: ${lead.status} -> ${newStatus}`,
      getAgentFirstName(newAgentId));
    lead.status = newStatus;
    lead.lastContactDate = getNowFormatted().split(' ')[0];
  }

  // Agent change
  if (newAgentId !== lead.assignedAgentId) {
    const oldAgent = crmData.agents.find(a => a.id === lead.assignedAgentId);
    const newAgent = crmData.agents.find(a => a.id === newAgentId);
    if (oldAgent) oldAgent.activeLeadCount = Math.max(0, oldAgent.activeLeadCount - 1);
    if (newAgent) newAgent.activeLeadCount++;
    logActivity('lead', lead.id, 'assignment',
      `Lead ditugaskan kepada ${getAgentName(newAgentId)}`,
      'Sistem');
    lead.assignedAgentId = newAgentId;
  }

  // Note
  if (note) {
    logActivity('lead', lead.id, 'note', note, getAgentFirstName(lead.assignedAgentId));
    lead.lastContactDate = getNowFormatted().split(' ')[0];
  }

  saveData();
  closeModal('lead-modal');
  renderActiveTab();
  generateNotifications();
  showToast('Lead berjaya dikemas kini');
}

// ---------------------------------------------------------------------------
// PILGRIM MODAL
// ---------------------------------------------------------------------------

function openPilgrimModal(pilgrimId) {
  activePilgrimId = pilgrimId;
  const p = crmData.pilgrims.find(pg => pg.id === pilgrimId);
  if (!p) return;

  const el = (id) => document.getElementById(id);

  el('pilgrim-modal-title').textContent = p.fullName;

  // Journey tracker
  const trackerEl = el('pilgrim-journey-tracker');
  if (trackerEl) {
    const currentIdx = getStageIndex(p.journeyStage);
    trackerEl.innerHTML = JOURNEY_STAGES.map((stage, idx) => {
      let stateClass = 'pending';
      if (idx < currentIdx) stateClass = 'complete';
      else if (idx === currentIdx) stateClass = 'active';
      const connector = idx < JOURNEY_STAGES.length - 1
        ? `<div class="tracker-line ${idx < currentIdx ? 'complete' : ''}"></div>`
        : '';
      return `
        <div class="tracker-stage ${stateClass}" title="${stage.label}">
          <div class="tracker-dot" style="${stateClass !== 'pending' ? 'background:' + stage.color : ''}">
            <i class="fas ${stage.icon}"></i>
          </div>
          <span class="tracker-label">${stage.label}</span>
        </div>
        ${connector}`;
    }).join('');
  }

  // Detail grid
  const detailGrid = el('pilgrim-detail-grid');
  if (detailGrid) {
    const pkgName = getPackageName(p.packageId);
    const agentName = getAgentName(p.activeAgentId);
    const expiryWarning = isPassportExpiring(p.passportExpiryDate) ? ' <span class="expiry-warning"><i class="fas fa-exclamation-triangle"></i></span>' : '';
    detailGrid.innerHTML = `
      <div class="detail-item"><span class="detail-label">No. IC</span><span class="detail-value">${p.icNumber}</span></div>
      <div class="detail-item"><span class="detail-label">Pasport</span><span class="detail-value">${p.passportNumber}</span></div>
      <div class="detail-item"><span class="detail-label">Tamat Pasport</span><span class="detail-value">${p.passportExpiryDate}${expiryWarning}</span></div>
      <div class="detail-item"><span class="detail-label">Telefon</span><span class="detail-value">${p.phoneNumber}</span></div>
      <div class="detail-item"><span class="detail-label">Pakej</span><span class="detail-value">${pkgName}</span></div>
      <div class="detail-item"><span class="detail-label">Kumpulan</span><span class="detail-value">${p.familyGroupId}</span></div>
      <div class="detail-item"><span class="detail-label">Ejen</span><span class="detail-value">${agentName}</span></div>
      <div class="detail-item"><span class="detail-label">Visa</span><span class="detail-value">${p.visaStatus}</span></div>
      <div class="detail-item"><span class="detail-label">Kecemasan</span><span class="detail-value">${p.emergencyContact.name} (${p.emergencyContact.relationship}) - ${p.emergencyContact.phoneNumber}</span></div>
    `;
  }

  // Document checklist
  const docList = el('pilgrim-doc-list');
  if (docList) {
    const docs = [
      { key: 'passport', label: 'Pasport' },
      { key: 'visa', label: 'Visa' },
      { key: 'medical', label: 'Laporan Perubatan' },
      { key: 'insurance', label: 'Insurans' },
      { key: 'photo', label: 'Gambar' }
    ];
    docList.innerHTML = docs.map(d => {
      const done = p.documents[d.key];
      return `
        <div class="doc-item ${done ? 'doc-complete' : 'doc-missing'}">
          <i class="fas ${done ? 'fa-check-circle' : 'fa-times-circle'}"></i>
          <span>${d.label}</span>
        </div>`;
    }).join('');
  }

  // Payment history
  const payHistory = el('pilgrim-payment-history');
  if (payHistory) {
    const price = getPackagePrice(p.packageId);
    const totalPaid = getTotalPaid(p);
    const remaining = Math.max(0, price - totalPaid);
    let html = `
      <div class="payment-summary">
        <span>Harga Pakej: <strong>${formatRM(price)}</strong></span>
        <span>Telah Bayar: <strong style="color:#10B981">${formatRM(totalPaid)}</strong></span>
        <span>Baki: <strong style="color:${remaining > 0 ? '#EF4444' : '#10B981'}">${formatRM(remaining)}</strong></span>
      </div>`;
    if (p.payments.length > 0) {
      html += '<div class="payment-list">';
      p.payments.sort((a, b) => b.date.localeCompare(a.date)).forEach(pay => {
        html += `
          <div class="payment-item">
            <span class="payment-type-tag">${pay.type}</span>
            <span class="payment-amount">${formatRM(pay.amount)}</span>
            <span class="payment-date">${pay.date}</span>
            <span class="payment-ref">${pay.reference}</span>
          </div>`;
      });
      html += '</div>';
    } else {
      html += '<p class="empty-state-text">Tiada rekod bayaran</p>';
    }
    payHistory.innerHTML = html;
  }

  // Activity log
  renderActivityLog('pilgrim', pilgrimId, 'pilgrim-activity-log');

  // Show modal
  el('pilgrim-modal').classList.add('active');
}

// ---------------------------------------------------------------------------
// ADD LEAD MODAL
// ---------------------------------------------------------------------------

function openAddLeadModal() {
  const el = (id) => document.getElementById(id);
  const pkgSelect = el('new-lead-package');
  if (pkgSelect) {
    pkgSelect.innerHTML = '<option value="">Pilih Pakej</option>' +
      crmData.packages.map(p => `<option value="${p.id}">${p.name} - ${formatRM(p.price)}</option>`).join('');
  }
  if (el('new-lead-name')) el('new-lead-name').value = '';
  if (el('new-lead-phone')) el('new-lead-phone').value = '';
  if (el('new-lead-source')) el('new-lead-source').value = 'WhatsApp';
  if (el('new-lead-notes')) el('new-lead-notes').value = '';

  el('add-lead-modal').classList.add('active');
}

function addNewLead() {
  const el = (id) => document.getElementById(id);
  const name = el('new-lead-name') ? el('new-lead-name').value.trim() : '';
  const phone = el('new-lead-phone') ? el('new-lead-phone').value.trim() : '';
  const source = el('new-lead-source') ? el('new-lead-source').value : 'WhatsApp';
  const packageId = el('new-lead-package') ? el('new-lead-package').value : '';
  const notes = el('new-lead-notes') ? el('new-lead-notes').value.trim() : '';

  if (!name) { showToast('Sila masukkan nama'); return; }
  if (!phone) { showToast('Sila masukkan nombor telefon'); return; }

  // Auto-assign to agent with fewest leads
  const sortedAgents = [...crmData.agents].sort((a, b) => a.activeLeadCount - b.activeLeadCount);
  const assignedAgent = sortedAgents[0];

  const pkg = crmData.packages.find(p => p.id === packageId);
  const estimatedValue = pkg ? pkg.price : 0;

  const newLead = {
    id: generateId('lead'),
    contactName: name,
    phoneNumber: phone,
    leadSource: source,
    interestedPackage: packageId,
    status: 'New',
    assignedAgentId: assignedAgent.id,
    createdDate: getNowFormatted().split(' ')[0],
    lastContactDate: null,
    estimatedValue: estimatedValue,
    notes: notes
  };

  crmData.leads.push(newLead);
  logActivity('lead', newLead.id, 'system', `Lead baru ditambah: ${name}`, 'Sistem');
  assignedAgent.activeLeadCount++;

  saveData();
  closeModal('add-lead-modal');
  switchTab('leads');
  showToast('Lead baru berjaya ditambah');
}

// ---------------------------------------------------------------------------
// ADD PILGRIM MODAL
// ---------------------------------------------------------------------------

function openAddPilgrimModal() {
  const el = (id) => document.getElementById(id);
  const pkgSelect = el('new-pilgrim-package');
  if (pkgSelect) {
    pkgSelect.innerHTML = '<option value="">Pilih Pakej</option>' +
      crmData.packages.map(p => `<option value="${p.id}">${p.name} - ${formatRM(p.price)}</option>`).join('');
  }
  ['new-pilgrim-name', 'new-pilgrim-ic', 'new-pilgrim-passport', 'new-pilgrim-passport-expiry',
    'new-pilgrim-phone', 'new-pilgrim-group', 'new-pilgrim-emergency-name',
    'new-pilgrim-emergency-rel', 'new-pilgrim-emergency-phone'].forEach(id => {
    if (el(id)) el(id).value = '';
  });

  el('add-pilgrim-modal').classList.add('active');
}

function addNewPilgrim() {
  const el = (id) => document.getElementById(id);
  const name = el('new-pilgrim-name') ? el('new-pilgrim-name').value.trim() : '';
  const ic = el('new-pilgrim-ic') ? el('new-pilgrim-ic').value.trim() : '';
  const passport = el('new-pilgrim-passport') ? el('new-pilgrim-passport').value.trim() : '';
  const passportExpiry = el('new-pilgrim-passport-expiry') ? el('new-pilgrim-passport-expiry').value : '';
  const phone = el('new-pilgrim-phone') ? el('new-pilgrim-phone').value.trim() : '';
  const packageId = el('new-pilgrim-package') ? el('new-pilgrim-package').value : '';
  const group = el('new-pilgrim-group') ? el('new-pilgrim-group').value.trim() : '';
  const emergName = el('new-pilgrim-emergency-name') ? el('new-pilgrim-emergency-name').value.trim() : '';
  const emergRel = el('new-pilgrim-emergency-rel') ? el('new-pilgrim-emergency-rel').value.trim() : '';
  const emergPhone = el('new-pilgrim-emergency-phone') ? el('new-pilgrim-emergency-phone').value.trim() : '';

  if (!name) { showToast('Sila masukkan nama penuh'); return; }
  if (!ic) { showToast('Sila masukkan nombor IC'); return; }
  if (!passport) { showToast('Sila masukkan nombor pasport'); return; }

  // Auto-assign agent with fewest leads
  const sortedAgents = [...crmData.agents].sort((a, b) => a.activeLeadCount - b.activeLeadCount);
  const assignedAgent = sortedAgents[0];

  const newPilgrim = {
    id: generateId('pilgrim'),
    fullName: name,
    icNumber: ic,
    passportNumber: passport,
    passportExpiryDate: passportExpiry || '2029-01-01',
    phoneNumber: phone,
    visaStatus: 'Not Applied',
    familyGroupId: group || generateId('fam'),
    packageId: packageId,
    journeyStage: 'inquiry',
    journeyHistory: [
      { stage: 'inquiry', date: getNowFormatted().split(' ')[0], note: 'Pendaftaran baru melalui sistem' }
    ],
    payments: [],
    documents: { passport: false, visa: false, medical: false, insurance: false, photo: false },
    emergencyContact: {
      name: emergName || 'N/A',
      relationship: emergRel || 'N/A',
      phoneNumber: emergPhone || 'N/A'
    },
    activeAgentId: assignedAgent.id
  };

  crmData.pilgrims.push(newPilgrim);
  logActivity('pilgrim', newPilgrim.id, 'system', `Jemaah baru didaftarkan: ${name}`, 'Sistem');
  saveData();
  closeModal('add-pilgrim-modal');
  switchTab('pilgrims');
  showToast('Jemaah baru berjaya didaftarkan');
}

// ---------------------------------------------------------------------------
// PAYMENT MODAL
// ---------------------------------------------------------------------------

function openPaymentModal(prefillPilgrimId) {
  const el = (id) => document.getElementById(id);
  const pilgrimSelect = el('payment-pilgrim-select');
  if (pilgrimSelect) {
    pilgrimSelect.innerHTML = '<option value="">Pilih Jemaah</option>' +
      crmData.pilgrims.map(p => {
        const price = getPackagePrice(p.packageId);
        const paid = getTotalPaid(p);
        const remaining = Math.max(0, price - paid);
        return `<option value="${p.id}" ${p.id === prefillPilgrimId ? 'selected' : ''}>${p.fullName} (Baki: ${formatRM(remaining)})</option>`;
      }).join('');
  }
  if (el('payment-amount')) el('payment-amount').value = '';
  if (el('payment-type')) el('payment-type').value = 'Deposit';
  if (el('payment-reference')) el('payment-reference').value = '';

  el('payment-modal').classList.add('active');
}

function openPaymentForPilgrim() {
  closeModal('pilgrim-modal');
  openPaymentModal(activePilgrimId);
}

function recordPayment() {
  const el = (id) => document.getElementById(id);
  const pilgrimId = el('payment-pilgrim-select') ? el('payment-pilgrim-select').value : '';
  const amount = el('payment-amount') ? parseFloat(el('payment-amount').value) : 0;
  const type = el('payment-type') ? el('payment-type').value : 'Bayaran';
  const reference = el('payment-reference') ? el('payment-reference').value.trim() : '';

  if (!pilgrimId) { showToast('Sila pilih jemaah'); return; }
  if (!amount || amount <= 0) { showToast('Sila masukkan jumlah yang sah'); return; }

  const pilgrim = crmData.pilgrims.find(p => p.id === pilgrimId);
  if (!pilgrim) return;

  const payment = {
    id: generateId('pay'),
    amount: amount,
    date: getNowFormatted().split(' ')[0],
    type: type,
    reference: reference || generateId('REF')
  };

  pilgrim.payments.push(payment);

  const agentName = getAgentFirstName(pilgrim.activeAgentId);
  logActivity('pilgrim', pilgrimId, 'payment',
    `Bayaran diterima: ${formatRM(amount)} (${type})`,
    agentName);

  // Check if fully paid
  const price = getPackagePrice(pilgrim.packageId);
  const totalPaid = getTotalPaid(pilgrim);
  if (totalPaid >= price) {
    logActivity('pilgrim', pilgrimId, 'system',
      `Bayaran penuh tercapai - ${formatRM(totalPaid)} / ${formatRM(price)}`,
      'Sistem');
  }

  saveData();
  closeModal('payment-modal');
  renderActiveTab();
  showToast(`Bayaran ${formatRM(amount)} berjaya direkodkan`);
}

// ---------------------------------------------------------------------------
// WHATSAPP MODAL
// ---------------------------------------------------------------------------

function openWhatsAppModal(entityId, templateType) {
  activeWAEntityId = entityId;
  const el = (id) => document.getElementById(id);

  // Find entity (try pilgrim first, then lead)
  let entity = crmData.pilgrims.find(p => p.id === entityId);
  let entityName = entity ? entity.fullName : '';
  if (!entity) {
    const lead = crmData.leads.find(l => l.id === entityId);
    if (lead) {
      entityName = lead.contactName;
      entity = lead;
    }
  }

  el('wa-modal-title').textContent = `WhatsApp: ${entityName}`;

  const templateSelect = el('wa-template-select');
  if (templateSelect) {
    templateSelect.innerHTML = Object.keys(crmData.templates)
      .map(key => `<option value="${key}" ${key === templateType ? 'selected' : ''}>${key.charAt(0).toUpperCase() + key.slice(1)}</option>`)
      .join('');
  }

  generateWAPreview();
  el('whatsapp-modal').classList.add('active');
}

function openWhatsAppFromPilgrim() {
  closeModal('pilgrim-modal');
  openWhatsAppModal(activePilgrimId, 'custom');
}

function generateWAPreview() {
  const el = (id) => document.getElementById(id);
  const templateSelect = el('wa-template-select');
  if (!templateSelect) return;

  const templateKey = templateSelect.value;
  let template = crmData.templates[templateKey] || crmData.templates.custom;

  // Find entity data for placeholder replacement
  let entity = crmData.pilgrims.find(p => p.id === activeWAEntityId);
  let name = '';
  let expiryDate = '';
  let packageName = '';
  let deposit = '';

  if (entity) {
    name = entity.fullName;
    expiryDate = entity.passportExpiryDate || '';
    const pkg = crmData.packages.find(p => p.id === entity.packageId);
    packageName = pkg ? pkg.name : '';
    deposit = pkg ? pkg.deposit.toLocaleString() : '';
  } else {
    const lead = crmData.leads.find(l => l.id === activeWAEntityId);
    if (lead) {
      name = lead.contactName;
      const pkg = crmData.packages.find(p => p.id === lead.interestedPackage);
      packageName = pkg ? pkg.name : '';
      deposit = pkg ? pkg.deposit.toLocaleString() : '';
    }
  }

  template = template
    .replace(/\{name\}/g, name)
    .replace(/\{expiryDate\}/g, expiryDate)
    .replace(/\{package\}/g, packageName)
    .replace(/\{deposit\}/g, deposit)
    .replace(/\{date\}/g, getNowFormatted().split(' ')[0])
    .replace(/\{location\}/g, 'Pejabat Agensi Umrah');

  const textarea = el('wa-preview-text');
  if (textarea) textarea.value = template;

  updateWABubble();
}

function updateWABubble() {
  const el = (id) => document.getElementById(id);
  const textarea = el('wa-preview-text');
  const bubble = el('wa-bubble-content');
  if (!textarea || !bubble) return;

  let text = textarea.value;
  // Replace *text* with <strong>
  text = text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
  // Replace newlines with <br>
  text = text.replace(/\n/g, '<br>');
  bubble.innerHTML = text;
}

function sendMockWhatsApp() {
  const el = (id) => document.getElementById(id);
  const message = el('wa-preview-text') ? el('wa-preview-text').value.substring(0, 100) : '';

  // Try to get agent name
  let agentName = 'Sistem';
  const pilgrim = crmData.pilgrims.find(p => p.id === activeWAEntityId);
  if (pilgrim) {
    agentName = getAgentFirstName(pilgrim.activeAgentId);
    logActivity('pilgrim', activeWAEntityId, 'whatsapp',
      `WhatsApp dihantar: ${message}...`, agentName);
  } else {
    const lead = crmData.leads.find(l => l.id === activeWAEntityId);
    if (lead) {
      agentName = getAgentFirstName(lead.assignedAgentId);
      logActivity('lead', activeWAEntityId, 'whatsapp',
        `WhatsApp dihantar: ${message}...`, agentName);
      if (lead.status === 'New') {
        lead.lastContactDate = getNowFormatted().split(' ')[0];
      }
    }
  }

  saveData();
  showToast('WhatsApp berjaya dihantar (simulasi)');
  closeModal('whatsapp-modal');
  renderActiveTab();
}

// ---------------------------------------------------------------------------
// REASSIGN MODAL
// ---------------------------------------------------------------------------

function openReassignFromPilgrim(pilgrimId) {
  const id = pilgrimId || activePilgrimId;
  activeReassignId = id;
  activeReassignType = 'pilgrim';

  const el = (elId) => document.getElementById(elId);
  const pilgrim = crmData.pilgrims.find(p => p.id === id);
  if (!pilgrim) return;

  el('reassign-modal-title').textContent = `Tugaskan Semula: ${pilgrim.fullName}`;

  const agentSelect = el('reassign-agent-select');
  if (agentSelect) {
    agentSelect.innerHTML = crmData.agents
      .map(a => `<option value="${a.id}" ${a.id === pilgrim.activeAgentId ? 'selected' : ''}>${a.name} (${a.activeLeadCount} lead)</option>`)
      .join('');
  }

  const reasonInput = el('reassign-reason');
  if (reasonInput) reasonInput.value = '';

  el('reassign-modal').classList.add('active');
}

function saveReassignment() {
  const el = (id) => document.getElementById(id);
  const newAgentId = el('reassign-agent-select') ? el('reassign-agent-select').value : '';
  const reason = el('reassign-reason') ? el('reassign-reason').value.trim() : '';

  if (activeReassignType === 'pilgrim') {
    const pilgrim = crmData.pilgrims.find(p => p.id === activeReassignId);
    if (!pilgrim) return;

    if (newAgentId !== pilgrim.activeAgentId) {
      const oldAgentName = getAgentName(pilgrim.activeAgentId);
      const newAgentName = getAgentName(newAgentId);
      pilgrim.activeAgentId = newAgentId;
      logActivity('pilgrim', pilgrim.id, 'assignment',
        `Ditugaskan semula dari ${oldAgentName} kepada ${newAgentName}${reason ? '. Sebab: ' + reason : ''}`,
        'Sistem');
    }
  }

  saveData();
  closeModal('reassign-modal');
  closeModal('pilgrim-modal');
  renderActiveTab();
  showToast('Tugasan berjaya dikemas kini');
}

// ---------------------------------------------------------------------------
// NOTIFICATIONS
// ---------------------------------------------------------------------------

function toggleNotifications() {
  const panel = document.getElementById('notification-panel');
  if (panel) panel.classList.toggle('active');
}

function generateNotifications() {
  const notifications = [];

  // 1. Expiring passports
  crmData.pilgrims.forEach(p => {
    if (isPassportExpiring(p.passportExpiryDate)) {
      notifications.push({
        icon: 'fa-passport',
        color: '#EF4444',
        title: 'Pasport Hampir Tamat',
        desc: `${p.fullName} - ${p.passportExpiryDate}`,
        time: 'Segera'
      });
    }
  });

  // 2. Leads not contacted 48+ hours
  crmData.leads.forEach(l => {
    if ((l.status === 'New' || l.status === 'Contacted') && daysSince(l.lastContactDate || l.createdDate) >= 2) {
      notifications.push({
        icon: 'fa-clock',
        color: '#F59E0B',
        title: 'Lead Perlu Susulan',
        desc: `${l.contactName} - ${daysSince(l.lastContactDate || l.createdDate)} hari tanpa hubungan`,
        time: l.lastContactDate || l.createdDate
      });
    }
  });

  // 3. Pending visa reviews
  crmData.pilgrims.forEach(p => {
    if (p.visaStatus === 'Document Review') {
      notifications.push({
        icon: 'fa-file-alt',
        color: '#8B5CF6',
        title: 'Visa Dalam Semakan',
        desc: `${p.fullName} - menunggu kelulusan`,
        time: 'Dalam proses'
      });
    }
  });

  // 4. Overdue payments (registered 30+ days, paid < 50%)
  crmData.pilgrims.forEach(p => {
    const price = getPackagePrice(p.packageId);
    const paid = getTotalPaid(p);
    const regDate = p.journeyHistory && p.journeyHistory.length > 0 ? p.journeyHistory[0].date : null;
    if (price > 0 && paid / price < 0.5 && regDate && daysSince(regDate) >= 30 && p.journeyStage !== 'complete') {
      notifications.push({
        icon: 'fa-exclamation-circle',
        color: '#EF4444',
        title: 'Bayaran Tertunggak',
        desc: `${p.fullName} - ${Math.round((paid / price) * 100)}% dibayar (${daysSince(regDate)} hari)`,
        time: 'Tertunggak'
      });
    }
  });

  // 5. Upcoming departures (< 60 days)
  const now = new Date();
  crmData.packages.forEach(pkg => {
    const depDate = new Date(pkg.departureDate);
    const daysUntil = Math.floor((depDate - now) / (1000 * 60 * 60 * 24));
    if (daysUntil > 0 && daysUntil <= 60) {
      const pilgrimsInPkg = crmData.pilgrims.filter(p => p.packageId === pkg.id && p.journeyStage !== 'complete');
      if (pilgrimsInPkg.length > 0) {
        notifications.push({
          icon: 'fa-plane-departure',
          color: '#6366F1',
          title: 'Perlepasan Hampir',
          desc: `${pkg.name} - ${daysUntil} hari lagi (${pilgrimsInPkg.length} jemaah)`,
          time: pkg.departureDate
        });
      }
    }
  });

  // Render
  const notifList = document.getElementById('notif-list');
  const badge = document.getElementById('notif-badge');

  if (badge) {
    badge.textContent = notifications.length;
    badge.style.display = notifications.length > 0 ? 'flex' : 'none';
  }

  if (notifList) {
    if (notifications.length === 0) {
      notifList.innerHTML = '<p class="empty-state-text">Tiada notifikasi</p>';
    } else {
      notifList.innerHTML = notifications.map(n => `
        <div class="notif-item">
          <div class="notif-icon" style="color:${n.color}">
            <i class="fas ${n.icon}"></i>
          </div>
          <div class="notif-content">
            <strong class="notif-title">${n.title}</strong>
            <p class="notif-desc">${n.desc}</p>
            <span class="notif-time">${n.time}</span>
          </div>
        </div>
      `).join('');
    }
  }
}

// ---------------------------------------------------------------------------
// DOM CONTENT LOADED - EVENT LISTENERS
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Load data
  loadData();

  // Tab navigation (mobile bottom tabs)
  document.querySelectorAll('.tab-btn').forEach(btn =>
    btn.addEventListener('click', () => switchTab(btn.dataset.tab))
  );

  // Sidebar navigation (desktop)
  document.querySelectorAll('.sidebar-link[data-tab]').forEach(link =>
    link.addEventListener('click', () => switchTab(link.dataset.tab))
  );

  // Pilgrim search
  const searchInput = document.getElementById('pilgrim-search');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      pilgrimSearchQuery = e.target.value;
      renderPilgrims();
    });
  }

  // Filter chips
  document.querySelectorAll('.filter-chip').forEach(chip =>
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      pilgrimFilterStatus = chip.dataset.filter;
      renderPilgrims();
    })
  );

  // View mode switcher
  const mobileBtn = document.getElementById('btn-view-mobile');
  const desktopBtn = document.getElementById('btn-view-desktop');
  if (mobileBtn) mobileBtn.addEventListener('click', () => setViewMode('mobile'));
  if (desktopBtn) desktopBtn.addEventListener('click', () => setViewMode('desktop'));

  // WhatsApp template change
  const waTemplateSelect = document.getElementById('wa-template-select');
  if (waTemplateSelect) {
    waTemplateSelect.addEventListener('change', generateWAPreview);
  }

  // WhatsApp preview text change
  const waPreviewText = document.getElementById('wa-preview-text');
  if (waPreviewText) {
    waPreviewText.addEventListener('input', updateWABubble);
  }

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  // Initialize
  switchTab('dashboard');
  setViewMode('mobile');
  generateNotifications();
});
