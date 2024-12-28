import { action, internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { useAuthenticatedGuard, useAuthenticatedInOrganizationGuard } from "./userHelpers";
import { internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

export const startOnboarding = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await useAuthenticatedGuard(ctx);

    if (identity) {
      const id = await ctx.db.insert("organizationOnboarding", {
        userId: identity?.subject,
        currentStep: 0,
        finished: false,
        updatedAt: Date.now()
      });

      return id;
    }

  },
});

export const getUnfinishedOrganizationOnboarding = query(({
  args: {},
  handler: async (ctx) => {
    const identity = await useAuthenticatedGuard(ctx);

    if (identity) {
      const organizationOnboarding = await ctx.db
        .query("organizationOnboarding")
        .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
        .filter((q) => q.eq(q.field("finished"), false))
        .first();



      return organizationOnboarding;
    }
  }
}))

export const getOrganizationOnboarding = query({
  args: {
    id: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await useAuthenticatedGuard(ctx)

    const organizationOnboarding = await ctx.db
      .query("organizationOnboarding")
      .filter((q) => q.eq(q.field("userId"), identity?.subject) && q.eq(q.field("_id"), args.id))
      .unique();

    return organizationOnboarding;
  },
});

export const updateOrganizationOnboarding = internalMutation(({
  args: {
    userId: v.string(),
    id: v.id("organizationOnboarding"),
    organizationId: v.string(),
    currentStep: v.number(),
    finished: v.boolean()
  },
  handler: async (ctx, args) => {
    const organizationOnboarding = await ctx.db.query("organizationOnboarding")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("finished"), false))
      .first();

    if (!organizationOnboarding) {
      throw "OrganizationOnboarding not found"
    }

    const updatedOnboarding = await ctx.db.patch(organizationOnboarding._id, {
      organizationId: args.organizationId,
      currentStep: args.currentStep,
      finished: args.finished,
      updatedAt: Date.now()
    })

    return updatedOnboarding;
  }
}))

export const nextStepOrganizationOnboarding = action({
  args: {
    id: v.id("organizationOnboarding"),
    organizationId: v.string(),
    currentStep: v.number(),
    finished: v.boolean()
  },
  handler: async (ctx, args): Promise<Doc<"organizationOnboarding"> | undefined> => {
    try {
      const { userId } = await useAuthenticatedInOrganizationGuard(ctx, args.organizationId, "org:sys_profile:manage");


      const updatedOrganizationOnboarding = await ctx.runMutation(internal.organizationOnboarding.updateOrganizationOnboarding, {
        id: args.id,
        userId,
        organizationId: args.organizationId,
        currentStep: args.currentStep,
        finished: args.finished
      });

      if (updatedOrganizationOnboarding) {
        return updatedOrganizationOnboarding;
      }


    } catch (e) {
      console.error(e)
    }

  },
});