import { ScheduleSectionData } from "../../../API/ScheduleSectionData"
import Schedulesection from "./Schedulesection"

const Schedule = () => {
  return (
    <> 
    <div className="max-w-[100%] bg-[#08123B] overflow-hidden py-[40px]" id="schedule" >
      <div className="w-[90%] lg:w-[75%] grid grid-cols-1 mx-auto">
        <div className="flex justify-center  flex-col items-center gap-4">
          <div>
            <p className="font-[Fredoka] text-white text-[20px] font-medium text-center">Schedule List</p>
          </div>
          <div>
            <p className="font-[Fredoka] text-white text-[26px] lg:text-[32px] font-medium text-center" >Our Events Schedule</p>
          </div>
          <div className="h-[3px] bg-[#118AEF] w-[90%] lg:w-[40%] mx-auto my-5 lg:my-5"></div>
        </div>
        <div className="grid grid-cols-1 gap-7">
          {
            ScheduleSectionData.map((e)=>{
              return(
                <Schedulesection
                  time = {e.time}
                  eventname = {e.eventname}
                  venue = {e.venue}
                  eventimg = {e.eventimg}
                ></Schedulesection>
              )
            })
          }
          
        </div>

      </div>
    </div>
      
    </>
  )
}

export default Schedule
