import './palette.css'
import Color from './color'

function Palette() {
  return (
    <div className="palette">
      <Color code="#3F2136" width="35%" />
      <Color code="#8E6238" width="28%" />
      <Color code="#4D7089" width="22%" />
      <Color code="#2E421F" width="15%" />
    </div>
  )
}

export default Palette