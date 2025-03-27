import { z } from "zod";
import { authBody, profileBody } from "./zod";

export enum ModalInputTypes {
    input,
    button,
    confirmation,
    cancel
}

export enum ApplicationType {
    TransferCertificate,
    StudyCertificate,
    MidDayMeal,
    All
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