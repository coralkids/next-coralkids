import { Auth } from "convex/server";
import { ConvexError } from "convex/values";


export const useAuthenticatedACL = async (ctx: { auth: Auth }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        throw new ConvexError("Unauthorized")
    }

    return identity;
}

export const useAuthenticatedInOrganizationACL = async (ctx: { auth: Auth }, organizationId: string, role?: string) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        throw new ConvexError("Unauthorized")
    }

    if (identity["org_id"] !== organizationId) {
        throw new ConvexError("User is not member of the organization")
    }

    
    if (role) {
        if (identity["org_role"] !== role) {
            throw new ConvexError("User has not permissions to do that, Forbidden")
        }
    }
   
    return identity;

}