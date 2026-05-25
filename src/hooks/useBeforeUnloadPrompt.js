import { useEffect } from 'react'

export function useBeforeUnloadPrompt(shouldPrompt) {
  useEffect(() => {
    const onBeforeUnload = (event) => {
      if (!shouldPrompt) return

      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [shouldPrompt])
}
