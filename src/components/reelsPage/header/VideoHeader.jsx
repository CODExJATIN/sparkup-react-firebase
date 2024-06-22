import React from 'react'
import "./videoHeader.css"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
const VideoHeader = () => {
  return (
    <div className='videoHeader'>
      <ChevronLeftIcon sx={{color:"white"}}/>
        <h2>Reels</h2>
      <CameraEnhanceIcon sx={{color:"white"}}/>
    </div>
  )
}

export default VideoHeader
