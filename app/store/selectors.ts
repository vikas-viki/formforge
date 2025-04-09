import { selector } from "recoil";
import { statusFilterAtom, applicationsAtom, applicationsFilterAtom, searchFilterAtom, currentApplicationIdAtom } from "./atoms";

export const filteredApplicationsSelector = selector({
    key: "filteredApplications",
    get: ({ get }) => {
        const applications = get(applicationsAtom);
        const filter = get(applicationsFilterAtom);
        const searchFilter = get(searchFilterAtom);
        const activeStatus = get(statusFilterAtom);
        console.log("change made ", { applications, filter, searchFilter, activeStatus })
        return applications
            .filter(a => (a?.type == filter || filter == "ALL") && (a.details?.rollNo?.toLowerCase().includes(searchFilter.toLowerCase())))
            .filter(a => a.status == activeStatus || activeStatus == "");
    },
})

export const currentApplication = selector({
    key: "CurrentApplication",
    get: ({ get }) => {
        const applicationId = get(currentApplicationIdAtom);
        const applications = get(applicationsAtom);
        return applications.filter(a => a.applicationId == applicationId);
    }
})