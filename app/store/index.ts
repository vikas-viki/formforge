import { create } from "zustand";

type UserStore = {
    userId: string;
    setUserId: (userId: string) => void;
    userProfile: Profile;
    setProfile: (profile: Profile) => void;
    userApplications: Application[];
    setUserApplications: (application: Application) => void;
}

type Application = {
    type: string,
    date: string,
    status: string,
    applicationId: string
}

type Profile = {
    name: string,
    rollNo: string,
    semister: number,
    course: string,
    passingYear: number,
    email: string
}

export const userStore = create<UserStore>((set) => ({
    userId: "",
    setUserId: (userId) => set({ userId: userId }),
    userProfile: {
        name: "",
        rollNo: "",
        semister: 0,
        course: "",
        passingYear: 0,
        email: ""
    },
    setProfile: (newUser) =>
        set((state) => ({
            userProfile: { ...state.userProfile, ...newUser }
        })),
    userApplications: [],
    setUserApplications: (newApplication) =>
        set((state) => ({
            userApplications: [...state.userApplications, newApplication]
        }))
}))