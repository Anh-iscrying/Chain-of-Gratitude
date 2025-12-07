# 🌸 Chain of Gratitude (On-Chain Journal)

**Dự án Final Project cho khóa học Rise In - IOTA Move Developer.**

Đây là ứng dụng **Nhật ký Biết Ơn** (Decentralized Gratitude Journal) chạy trên mạng lưới IOTA Testnet. Ứng dụng giúp người dùng lưu giữ những điều tốt đẹp, những lời cảm ơn một cách vĩnh cửu (immutable) trên Blockchain.

## 📖 Giới thiệu
Thay vì một danh sách công việc khô khan, **Chain of Gratitude** biến các thao tác CRUD (Tạo, Đọc, Sửa, Xóa) trên Blockchain thành một trải nghiệm cảm xúc:
- Gửi đi năng lượng tích cực.
- "Khắc ghi" những khoảnh khắc đẹp vào tim (và vào chuỗi khối).

## 🌟 Tính năng
- **Gửi lời biết ơn (Create):** Tạo một Object chứa nội dung biết ơn và lưu trực tiếp lên Blockchain.
- **Dòng chảy ký ức (Read):** Tự động tải và hiển thị danh sách các điều biết ơn của người dùng từ ví.
- **Khắc ghi (Update State):** Chuyển trạng thái từ "Mới gửi" sang "Đã khắc ghi" (Thay đổi trường `is_done` trên contract).
- **Buông bỏ (Delete):** Xóa bỏ những điều không còn phù hợp khỏi dòng chảy ký ức.
- **Giao diện:** Thiết kế ấm áp (Rose/Pink theme), hỗ trợ tương tác mượt mà với Radix UI & Tailwind CSS.

## 💡 Lưu ý về Cấu trúc (Technical Note)
Dự án được xây dựng dựa trên cốt lõi kỹ thuật của một **To-Do List (CRUD Application)**:
- Repo Name: `to-do-list`
- Smart Contract Module: `todo_list::todo_list`
- Struct: `Task`

Tuy nhiên, Frontend đã được tùy biến (re-skin) hoàn toàn để phục vụ Use-case là "Chain of Gratitude". Điều này chứng minh tính linh hoạt của Move Object: cùng một cấu trúc dữ liệu có thể phục vụ nhiều mục đích khác nhau.

## 🔧 Thông tin kỹ thuật
- **Network:** IOTA Testnet
- **Smart Contract Language:** Move
- **Frontend:** Next.js, TypeScript, IOTA dApp Kit, Radix UI
- **Package ID:** `0x572fe621c85d764c1564837f5deb8273dfe5631e8184ef4a08f49e83cecc67d5`

## 🚀 Hướng dẫn cài đặt & Chạy

### 1. Yêu cầu
- Node.js (v18 trở lên)
- Pnpm
- Ví IOTA Wallet (Extension)

### 2. Cài đặt
```bash
# Clone dự án
git clone https://github.com/Anh-iscrying/to-do-list.git
cd to-do-list

# Cài đặt thư viện
pnpm install
```

### 3. Chạy Front-end
```bash
pnpm dev
```
Mở trình duyệt tại: http://localhost:3000

