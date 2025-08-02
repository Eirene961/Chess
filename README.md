# ♟️ Chess Online Project
Một ứng dụng Chess Online client-server (front-end) theo chuẩn Clean Architecture & SOLID.  


## 📝 Mục lục
- [Giới thiệu](#giới-thiệu)
- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc thư mục dự án](#📂-cấu-trúc-thư-mục-dự-án)
- [Cài đặt & chạy](#cài-đặt--chạy)
- [Có thể mở rộng](#có-thể-mở-rộng)
- [License](#license)


## Giới thiệu
Dự án này là phần client của trò chơi cờ vua, được tổ chức theo mô hình **Clean Architecture**:

- **Domain**: Chứa các entity (Piece, Pawn, Rook, ...)
- **Application**: Dịch vụ xử lý nghiệp vụ (BoardService, MoveValidator, Game)
- **Presentation**: Chịu trách nhiệm vẽ UI và tương tác (BoardRenderer)


## Tính năng
- Hiển thị bàn cờ 8x8 và các quân cờ bằng Unicode
- Tách rõ ràng giữa logic game và UI
- Di chuyển quân cờ theo luật cơ bản
- Xử lý highlight nước đi hợp lệ
- Kiểm tra **check**, **checkmate**, và **statemate**
- Hỗ trợ **castling**, **promotion**, và **en passant**


## Công nghệ sử dụng
- JavaScript (ES6 Modules)
- HTML5 & CSS3
- NodeJS


## 📂 Cấu trúc thư mục dự án
Dưới đây là cấu trúc thư mục của dự án, được thiết kế theo nguyên tắc tách biệt các mối quan tâm (Separation of Concerns) để dễ dàng bảo trì và mở rộng.

```
chess/
├── client/                # ▶️ Frontend application (UI)
│   ├── public/            # 📦 Assets tĩnh (images, fonts, favicon…)
│   └── src/               # ✨ Mã nguồn UI
│       ├── components/    # 🔹 Các thành phần giao diện (Board, Square…)
│       ├── pages/         # 📄 Các view/page (Home, GameRoom…)
│       ├── services/      # 🔗 API client, socket client
│       ├── utils/         # 🛠 Giúp việc chung (format, constants)
│       └── index.js       # 🚀 Entry-point khởi tạo UI
│
├── server/                # ⚙️ Backend application
│   ├── src/
│   │   ├── controllers/   # 🧠 Xử lý HTTP routes & socket events
│   │   ├── routes/        # 🛣 Định nghĩa endpoint (REST API) nếu có
│   │   ├── sockets/       # 🔌 Socket.IO handler (join, move, chat…)
│   │   ├── models/        # 🗄️ Định nghĩa schema (GameRoom, Player)
│   │   ├── services/      # 🏛 Business logic (GameManager, MoveValidator)
│   │   ├── utils/         # 🔧 Helpers chung (logging, error formatting)
│   │   └── server.js      # 🚀 Entry-point khởi tạo Express + Socket.IO
│   ├── .env               # 🔒 Biến môi trường (PORT, DB_URI…)
│   └── package.json       # 📜 Thư viện backend & scripts
│
├── shared/                # ♻️ Logic dùng chung client ↔ server
│   ├── domain/            # 🧩 Các entity core (Piece, Pawn, Rook…)
│   └── application/       # 📐 Use-case & rules (BoardService, GameState…)
│
├── docker-compose.yml     # 🐳 Chạy toàn bộ stack (client, server, db…)
├── .gitignore             # ⛔️ Đường dẫn loại trừ khi commit
└── README.md              # 📘 Hướng dẫn & mô tả dự án
```


## Cài đặt & chạy
1. Clone repository:
    ```bash
    $ git clone <repo-url>
    $ cd public
    ```
2. Mở `index.html` trên trình duyệt:  
    - Kéo thả file vào Chrome/Microsoft Edge
    - Hoặc chạy local server:
        ```bash
        $ npm install -g live-server
        $ live-server .
        ```


## Có thể mở rộng
- Tích hợp Socket.IO để multiplayer
- Xây dựng AI (Minimax với Alpha-Beta)
- Dùng React/Vue để rewrite UI


## License
MIT © Baus