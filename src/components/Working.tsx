import { BadgeCheck, BellRing, Pencil, SchoolIcon, Server, StarIcon } from 'lucide-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const Working = () => {
    return (
        <div className="w-full h-full flex justify-start relative items-center bg-green-600 py-10 lg:py-20 flex-col">
            <div className="w-full h-[100px] bg-green-600 absolute top-[-60px] " style={{ clipPath: "polygon(0 60%, 100% 0%,100% 100%,0% 100%)" }}></div>
            <span className="font-outfit text-[40px] font-bold self-center text-slate-900 mb-[70px]">How it works</span>
            <div className='w-full h-full flex justify-center items-center mx-[10px]'>
                <VerticalTimeline >
                    <VerticalTimelineElement
                        iconStyle={{ background: 'rgb(2, 107, 2)', color: '#fff' }}
                        contentStyle={{ borderRadius: "20px" }}
                        icon={<Pencil />}
                    >
                        <h4 className="font-poppins text-[20px] font-semibold mb-[7px]">Application Submission</h4>
                        <span className="font-poppins text-[18px]">
                            The student selects an application, fills in the required details and submits it for review.
                        </span>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        iconStyle={{ background: 'rgb(34, 137, 34)', color: '#fff' }}
                        contentStyle={{ borderRadius: "20px" }}
                        icon={<Server />}
                    >
                        <h4 className="font-poppins text-[20px] font-semibold mb-[7px]">Admin Notification</h4>
                        <span className="font-poppins text-[18px]">
                            The system automatically notifies the admin about the new application submitted by the student.
                        </span>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        iconStyle={{ background: 'rgb(66, 167, 66)', color: '#fff' }}
                        contentStyle={{ borderRadius: "20px" }}
                        icon={<BadgeCheck />}
                    >
                        <h4 className="font-poppins text-[20px] font-semibold mb-[7px]">Admin Review</h4>
                        <span className="font-poppins text-[18px]">
                            The admin reviews the application and either approves or rejects it based on the provided details.
                        </span>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        iconStyle={{ background: 'rgb(98, 197, 98)', color: '#fff' }}
                        contentStyle={{ borderRadius: "20px" }}
                        icon={<BellRing />}
                    >
                        <h4 className="font-poppins text-[20px] font-semibold mb-[7px]">Student Notification</h4>
                        <span className="font-poppins text-[18px]">
                            The student receives a notification once the admin has reviewed and processed the application.
                        </span>
                    </VerticalTimelineElement>

                </VerticalTimeline>
            </div>
        </div>
    )
}

export default Working;