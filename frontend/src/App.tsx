import { Button } from './components/ui/Button'
import PlusIcon from './icons/PlusIcon'
import ShareIcon from './icons/ShareIcon'
function App() {
  return (
    <>
      <Button
      variant="primary"
      text="share"
      size="md"
      onClick={() => console.log("Clicked")}
      startIcon={PlusIcon}
    />
    <Button
      variant="secondary"
      text="share"
      size="md"
      onClick={() => console.log("Clicked")}
      startIcon={ShareIcon}
    />

    </>
  )
}

export default App
