import { CreateContentModel } from './components/CreateContentModel'
import { Button } from './components/ui/Button'
import { Card } from './components/ui/Card'
import PlusIcon from './icons/PlusIcon'
import ShareIcon from './icons/ShareIcon'
import { useState } from 'react'
import { Sidebar } from './components/ui/Sidebar'

function App() {
  const [modelOpen, setModelOpen] = useState(false)
  return (
    <div>
      <Sidebar/>
        <div className='p-4'>
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
        <Card title="Youtube" link="https://www.youtube.com/watch?v=8vnHJNjwuqg" type="youtube"/>
        <Card title="Tweet" link="https://x.com/RCBTweets/status/1929966487797891122" type="twitter"/>
        </div>
        </div>
    </div>
  )
}

export default App
