/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as acl_acl from "../acl/acl.js";
import type * as clerkClient from "../clerkClient.js";
import type * as notes from "../notes.js";
import type * as openai from "../openai.js";
import type * as organizationOnboarding from "../organizationOnboarding.js";
import type * as utils from "../utils.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "acl/acl": typeof acl_acl;
  clerkClient: typeof clerkClient;
  notes: typeof notes;
  openai: typeof openai;
  organizationOnboarding: typeof organizationOnboarding;
  utils: typeof utils;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
