const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getCart = async (
  userid,
  { page = 1, limit = 8, sort = "newest", search = "" } = {}
) => {
  if (!userid) {
    return {
      cart: null,
      pagination: null,
      message: "Không có userid",
    };
  }

  try {
    // Kiểm tra xem user có giỏ hàng không
    const cart = await prisma.cart.findUnique({
      where: { userId: Number(userid) },
      include: {
        items: {
          // Lọc theo từ khóa tìm kiếm (nếu có)
          where: search
            ? {
                product: {
                  name: {
                    contains: search,
                    mode: "insensitive", // không phân biệt hoa thường
                  },
                },
              }
            : undefined,

          // Sắp xếp các item trong giỏ
          orderBy:
            sort === "newest"
              ? { addedAt: "desc" }
              : sort === "oldest"
              ? { addedAt: "asc" }
              : { addedAt: "desc" }, // mặc định mới nhất

          // Phân trang
          skip: (page - 1) * limit,
          take: Number(limit),

          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                originalPrice: true,
                images: {
                  where: { isMain: true },
                  take: 1,
                  select: { imageUrl: true },
                },
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return {
        cart: {
          id: null,
          items: [],
          itemsCount: 0,
          totalAmount: 0,
        },
        pagination: {
          page,
          limit,
          totalItems: 0,
          totalPages: 0,
        },
        message: "Giỏ hàng trống",
      };
    }

    // Tính tổng tiền và thêm thông tin bổ sung cho từng item
    const itemsWithTotal = cart.items.map((item) => {
      const itemTotal = item.quantity * Number(item.product.price);
      return {
        ...item,
        itemTotal, // tổng tiền của item này
        mainImage: item.product.images[0]?.imageUrl || null,
        product: {
          ...item.product,
          images: undefined, // không trả về mảng images nữa, chỉ lấy main
        },
      };
    });

    const totalAmount = itemsWithTotal.reduce(
      (sum, item) => sum + item.itemTotal,
      0
    );

    // Đếm tổng số item phù hợp với search (để tính phân trang chính xác)
    const totalItemsCount = await prisma.cartItem.count({
      where: {
        cartId: cart.id,
        ...(search
          ? {
              product: {
                name: { contains: search, mode: "insensitive" },
              },
            }
          : {}),
      },
    });

    const totalPages = Math.ceil(totalItemsCount / limit);

    return {
      cart: {
        id: cart.id,
        items: itemsWithTotal,
        itemsCount: itemsWithTotal.length,
        totalAmount,
      },
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalItems: totalItemsCount,
        totalPages,
      },
      message: "Lấy giỏ hàng thành công",
    };
  } catch (error) {
    console.error("Error in getCart:", error);
    return {
      cart: null,
      pagination: null,
      message: "Lỗi khi lấy giỏ hàng",
      error: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
};
exports.addToCart = async (userid, { productId, quantity = 1 }) => {
  if (!userid || !productId) {
    return { success: false, message: "Thiếu userid hoặc productId" };
  }

  const userId = Number(userid);
  const prodId = Number(productId);
  const qty = Number(quantity);

  if (isNaN(userId) || isNaN(prodId) || isNaN(qty) || qty < 1) {
    return { success: false, message: "Dữ liệu không hợp lệ" };
  }

  try {
    // Kiểm tra sản phẩm có tồn tại không
    const product = await prisma.product.findUnique({
      where: { id: prodId },
      select: { id: true, price: true },
    });

    if (!product) {
      return { success: false, message: "Sản phẩm không tồn tại" };
    }

    // Tìm hoặc tạo giỏ hàng
    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    // Kiểm tra xem item đã có trong giỏ chưa
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: prodId,
        },
      },
    });

    let cartItem;
    if (existingItem) {
      // Nếu đã có → tăng số lượng
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: { increment: qty } },
      });
    } else {
      // Nếu chưa có → tạo mới
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: prodId,
          quantity: qty,
        },
      });
    }

    return {
      success: true,
      message: "Thêm vào giỏ hàng thành công",
      data: {
        cartItemId: cartItem.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
      },
    };
  } catch (error) {
    console.error("Error in addToCart:", error);
    return { success: false, message: "Lỗi khi thêm vào giỏ hàng", error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};

// ============================
// Cập nhật số lượng item trong giỏ
// ============================
exports.updateCartItem = async (userid, { cartItemId, quantity }) => {
  if (!userid || !cartItemId || quantity === undefined) {
    return { success: false, message: "Thiếu thông tin cần thiết" };
  }

  const userId = Number(userid);
  const itemId = Number(cartItemId);
  const qty = Number(quantity);

  if (isNaN(userId) || isNaN(itemId) || isNaN(qty)) {
    return { success: false, message: "Dữ liệu không hợp lệ" };
  }

  if (qty < 1) {
    return { success: false, message: "Số lượng phải lớn hơn 0" };
  }

  try {
    // Kiểm tra cart item có thuộc về user không
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: {
        cart: {
          select: { userId: true },
        },
      },
    });

    if (!cartItem) {
      return { success: false, message: "Không tìm thấy item trong giỏ hàng" };
    }

    if (cartItem.cart.userId !== userId) {
      return { success: false, message: "Không có quyền chỉnh sửa item này" };
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: qty },
    });

    return {
      success: true,
      message: "Cập nhật số lượng thành công",
      data: {
        cartItemId: updatedItem.id,
        productId: updatedItem.productId,
        quantity: updatedItem.quantity,
      },
    };
  } catch (error) {
    console.error("Error in updateCartItem:", error);
    return { success: false, message: "Lỗi khi cập nhật giỏ hàng", error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};

// ============================
// Xóa item khỏi giỏ hàng
// ============================
exports.removeFromCart = async (userid, { cartItemId }) => {
  if (!userid || !cartItemId) {
    return { success: false, message: "Thiếu userid hoặc cartItemId" };
  }

  const userId = Number(userid);
  const itemId = Number(cartItemId);

  if (isNaN(userId) || isNaN(itemId)) {
    return { success: false, message: "Dữ liệu không hợp lệ" };
  }

  try {
    // Kiểm tra item có thuộc về user không
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: {
        cart: {
          select: { userId: true },
        },
      },
    });

    if (!cartItem) {
      return { success: false, message: "Item không tồn tại trong giỏ hàng" };
    }

    if (cartItem.cart.userId !== userId) {
      return { success: false, message: "Không có quyền xóa item này" };
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    return {
      success: true,
      message: "Xóa item khỏi giỏ hàng thành công",
    };
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    return { success: false, message: "Lỗi khi xóa item khỏi giỏ hàng", error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};
exports.clearCart = async (userid) => {
  const userId = Number(userid);
  if (isNaN(userId)) return { success: false, message: "User ID không hợp lệ" };

  try {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) return { success: true, message: "Giỏ hàng đã trống" };

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return { success: true, message: "Xóa toàn bộ giỏ hàng thành công" };
  } catch (error) {
    console.error("Error in clearCart:", error);
    return { success: false, message: "Lỗi khi xóa giỏ hàng" };
  } finally {
    await prisma.$disconnect();
  }
};