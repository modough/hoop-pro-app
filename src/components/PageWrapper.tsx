import React from 'react'
import UserHeader from './UserHeader'
import { useCompletedDrills } from "@/hooks/useCompletedDrills";

function PageWrapper({ children }: { children: React.ReactNode }) {
  const { completed: completedDrills } = useCompletedDrills();

  return (
    <div>
      <UserHeader completedDrills={completedDrills}/>
      {children }
    </div>
  )
}

export default PageWrapper