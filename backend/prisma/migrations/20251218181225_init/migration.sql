/*
  Warnings:

  - You are about to drop the column `discountType` on the `promotions` table. All the data in the column will be lost.
  - You are about to drop the column `discountValue` on the `promotions` table. All the data in the column will be lost.
  - Added the required column `discount_type` to the `promotions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount_value` to the `promotions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "promotions" DROP COLUMN "discountType",
DROP COLUMN "discountValue",
ADD COLUMN     "discount_type" VARCHAR(20) NOT NULL,
ADD COLUMN     "discount_value" DECIMAL(12,2) NOT NULL;
