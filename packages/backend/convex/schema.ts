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
    frontendGeneratedUuid: v.string(),
    organizationId: v.optional(v.string()),
    currentStep: v.number(),
    finished: v.boolean()
  }),
});
