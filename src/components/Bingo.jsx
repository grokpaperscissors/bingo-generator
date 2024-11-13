'use client'

import React, { useState, useCallback } from "react"
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const suggestions = [
  "Made a new LinkedIn Connection", "Met Micah", "Made a social media post about Imagine India",
  "Solved the Insurance Request for Quote Bot Games Challenge", 
  "Had a chat with an Automation Anywhere team member other than Shreya, Rima, Arjun, Micah",
  "Watched an Imagine India Presentation", "Met Rima", "Saw someone with Automation Anywhere swag",
  "Took a selfie with an MVP [Look for someone in an MVP lapel pin!]", "Heard or saw description of the MVP role",
  "Heard someone say 'Sign up for the Pathfinder Community'", 
  "Learned best practices for implementing AI-powered automations",
  "Solved the Procurement Processing Bot Games Challenge in under 6s", 
  "Joined the Bengaluru Chapter in the Pathfinder Community",
  "Tried the Procurement Processing Bot Games Challenge", "Shared your Bot Games certificate on LinkedIn",
  "Met Shreya", "Made a post in the Pathfinder Community about your experience at the event",
  "Met Arjun", "Solved the Lease Processing Bot Games Challenge in under 6s!",
  "Tried the Lease Processing Bot Games Challenge", 
  "Tried the Insurance Request for Quote Bot Games Challenge",
  "Connected with an MVP on LinkedIn [Look for someone in an MVP lapel pin!]",
  "Learned how to build an AI Agent"
]

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

const BingoCard = ({ content }) => (
  <div className="aspect-square w-full flex items-center justify-center p-2 text-center text-xs md:text-sm bg-white border border-gray-200 print:border-gray-400 hover:bg-gray-100 transition-colors rounded-lg shadow print:shadow-none">
    {typeof content === 'string' ? content : (
      <img src={content.src} alt={content.alt} className="w-full h-full object-contain" />
    )}
  </div>
)

export default function BingoGenerator() {
  const [grid, setGrid] = useState(() => {
    const shuffled = shuffleArray([...suggestions])
    shuffled.splice(12, 0, { src: "/path-to-your-logo.png", alt: "Logo" }) // Insert logo in the middle
    return shuffled
  })

  const regenerateGrid = useCallback(() => {
    const newGrid = shuffleArray([...suggestions])
    newGrid.splice(12, 0, { src: "/path-to-your-logo.png", alt: "Logo" }) // Keep logo in the middle
    setGrid(newGrid)
  }, [])

  const savePDF = useCallback(() => {
    const input = document.getElementById('bingo-container')
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const canvasAspectRatio = canvas.width / canvas.height
      let imgWidth = pageWidth - 40
      let imgHeight = imgWidth / canvasAspectRatio

      if (imgHeight > pageHeight - 40) {
        imgHeight = pageHeight - 40
        imgWidth = imgHeight * canvasAspectRatio
      }

      pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight)
      pdf.save("pathfinder-bingo.pdf")
    })
  }, [])

  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto p-4 md:p-8 relative overflow-hidden bg-gradient-to-br from-orange-400 via-red-500 to-purple-700 print:bg-white print:p-0">
      {/* Diagonal stripes overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:100px_100px] print:hidden" />

      {/* Decorative stars */}
      <div className="absolute top-12 right-12 w-8 h-8 text-white/20 print:hidden">★</div>
      <div className="absolute bottom-12 left-12 w-8 h-8 text-white/20 print:hidden">★</div>

      {/* Content */}
      <div id="bingo-container" className="relative z-10 space-y-8 print:space-y-4">
        <div className="text-center space-y-4 print:space-y-2">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-wide print:text-black">
            Pathfinder Bingo
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto print:text-black">
            Generate your unique bingo card and start your Pathfinder journey. Each square represents a step in your adventure.
          </p>
        </div>

        <div id="bingo-grid" className="grid grid-cols-5 gap-2 aspect-square w-full max-w-2xl mx-auto print:gap-0 print:border print:border-gray-400">
          {grid.map((item, index) => (
            <BingoCard 
              key={index} 
              content={item}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 print:hidden">
          <button 
            onClick={regenerateGrid} 
            className="bg-white text-purple-700 hover:bg-purple-100 px-4 py-2 rounded-md flex items-center transition-colors"
          >
            <span className="mr-2">↻</span> Regenerate
          </button>
          <button 
            onClick={savePDF} 
            className="bg-white text-purple-700 hover:bg-purple-100 px-4 py-2 rounded-md flex items-center transition-colors"
          >
            <span className="mr-2">↓</span> Save as PDF
          </button>
        </div>
      </div>
    </div>
  )
}
