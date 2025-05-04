export function FontTest() {
  return (
    <div className="space-y-8 p-6 glass-card max-w-3xl mx-auto my-8">
      <div>
        <h1 className="text-4xl mb-2 pink-glow">This is an Alex Brush Heading</h1>
        <p className="text-lg">
          This text should be in Playfair Display. The background should be visible behind this glass card.
        </p>
      </div>

      <div>
        <h2 className="text-3xl mb-2 glow-text">Another Alex Brush Heading</h2>
        <p className="text-lg">All paragraph text should be in Playfair Display font.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4">
          <h3 className="text-2xl mb-2 alex-brush pink-glow">Alex Brush Header</h3>
          <p className="playfair">Explicit Playfair Display text.</p>
        </div>

        <div className="glass-card p-4">
          <h3 className="text-2xl mb-2">Default Header</h3>
          <p>Default paragraph text.</p>
        </div>
      </div>
    </div>
  )
}
