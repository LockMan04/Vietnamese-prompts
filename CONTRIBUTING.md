# Hướng dẫn Đóng góp cho Vietnamese Prompts

Chào mừng bạn và cảm ơn bạn đã quan tâm đến việc đóng góp cho dự án Vietnamese Prompts! Mọi sự đóng góp, dù lớn hay nhỏ, đều được trân trọng và giúp cộng đồng phát triển.

## ❤️ Cách đóng góp được khuyến khích nhất

Cách dễ dàng và tốt nhất để đóng góp một prompt mới là sử dụng **Form đóng góp** có sẵn trên trang web của chúng tôi.

**➡️ [Đi đến Trang Đóng Góp](https://lockman04.github.io/vietnamese-prompts/contribution)**

Form này sẽ hướng dẫn bạn điền các thông tin cần thiết và tự động tạo một Issue trên GitHub. Bạn không cần phải biết về code hay Git.

---

## 🛠️ Các cách đóng góp khác (Dành cho người dùng kỹ thuật)

Nếu bạn là người dùng có kinh nghiệm với GitHub hoặc muốn đóng góp các nội dung khác ngoài prompt, bạn có thể sử dụng các cách sau:

*   **Báo lỗi (Bug Report):** Tìm thấy điều gì đó không hoạt động? Hãy giúp chúng tôi bằng cách tạo một **[Issue Báo lỗi](https://github.com/LockMan04/Vietnamese-prompts/issues/new?assignees=LockMan04&labels=Lỗi&title=%5BL%E1%BB%97i%5D%3A%20)**.
*   **Yêu cầu tính năng:** Có ý tưởng tuyệt vời để cải thiện trang web? Hãy chia sẻ qua một **[Issue Yêu cầu tính năng](https://github.com/LockMan04/Vietnamese-prompts/issues/new?assignees=LockMan04&labels=Nâng%20cấp&title=%5BT%C3%ADnh%20n%C4%83ng%5D%3A%20)**.
*   **Tự thêm Prompt qua Pull Request:** Nếu bạn muốn toàn quyền kiểm soát, bạn có thể trực tiếp thêm prompt vào file `public/prompts.jsonl` và tạo một Pull Request (PR).
    1.  Mở file `public/prompts.jsonl`.
    2.  Thêm một dòng JSON mới ở cuối file.
    3.  **`id`**: phải là **số thứ tự tiếp theo** trong danh sách.
    4.  **`contributor`**: điền tên hoặc username GitHub của bạn.
*   **Đóng góp mã nguồn:** Sửa lỗi, tối ưu hóa hiệu suất, hoặc xây dựng các tính năng đã được duyệt.

## 🚀 Quy trình đóng góp mã nguồn (Pull Request)

1.  Fork repository về tài khoản GitHub của bạn.
2.  Clone repository đã fork về máy.
3.  Cài đặt dependencies: `npm install`.
4.  Tạo một branch mới từ `main`: `git checkout -b ten-branch-cua-ban`.
5.  Thực hiện các thay đổi.
6.  Commit thay đổi với một message rõ ràng: `git commit -m "feat: Thêm tính năng X"`.
7.  Push branch của bạn lên GitHub: `git push origin ten-branch-cua-ban`.
8.  Mở repository trên GitHub và tạo một Pull Request mới.

Cảm ơn bạn đã xây dựng cộng đồng Vietnamese Prompts cùng chúng tôi!
