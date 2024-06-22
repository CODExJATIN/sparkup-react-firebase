import React, { useRef, useState } from 'react'
import "./videoCard.css"
import VideoHeader from '../header/VideoHeader'
import VideoFooter from '../footer/VideoFooter';

const VideoCard = ({channel,avatarSrc,song,src,likes,shares}) => {
  const videoRef = useRef(null);
  const [isVideoPlaying,setIsVideoPlaying]= useState(false);

  const onVideoPress = ()=>{
    if(isVideoPlaying){
        videoRef.current.pause();
        setIsVideoPlaying(false)
    }
    else{
        videoRef.current.play();
        setIsVideoPlaying(true);
    }
  }

  return (
    <div className='video'>
      <VideoHeader/>
      <video
       ref={videoRef}
       onClick={onVideoPress}
        className='video-player'
        src={src} 
        alt='reel video'
        loop
       />
       <VideoFooter
       channel={channel}
       avatarSrc={avatarSrc}
       song={song}
       likes={likes}
       shares={shares}
       />

    </div>
  )
}

export default VideoCard
