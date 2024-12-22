import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { useAuthenticatedInOrganizationGuard } from "./userHelpers";

export const startOnboarding = mutation({
  args: {
    organizationId: v.string(),
    currentStep: v.number(),
    finished: v.boolean()
  },
  handler: async (ctx, args) => {
    const { userId } = await useAuthenticatedInOrganizationGuard(ctx, args.organizationId, "org:sys_profile:manage");
    
    await ctx.db.insert("organizationOnboarding", {
      userId,
      organizationId: args.organizationId,
      currentStep: args.currentStep,
      finished: args.finished
    });
  },
});
