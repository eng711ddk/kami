// server/debug.ts
import { Hono } from 'hono';
import { getPrisma } from './prisma';

const app = new Hono();

app.get('/debug', async (c) => {
  try {
    const prisma = getPrisma(c.env.DB);
    
    // 尝试查询所有表
    const tables = {
      admin: await prisma.admin.findMany().catch(e => ({ error: e.message })),
      category: await prisma.category.findMany().catch(e => ({ error: e.message })),
      product: await prisma.product.findMany().catch(e => ({ error: e.message })),
      card: await prisma.card.findMany().catch(e => ({ error: e.message })),
      order: await prisma.order.findMany().catch(e => ({ error: e.message })),
      siteSetting: await prisma.siteSetting.findMany().catch(e => ({ error: e.message })),
    };
    
    return c.json({ success: true, tables });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    }, 500);
  }
});

export default app;
