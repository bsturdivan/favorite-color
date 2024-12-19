function Color({ code, width }) {
  return (
    <div className="palette__color" style={{ backgroundColor: code, width }} />
  )
}

export default Color