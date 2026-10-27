/**
 * XO PS Lounge - Main Application Controller
 * Handles Booking Flow with Vouchers, "The Rest" Café System, Customer Accounts & ID,
 * PlayStation Startup Audio Synthesizer, and LocalStorage Persistence.
 * (WhatsApp completely removed as requested)
 */

// Sound Synthesizer using Web Audio API
class SoundFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.hasPlayedStartup = false;
    }

    init() {
        if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Classic PlayStation Ambient Startup Chime & Deep Resonance
    playPlayStationStartup() {
        if (!this.enabled || this.hasPlayedStartup) return;
        this.init();
        if (!this.ctx) return;

        try {
            this.hasPlayedStartup = true;
            const now = this.ctx.currentTime;

            // 1. Deep resonant bass drone (Power-on ambient swell)
            const bassOsc = this.ctx.createOscillator();
            const bassGain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            bassOsc.type = 'sawtooth';
            bassOsc.frequency.setValueAtTime(55, now); // A1
            bassOsc.frequency.exponentialRampToValueAtTime(110, now + 1.2);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(160, now);
            filter.frequency.exponentialRampToValueAtTime(750, now + 1.4);
            filter.frequency.exponentialRampToValueAtTime(220, now + 3.4);

            bassGain.gain.setValueAtTime(0.001, now);
            bassGain.gain.exponentialRampToValueAtTime(0.2, now + 0.5);
            bassGain.gain.exponentialRampToValueAtTime(0.001, now + 3.6);

            bassOsc.connect(filter);
            filter.connect(bassGain);
            bassGain.connect(this.ctx.destination);
            bassOsc.start(now);
            bassOsc.stop(now + 3.6);

            // 2. Shimmering Ethereal PlayStation Startup Chord (F# major 9 crystalline chord)
            const chordFreqs = [369.99, 466.16, 554.37, 739.99, 830.61]; // F#4, A#4, C#5, F#5, G#5
            chordFreqs.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                const startTime = now + 0.35 + (idx * 0.04);
                osc.frequency.setValueAtTime(freq, startTime);

                gain.gain.setValueAtTime(0.0001, startTime);
                gain.gain.exponentialRampToValueAtTime(0.11 - (idx * 0.015), startTime + 0.22);
                gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 3.2);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 3.2);
            });
        } catch (e) {
            console.warn("Audio Context startup note:", e);
        }
    }

    playClick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(700, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(350, this.ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        } catch (e) {}
    }

    playSuccess() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const freqs = [440.00, 554.37, 659.25, 880.00]; // A4, C#5, E5, A5
            freqs.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.08);
                gain.gain.setValueAtTime(0.12, now + idx * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.28);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + idx * 0.08);
                osc.stop(now + idx * 0.08 + 0.28);
            });
        } catch (e) {}
    }

    playCoin() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.setValueAtTime(1174.66, now + 0.08); // D6
            gain.gain.setValueAtTime(0.14, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.3);
        } catch (e) {}
    }

    playChime() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, now); // D5
            osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.3);
        } catch (e) {}
    }
}

const sfx = new SoundFX();
var activeGalleryFilter = 'all';

// Main App Store
const appState = {
    currentUser: null,
    cart: [], // The Rest in-room café cart
    activeRoomForRest: 1, // Default room selected for ordering
    appliedVoucher: null, // Active voucher applied to current booking
    bookingDraft: {
        step: 1,
        customerName: "",
        customerPhone: "",
        customerId: "",
        roomId: 1,
        hours: 2,
        players: 2,
        date: new Date().toISOString().split('T')[0],
        time: "18:00",
        paymentMethod: "كاش في الاستقبال",
        voucherCode: ""
    },
    filterRoom: 'all',
    filterCategory: 'all'
};

// LocalStorage Persistence Helpers
const Storage = {
    getUsers() {
        const users = localStorage.getItem('xops_users');
        if (users) return JSON.parse(users);
        const defaultUsers = [
            {
                id: "XO-7821",
                name: "ياسين أحمد",
                phone: "01099887766",
                points: 340,
                tier: "عضو VIP ذهبي",
                totalHours: 18,
                createdAt: "2024-01-15"
            }
        ];
        localStorage.setItem('xops_users', JSON.stringify(defaultUsers));
        return defaultUsers;
    },
    saveUser(user) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === user.id || u.phone === user.phone);
        if (index >= 0) {
            users[index] = { ...users[index], ...user };
        } else {
            users.push(user);
        }
        localStorage.setItem('xops_users', JSON.stringify(users));
    },
    getBookings() {
        const b = localStorage.getItem('xops_bookings');
        return b ? JSON.parse(b) : [
            {
                id: "BK-90214",
                customerId: "XO-7821",
                customerName: "ياسين أحمد",
                customerPhone: "01099887766",
                roomId: 1,
                roomName: "روم 1 - القعدة العربية الملكية",
                consoleType: "PS5",
                ratePerHour: 100,
                hours: 2,
                players: 2,
                discount: 0,
                totalPrice: 400,
                date: "2024-10-14",
                time: "20:00",
                paymentMethod: "كاش في الاستقبال",
                status: "مؤكد",
                createdAt: new Date().toISOString()
            }
        ];
    },
    saveBooking(booking) {
        const bookings = this.getBookings();
        bookings.unshift(booking);
        localStorage.setItem('xops_bookings', JSON.stringify(bookings));
    },
    getOrders() {
        const o = localStorage.getItem('xops_rest_orders');
        return o ? JSON.parse(o) : [];
    },
    saveOrder(order) {
        const orders = this.getOrders();
        orders.unshift(order);
        localStorage.setItem('xops_rest_orders', JSON.stringify(orders));
    },
    getCurrentSessionUser() {
        const id = localStorage.getItem('xops_session_uid');
        if (!id) return null;
        const users = this.getUsers();
        return users.find(u => u.id === id) || null;
    },
    setSessionUser(id) {
        if (id) {
            localStorage.setItem('xops_session_uid', id);
        } else {
            localStorage.removeItem('xops_session_uid');
        }
    }
};

function generateCustomerId() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `XO-${randomNum}`;
}

function generateBookingId() {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `BK-${randomNum}`;
}

// Generate SVG QR Code representation
function generateQRCodeSVG(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = (hash << 5) - hash + text.charCodeAt(i);
        hash |= 0;
    }
    
    const size = 25;
    let cells = '';
    
    const isFinder = (r, c) => {
        if ((r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7)) {
            if ((r === 0 || r === 6 || c === 0 || c === 6) && (r < 7 && c < 7)) return true;
            if ((r >= 2 && r <= 4 && c >= 2 && c <= 4) && (r < 7 && c < 7)) return true;
            if ((r === 0 || r === 6 || c === size - 7 || c === size - 1) && (r < 7 && c >= size - 7)) return true;
            if ((r >= 2 && r <= 4 && c >= size - 5 && c <= size - 3) && (r < 7 && c >= size - 7)) return true;
            if ((r === size - 7 || r === size - 1 || c === 0 || c === 6) && (r >= size - 7 && c < 7)) return true;
            if ((r >= size - 5 && r <= size - 3 && c >= 2 && c <= 4) && (r >= size - 7 && c < 7)) return true;
            return false;
        }
        return null;
    };

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const finder = isFinder(r, c);
            let active = false;
            if (finder !== null) {
                active = finder;
            } else {
                const pseudo = Math.sin(hash * 0.01 + r * 31 + c * 17) * 10000;
                active = (Math.abs(pseudo) % 10) > 4.5;
            }

            if (active) {
                cells += `<rect x="${c * 8}" y="${r * 8}" width="7.5" height="7.5" fill="#E0A96D" rx="1.5" />`;
            }
        }
    }

    return `
    <svg viewBox="0 0 200 200" width="100%" height="100%" class="rounded-lg bg-[#140E0C] p-2 border border-[#C69255]/30">
        <rect width="200" height="200" fill="#140E0C" rx="8" />
        ${cells}
    </svg>`;
}

