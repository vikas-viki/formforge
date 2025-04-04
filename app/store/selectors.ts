import { selector } from "recoil";
import { applicationsAtom, applicationsFilterAtom, searchFilterAtom } from "./atoms";
import { ApplicationType } from "../library/types";

export const filteredApplicationsSelector = selector({
    key: "filteredApplications",
    get: ({ get }) => {
        const applications = get(applicationsAtom);
        const filter = get(applicationsFilterAtom);
        const searchFilter = get(searchFilterAtom);
        return applications.filter(a => (a.type == filter || filter == ApplicationType.All) && a.rollNo.toLowerCase().includes(searchFilter.toLowerCase()));
    },
})