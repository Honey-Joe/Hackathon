import { Phone } from "lucide-react"
import { useState } from "react"
import FaqAccodion from "./FaqAccordian"
const Faq = () => {
    const [open, setOpen] = useState(false)
    const toggle = (index) =>{
        if(open === index){
            return setOpen(null)
        }
        setOpen(index)
    }
    const accordionData = [
        {
            title:"How many events can a participant join?",
            desc:"A participant can join a maximum of two events, including any two technical and two non-technical events. (It’s the team's responsibility to ensure that no events clash with one another)"
        },
        {
            title:"What is the registration fee, and when is the payment deadline?",
            desc:"The registration fee is ₹150 per participant, and it must be paid on or before 28th Nov 2024.."
        },
        {
            title:"Who is eligible to participate in the event?",
            desc:"Both undergraduate (UG) and postgraduate (PG) students are eligible to participate."
        },
        {
            title:"What documents must participants bring on the event day?",
            desc:"Participants must bring their college ID card along with a bonafide certificate from their respective college."
        },
        {
            title:"How should participants register for the event? Are spot registrations allowed?",
            desc:"Participants must register online, as spot registration is not encouraged."
        },{
            title:"Will food and refreshments be provided to participants?",
            desc:"Yes, food and refreshments will be provided to participants."
        }
    ]
  return (
    <>
        <div className="max-w-[100%] mx-auto bg-[#081F4D]  py-[40px]">
            <div className="lg:w-[90%] xl:w-[90%] mx-auto py-20 w-[90%]">
                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                    <div className="h-full flex justify-center">
                        <div className="h-full p-3 bg-white rounded-md flex justify-center">
                            <img  src="https://ik.imagekit.io/HoneyJoe/techx/pics.jpg?updatedAt=1731562650495" alt="Profile" className="w-full h-full rounded-lg"/>
                        </div> 
                    </div>
                    {/* FaqAccodion section  */}
                    <div className=" md:mt-40 lg:mt-0">
                        <div>
                            <div className=" flex items-center  gap-1">
                                <div className=" p-2 bg-[#6daaf590] rounded-full">
                                    <div className=" h-3 w-3 bg-[#1176F0] rounded-full shadow-yellow-300"></div>
                                </div>
                                <p className=" text-[#1176F0] font-bold font-[Fredoka] text-[18px]">FAQ</p>
                            </div>
                            <p className="text-[30px] lg:text-[40px] text-white font-[Fredoka] leading-[57px] pt-4 font-medium">Frequently Asked  Questions</p>
                            
                            {
                                accordionData.map((data, index) =>{
                                    return(
                                        <>
                                            <FaqAccodion key={index} open={index===open} title={data.title} desc={data.desc} toggle={()=>toggle(index)}/>
                                        </>
                                    )
                                })
                            }
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Faq