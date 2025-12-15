class SeatSelector {
    constructor(showtime, onSelectionChange) {
        this.showtime = showtime;
        this.room = appStore.getRoom(showtime.roomId);
        this.bookedSeats = appStore.getBookedSeats(showtime.id);
        this.selectedSeats = [];
        this.onSelectionChange = onSelectionChange;
    }

    render() {
        if (!this.room) {
            console.error("Room not found for roomId:", this.showtime.roomId);
            return '<div class="text-danger text-center p-5">Lỗi dữ liệu phòng chiếu. Vui lòng quay lại sau.</div>';
        }

        const rows = this.room.layout?.rows || 8;
        const cols = this.room.layout?.cols || 10;
        const rowLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        
        console.log("Rendering seats:", rows, cols); // Debug
        
        let html = `
            <div class="screen-container mb-5 text-center">
                <div class="screen bg-light opacity-50 mx-auto mb-3" style="height: 5px; width: 80%; box-shadow: 0 10px 20px white; border-radius: 50%;"></div>
                <small class="text-light text-opacity-50 text-uppercase letter-spacing-2">Màn Hình</small>
            </div>
            
            <div class="seat-map d-flex flex-column align-items-center gap-2">
        `;

        for (let r = 0; r < rows; r++) {
            html += `<div class="d-flex gap-2">`;
            for (let c = 1; c <= cols; c++) {
                const seatCode = `${rowLabels[r]}${c}`;
                const isBooked = this.bookedSeats.includes(seatCode);
                const isVip = this.room.type === 'VIP' || r >= rows - 2; // Mock VIP logic: Last 2 rows are VIP
                
                // Price modifier logic could go here
                
                html += `
                    <button 
                        class="btn seat-btn ${isBooked ? 'booked' : ''} ${isVip ? 'vip' : 'standard'}" 
                        data-code="${seatCode}"
                        data-price="${this.showtime.price + (isVip ? 20000 : 0)}"
                        ${isBooked ? 'disabled' : ''}
                        onclick="window.handleSeatClick(this)"
                    >
                        ${seatCode}
                    </button>
                `;
            }
            html += `</div>`;
        }
        
        html += `
            </div>
            
            <div class="d-flex justify-content-center gap-4 mt-5">
                <div class="d-flex align-items-center"><div class="seat-legend standard me-2"></div><small>Thường</small></div>
                <div class="d-flex align-items-center"><div class="seat-legend vip me-2"></div><small>VIP (+20k)</small></div>
                <div class="d-flex align-items-center"><div class="seat-legend selecting me-2"></div><small>Đang chọn</small></div>
                <div class="d-flex align-items-center"><div class="seat-legend booked me-2"></div><small>Đã đặt</small></div>
            </div>

            <style>
                .seat-btn {
                    width: 35px;
                    height: 35px;
                    padding: 0;
                    font-size: 10px;
                    border: 1px solid rgba(255,255,255,0.2);
                    color: white;
                    border-radius: 6px;
                }
                .seat-btn:hover:not(:disabled) {
                    transform: scale(1.2);
                }
                .seat-btn.booked {
                    background-color: #444;
                    color: #666;
                    border-color: transparent;
                    cursor: not-allowed;
                }
                .seat-btn.standard {
                    background-color: var(--color-bg-light);
                }
                .seat-btn.vip {
                    background-color: #554466; /* Purple tint generic */
                    border-color: #8866aa;
                }
                .seat-btn.selecting {
                    background-color: var(--color-primary);
                    color: black;
                    font-weight: bold;
                    box-shadow: 0 0 10px var(--color-primary);
                }
                
                .seat-legend { width: 20px; height: 20px; border-radius: 4px; }
                .seat-legend.standard { background-color: var(--color-bg-light); border: 1px solid rgba(255,255,255,0.2); }
                .seat-legend.vip { background-color: #554466; border: 1px solid #8866aa; }
                .seat-legend.selecting { background-color: var(--color-primary); }
                .seat-legend.booked { background-color: #444; }
            </style>
        `;

        // Expose handler globally because we are generating raw HTML strings for buttons
        // In a framework, this would be a bound function.
        window.handleSeatClick = (btn) => {
            console.log("Seat Clicked:", btn.dataset.code);
            const code = btn.dataset.code;
            const price = parseInt(btn.dataset.price);

            if (this.selectedSeats.find(s => s.code === code)) {
                // Deselect
                console.log("Deselecting:", code);
                this.selectedSeats = this.selectedSeats.filter(s => s.code !== code);
                btn.classList.remove('selecting');
            } else {
                // Select
                if (this.selectedSeats.length >= 8) {
                    alert("Bạn chỉ được chọn tối đa 8 ghế.");
                    return;
                }
                console.log("Selecting:", code);
                this.selectedSeats.push({ code, price });
                btn.classList.add('selecting');
            }
            
            // Callback to parent
            if (this.onSelectionChange) {
                console.log("Calling onSelectionChange with:", this.selectedSeats);
                this.onSelectionChange(this.selectedSeats);
            } else {
                console.warn("No onSelectionChange callback defined!");
            }
        };

        return html;
    }
    
    mount(containerId) {
        document.getElementById(containerId).innerHTML = this.render();
    }
}
