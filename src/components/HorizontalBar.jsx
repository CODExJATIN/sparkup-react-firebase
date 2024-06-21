import React from 'react';
import MovieIcon from '@mui/icons-material/Movie';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications'

const HorizontalBar = () => {
  return (
    <div className='horizontal-bar'>

      <div className='sparkup-title'>
        <h1>SparkUp</h1><EmojiObjectsOutlinedIcon/>
      </div>

      <div className='bar-options'>
      <div>
        <span className="icon">
          <MovieIcon/>
        </span>
        <span className="text">Explore</span>
        </div>

        <div>
        <span className="icon">
          <NotificationsIcon/>
        </span>
        <span className="text">Notification</span>
        </div>
      </div>
        

        
    </div>
  )
}

export default HorizontalBar
