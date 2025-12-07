# IOTA To-Do List dApp 📝

Dự án Final Project cho khóa học Rise In. Đây là ứng dụng quản lý công việc phi tập trung (Decentralized To-Do List) chạy trên mạng lưới IOTA Testnet.

## 🌟 Tính năng
- **Tạo công việc (Add Task):** Lưu trữ nội dung công việc trực tiếp lên Blockchain (On-chain).
- **Danh sách công việc:** Tự động tải và hiển thị danh sách các việc cần làm của người dùng.
- **Đánh dấu hoàn thành:** Cập nhật trạng thái công việc (Done/Undone).
- **Xóa công việc:** Xóa vĩnh viễn dữ liệu khỏi giao diện.
- **Giao diện:** Tương thích Dark/Light mode, sử dụng Radix UI & Tailwind CSS.

## 🔧 Thông tin kỹ thuật
- **Network:** IOTA Testnet
- **Smart Contract Language:** Move
- **Frontend:** Next.js, TypeScript, IOTA dApp Kit
- **Package ID:** `0x... (DÁN PACKAGE ID CỦA BẠN VÀO ĐÂY) ...`

## 🚀 Hướng dẫn cài đặt & Chạy

### 1. Yêu cầu
- Node.js (v18 trở lên)
- Pnpm
- IOTA CLI (để deploy contract nếu cần)
- Ví IOTA Wallet (Extension)

### 2. Cài đặt
```bash
# Clone dự án
git clone <link-repo-cua-ban>
cd to-do-list

# Cài đặt thư viện
pnpm install