import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

// ከሰርቨርህ ጋር ማገናኛ (Port 5000)
const socket = io("http://localhost:5000")

function App() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current == null) return
    wrapperRef.current.innerHTML = ""
    const editor = document.createElement("div")
    wrapperRef.current.append(editor)
    
    // የጽሁፍ መጻፊያውን (Quill) ማዘጋጀት
    const q = new Quill(editor, { theme: "snow" })

    // ሌላ ሰው ሲጽፍ ከሰርቨር መቀበል
    socket.on("receive-changes", delta => {
      q.updateContents(delta)
    })

    // እኛ ስንጽፍ ለሰርቨሩ መላክ
    q.on("text-change", (delta, oldDelta, source) => {
      if (source !== "user") return
      socket.emit("send-changes", delta)
    })

    return () => {
      socket.off("receive-changes")
    }
  }, [])

  return <div ref={wrapperRef} style={{ minHeight: '100vh' }}></div>
}

export default App
