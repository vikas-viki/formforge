import { selector } from "recoil";
import { statusFilterAtom, applicationsAtom, applicationsFilterAtom, searchFilterAtom } from "./atoms";
import { AnalyticsData, Months } from "../library/types";
import { ApplicationType } from "@prisma/client";
import { LOCAL_STORAGE } from "../library/constants";

export const filteredApplicationsSelector = selector({
    key: "filteredApplications",
    get: ({ get }) => {
        const applications = get(applicationsAtom);
        const filter = get(applicationsFilterAtom);
        const searchFilter = get(searchFilterAtom);
        const activeStatus = get(statusFilterAtom);
        console.log("change made ", { applications, filter, searchFilter, activeStatus })
        return applications
            .filter(a => (filter == "ALL" || a?.type == filter) && (searchFilter == "" || a.details?.rollNo?.toLowerCase().includes(searchFilter.toLowerCase())))
            .filter(a => a.status == activeStatus || activeStatus == "");
    },
})

export const analyticsDataSelector = selector({
    key: "AnalyticsFilter",
    get: ({ get }) => {
        const applications = get(applicationsAtom);
        var data: AnalyticsData = {
            donut: Object.values(ApplicationType).reduce((acc, type) => {
                acc[type as ApplicationType] = 0;
                return acc;
            }, {} as Record<ApplicationType, number>),
            APPROVED: {
                val: 0,
                percent: 0
            },
            REJECTED: {
                val: 0,
                percent: 0
            },
            PENDING: {
                val: 0,
                percent: 0
            },
            growthChart: Object.values(Months).reduce((acc, curr) => {
                acc[curr as Months] = 0
                return acc;
            }, {} as Record<Months, number>)
        }

        applications.forEach(a => {
            // status count
            if (data[a.status])
                data[a.status].val++;
            else
                data[a.status].val = 1;

            // applications count
            if (data.donut[a.type])
                data.donut[a.type]++;
            else
                data.donut[a.type] = 1;

            if (a.createdAt) {
                const currentYear = (new Date()).getFullYear();
                var applicationDate = new Date(a.createdAt);
                if (applicationDate.getFullYear() == currentYear) {
                    let month = applicationDate.getMonth();
                    if (data.growthChart[month as Months])
                        data.growthChart[month as Months]++;
                    else
                        data.growthChart[month as Months] = 1;
                }
            }
        })

        data.APPROVED.percent = (data.APPROVED.val / applications.length) * 100;
        data.PENDING.percent = (data.PENDING.val / applications.length) * 100;
        data.REJECTED.percent = (data.REJECTED.val / applications.length) * 100;

        localStorage.setItem(LOCAL_STORAGE.analyticsData, JSON.stringify(data));
        localStorage.setItem(LOCAL_STORAGE.maxApplications, applications.length.toString());
        return data;
    }
})