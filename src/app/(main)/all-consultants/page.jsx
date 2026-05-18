import { getAllDoctors } from "@/utils/api"


export default function AllConsultants() {
    const consultants = getAllDoctors();
  return (
    <div className="text-center p-8">
      total doctors : {consultants.length}
    </div>
  )
}
