import { CreateContentModel } from '../components/CreateContentModel'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import PlusIcon from '../icons/PlusIcon'
import ShareIcon from '../icons/ShareIcon'
import { useState } from 'react'
import { Sidebar } from '../components/ui/Sidebar'
import { useContent } from '../hooks/useContent'

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false)
  const {contents, refresh} = useContent();
  return (
    <div>
      <Sidebar/>
        <div className='p-4 ml-72 min-h-screen bg-[#eeeeef]'>
          <CreateContentModel open={modelOpen} onClose={()=>{
            setModelOpen(false)
          }} />
          <div className="flex justify-end gap-4">
          <Button
          variant="primary"
          text="Add Content"
          size="md"
          onClick={() => setModelOpen(true)}
          startIcon={PlusIcon}
        />
        <Button
          variant="secondary"
          text="Share Brain"
          size="md"
          onClick={() => console.log("Clicked")}
          startIcon={ShareIcon}
        />
        </div>
        <div className="flex gap-4">
        {contents.map(({type, link, title}) => <Card 
            type={type}
            link={link}
            title={title}
        />)}
        </div>
        </div>
    </div>
  )
}