// Toast Notification
function showToast(message, type = 'info', icon = 'fa-info-circle') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const colorClass = type === 'success' 
        ? 'border-emerald-600/50 bg-[#1C1410]/95 text-emerald-300' 
        : type === 'warning'
        ? 'border-amber-600/50 bg-[#1C1410]/95 text-amber-300'
        : 'border-[#C69255]/60 bg-[#1C1410]/95 text-[#E0A96D]';

    toast.className = `toast-item flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md text-sm font-medium z-50 ${colorClass}`;
    toast.innerHTML = `
        <i class="fa-solid ${icon} text-lg"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    sfx.playClick();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3800);
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Try playing startup chime on first user click anywhere
    document.addEventListener('click', () => {
        sfx.init();
        if (!sfx.hasPlayedStartup) {
            sfx.playPlayStationStartup();
        }
    }, { once: true });

    // Restore or load user session
    appState.currentUser = Storage.getCurrentSessionUser();
    if (!appState.currentUser) {
        const users = Storage.getUsers();
        if (users.length > 0) {
            appState.currentUser = users[0];
            Storage.setSessionUser(users[0].id);
        }
    }

    // Render Initial Sections
    renderUserBar();
    renderVouchersHeaderPill();
    renderRooms();
    renderGallery();
    renderGames();
    renderTheRestCategories();
    renderTheRestMenu();
    renderRoomSelectorForRest();
    updateCartBadge();

    // Setup global listeners
    setupEventListeners();
});

// Setup Global Event Listeners
function setupEventListeners() {
    // Sound toggle
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            sfx.enabled = !sfx.enabled;
            soundBtn.innerHTML = sfx.enabled 
                ? '<i class="fa-solid fa-volume-high text-[#E0A96D]"></i>' 
                : '<i class="fa-solid fa-volume-xmark text-[#B8A89A]"></i>';
            showToast(sfx.enabled ? "تم تفعيل الصوت ونغمات البلايستيشن" : "تم كتم الصوت", "info");
        });
    }

    // Search drinks in The Rest
    const searchRestInput = document.getElementById('search-rest-input');
    if (searchRestInput) {
        searchRestInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            renderTheRestMenu(appState.filterCategory, query);
        });
    }
}

// Render Top User Pill / Header Info
function renderUserBar() {
    const userContainer = document.getElementById('user-header-pill');
    if (!userContainer) return;

    if (appState.currentUser) {
        userContainer.innerHTML = `
            <button onclick="openDashboardModal()" class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#241A16] border border-[#C69255]/30 hover:border-[#E0A96D] text-xs sm:text-sm transition-all group">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="font-bold text-[#F5EFEB] group-hover:text-[#E0A96D]">${appState.currentUser.name}</span>
                <span class="px-2 py-0.5 rounded bg-[#18110E] text-[#E0A96D] font-mono text-[11px] border border-[#C69255]/20">${appState.currentUser.id}</span>
                <i class="fa-solid fa-id-card text-[#C69255] text-xs"></i>
            </button>
        `;
    } else {
        userContainer.innerHTML = `
            <button onclick="openAuthModal()" class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#241A16] border border-[#C69255]/30 hover:bg-[#2B1F1A] text-[#E0A96D] text-xs sm:text-sm transition-all font-semibold">
                <i class="fa-solid fa-user-plus text-xs"></i>
                <span>تسجيل / عضوية</span>
            </button>
        `;
    }
}

// ----------------------------------------------------
// VOUCHERS SYSTEM (الفاوتشرز في الهيدر والحساب)
// ----------------------------------------------------
function renderVouchersHeaderPill() {
    const countEl = document.getElementById('vouchers-count-badge');
    const vouchers = XO_DATA.vouchers || [];
    if (countEl) {
        countEl.textContent = vouchers.length;
    }
}

function openVouchersModal() {
    sfx.playClick();
    const modal = document.getElementById('vouchers-modal');
    if (!modal) return;

    renderVouchersList();
    modal.classList.remove('hidden');
}

function closeVouchersModal() {
    const modal = document.getElementById('vouchers-modal');
    if (modal) modal.classList.add('hidden');
}

function renderVouchersList() {
    const container = document.getElementById('vouchers-modal-list');
    if (!container) return;

    const vouchers = XO_DATA.vouchers || [];
    if (vouchers.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-[#B8A89A]">
                <i class="fa-solid fa-ticket-simple text-3xl mb-2 opacity-40"></i>
                <p class="text-xs">لا توجد فاوتشرز نشطة في حسابك حالياً</p>
            </div>
        `;
        return;
    }

    container.innerHTML = vouchers.map(v => {
        const isApplied = appState.appliedVoucher && appState.appliedVoucher.code === v.code;

        return `
            <div class="voucher-ticket-card p-4 flex flex-col justify-between gap-3 text-right">
                <div class="flex items-start gap-3">
                    ${v.image ? `
                        <div class="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#C69255]/30">
                            <img src="${v.image}" alt="${v.title}" class="w-full h-full object-cover">
                        </div>
                    ` : `
                        <div class="w-12 h-12 rounded-xl bg-[#2E2019] border border-[#C69255]/30 flex items-center justify-center text-[#E0A96D] text-sm shrink-0">
                            <i class="fa-solid ${v.icon}"></i>
                        </div>
                    `}
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#38261E] text-[#E0A96D] border border-[#C69255]/30">
                                ${v.badge}
                            </span>
                            <span class="text-xs font-bold text-[#F5EFEB]">${v.title}</span>
                        </div>
                        <p class="text-xs text-[#B8A89A] leading-relaxed">${v.description}</p>
                    </div>
                </div>

                <!-- Code & Expiry Info -->
                <div class="pt-2 border-t border-[#C69255]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                    <div class="flex items-center gap-2">
                        <span class="font-mono font-black text-sm px-2.5 py-1 rounded bg-[#18110E] text-[#E0A96D] border border-[#C69255]/30 tracking-wider">
                            ${v.code}
                        </span>
                        <span class="text-[11px] text-[#B8A89A] flex items-center gap-1">
                            <i class="fa-regular fa-clock text-[#C69255]"></i>
                            <span>${v.durationText} (ينتهي: ${v.expiryDate})</span>
                        </span>
                    </div>

                    <button onclick="applyVoucherFromModal('${v.code}')" class="px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all ${isApplied ? 'bg-emerald-800/80 text-emerald-200 border border-emerald-500/40' : 'btn-coffee-primary'}">
                        ${isApplied ? '<i class="fa-solid fa-check ml-1"></i> مُطبّق حالياً' : '<i class="fa-solid fa-tag ml-1"></i> استخدام الفاوتشر'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function applyVoucherFromModal(code) {
    const voucher = XO_DATA.vouchers.find(v => v.code === code);
    if (!voucher) return;

    appState.appliedVoucher = voucher;
    appState.bookingDraft.voucherCode = voucher.code;

    sfx.playSuccess();
    showToast(`تم تطبيق الفاوتشر "${voucher.code}" بنجاح!`, "success", "fa-tag");
    closeVouchersModal();

    // Open booking modal to see the discount
    openBookingModal(appState.bookingDraft.roomId || 1);
}

function removeAppliedVoucher() {
    appState.appliedVoucher = null;
    appState.bookingDraft.voucherCode = "";
    sfx.playClick();
    renderBookingStep();
    showToast("تم إلغاء الفاوتشر", "info");
}

// ----------------------------------------------------
// 15 ROOMS SECTION & FILTERING
// ----------------------------------------------------
function filterRooms(theme) {
    appState.filterRoom = theme;
    sfx.playClick();

    document.querySelectorAll('.room-filter-tab').forEach(btn => {
        if (btn.dataset.filter === theme) {
            btn.className = "room-filter-tab px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#C69255] text-[#140E0C] shadow-lg transition-all";
        } else {
            btn.className = "room-filter-tab px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#D7C9BD] bg-[#1E1511] border border-[#C69255]/20 hover:border-[#C69255]/40 hover:bg-[#281D17] transition-all";
        }
    });

    renderRooms();
}

function renderRooms() {
    const grid = document.getElementById('rooms-grid');
    if (!grid) return;

    let filtered = XO_DATA.rooms;
    if (appState.filterRoom === 'ps5') {
        filtered = filtered.filter(r => r.type === 'PS5');
    } else if (appState.filterRoom === 'ps4') {
        filtered = filtered.filter(r => r.type === 'PS4');
    } else if (appState.filterRoom === 'arabic') {
        filtered = filtered.filter(r => r.theme === 'arabic');
    } else if (appState.filterRoom === 'gaming') {
        filtered = filtered.filter(r => r.theme === 'gaming');
    } else if (appState.filterRoom === 'football') {
        filtered = filtered.filter(r => r.theme === 'football');
    } else if (appState.filterRoom === 'relax') {
        filtered = filtered.filter(r => r.theme === 'relax');
    }

    grid.innerHTML = filtered.map(room => {
        const isPs5 = room.type === 'PS5';
        const badgeColor = isPs5 ? 'badge-ps5' : 'badge-ps4';
        const price = room.hourlyRate;

        return `
        <div class="glass-card rounded-2xl overflow-hidden flex flex-col group border border-[#C69255]/15 hover:border-[#C69255]/50">
            <!-- Room Image & Badges -->
            <div class="relative h-48 overflow-hidden">
                <img src="${room.image}" alt="${room.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-[#140E0C] via-[#140E0C]/40 to-transparent"></div>
                
                <!-- Console Badge & Room ID -->
                <div class="absolute top-3 right-3 flex items-center gap-2">
                    <span class="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${badgeColor} shadow-md backdrop-blur-md">
                        <i class="fa-brands fa-playstation mr-1"></i> ${room.type}
                    </span>
                    <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#140E0C]/90 text-[#D7C9BD] border border-[#C69255]/30 backdrop-blur-md">
                        #${room.id}
                    </span>
                </div>

                <!-- Theme Pill -->
                <div class="absolute bottom-3 right-3 flex items-center gap-2">
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#140E0C]/90 text-[#E0A96D] border border-[#C69255]/40 backdrop-blur-md flex items-center gap-1.5">
                        <i class="fa-solid ${room.icon}"></i> ${room.themeName}
                    </span>
                </div>

                <!-- Sound Isolation Badge -->
                <div class="absolute top-3 left-3">
                    <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-[#1F1713]/90 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 backdrop-blur-md">
                        <i class="fa-solid fa-volume-xmark text-[9px]"></i> عزل صوت 100%
                    </span>
                </div>
            </div>

            <!-- Room Content -->
            <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <h3 class="text-base sm:text-lg font-bold text-[#F5EFEB] group-hover:text-[#E0A96D] transition-colors mb-2">
                        ${room.name}
                    </h3>

                    <p class="text-xs text-[#B8A89A] mb-4 line-clamp-2 leading-relaxed">
                        ${room.description}
                    </p>

                    <!-- Features Pills -->
                    <div class="grid grid-cols-2 gap-1.5 mb-4">
                        ${room.features.slice(0, 4).map(f => `
                            <div class="flex items-center gap-1.5 text-[11px] text-[#D7C9BD] bg-[#1A120E]/80 px-2 py-1 rounded-lg border border-[#C69255]/15">
                                <i class="fa-solid fa-check text-[#C69255] text-[10px]"></i>
                                <span class="truncate">${f}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Price and Action Buttons -->
                <div class="pt-3 border-t border-[#C69255]/15">
                    <div class="flex items-center justify-between mb-3">
                        <div>
                            <span class="text-xs text-[#B8A89A]">سعر الساعة / للفرد</span>
                            <div class="flex items-baseline gap-1">
                                <span class="text-2xl font-black text-[#E0A96D]">${price}</span>
                                <span class="text-xs font-semibold text-[#B8A89A]">ج.م / س</span>
                            </div>
                        </div>

                        <span class="text-xs text-[#B8A89A] bg-[#1A120E] px-2.5 py-1 rounded-lg border border-[#C69255]/20">
                            <i class="fa-solid fa-users text-[#C69255] ml-1"></i> ${room.capacity}
                        </span>
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <button onclick="openBookingModal(${room.id})" class="btn-coffee-primary py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 w-full">
                            <i class="fa-regular fa-calendar-check"></i>
                            <span>احجز الروم</span>
                        </button>
                        <button onclick="quickOrderFromRoom(${room.id})" class="btn-coffee-outline py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all">
                            <i class="fa-solid fa-mug-hot text-[#C69255]"></i>
                            <span>طلب ريست</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// ----------------------------------------------------
// REAL LOUNGE GALLERY SECTION
// ----------------------------------------------------

function filterGallery(category) {
    activeGalleryFilter = category;
    sfx.playClick();

    document.querySelectorAll('.gallery-filter-tab').forEach(tab => {
        const filter = tab.getAttribute('data-gallery-filter');
        if (filter === category) {
            tab.className = "gallery-filter-tab px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#C69255] text-[#1A110D] shadow-md transition-all";
        } else {
            tab.className = "gallery-filter-tab px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#EFE6DC] bg-[#33221B] border border-[#C69255]/20 hover:border-[#C69255]/40 transition-all";
        }
    });

    renderGallery();
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    let items = XO_DATA.gallery || [];
    if (activeGalleryFilter !== 'all') {
        items = items.filter(it => it.category === activeGalleryFilter);
    }

    grid.innerHTML = items.map(item => `
        <div onclick="openGalleryLightbox(${item.id})" class="glass-card rounded-2xl overflow-hidden group border border-[#C69255]/20 hover:border-[#C69255]/50 cursor-pointer transition-all flex flex-col">
            <div class="relative h-56 overflow-hidden">
                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-[#241813] via-[#241813]/30 to-transparent"></div>
                
                <div class="absolute top-3 right-3 flex items-center gap-1.5">
                    <span class="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#2C1D17]/90 text-[#E0A96D] border border-[#C69255]/30 shadow-md backdrop-blur-md">
                        ${item.badge}
                    </span>
                </div>

                <div class="absolute top-3 left-3 w-8 h-8 rounded-lg bg-[#2C1D17]/80 text-[#FAF6F0] flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md shadow-md">
                    <i class="fa-solid fa-expand"></i>
                </div>

                <div class="absolute bottom-3 right-3 left-3">
                    <span class="text-[10px] text-[#C69255] font-bold block mb-0.5">${item.categoryName}</span>
                    <h4 class="text-sm font-bold text-[#FAF6F0] group-hover:text-[#E0A96D] transition-colors leading-snug">
                        ${item.title}
                    </h4>
                </div>
            </div>
            <div class="p-4 flex-1 flex flex-col justify-between text-xs">
                <p class="text-[#B8A89A] leading-relaxed line-clamp-2">
                    ${item.description}
                </p>
                <div class="pt-2 mt-2 border-t border-[#C69255]/15 flex items-center justify-between text-[11px] text-[#E0A96D]">
                    <span class="font-semibold"><i class="fa-regular fa-image ml-1"></i> اضغط لتكبير الصورة</span>
                    <i class="fa-solid fa-arrow-left text-[10px] group-hover:-translate-x-1 transition-transform"></i>
                </div>
            </div>
        </div>
    `).join('');
}

function openGalleryLightbox(id) {
    const item = (XO_DATA.gallery || []).find(g => g.id === id);
    if (!item) return;

    sfx.playClick();
    const modal = document.getElementById('gallery-lightbox-modal');
    if (!modal) return;

    document.getElementById('lightbox-img').src = item.image;
    document.getElementById('lightbox-badge').textContent = item.badge;
    document.getElementById('lightbox-title').textContent = item.title;
    document.getElementById('lightbox-desc').textContent = item.description;

    modal.classList.remove('hidden');
}

function closeGalleryLightbox(e) {
    if (e && e.target !== e.currentTarget && e.target.closest('#gallery-lightbox-modal > div')) {
        return;
    }
    const modal = document.getElementById('gallery-lightbox-modal');
    if (modal) modal.classList.add('hidden');
}

// ----------------------------------------------------
// GAMES SHOWCASE SECTION
// ----------------------------------------------------
function renderGames() {
    const grid = document.getElementById('games-grid');
    if (!grid) return;

    grid.innerHTML = XO_DATA.games.map(game => `
        <div class="glass-card rounded-2xl overflow-hidden group border border-[#C69255]/15 hover:border-[#C69255]/40 flex flex-col">
            <div class="relative h-44 overflow-hidden">
                <img src="${game.cover}" alt="${game.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-[#140E0C] via-[#140E0C]/30 to-transparent"></div>
                
                <div class="absolute top-3 right-3">
                    <span class="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#38261E] text-[#E0A96D] border border-[#C69255]/40 shadow-lg">
                        ${game.badge}
                    </span>
                </div>

                <div class="absolute bottom-2 left-3 flex items-center gap-1 bg-[#140E0C]/90 px-2 py-0.5 rounded text-xs text-[#E0A96D] font-bold border border-[#C69255]/20">
                    <i class="fa-solid fa-star text-[10px]"></i> ${game.rating}
                </div>
            </div>

            <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <h4 class="text-sm font-bold text-[#F5EFEB] group-hover:text-[#E0A96D] transition-colors mb-1">
                        ${game.title}
                    </h4>
                    <p class="text-[11px] text-[#B8A89A] mb-2">${game.titleAr}</p>
                    <p class="text-xs text-[#B8A89A] line-clamp-2 leading-relaxed mb-3">
                        ${game.description}
                    </p>
                </div>

                <div class="flex items-center justify-between pt-2 border-t border-[#C69255]/15 text-[11px] text-[#B8A89A]">
                    <span class="flex items-center gap-1 text-[#D7C9BD]">
                        <i class="fa-solid fa-gamepad text-[#C69255]"></i> ${game.players}
                    </span>
                    <span class="text-[#E0A96D] font-medium">
                        ${game.genre}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// ----------------------------------------------------
// "THE REST" (الريست) CAFÉ & IN-ROOM ORDERING SYSTEM
// ----------------------------------------------------
function renderTheRestCategories() {
    const container = document.getElementById('rest-categories-container');
    if (!container) return;

    container.innerHTML = XO_DATA.theRestMenu.categories.map(cat => {
        const isActive = appState.filterCategory === cat.id;
        const activeClass = isActive 
            ? 'bg-[#C69255] text-[#140E0C] font-bold shadow-md' 
            : 'bg-[#1E1511] text-[#D7C9BD] border border-[#C69255]/20 hover:border-[#C69255]/40 font-medium';

        return `
            <button onclick="filterTheRestCategory('${cat.id}')" class="px-4 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${activeClass}">
                <i class="fa-solid ${cat.icon}"></i>
                <span>${cat.name}</span>
            </button>
        `;
    }).join('');
}

function filterTheRestCategory(catId) {
    appState.filterCategory = catId;
    sfx.playClick();
    renderTheRestCategories();
    renderTheRestMenu(catId);
}

function renderTheRestMenu(category = 'all', searchQuery = '') {
    const container = document.getElementById('rest-menu-grid');
    if (!container) return;

    let items = XO_DATA.theRestMenu.items;
    if (category !== 'all') {
        items = items.filter(it => it.categoryId === category);
    }
    if (searchQuery) {
        items = items.filter(it => 
            it.name.toLowerCase().includes(searchQuery) || 
            it.nameEn.toLowerCase().includes(searchQuery) ||
            it.description.toLowerCase().includes(searchQuery)
        );
    }

    if (items.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12 text-[#B8A89A]">
                <i class="fa-solid fa-mug-saucer text-4xl mb-3 opacity-40 text-[#C69255]"></i>
                <p>لا توجد مشروبات تطابق بحثك حالياً</p>
            </div>
        `;
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="glass-card rounded-2xl p-4 flex flex-col justify-between border border-[#C69255]/20 hover:border-[#C69255]/50 group transition-all">
            <div class="flex gap-3 mb-3">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 rounded-xl object-cover border border-[#C69255]/20 shadow-md">
                <div class="flex-1">
                    <h4 class="text-sm font-bold text-[#F5EFEB] group-hover:text-[#E0A96D] transition-colors mb-1">
                        ${item.name}
                    </h4>
                    <p class="text-[10px] text-[#B8A89A] font-mono mb-1">${item.nameEn}</p>
                    <p class="text-xs text-[#B8A89A] line-clamp-2 leading-relaxed">${item.description}</p>
                </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1 mb-3">
                ${item.tags.map(t => `
                    <span class="text-[10px] px-2 py-0.5 rounded-md bg-[#1A120E] text-[#E0A96D] border border-[#C69255]/20">
                        ${t}
                    </span>
                `).join('')}
            </div>

            <!-- Price & Add Button -->
            <div class="pt-2 border-t border-[#C69255]/15 flex items-center justify-between">
                <div>
                    <span class="text-base font-black text-[#E0A96D]">${item.price}</span>
                    <span class="text-xs text-[#B8A89A]">ج.م</span>
                </div>

                <button onclick="addToRestCart('${item.id}')" class="px-3.5 py-1.5 rounded-xl btn-coffee-primary font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95">
                    <i class="fa-solid fa-plus text-[10px]"></i>
                    <span>طلب للروم</span>
                </button>
            </div>
        </div>
    `).join('');
}

function renderRoomSelectorForRest() {
    const selector = document.getElementById('rest-room-select');
    if (!selector) return;

    selector.innerHTML = XO_DATA.rooms.map(room => `
        <option value="${room.id}" ${room.id === appState.activeRoomForRest ? 'selected' : ''}>
            روم #${room.id} (${room.type} - ${room.themeName})
        </option>
    `).join('');

    selector.addEventListener('change', (e) => {
        appState.activeRoomForRest = parseInt(e.target.value);
        sfx.playClick();
        showToast(`تم تعيين التوصيل إلى: روم #${appState.activeRoomForRest}`, "info");
    });
}

function quickOrderFromRoom(roomId) {
    appState.activeRoomForRest = roomId;
    const selector = document.getElementById('rest-room-select');
    if (selector) selector.value = roomId;

    const restSection = document.getElementById('the-rest-section');
    if (restSection) {
        restSection.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`اختر مشروباتك الآن وسيتم توصيلها مباشرة إلى روم #${roomId}`, "success", "fa-mug-hot");
    sfx.playChime();
}

function addToRestCart(itemId) {
    const item = XO_DATA.theRestMenu.items.find(i => i.id === itemId);
    if (!item) return;

    const existing = appState.cart.find(c => c.id === itemId);
    if (existing) {
        existing.quantity += 1;
    } else {
        appState.cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1,
            sugarLevel: item.categoryId === 'coffee' ? 'مظبوط' : null
        });
    }

    sfx.playCoin();
    updateCartBadge();
    showToast(`تمت إضافة "${item.name}" إلى سلة طلبات الروم`, "success", "fa-check");
}

function updateCartBadge() {
    const totalItems = appState.cart.reduce((sum, i) => sum + i.quantity, 0);
    const badge = document.getElementById('cart-floating-badge');
    const badgeCount = document.getElementById('cart-count');
    if (badge && badgeCount) {
        badgeCount.textContent = totalItems;
        if (totalItems > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

function openCartModal() {
    sfx.playClick();
    const modal = document.getElementById('cart-modal');
    if (!modal) return;

    renderCartItems();
    modal.classList.remove('hidden');
}

function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) modal.classList.add('hidden');
}

function renderCartItems() {
    const container = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('cart-total-price');
    if (!container || !totalEl) return;

    if (appState.cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-10 text-[#B8A89A]">
                <i class="fa-solid fa-basket-shopping text-4xl mb-3 opacity-30 text-[#C69255]"></i>
                <p class="text-sm">سلة مشروبات الريست فارغة حالياً</p>
            </div>
        `;
        totalEl.textContent = "0 ج.م";
        return;
    }

    let total = 0;
    container.innerHTML = appState.cart.map((item, idx) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        return `
            <div class="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#1C1410] border border-[#C69255]/20">
                <img src="${item.image}" class="w-12 h-12 rounded-lg object-cover">
                <div class="flex-1">
                    <h5 class="text-xs font-bold text-[#F5EFEB] mb-0.5">${item.name}</h5>
                    <span class="text-xs text-[#E0A96D] font-bold">${item.price} ج.م</span>
                    ${item.sugarLevel ? `
                        <div class="mt-1 flex items-center gap-1 text-[10px] text-[#B8A89A]">
                            <span>السكر:</span>
                            <select onchange="changeSugar(${idx}, this.value)" class="bg-[#241A16] rounded px-1.5 py-0.5 text-[#F5EFEB] border border-[#C69255]/20 text-[10px]">
                                <option value="سادة" ${item.sugarLevel === 'سادة' ? 'selected' : ''}>سادة</option>
                                <option value="مظبوط" ${item.sugarLevel === 'مظبوط' ? 'selected' : ''}>مظبوط</option>
                                <option value="مانو" ${item.sugarLevel === 'مانو' ? 'selected' : ''}>مانو</option>
                                <option value="زيادة" ${item.sugarLevel === 'زيادة' ? 'selected' : ''}>زيادة</option>
                            </select>
                        </div>
                    ` : ''}
                </div>

                <div class="flex items-center gap-2">
                    <button onclick="changeCartQty(${idx}, -1)" class="w-6 h-6 rounded-lg bg-[#281D17] text-[#D7C9BD] hover:bg-[#34261E] flex items-center justify-center text-xs font-bold">-</button>
                    <span class="text-xs font-bold text-[#F5EFEB] w-4 text-center">${item.quantity}</span>
                    <button onclick="changeCartQty(${idx}, 1)" class="w-6 h-6 rounded-lg bg-[#281D17] text-[#D7C9BD] hover:bg-[#34261E] flex items-center justify-center text-xs font-bold">+</button>
                </div>

                <button onclick="removeFromCart(${idx})" class="text-rose-400 hover:text-rose-300 text-xs p-1">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
    }).join('');

    totalEl.textContent = `${total} ج.م`;
}

function changeCartQty(index, delta) {
    sfx.playClick();
    if (appState.cart[index]) {
        appState.cart[index].quantity += delta;
        if (appState.cart[index].quantity <= 0) {
            appState.cart.splice(index, 1);
        }
    }
    updateCartBadge();
    renderCartItems();
}

function changeSugar(index, val) {
    if (appState.cart[index]) {
        appState.cart[index].sugarLevel = val;
    }
}

function removeFromCart(index) {
    sfx.playClick();
    appState.cart.splice(index, 1);
    updateCartBadge();
    renderCartItems();
}

// Checkout The Rest Order (No WhatsApp)
function checkoutTheRestOrder() {
    if (appState.cart.length === 0) {
        showToast("السلة فارغة! اختر مشروباتك أولاً", "warning");
        return;
    }

    const roomSelect = document.getElementById('cart-room-select');
    const paymentMethodSelect = document.getElementById('cart-payment-method');
    const roomId = roomSelect ? parseInt(roomSelect.value) : appState.activeRoomForRest;
    const paymentMethod = paymentMethodSelect ? paymentMethodSelect.value : "كاش عند الاستلام بالروم";

    const total = appState.cart.reduce((s, i) => s + (i.price * i.quantity), 0);
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const orderObj = {
        id: orderId,
        customerId: appState.currentUser ? appState.currentUser.id : "عميل ضيف",
        customerName: appState.currentUser ? appState.currentUser.name : "عميل في المحل",
        roomId: roomId,
        items: [...appState.cart],
        total: total,
        paymentMethod: paymentMethod,
        date: new Date().toLocaleDateString('ar-EG'),
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        status: "جاري التحضير بالبار"
    };

    Storage.saveOrder(orderObj);
    sfx.playSuccess();

    // Clear cart
    appState.cart = [];
    updateCartBadge();
    closeCartModal();

    showOrderSuccessModal(orderObj);
}

function showOrderSuccessModal(order) {
    const modal = document.getElementById('order-success-modal');
    if (!modal) return;

    document.getElementById('order-success-id').textContent = order.id;
    document.getElementById('order-success-room').textContent = `روم #${order.roomId}`;
    document.getElementById('order-success-total').textContent = `${order.total} ج.م`;

    modal.classList.remove('hidden');
}

function closeOrderSuccessModal() {
    const modal = document.getElementById('order-success-modal');
    if (modal) modal.classList.add('hidden');
}

// ----------------------------------------------------
// BOOKING SYSTEM (خطوات الحجز مع دعم الفاوتشرز)
// ----------------------------------------------------
function openBookingModal(preselectedRoomId = 1) {
    sfx.playClick();
    appState.bookingDraft.roomId = preselectedRoomId;
    appState.bookingDraft.step = 1;

    if (appState.currentUser) {
        appState.bookingDraft.customerName = appState.currentUser.name;
        appState.bookingDraft.customerPhone = appState.currentUser.phone;
        appState.bookingDraft.customerId = appState.currentUser.id;
    }

    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.remove('hidden');
        renderBookingStep();
    }
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) modal.classList.add('hidden');
}

function setBookingStep(step) {
    sfx.playClick();
    appState.bookingDraft.step = step;
    renderBookingStep();
}

function calculateBookingPrice() {
    const room = XO_DATA.rooms.find(r => r.id === appState.bookingDraft.roomId) || XO_DATA.rooms[0];
    const ratePerHour = room.hourlyRate; // 100 for PS5, 70 for PS4
    const hours = parseInt(appState.bookingDraft.hours) || 1;
    const players = parseInt(appState.bookingDraft.players) || 1;
    const subtotal = ratePerHour * hours * players;

    let discount = 0;
    if (appState.appliedVoucher) {
        if (appState.appliedVoucher.type === 'percentage') {
            discount = Math.round(subtotal * (appState.appliedVoucher.value / 100));
        } else if (appState.appliedVoucher.type === 'fixed') {
            discount = Math.min(subtotal, appState.appliedVoucher.value);
        } else if (appState.appliedVoucher.type === 'free_item') {
            // Free drink hospitality
            discount = 0;
        }
    }

    const total = Math.max(0, subtotal - discount);

    return {
        room,
        ratePerHour,
        hours,
        players,
        subtotal,
        discount,
        total
    };
}

function renderBookingStep() {
    const step = appState.bookingDraft.step;
    const content = document.getElementById('booking-step-content');
    const stepperDots = document.getElementById('booking-stepper-dots');
    if (!content) return;

    if (stepperDots) {
        stepperDots.innerHTML = [1, 2, 3, 4].map(s => {
            const isCompleted = s < step;
            const isCurrent = s === step;
            const circleClass = isCurrent 
                ? 'bg-[#C69255] text-[#140E0C] font-black shadow-md' 
                : isCompleted 
                ? 'bg-emerald-700 text-[#F5EFEB] font-bold' 
                : 'bg-[#1F1713] text-[#B8A89A]';

            return `
                <div class="flex items-center gap-1.5">
                    <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs ${circleClass}">
                        ${isCompleted ? '<i class="fa-solid fa-check text-[10px]"></i>' : s}
                    </div>
                    <span class="text-[11px] font-semibold hidden sm:inline ${isCurrent ? 'text-[#E0A96D]' : 'text-[#B8A89A]'}">
                        ${s === 1 ? 'البيانات' : s === 2 ? 'الغرفة' : s === 3 ? 'الموعد' : 'الدفع'}
                    </span>
                    ${s < 4 ? '<div class="w-4 h-0.5 bg-[#2B1F1A] hidden sm:block"></div>' : ''}
                </div>
            `;
        }).join('');
    }

    const { room, ratePerHour, hours, players, subtotal, discount, total } = calculateBookingPrice();

    // STEP 1: Customer Details
    if (step === 1) {
        content.innerHTML = `
            <div class="space-y-4">
                <div class="p-3.5 rounded-xl bg-[#1C1410] border border-[#C69255]/20 text-xs text-[#E0A96D] flex items-center gap-2.5">
                    <i class="fa-solid fa-shield-halved text-base text-[#C69255]"></i>
                    <span>يتم تسجيل حجزك تلقائياً على نظام XO PS وحسابك الخاص بكود ID فريد.</span>
                </div>

                <div>
                    <label class="block text-xs font-bold text-[#D7C9BD] mb-1.5">اسم العميل بالكامل *</label>
                    <input type="text" id="b-name" value="${appState.bookingDraft.customerName}" placeholder="أدخل اسمك الكريم" class="w-full px-4 py-2.5 rounded-xl bg-[#1A120E] border border-[#C69255]/30 text-[#F5EFEB] text-sm focus:border-[#E0A96D] focus:outline-none">
                </div>

                <div>
                    <label class="block text-xs font-bold text-[#D7C9BD] mb-1.5">رقم الهاتف *</label>
                    <input type="tel" id="b-phone" value="${appState.bookingDraft.customerPhone}" placeholder="مثال: 01012345678" class="w-full px-4 py-2.5 rounded-xl bg-[#1A120E] border border-[#C69255]/30 text-[#F5EFEB] text-sm focus:border-[#E0A96D] focus:outline-none">
                </div>

                <div>
                    <label class="block text-xs font-bold text-[#D7C9BD] mb-1.5">كود العميل (ID Number) - اختياري</label>
                    <input type="text" id="b-customer-id" value="${appState.bookingDraft.customerId || (appState.currentUser ? appState.currentUser.id : '')}" placeholder="مثال: XO-7821 أو اتركه لإنشاء كود جديد لك" class="w-full px-4 py-2.5 rounded-xl bg-[#1A120E] border border-[#C69255]/30 text-[#F5EFEB] text-sm focus:border-[#E0A96D] focus:outline-none font-mono">
                </div>

                <div class="pt-4 flex justify-end">
                    <button onclick="validateStep1()" class="btn-coffee-primary px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                        <span>التالي: اختيار الغرفة</span>
                        <i class="fa-solid fa-arrow-left"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // STEP 2: Room Selection (15 Rooms)
    else if (step === 2) {
        content.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <label class="block text-xs font-bold text-[#D7C9BD]">اختر الغرفة المطلوبة (15 روم مجهزة):</label>
                    <span class="text-[11px] text-[#E0A96D] font-bold">PS5 = 100 ج/س | PS4 = 70 ج/س</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto p-1 pr-2">
                    ${XO_DATA.rooms.map(r => {
                        const isSelected = r.id === appState.bookingDraft.roomId;
                        return `
                            <div onclick="selectRoomForBooking(${r.id})" class="p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${isSelected ? 'bg-[#2E2019] border-[#C69255] shadow-md' : 'bg-[#1A120E] border-[#C69255]/20 hover:border-[#C69255]/40'}">
                                <div class="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#C69255]/30">
                                    <img src="${r.image}" alt="${r.name}" class="w-full h-full object-cover">
                                    <span class="absolute bottom-0 inset-x-0 text-center text-[9px] font-black ${r.type === 'PS5' ? 'bg-[#3D5A80]/90 text-[#B8D3F5]' : 'bg-[#5A3929]/90 text-[#E0A96D]'}">
                                        ${r.type}
                                    </span>
                                </div>
                                <div class="flex-1 truncate">
                                    <div class="flex items-center justify-between">
                                        <h5 class="text-xs font-bold text-[#F5EFEB] truncate">${r.name}</h5>
                                        <span class="text-[11px] font-bold text-[#E0A96D]">${r.hourlyRate} ج/س</span>
                                    </div>
                                    <span class="text-[10px] text-[#B8A89A]">${r.themeName} • ${r.capacity}</span>
                                </div>
                                ${isSelected ? '<i class="fa-solid fa-circle-check text-[#E0A96D] text-sm"></i>' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>

                <div class="pt-4 flex justify-between">
                    <button onclick="setBookingStep(1)" class="btn-coffee-outline px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                        <i class="fa-solid fa-arrow-right"></i>
                        <span>السابق</span>
                    </button>
                    <button onclick="setBookingStep(3)" class="btn-coffee-primary px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                        <span>التالي: الموعد والمدة</span>
                        <i class="fa-solid fa-arrow-left"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // STEP 3: Date, Time, Duration & Players
    else if (step === 3) {
        content.innerHTML = `
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-[#D7C9BD] mb-1.5">تاريخ الحجز *</label>
                        <input type="date" id="b-date" value="${appState.bookingDraft.date}" class="w-full px-3 py-2 rounded-xl bg-[#1A120E] border border-[#C69255]/30 text-[#F5EFEB] text-xs focus:border-[#E0A96D] focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-[#D7C9BD] mb-1.5">وقت الحضور *</label>
                        <input type="time" id="b-time" value="${appState.bookingDraft.time}" class="w-full px-3 py-2 rounded-xl bg-[#1A120E] border border-[#C69255]/30 text-[#F5EFEB] text-xs focus:border-[#E0A96D] focus:outline-none">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-[#D7C9BD] mb-1.5">عدد الساعات</label>
                        <div class="flex items-center gap-2 bg-[#1A120E] border border-[#C69255]/30 rounded-xl p-1">
                            <button onclick="adjustHours(-1)" class="w-8 h-8 rounded-lg bg-[#281D17] text-[#F5EFEB] font-bold text-xs">-</button>
                            <span class="flex-1 text-center font-bold text-sm text-[#E0A96D]" id="hours-display">${hours} س</span>
                            <button onclick="adjustHours(1)" class="w-8 h-8 rounded-lg bg-[#281D17] text-[#F5EFEB] font-bold text-xs">+</button>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-[#D7C9BD] mb-1.5">عدد الأفراد (اللاعبين)</label>
                        <div class="flex items-center gap-2 bg-[#1A120E] border border-[#C69255]/30 rounded-xl p-1">
                            <button onclick="adjustPlayers(-1)" class="w-8 h-8 rounded-lg bg-[#281D17] text-[#F5EFEB] font-bold text-xs">-</button>
                            <span class="flex-1 text-center font-bold text-sm text-[#E0A96D]" id="players-display">${players} فرد</span>
                            <button onclick="adjustPlayers(1)" class="w-8 h-8 rounded-lg bg-[#281D17] text-[#F5EFEB] font-bold text-xs">+</button>
                        </div>
                    </div>
                </div>

                <!-- VOUCHER PROMO BOX IN BOOKING -->
                <div class="p-3 rounded-xl bg-[#1F1713] border border-[#C69255]/25">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-bold text-[#D7C9BD] flex items-center gap-1.5">
                            <i class="fa-solid fa-tag text-[#C69255]"></i>
                            <span>كود الخصم أو الفاوتشر:</span>
                        </span>
                        <button onclick="openVouchersModal()" class="text-[11px] text-[#E0A96D] hover:underline font-semibold">
                            اختر من الفاوتشرز المتاحة
                        </button>
                    </div>

                    ${appState.appliedVoucher ? `
                        <div class="flex items-center justify-between p-2 rounded-lg bg-[#281D17] border border-[#C69255]/40 text-xs">
                            <div class="flex items-center gap-2">
                                <span class="font-mono font-bold text-[#E0A96D]">${appState.appliedVoucher.code}</span>
                                <span class="text-[11px] text-[#B8A89A]">(${appState.appliedVoucher.title})</span>
                            </div>
                            <button onclick="removeAppliedVoucher()" class="text-rose-400 hover:text-rose-300 text-xs font-bold">
                                إلغاء الخصم
                            </button>
                        </div>
                    ` : `
                        <div class="flex gap-2">
                            <input type="text" id="manual-voucher-code" placeholder="أدخل كود الفاوتشر (مثال: XO-COFFEE20)" class="flex-1 px-3 py-1.5 rounded-lg bg-[#140E0C] border border-[#C69255]/20 text-xs text-[#F5EFEB] focus:border-[#E0A96D] focus:outline-none font-mono uppercase">
                            <button onclick="applyManualVoucher()" class="px-3 py-1.5 rounded-lg btn-coffee-outline text-xs font-bold">
                                تطبيق
                            </button>
                        </div>
                    `}
                </div>

                <!-- Instant Pricing Breakdown Box -->
                <div class="p-3.5 rounded-xl bg-[#1C1410] border border-[#C69255]/30">
                    <div class="flex justify-between items-center text-xs text-[#B8A89A] mb-1">
                        <span>نوع الغرفة المختارة:</span>
                        <span class="text-[#F5EFEB] font-bold">${room.name} (${room.type})</span>
                    </div>
                    <div class="flex justify-between items-center text-xs text-[#B8A89A] mb-1">
                        <span>حسبة السعر:</span>
                        <span class="text-[#D7C9BD]">${ratePerHour} ج (للفرد) × ${hours} ساعات × ${players} أفراد</span>
                    </div>
                    ${discount > 0 ? `
                        <div class="flex justify-between items-center text-xs text-emerald-400 mb-1">
                            <span>خصم الفاوتشر (${appState.appliedVoucher.code}):</span>
                            <span>-${discount} ج.م</span>
                        </div>
                    ` : ''}
                    <div class="pt-2 mt-2 border-t border-[#C69255]/20 flex justify-between items-center">
                        <span class="text-xs font-bold text-[#E0A96D]">الإجمالي المستحق:</span>
                        <span class="text-lg font-black text-[#E0A96D]">${total} ج.م</span>
                    </div>
                </div>

                <div class="pt-3 flex justify-between">
                    <button onclick="setBookingStep(2)" class="btn-coffee-outline px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                        <i class="fa-solid fa-arrow-right"></i>
                        <span>السابق</span>
                    </button>
                    <button onclick="setBookingStep(4)" class="btn-coffee-primary px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                        <span>التالي: الدفع والتأكيد</span>
                        <i class="fa-solid fa-arrow-left"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // STEP 4: Payment Method & Direct Confirmation (No WhatsApp)
    else if (step === 4) {
        content.innerHTML = `
            <div class="space-y-4">
                <label class="block text-xs font-bold text-[#D7C9BD]">اختر وسيلة الدفع المفضلة:</label>
                
                <div class="space-y-2">
                    <label class="flex items-center gap-3 p-3 rounded-xl border border-[#C69255]/20 bg-[#1A120E] cursor-pointer hover:border-[#C69255]/50">
                        <input type="radio" name="paymentMethod" value="كاش في الاستقبال" checked onchange="appState.bookingDraft.paymentMethod = this.value" class="text-[#C69255]">
                        <div class="flex-1">
                            <span class="text-xs font-bold text-[#F5EFEB] block">الدفع كاش في المكان (عند الوصول)</span>
                            <span class="text-[11px] text-[#B8A89A]">سدد المبلغ في الكاشير عند حضورك للاستمتاع بوقتك.</span>
                        </div>
                        <i class="fa-solid fa-money-bill-wave text-emerald-400 text-base"></i>
                    </label>

                    <label class="flex items-center gap-3 p-3 rounded-xl border border-[#C69255]/20 bg-[#1A120E] cursor-pointer hover:border-[#C69255]/50">
                        <input type="radio" name="paymentMethod" value="فيزا / ماستركارد" onchange="appState.bookingDraft.paymentMethod = this.value" class="text-[#C69255]">
                        <div class="flex-1">
                            <span class="text-xs font-bold text-[#F5EFEB] block">دفع إلكتروني (فيزا / ماستركارد / ميزة)</span>
                            <span class="text-[11px] text-[#B8A89A]">دفع آمن بالبطاقة البنكية مع تأكيد فوري للحجز.</span>
                        </div>
                        <i class="fa-brands fa-cc-visa text-[#E0A96D] text-base"></i>
                    </label>

                    <label class="flex items-center gap-3 p-3 rounded-xl border border-[#C69255]/20 bg-[#1A120E] cursor-pointer hover:border-[#C69255]/50">
                        <input type="radio" name="paymentMethod" value="فودافون كاش / إنستاباي" onchange="appState.bookingDraft.paymentMethod = this.value" class="text-[#C69255]">
                        <div class="flex-1">
                            <span class="text-xs font-bold text-[#F5EFEB] block">فودافون كاش أو إنستاباي (InstaPay)</span>
                            <span class="text-[11px] text-[#B8A89A]">تحويل فوري لمحفظة المكان برقم المحفظة: 01012345678</span>
                        </div>
                        <i class="fa-solid fa-mobile-screen-button text-[#C69255] text-base"></i>
                    </label>
                </div>

                <!-- Final Booking Summary Card -->
                <div class="flex items-center gap-3 p-3 rounded-xl bg-[#1C1410] border border-[#C69255]/30 mb-2">
                    <img src="${room.image}" alt="${room.name}" class="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#C69255]/30">
                    <div class="flex-1 min-w-0">
                        <span class="text-[10px] font-bold text-[#C69255] uppercase tracking-wider block">${room.type} • ${room.themeName}</span>
                        <h5 class="text-xs font-bold text-[#F5EFEB] truncate mb-1">${room.name}</h5>
                        <span class="text-[11px] text-[#E0A96D] font-mono">${room.hourlyRate} ج.م / س للفرد</span>
                    </div>
                </div>

                <div class="p-3 rounded-xl bg-[#1C1410] border border-[#C69255]/25 text-xs space-y-1.5">
                    <div class="flex justify-between text-[#D7C9BD]">
                        <span>العميل:</span>
                        <span class="font-bold text-[#F5EFEB]">${appState.bookingDraft.customerName}</span>
                    </div>
                    <div class="flex justify-between text-[#D7C9BD]">
                        <span>الغرفة:</span>
                        <span class="font-bold text-[#E0A96D]">${room.name}</span>
                    </div>
                    <div class="flex justify-between text-[#D7C9BD]">
                        <span>الموعد:</span>
                        <span>${appState.bookingDraft.date} في تمام ${appState.bookingDraft.time}</span>
                    </div>
                    <div class="flex justify-between text-[#D7C9BD]">
                        <span>المدة واللاعبين:</span>
                        <span>${hours} ساعات - ${players} أفراد</span>
                    </div>
                    ${discount > 0 ? `
                        <div class="flex justify-between text-emerald-400">
                            <span>خصم الفاوتشر:</span>
                            <span>-${discount} ج.م</span>
                        </div>
                    ` : ''}
                    <div class="pt-1.5 border-t border-[#C69255]/20 flex justify-between font-bold">
                        <span class="text-[#E0A96D]">إجمالي الحساب:</span>
                        <span class="text-base text-[#E0A96D]">${total} ج.م</span>
                    </div>
                </div>

                <div class="pt-3">
                    <button onclick="finalizeBooking()" class="btn-coffee-primary w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                        <i class="fa-solid fa-check"></i>
                        <span>تأكيد الحجز وإصدار التذكرة الآن</span>
                    </button>
                </div>
            </div>
        `;
    }
}

function applyManualVoucher() {
    const input = document.getElementById('manual-voucher-code');
    if (!input) return;
    const code = input.value.trim().toUpperCase();
    if (!code) {
        showToast("أدخل كود الفاوتشر أولاً", "warning");
        return;
    }

    const voucher = XO_DATA.vouchers.find(v => v.code === code);
    if (!voucher) {
        showToast("كود الفاوتشر غير صالح أو منتهي الصلاحية", "warning");
        return;
    }

    appState.appliedVoucher = voucher;
    appState.bookingDraft.voucherCode = voucher.code;
    sfx.playSuccess();
    renderBookingStep();
    showToast(`تم تفعيل خصم ${voucher.title}!`, "success", "fa-tag");
}

function validateStep1() {
    const nameInput = document.getElementById('b-name');
    const phoneInput = document.getElementById('b-phone');
    const idInput = document.getElementById('b-customer-id');

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const customId = idInput ? idInput.value.trim() : "";

    if (!name || name.length < 2) {
        showToast("يرجى كتابة الاسم بشكل صحيح", "warning");
        if (nameInput) nameInput.focus();
        return;
    }
    if (!phone || phone.length < 8) {
        showToast("يرجى كتابة رقم الهاتف بشكل صحيح", "warning");
        if (phoneInput) phoneInput.focus();
        return;
    }

    appState.bookingDraft.customerName = name;
    appState.bookingDraft.customerPhone = phone;

    if (!customId) {
        if (!appState.currentUser) {
            const newId = generateCustomerId();
            appState.bookingDraft.customerId = newId;
            const newUser = {
                id: newId,
                name: name,
                phone: phone,
                points: 50,
                tier: "عضو جديد",
                totalHours: 0,
                createdAt: new Date().toISOString()
            };
            Storage.saveUser(newUser);
            Storage.setSessionUser(newId);
            appState.currentUser = newUser;
            renderUserBar();
        } else {
            appState.bookingDraft.customerId = appState.currentUser.id;
        }
    } else {
        appState.bookingDraft.customerId = customId;
    }

    sfx.playClick();
    setBookingStep(2);
}

function selectRoomForBooking(roomId) {
    sfx.playClick();
    appState.bookingDraft.roomId = roomId;
    renderBookingStep();
}

function adjustHours(delta) {
    sfx.playClick();
    let current = parseInt(appState.bookingDraft.hours) || 1;
    current = Math.max(1, Math.min(12, current + delta));
    appState.bookingDraft.hours = current;
    renderBookingStep();
}

function adjustPlayers(delta) {
    sfx.playClick();
    let current = parseInt(appState.bookingDraft.players) || 1;
    current = Math.max(1, Math.min(8, current + delta));
    appState.bookingDraft.players = current;
    renderBookingStep();
}

// Finalize Booking (No WhatsApp)
function finalizeBooking() {
    const { room, ratePerHour, hours, players, discount, total } = calculateBookingPrice();
    const bookingId = generateBookingId();
    const customerId = appState.bookingDraft.customerId || (appState.currentUser ? appState.currentUser.id : generateCustomerId());

    const bookingRecord = {
        id: bookingId,
        customerId: customerId,
        customerName: appState.bookingDraft.customerName,
        customerPhone: appState.bookingDraft.customerPhone,
        roomId: room.id,
        roomName: room.name,
        consoleType: room.type,
        ratePerHour: ratePerHour,
        hours: hours,
        players: players,
        discount: discount,
        voucherCode: appState.appliedVoucher ? appState.appliedVoucher.code : null,
        totalPrice: total,
        date: appState.bookingDraft.date,
        time: appState.bookingDraft.time,
        paymentMethod: appState.bookingDraft.paymentMethod,
        status: "مؤكد",
        createdAt: new Date().toISOString()
    };

    Storage.saveBooking(bookingRecord);

    if (appState.currentUser) {
        appState.currentUser.totalHours = (appState.currentUser.totalHours || 0) + hours;
        appState.currentUser.points = (appState.currentUser.points || 0) + (hours * 10);
        Storage.saveUser(appState.currentUser);
    }

    sfx.playSuccess();
    closeBookingModal();

    showBookingReceipt(bookingRecord);
}

function showBookingReceipt(booking) {
    const modal = document.getElementById('receipt-modal');
    if (!modal) return;

    const room = XO_DATA.rooms.find(r => r.id === booking.roomId) || XO_DATA.rooms[0];
    const roomImg = document.getElementById('receipt-room-img');
    const roomTypeBadge = document.getElementById('receipt-room-type-badge');
    if (roomImg) roomImg.src = room.image;
    if (roomTypeBadge) roomTypeBadge.textContent = room.type;

    document.getElementById('receipt-code').textContent = booking.id;
    document.getElementById('receipt-customer-name').textContent = booking.customerName;
    document.getElementById('receipt-customer-id').textContent = booking.customerId;
    document.getElementById('receipt-customer-phone').textContent = booking.customerPhone;
    document.getElementById('receipt-room-name').textContent = booking.roomName;
    document.getElementById('receipt-date-time').textContent = `${booking.date} | ${booking.time}`;
    document.getElementById('receipt-duration-players').textContent = `${booking.hours} ساعات (${booking.players} أفراد)`;
    document.getElementById('receipt-total-price').textContent = `${booking.totalPrice} ج.م`;
    document.getElementById('receipt-payment-method').textContent = booking.paymentMethod;

    const qrContainer = document.getElementById('receipt-qr-code');
    if (qrContainer) {
        qrContainer.innerHTML = generateQRCodeSVG(`${booking.id}:${booking.customerId}:${booking.totalPrice}EGP`);
    }

    modal.classList.remove('hidden');
}

function closeReceiptModal() {
    const modal = document.getElementById('receipt-modal');
    if (modal) modal.classList.add('hidden');
}

// ----------------------------------------------------
// CUSTOMER DASHBOARD & DIGITAL ID SYSTEM
// ----------------------------------------------------
function openDashboardModal() {
    sfx.playClick();
    if (!appState.currentUser) {
        openAuthModal();
        return;
    }

    const modal = document.getElementById('dashboard-modal');
    if (!modal) return;

    renderDigitalMemberCard();
    renderUserBookingsList();
    renderUserOrdersList();

    modal.classList.remove('hidden');
}

function closeDashboardModal() {
    const modal = document.getElementById('dashboard-modal');
    if (modal) modal.classList.add('hidden');
}

function renderDigitalMemberCard() {
    const cardEl = document.getElementById('dashboard-member-card');
    if (!cardEl || !appState.currentUser) return;

    const u = appState.currentUser;
    cardEl.innerHTML = `
        <div class="membership-card p-6 relative overflow-hidden">
            <div class="absolute inset-0 opacity-15 pointer-events-none">
                <img src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover">
            </div>
            <div class="flex items-start justify-between mb-6 relative z-10">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E0A96D] to-[#A8733D] flex items-center justify-center text-[#140E0C] font-black text-xl shadow-lg">
                        XO
                    </div>
                    <div>
                        <h4 class="text-base font-extrabold text-[#F5EFEB] tracking-wide">XO PS LOUNGE</h4>
                        <span class="text-[11px] text-[#E0A96D] font-mono tracking-wider">GAMING & COFFEE MEMBERSHIP</span>
                    </div>
                </div>

                <div class="text-left">
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-[#38261E] text-[#E0A96D] border border-[#C69255]/40 flex items-center gap-1">
                        <i class="fa-solid fa-crown text-[#C69255] text-[10px]"></i> ${u.tier || 'عضو VIP'}
                    </span>
                </div>
            </div>

            <div class="flex items-center justify-between mb-5 relative z-10">
                <div>
                    <span class="text-[10px] text-[#B8A89A] block mb-0.5">اسم العميل</span>
                    <h3 class="text-lg font-bold text-[#F5EFEB]">${u.name}</h3>
                    <span class="text-xs text-[#D7C9BD] font-mono">${u.phone}</span>
                </div>

                <div class="w-20 h-20">
                    ${generateQRCodeSVG(`ID:${u.id}|NAME:${u.name}`)}
                </div>
            </div>

            <div class="pt-3 border-t border-[#C69255]/20 flex items-center justify-between relative z-10">
                <div>
                    <span class="text-[10px] text-[#B8A89A] block">رقم العضوية (CUSTOMER ID)</span>
                    <span class="text-lg font-mono font-black text-[#E0A96D] tracking-widest">${u.id}</span>
                </div>

                <div class="flex items-center gap-4 text-left">
                    <div>
                        <span class="text-[10px] text-[#B8A89A] block">ساعات اللعب</span>
                        <span class="text-xs font-bold text-[#F5EFEB]">${u.totalHours || 0} س</span>
                    </div>
                    <div>
                        <span class="text-[10px] text-[#B8A89A] block">نقاط الولاء</span>
                        <span class="text-xs font-bold text-[#E0A96D]">${u.points || 0} نقطة</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderUserBookingsList() {
    const container = document.getElementById('dashboard-bookings-list');
    if (!container || !appState.currentUser) return;

    const allBookings = Storage.getBookings();
    const myBookings = allBookings.filter(b => b.customerId === appState.currentUser.id || b.customerPhone === appState.currentUser.phone);

    if (myBookings.length === 0) {
        container.innerHTML = `
            <div class="text-center py-6 text-[#B8A89A] text-xs">
                <i class="fa-regular fa-calendar-xmark text-3xl mb-2 opacity-30 text-[#C69255]"></i>
                <p>لا توجد حجوزات سابقة مسجلة لهذا الحساب</p>
            </div>
        `;
        return;
    }

    container.innerHTML = myBookings.map(b => `
        <div class="p-3.5 rounded-xl bg-[#1C1410] border border-[#C69255]/20 flex items-center justify-between gap-3 text-xs">
            <div>
                <div class="flex items-center gap-2 mb-1">
                    <span class="font-bold text-[#F5EFEB]">${b.roomName}</span>
                    <span class="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#2A1D17] text-[#E0A96D]">${b.id}</span>
                </div>
                <div class="text-[#B8A89A] text-[11px]">
                    <span>${b.date} • ${b.time}</span> | <span>${b.hours} ساعات (${b.players} أفراد)</span>
                </div>
            </div>

            <div class="text-left">
                <span class="font-black text-[#E0A96D] block mb-0.5">${b.totalPrice} ج.م</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1E2E20] text-emerald-400 border border-emerald-500/30">
                    ${b.status}
                </span>
            </div>
        </div>
    `).join('');
}

function renderUserOrdersList() {
    const container = document.getElementById('dashboard-orders-list');
    if (!container || !appState.currentUser) return;

    const allOrders = Storage.getOrders();
    const myOrders = allOrders.filter(o => o.customerId === appState.currentUser.id);

    if (myOrders.length === 0) {
        container.innerHTML = `
            <div class="text-center py-6 text-[#B8A89A] text-xs">
                <i class="fa-solid fa-mug-hot text-3xl mb-2 opacity-30 text-[#C69255]"></i>
                <p>لم تقم بطلب مشروبات من الريست حتى الآن</p>
            </div>
        `;
        return;
    }

    container.innerHTML = myOrders.map(o => `
        <div class="p-3.5 rounded-xl bg-[#1C1410] border border-[#C69255]/20 flex items-center justify-between gap-3 text-xs">
            <div>
                <div class="flex items-center gap-2 mb-1">
                    <span class="font-bold text-[#E0A96D]">طلب ريست: روم #${o.roomId}</span>
                    <span class="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#2A1D17] text-[#D7C9BD]">${o.id}</span>
                </div>
                <div class="text-[#B8A89A] text-[11px] truncate max-w-[200px]">
                    ${o.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                </div>
            </div>

            <div class="text-left">
                <span class="font-black text-[#E0A96D] block mb-0.5">${o.total} ج.م</span>
                <span class="text-[10px] text-[#B8A89A]">${o.date}</span>
            </div>
        </div>
    `).join('');
}

function openAuthModal() {
    sfx.playClick();
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('hidden');
}

function handleAuthSubmit() {
    const name = document.getElementById('auth-name').value.trim();
    const phone = document.getElementById('auth-phone').value.trim();

    if (!name || !phone) {
        showToast("يرجى إدخال الاسم ورقم الهاتف", "warning");
        return;
    }

    const users = Storage.getUsers();
    let user = users.find(u => u.phone === phone);

    if (!user) {
        user = {
            id: generateCustomerId(),
            name: name,
            phone: phone,
            points: 100,
            tier: "عضو VIP فضي",
            totalHours: 0,
            createdAt: new Date().toISOString()
        };
        Storage.saveUser(user);
    } else {
        user.name = name;
        Storage.saveUser(user);
    }

    appState.currentUser = user;
    Storage.setSessionUser(user.id);

    sfx.playSuccess();
    renderUserBar();
    closeAuthModal();
    showToast(`مرحباً بك يا ${user.name}! كود عضويتك هو ${user.id}`, "success", "fa-user-check");
    openDashboardModal();
}

function logoutUser() {
    sfx.playClick();
    appState.currentUser = null;
    Storage.setSessionUser(null);
    renderUserBar();
    closeDashboardModal();
    showToast("تم تسجيل الخروج بنجاح", "info");
}

// ICON GRID ACTIONS (No WhatsApp)
function dashboardAction(action) {
    sfx.playClick();
    closeDashboardModal();

    switch (action) {
        case 'book':
            openBookingModal(1);
            break;
        case 'the_rest':
            const restSection = document.getElementById('the-rest-section');
            if (restSection) restSection.scrollIntoView({ behavior: 'smooth' });
            break;
        case 'rooms':
            const roomsSection = document.getElementById('rooms-section');
            if (roomsSection) roomsSection.scrollIntoView({ behavior: 'smooth' });
            break;
        case 'games':
            const gamesSection = document.getElementById('games-section');
            if (gamesSection) gamesSection.scrollIntoView({ behavior: 'smooth' });
            break;
        case 'vouchers':
            openVouchersModal();
            break;
        case 'card':
            openDashboardModal();
            break;
        default:
            break;
    }
}
