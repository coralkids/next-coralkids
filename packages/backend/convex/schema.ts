import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    userId: v.string(),
    title: v.string(),
    content: v.string(),
    summary: v.optional(v.string()),
  }),
  organizationOnboarding: defineTable({
    userId: v.string(),
    organizationId: v.optional(v.string()),
    currentStep: v.optional(v.number()),
    finished: v.optional(v.boolean()),
    updatedAt: v.number()
  }).index("by_userId", ["userId"]).index("by_finished", ["finished"]).index("by_currentStep", ["currentStep"]),
});
