import { Auth } from "convex/server";
import clerk from "../clerkClient";
import { ConvexError } from "convex/values";


export const useAuthenticatedACL = async (ctx: { auth: Auth }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        throw new ConvexError("Unauthorized")
    }

    return identity;
}

export const useAuthenticatedInOrganizationACL = async (ctx: { auth: Auth }, organizationId: string, permission?: string) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        throw new ConvexError("Unauthorized")
    }

    const organizationMemberships = await clerk.users.getOrganizationMembershipList({
        userId: identity.subject,
    })

    if (organizationMemberships.totalCount === 0) {
        throw new ConvexError("User hasn't got organization memberships yet")
    }

    const organizationMembership = organizationMemberships.data?.find((o) => o.organization.id === organizationId);

    if (!organizationMembership) {
        throw new ConvexError("User is not member of the organization")
    }

    if (permission) {
        if (!organizationMembership.permissions.includes(permission)) {
            throw new ConvexError("User has not permissions to do that, Forbidden")
        }
    }


    return {
        identity,
        organizationMemberships,
        organizationMembership
    }

}