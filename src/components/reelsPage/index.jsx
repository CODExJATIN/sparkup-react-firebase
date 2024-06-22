import React from 'react'
import "./reelPage.css"
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import VideoCard from './card/VideoCard';
import Vid1 from './videos/Vid1.mp4'
import Vid2 from './videos/Vid2.mp4'
import Vid3 from './videos/Vid3.mp4'
import Vid4 from './videos/Vid4.mp4'
import Vid5 from './videos/Vid5.mp4'
import Vid6 from './videos/Vid6.mp4'

const ReelsPage = () => {

  const data = [
    {
      channel:"Tech Solutions",
      avatarSrc: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
      song: "Original Audio",
      src: {  Vid1 },
      likes: 10000,
      shares: 4000
    }
  ]

  



  return (
    <div className='reel-page'>
      <div className='reel-top'>
        
        
        <MovieFilterIcon sx={{color:"white", fontSize:"150px"}}/>
        <h1 className='reel-top-title'>SparkUp Reels</h1>

      </div>

      <div className='reel-videos'>

        <VideoCard
        channel="SparkUp:Connect"
        avatarSrc="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        song="Original Audio"
        src= {Vid1}
        likes={1000}
        shares={400}
        />

        <VideoCard
        channel="SparkUp:Connect"
        avatarSrc="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        song="Original Audio"
        src= {Vid2}
        likes={1000}
        shares={400}
        />

        <VideoCard
        channel="SparkUp:Connect"
        avatarSrc="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        song="Original Audio"
        src= {Vid3}
        likes={1000}
        shares={400}
        />

      <VideoCard
        channel="SparkUp:Connect"
        avatarSrc="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        song="Original Audio"
        src= {Vid4}
        likes={1000}
        shares={400}
        />

      <VideoCard
        channel="SparkUp:Connect"
        avatarSrc="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        song="Original Audio"
        src= {Vid5}
        likes={1000}
        shares={400}
        />

      <VideoCard
        channel="SparkUp:Connect"
        avatarSrc="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        song="Original Audio"
        src= {Vid6}
        likes={1000}
        shares={400}
        /> 



      </div>
    </div>
  )
}

export default ReelsPage;
