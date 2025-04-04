import { atom, useRecoilValue } from "recoil";
import { ApplicationType, sidebarTabs } from "../library/types";

export const applicationsAtom = atom({
    default: [
        {
            name: "Transfer Certificate",
            date: "12/12/2021",
            type: ApplicationType.TransferCertificate,
            rollNo: "U05BA22S011"
        },
        {
            name: "Transfer Certificate",
            date: "12/12/2021",
            type: ApplicationType.TransferCertificate,
            rollNo: "U05BA22S012"
        },
        {
            name: "Transfer Certificate",
            date: "12/12/2021",
            type: ApplicationType.TransferCertificate,
            rollNo: "U05BA22S013"
        },
        {
            name: "Study Certificate",
            date: "12/12/2021",
            type: ApplicationType.StudyCertificate,
            rollNo: "U05BA22S014"
        },
        {
            name: "Study Certificate",
            date: "12/12/2021",
            type: ApplicationType.StudyCertificate,
            rollNo: "U05BA22S015"
        },
        {
            name: "Study Certificate",
            date: "12/12/2021",
            type: ApplicationType.StudyCertificate,
            rollNo: "U05BA22S016"
        },
        {
            name: "Mid Day Meal",
            date: "12/12/2021",
            type: ApplicationType.MidDayMeal,
            rollNo: "U05BA22S017"
        },
        {
            name: "Mid Day Meal",
            date: "12/12/2021",
            type: ApplicationType.MidDayMeal,
            rollNo: "U05BA22S018"
        },
        {
            name: "Transfer Certificate",
            date: "12/12/2021",
            type: ApplicationType.TransferCertificate,
            rollNo: "U05BA22S019"
        },
        {
            name: "Transfer Certificate",
            date: "12/12/2021",
            type: ApplicationType.TransferCertificate,
            rollNo: "U05BA22S0110"
        },
        {
            name: "Transfer Certificate",
            date: "12/12/2021",
            type: ApplicationType.TransferCertificate,
            rollNo: "U05BA22S0111"
        },
        {
            name: "Study Certificate",
            date: "12/12/2021",
            type: ApplicationType.StudyCertificate,
            rollNo: "U05BA22S0112"
        },
        {
            name: "Study Certificate",
            date: "12/12/2021",
            type: ApplicationType.StudyCertificate,
            rollNo: "U05BA22S0113"
        },
        {
            name: "Study Certificate",
            date: "12/12/2021",
            type: ApplicationType.StudyCertificate,
            rollNo: "U05BA22S0114"
        },
        {
            name: "Mid Day Meal",
            date: "12/12/2021",
            type: ApplicationType.MidDayMeal,
            rollNo: "U05BA22S0115"
        },
        {
            name: "Mid Day Meal",
            date: "12/12/2021",
            type: ApplicationType.MidDayMeal,
            rollNo: "U05BA22S0116"
        },
    ],
    key: "applications"
});

export const applicationsFilterAtom = atom({
    default: ApplicationType.All,
    key: "applicationsFilter"
})

export const activeTabAtom = atom({
    default: sidebarTabs.APPLICATIONS,
    key: "sidebarTab"
})