# Vietnamese Prompts - Thư viện Prompt Tiếng Việt

Thư viện prompts tiếng Việt dành cho AI và sáng tạo nội dung. Khám phá hàng trăm prompts chất lượng cao cho text, hình ảnh và video.

## Tính năng

- 🇻🇳 **Tiếng Việt hoàn toàn**: Tất cả prompts được viết bằng tiếng Việt tự nhiên
- 🎨 **Đa dạng lĩnh vực**: Marketing, Giáo dục, Công nghệ, Sáng tạo nội dung, và nhiều hơn nữa
- 🖼️ **Nhiều loại prompt**: Text, Text-to-Image, Text-to-Video
- 🔍 **Tìm kiếm thông minh**: Tìm kiếm theo nội dung, danh mục, tags
- 🌓 **Dark Mode**: Giao diện tối và sáng tùy chỉnh
- 📱 **Responsive**: Tối ưu cho mobile, tablet và desktop
- 📋 **Sao chép nhanh**: Copy prompt chỉ với một click

## Công nghệ sử dụng

- **React 18** với TypeScript
- **Vite** cho build tool
- **Tailwind CSS** cho styling
- **Lucide React** cho icons
- **PapaParse** cho CSV parsing

## Cài đặt và chạy

```bash
# Clone repository
git clone https://github.com/LockMan04/vietnamese-prompts.git

# Di chuyển vào thư mục project
cd vietnamese-prompts

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build
```

## Cấu trúc dự án

```
src/
├── components/          # React components
│   ├── Header.tsx      # Header với search và dark mode
│   ├── FilterBar.tsx   # Bộ lọc theo danh mục và loại
│   └── PromptCard.tsx  # Card hiển thị prompt
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Context cho dark mode
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
│   └── csvLoader.ts   # Load và parse CSV data
└── App.tsx           # Main application component

public/
└── prompts.csv       # Dữ liệu prompts
```

## Cách thêm prompts mới

1. Mở file `public/prompts.csv`
2. Thêm dòng mới với format:
   ```csv
   id,category,title,prompt,type,image,description,tags
   ```

Các trường:
- `id`: ID duy nhất
- `category`: Lĩnh vực (VD: "Marketing", "Giáo dục")
- `title`: Tiêu đề ngắn gọn
- `prompt`: Nội dung prompt chi tiết
- `type`: Loại prompt ("text", "text-to-image", "text-to-video")
- `image`: URL hình ảnh minh họa
- `description`: Mô tả ngắn
- `tags`: Tags phân cách bởi dấu phẩy
- `contributor`: Người đóng góp

## Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Hãy:

1. Fork repository
2. Tạo branch mới cho feature/bugfix
3. Commit changes
4. Tạo Pull Request

Hoặc

Tạo GitHub Issues

1. Click "Đề xuất Prompt"
2. Điền thông tin prompt vào form
3. Submit issue, chúng tôi sẽ thêm vào