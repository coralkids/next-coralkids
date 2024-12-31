import { action, internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { useAuthenticatedACL, useAuthenticatedInOrganizationACL } from "./acl/acl";
import { internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

export const startOnboarding = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await useAuthenticatedACL(ctx);

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
    const identity = await useAuthenticatedACL(ctx);


    const organizationOnboarding = await ctx.db
      .query("organizationOnboarding")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .filter((q) => q.and(q.eq(q.field("finished"), false), q.gt(q.field("currentStep"), 0)))
      .first();



    return organizationOnboarding;
  }
}))

export const getOrganizationOnboarding = query({
  args: {
    id: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await useAuthenticatedACL(ctx)

    const organizationOnboarding = await ctx.db
      .query("organizationOnboarding")
      .filter((q) => q.eq(q.field("userId"), identity?.subject) && q.eq(q.field("_id"), args.id))
      .unique();

    return organizationOnboarding;
  },
});


export const nextStepOrganizationOnboarding = mutation({
  args: {
    id: v.id("organizationOnboarding"),
    organizationId: v.string(),
    currentStep: v.number(),
    finished: v.boolean()
  },
  handler: async (ctx, args) => {
   const identity = await useAuthenticatedInOrganizationACL(ctx, args.organizationId, "org:admin")
    
   const organizationOnboarding = await ctx.db.query("organizationOnboarding")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .filter((q) => q.eq(q.field("finished"), false))
      .first();

    if (!organizationOnboarding) {
      throw "OrganizationOnboarding not found"
    }

    await ctx.db.patch(organizationOnboarding._id, {
      organizationId: args.organizationId,
      currentStep: args.currentStep,
      finished: args.finished,
      updatedAt: Date.now()
    })
  },
});