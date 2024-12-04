import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // if user exists
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user?.length === 0) {
      await ctx.db.insert("users", {
        userName: args.userName,
        email: args.email,
        imageUrl: args.imageUrl,
        upgrade:false
      });

      return 'Inserted new user';
    }

    return 'User already exists';
  },
});

export const upgradeUserPlan = mutation({
  args: {
    email: v.string()
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.query('users').filter((q) => q.eq(q.field('email'), args.email)).collect();
    if (result) {
      await ctx.db.patch(result[0]._id, {upgrade: true})
    }
  }
})

export const getUserInfo = query({
  args: {
    email: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    if (!args.email) return null; // Access email from args
    const result = await ctx.db.query('users').filter((q) => q.eq(q.field('email'), args.email)).collect();
    return result[0];
  }
});
