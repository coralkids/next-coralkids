import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { useAuthenticatedGuard, useAuthenticatedInOrganizationGuard } from "./userHelpers";

export const startOnboarding = mutation({
  args: {
    organizationId: v.optional(v.string()),
    onboardingUuid: v.string(),
    currentStep: v.number(),
    finished: v.boolean()
  },
  handler: async (ctx, args) => {
    const { subject: userId } = await useAuthenticatedGuard(ctx);

    if (args.organizationId) {
      await useAuthenticatedInOrganizationGuard(ctx, args.organizationId, "org:sys_profile:manage");
    }
    
    await ctx.db.insert("organizationOnboarding", {
      userId,
      frontendGeneratedUuid: args.onboardingUuid,
      organizationId: args.organizationId,
      currentStep: args.currentStep,
      finished: args.finished
    });
  },
});
