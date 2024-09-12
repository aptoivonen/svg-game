import { useEffect } from 'react'

type useKeyboardShortcutProps = {
  key: string
  onKeyPressed: () => void
}

export default function useKeyboardShortcut({
  key,
  onKeyPressed
}: useKeyboardShortcutProps) {
  useEffect(() => {
    function keyDownHandler(e: globalThis.KeyboardEvent) {
      if (e.key === key) {
        e.preventDefault()
        onKeyPressed()
      }
    }

    document.addEventListener('keydown', keyDownHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [key, onKeyPressed])
}
