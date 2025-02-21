"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface Item {
  id: string
  content: string
}

const DragAndDrop = () => {
  const [items, setItems] = useState<Item[]>([
    { id: "1", content: "Item 1" },
    { id: "2", content: "Item 2" },
    { id: "3", content: "Item 3" },
    { id: "4", content: "Item 4" },
  ])

  const [dragging, setDragging] = useState<string | null>(null)
  const dragItem = useRef<HTMLLIElement | null>(null)
  const dragNode = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    return () => {
      dragItem.current = null
      dragNode.current = null
    }
  }, [])

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, itemId: string) => {
    setDragging(itemId)
    dragItem.current = e.target as HTMLLIElement
    dragNode.current = e.target as HTMLLIElement
    dragNode.current.addEventListener("dragend", handleDragEnd)
    setTimeout(() => {
      setDragging(itemId)
    }, 0)
  }

  const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, targetId: string) => {
    if (dragNode.current !== e.target) {
      setItems((oldItems) => {
        const newItems = JSON.parse(JSON.stringify(oldItems))
        const dragIndex = newItems.findIndex((item: Item) => item.id === dragging)
        const targetIndex = newItems.findIndex((item: Item) => item.id === targetId)
        const temp = newItems[dragIndex]
        newItems[dragIndex] = newItems[targetIndex]
        newItems[targetIndex] = temp
        return newItems
      })
    }
  }

  const handleDragEnd = () => {
    setDragging(null)
    if (dragNode.current) {
      dragNode.current.removeEventListener("dragend", handleDragEnd)
    }
    dragItem.current = null
    dragNode.current = null
  }

  const getStyles = (itemId: string) => {
    return dragging === itemId ? "bg-gray-100 opacity-50" : ""
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Drag and Drop Example</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragEnter={(e) => handleDragEnter(e, item.id)}
            className={`p-2 bg-white border border-gray-300 rounded cursor-move ${getStyles(item.id)}`}
          >
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DragAndDrop

