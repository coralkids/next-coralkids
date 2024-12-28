import { Auth } from "convex/server";
import clerk from "./clerkClient";


export const useAuthenticatedGuard = async (ctx: { auth: Auth }) => {
    const identity = await ctx.auth.getUserIdentity();

    return identity;
}

export const useAuthenticatedInOrganizationGuard = async (ctx: { auth: Auth }, organizationId: string, permission?: string) => {
    const identity = await ctx.auth.getUserIdentity();

    const userId = identity?.subject;

    if (!userId) {
        throw "Unauthorized"
    }

    const organizationMemberships = await clerk.users.getOrganizationMembershipList({
        userId: userId,
    })

    if (organizationMemberships.totalCount === 0) {
        throw "User hasn't got organization memberships yet"
    }

    const organizationMembership = organizationMemberships.data?.find((o) => o.organization.id === organizationId);

    if (!organizationMembership) {
        throw "User is not member of the organization"
    }

    if (permission) {
        if (!organizationMembership.permissions.includes(permission)) {
            throw "User has not permissions to do that Forbidden"
        }
    }


    return {
        identity,
        userId,
        organizationMemberships,
        organizationMembership
    }

}