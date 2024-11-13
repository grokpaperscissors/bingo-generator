'use client'

import React, { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, RefreshCw, Download } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const suggestions = [
"Tried the Insurance Request for Quote Bot Games Challenge",
"Met Arjun",
"Tried the Lease Processing Bot Games Challenge",
"Met Rima",
"Solved the Lease Processing Bot Games Challenge in under 6s!",
"Tried the Procurement Processing Bot Games Challenge",
"Made a post in the Pathfinder Community about your experience at the event",
"Learned best practices for implementing AI-powered  automations.",
"Watched an Imagine India Presentation",
"Met Micah",
"Heard someone say 'Sign up for the Pathfinder Community'",
"Took a selfie with an MVP [Look for someone in an MVP lapel pin!]",
"__",
"Joined the Bengaluru Chapter in the Pathfinder Community",
"Solved the Procurement Processing Bot Games Challenge in under 6s.",
"Saw someone with Automation Anywhere swag",
"Learned how to build an AI Agent",
"Solved the Insurance Request for Quote Bot Games Challenge",
"Had a chat with an Automation Anywhere team member other than Shreya, Rima, Arjun, Micah",
"Made a social media post about Imagine India",
"Connected with an MVP on LinkedIn [Look for someone in an MVP lapel pin!]",
"Met Shreya",
"Made a new LinkedIn Connection",
"Shared your Bot Games certificate on LinkedIn",
"Heard or saw description of the MVP role",
];

function BingoGenerator() {
  const [grid1, setGrid1] = useState(shuffleArray([...suggestions]));
  const [grid2, setGrid2] = useState(shuffleArray([...suggestions]));

  // Shuffle function
  function shuffleArray(array) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  // Shuffle both grids
  function shuffleGrids() {
    setGrid1(shuffleArray([...suggestions]));
    setGrid2(shuffleArray([...suggestions]));
  }

  const savePDF = useCallback(() => {
    const input = document.getElementById('bingo-grids')
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

  const BingoGrid = ({ items }) => (
    <div className="grid grid-cols-5 gap-2 md:gap-4">
      {items.map((item, index) => (
        <Card
          key={index}
          className="aspect-square flex items-center justify-center p-2 text-center text-xs md:text-sm bg-white/95 hover:bg-white transition-colors border-0"
        >
          {item}
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen w-full max-w-6xl mx-auto p-4 md:p-8 relative overflow-hidden bg-gradient-to-br from-orange-400 via-red-500 to-purple-700">
      {/* Diagonal stripes overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:100px_100px]" />

      {/* Decorative stars */}
      <Star className="absolute top-12 right-12 w-8 h-8 text-white/20" />
      <Star className="absolute bottom-12 left-12 w-8 h-8 text-white/20" />

      {/* Content */}
      <div id="bingo-grids" className="relative z-10 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-wide">
            Pathfinder Bingo
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto">
            Generate your unique bingo cards and start your self-care journey. Each square represents a step towards mindfulness and well-being.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-white text-center">Card 1</h2>
            <BingoGrid items={grid1} />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-white text-center">Card 2</h2>
            <BingoGrid items={grid2} />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <Button onClick={regenerateGrids} className="bg-white text-purple-700 hover:bg-purple-100">
          <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
        </Button>
        <Button onClick={savePDF} className="bg-white text-purple-700 hover:bg-purple-100">
          <Download className="mr-2 h-4 w-4" /> Save as PDF
        </Button>
      </div>
    </div>
  )
}
