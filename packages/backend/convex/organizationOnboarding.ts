import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { useAuthenticatedGuard } from "./userHelpers";

export const startOnboarding = mutation({
  args: {},
  handler: async (ctx) => {
    const { subject: userId } = await useAuthenticatedGuard(ctx);

    const id = await ctx.db.insert("organizationOnboarding", {
      userId,
      currentStep: 0,
      finished: false,
      updatedAt: Date.now()
    });

    return id;
  },
});

export const getOrganizationOnboarding = query({
  args: {
    id: v.string()
  },
  handler: async (ctx, args) => {
    const {subject: userId} = await useAuthenticatedGuard(ctx)

    const organizationOnboarding = await ctx.db
      .query("organizationOnboarding")
      .filter((q) => q.eq(q.field("userId"), userId) && q.eq(q.field("_id"), args.id))
      .unique();

    return organizationOnboarding;
  },
});