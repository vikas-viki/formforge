import { z } from "zod";
import { authBody, profileBody } from "./zod";
import { ApplicationDetails, ApplicationType, ApplicationType as PrismaApplicationType } from "@prisma/client"

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string,
            type: "ADMIN" | "USER",
            rememberMe: boolean
        }
    }
    interface User {
        id: string,
        name: string,
        email: string,
        type: "ADMIN" | "USER",
        rememberMe: boolean
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        type: "ADMIN" | "USER",
        rememberMe?: boolean;
    }
}

export enum ModalInputTypes {
    input,
    button,
    confirmation,
    cancel
}

export enum ApplicationName {
    TRANSFER_CERTIFICATE = "Transfer Certificate",
    STUDY_CERTIFICATE = "Study Certificate",
    CONVEYANCE = "Conveyance Application",
    MID_DAY_MEAL = "Mid-Day Meals"
}

export enum UserType {
    ADMIN,
    USER
}

export enum Status {
    pending = "PENDING",
    approved = "APPROVED",
    rejected = "REJECTED"
}

export type SubmittedApplication = {
    name: string,
    date: string,
    type: ApplicationType,
    status: Status
}

export type Profile = {
    name: string,
    rollNo: string,
    email: string,
    course: string,
    semister: string,
    passingYear: string
}

export type AuthBody = z.infer<typeof authBody>;

export type ProfileBody = z.infer<typeof profileBody>;

export type ApplicationDataMap = {
    [ApplicationType.MID_DAY_MEAL]: {
        rollNo: string,
        course: string,
        semester: string,
    };
    [ApplicationType.STUDY_CERTIFICATE]: {
        name: string,
        rollNo: string,
        email: string,
        course: string,
        semister: string,
        passingYear: string,
        description: string
    };
    [ApplicationType.TRANSFER_CERTIFICATE]: {
        name: string,
        rollNo: string,
        email: string,
        course: string,
        passingYead: string,
        description: string
    }
}

export enum sidebarTabs {
    APPLICATIONS,
    ANALYTICS,
    CATEGORIES,
    TRANSFER_CERTIFICATE,
    STUDY_CERTIFICATE,
    MID_DAY_MEALS,
    CONDUCT_CERTIFICATE,
    APPROVED,
    REJECTED,
    PENDING,
    NEW_ADMIN,
    NEW_APPLICATION,
    APPLICATION_DETAILS
}

export type ApplicationsResponse = {
    applicationId: string,
    updatedAt: string,
    createdAt: string,
    reason: string | null,
    status: Status,
    type: PrismaApplicationType,
    details: ApplicationDetails
}[];

export type NewApplications = {
    type: PrismaApplicationType,
    kind: "NEW",
    feilds: {
        name?: string,
        rollNo?: string,
        email?: string,
        course?: string,
        semester?: string,
        passingYear?: string,
        description?: string
    }
}[];

export type AnalyticsData = {
    donut: Record<ApplicationType, number>;

} & { [status in Status]: {
    val: number,
    percent: number
} }
    & {
        growthChart: { [month in Months]: number }
    };

export enum Months {
    Jan,
    Feb,
    Mar,
    Apr,
    May,
    Jun,
    Jul,
    Aug,
    Sep,
    Oct,
    Nov,
    Dec
}

export type GetApplicationsReturn<T> = T extends "USER" ? NewApplications : ApplicationsResponse;

export type Credentials = {
    redirect: boolean,
    username: string,
    email: string,
    password: string,
    cPassword: string,
    rememberMe: string,
    type: "login" | "signup",
}

export type NewAdminBody = {
    email: string,
    password: string,
    name: string
}