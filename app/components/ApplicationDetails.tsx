import { useRecoilValue } from "recoil"
import { currentApplicationAtom } from "../store/atoms"

export default function ApplicationDetails() {
    const currentApplication = useRecoilValue(currentApplicationAtom)

    return (
        <div>
            {JSON.stringify(currentApplication)}
        </div>
    )
}