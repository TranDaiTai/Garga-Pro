const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Hàm xác thực người dùng
exports.login = async (username, password) => {
  try {
    // Kiểm tra đầu vào
    if (!username || !password) {
      return {
        user: null,
        message: 'Vui lòng nhập đầy đủ tài khoản và mật khẩu!',
      };
    }

    // Tìm user theo username (hoặc email, tùy schema của bạn)
    const user = await prisma.user.findUnique({
      where: {
        username: username, // hoặc email: username nếu bạn dùng email để login
      },
    });

    // Nếu không tìm thấy user
    if (!user) {
      return {
        user: null,
        message: 'Tài khoản không tồn tại',
      };
    }

    // Kiểm tra mật khẩu
    // LƯU Ý: Prisma KHÔNG tự mã hóa mật khẩu!
    // Bạn PHẢI dùng bcrypt để so sánh mật khẩu đã hash
    // const bcrypt = require('bcrypt');

    const isPasswordValid = (password == user.passwordHash )? true : false

    if (!isPasswordValid) {
      return {
        user: null,
        message: 'Mật khẩu không đúng',
      };
    }
    // Thành công → trả về user (không trả password!)
    const { password: _, ...userWithoutPassword } = user; // loại bỏ trường password

    return {
      user: userWithoutPassword,
      message: 'Đăng nhập thành công',
    };
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    return {
      user: null,
      message: 'Có lỗi xảy ra, vui lòng thử lại sau',
    };
  } finally {
    // Tốt nhất nên disconnect trong môi trường production nếu không dùng prisma trong request lâu dài
    await prisma.$disconnect();
  }
};