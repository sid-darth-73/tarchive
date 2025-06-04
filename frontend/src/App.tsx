import { Button } from './components/ui/Button'
import { Card } from './components/ui/Card'
import PlusIcon from './icons/PlusIcon'
import ShareIcon from './icons/ShareIcon'
function App() {
  return (
    <>
      <Button
      variant="primary"
      text="Add Content"
      size="md"
      onClick={() => console.log("Clicked")}
      startIcon={PlusIcon}
    />
    <Button
      variant="secondary"
      text="Share Brain"
      size="md"
      onClick={() => console.log("Clicked")}
      startIcon={ShareIcon}
    />

    <Card title="Youtube" link="https://www.youtube.com/watch?v=8vnHJNjwuqg" type="youtube"/>
    <Card title="Tweet" link="https://x.com/RCBTweets/status/1929966487797891122" type="twitter"/>
    </>
  )
}

export default App
