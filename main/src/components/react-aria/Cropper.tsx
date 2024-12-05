"use client"
import React, { useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import './styles.css'

const CropperComponent = ({file}:{file:File}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const onCropComplete = (croppedArea:Area, croppedAreaPixels:Area) => {
    console.log(croppedArea, croppedAreaPixels)
  }
  const imgUrl = URL.createObjectURL(file);
  return (
    <div className="w-full h-96 bg-pink-200 relative">
      <div className="">
        <Cropper
          image= {imgUrl}
          crop={crop}
          zoom={zoom}
          aspect={16 / 8}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

    </div>
  )
}

export {CropperComponent};