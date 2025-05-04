export function BackgroundTest() {
  return (
    <div className="space-y-8 p-4">
      <div className="glass-card p-6">
        <h2 className="text-3xl alex-brush pink-glow mb-4">Font Test</h2>
        <p className="playfair mb-4">
          This paragraph uses Playfair Display font. The background should be visible behind this glass card.
        </p>
        <h3 className="text-2xl alex-brush mb-2">Alex Brush Header</h3>
        <p className="playfair">Another paragraph with Playfair Display font to verify the font settings.</p>
      </div>
    </div>
  )
}
