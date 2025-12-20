const prisma = require("../src/lib/prisma");

/**
 * Lấy giỏ hàng của user
 */

exports.getCart = async (
  userId,
  { page = 1, limit = 8, search = "", sort = "newest" }
) => {
  if (!userId) throw new Error("Unauthorized");

  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    return {
      items: [],
      totalAmount: 0,
      pagination: { page, limit, totalItems: 0, totalPages: 0 },
    };
  }

  const whereItem = {
    cartId: cart.id,
    ...(search && {
      product: {
        name: { contains: search, mode: "insensitive" },
      },
    }),
  };

  const [items, totalItems] = await Promise.all([
    prisma.cartItem.findMany({
      where: whereItem,
      orderBy: { addedAt: sort === "oldest" ? "asc" : "desc" },
      skip: (page - 1) * limit,
      take: limit,
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
    }),
    prisma.cartItem.count({ where: whereItem }),
  ]);

  const mappedItems = items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    itemTotal: item.quantity * Number(item.product.price),
    product: {
      ...item.product,
      mainImage: item.product.images[0]?.imageUrl || null,
      images: undefined,
    },
  }));

  const totalAmount = mappedItems.reduce((sum, i) => sum + i.itemTotal, 0);

  return {
    items: mappedItems,
    totalAmount,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};

exports.addToCart = async (userId, { productId, quantity = 1 }) => {
  if (!userId || !productId) throw new Error("Invalid input");

  const cart = await prisma.cart.upsert({
    where: { userId },
    create: { userId },
    update: {},
  });

  const existing = await prisma.cartItem.findUnique({
     where: {
      cartId_productId: {
        cartId: cart.id,
        productId:productId,
      }
    }
  })
  if( existing ){
   
    return this.updateCartItem(userId,{productId, quantity : existing.quantity+quantity})
  }

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
    },
  });

};

exports.updateCartItem = async (userId, { productId, quantity }) => {
  if (!userId) throw new Error("Unauthorized");

  const cart = await prisma.cart.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!cart) throw new Error("cart not found");
  const cartitem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId: productId },
  });
  if (!cartitem) throw new Error("cartItem not found");

  return prisma.cartItem.update({
    where: { id: cartitem.id },
    data: { quantity },
  });
};

exports.removeFromCart = async (userId, productId) => {
  if (!userId) throw new Error("Unauthorized");

  const cart = await prisma.cart.findUnique({
    where: {
      userId: userId,
    },
  });

  
 if (!cart) throw new Error("cart not found");
  const cartitem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId: productId },
  });
  if (!cartitem) throw new Error("cartItem not found");

  await prisma.cartItem.delete({
    where: { id: cartitem.id },
  });
};

exports.clearCart = async (userId) => {
  if (!userId) throw new Error("Unauthorized");

  const cart = await prisma.cart.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!cart) throw new Error("cart not found");

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
};
