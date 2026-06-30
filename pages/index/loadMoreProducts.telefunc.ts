import { getContext } from "telefunc";
import type { PrismaClient } from "../../generated/prisma/client";
import { listHomeProductsPaged } from "../../modules/catalog/queries";

export async function onLoadMoreProducts(input: {
  skip: number;
  take?: number;
  categoryId?: number | null;
}) {
  const { prisma } = getContext() as { prisma: PrismaClient };
  const { take = 16, categoryId } = input;

  return listHomeProductsPaged(prisma, {
    skip: input.skip,
    take,
    categoryId,
  });
}
