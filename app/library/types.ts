import { z } from "zod";
import { authBody, profileBody } from "./zod";

export enum ModalInputTypes {
    input,
    button,
    confirmation,
    cancel
}

export enum ApplicationType {
    TransferCertificate = "TransferCertificate",
    StudyCertificate = "StudyCertificate",
    MidDayMeal = "MidDayMeal"
};

export enum UserType {
    ADMIN,
    USER
}

export enum Status {
    pending,
    approved,
    rejected
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
    [ApplicationType.MidDayMeal]: {
        rollNo: string,
        course: string,
        semester: string,
    };
    [ApplicationType.StudyCertificate]: {
        name: string,
        rollNo: string,
        email: string,
        course: string,
        semister: string,
        passingYear: string,
        description: string
    };
    [ApplicationType.TransferCertificate]: {
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
    REJECTED
}