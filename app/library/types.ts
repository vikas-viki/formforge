import { z } from "zod";
import { authBody } from "./zod";

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

export type AuthBody = z.infer<typeof authBody>;