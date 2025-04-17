import { atom } from "recoil";
import { ApplicationsResponse, sidebarTabs } from "../library/types";
import { USER_TYPES } from "../library/constants";

export const applicationsAtom = atom({
    default: [] as ApplicationsResponse,
    key: "applications"
});

export const applicationsFilterAtom = atom({
    default: "ALL",
    key: "applicationsFilter"
})

export const statusFilterAtom = atom({
    default: "PENDING",
    key: "ApplicationStatus"
})

export const searchFilterAtom = atom({
    default: "",
    key: "searchFilter"
})

export const activeTabAtom = atom({
    default: sidebarTabs.APPLICATIONS,
    key: "sidebarTab"
})

export const userDetailsAtom = atom({
    default: {
        name: "John carter",
        email: "john@gmail.com",
        type: USER_TYPES.user,
        id: ""
    },
    key: "User"
})

export const currentApplicationAtom = atom({
    default: {},
    key: "CurrentApplicationId"
})

export const profileAtom = atom({
    default: {},
    key: "UserProfile"
})