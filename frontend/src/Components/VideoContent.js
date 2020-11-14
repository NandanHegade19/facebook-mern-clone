import React from 'react';
import './VideoContent.css';
import VideoTile from './VideoTile';

function VideoContent() {
    return (
        <div className = "videocontent">
            <h2>Recommended</h2>
            <div className = "videocontent__recomended"> 
                <VideoTile 
                    image = "https://cdn.pixabay.com/photo/2015/12/01/20/28/fall-1072821__340.jpg" 
                    title = "Peak Fall Foliage in New England (Experience Autumn)" 
                    channel = "Trout and Coffee" 
                    views = "410k" 
                    timestamp = "1 month ago" 
                    channelImage = "https://yt3.ggpht.com/a-/AOh14Gh1C396As470t_gfCS89NFeGGbaiONF26N2gQ=s68-c-k-c0x00ffffff-no-rj-mo"
                /> 
                <VideoTile 
                    image = "https://i.ytimg.com/vi/512y6VuTVz0/maxresdefault.jpg" 
                    title = "*SNOWY* TREEHOUSE CABIN FULL TOUR! | The Beech Treehouse by Levi Kelly" 
                    channel = "Levi Kelly" 
                    views = "1.8k" 
                    timestamp = "5 days ago" 
                    channelImage = "https://yt3.ggpht.com/a-/AOh14GimIxR6NqRmSXNjQN5oU4jYf0OU7PgloHjBvw=s68-c-k-c0x00ffffff-no-rj-mo"
                /> 
                <VideoTile 
                    image = "https://cdn.pixabay.com/photo/2020/11/04/19/22/windmill-5713337__340.jpg" 
                    title = "Windmill" 
                    
                    channelImage = "https://yt3.ggpht.com/a-/AOh14Gh1C396As470t_gfCS89NFeGGbaiONF26N2gQ=s68-c-k-c0x00ffffff-no-rj-mo"
                /> 
                <VideoTile 
                    image = "https://cdn.pixabay.com/photo/2020/07/17/19/22/landscape-5415202__340.jpg" 
                    title = "Switzerland Summer Alps" 
                    
                    channelImage = "https://yt3.ggpht.com/a-/AOh14GimIxR6NqRmSXNjQN5oU4jYf0OU7PgloHjBvw=s68-c-k-c0x00ffffff-no-rj-mo"
                /> 
                <VideoTile 
                    image = "https://images.unsplash.com/photo-1543055932-84b75bfd3a77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80" 
                    title = "View from above, Bali" 
                    
                    channelImage = "https://yt3.ggpht.com/a-/AOh14Gh1C396As470t_gfCS89NFeGGbaiONF26N2gQ=s68-c-k-c0x00ffffff-no-rj-mo"
                /> 
                <VideoTile 
                    image = "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80" 
                    title = "Volcano, Hawaii" 
                    
                    channelImage = "https://images.unsplash.com/profile-1502669002421-a8d274ad2897?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff"
                />
                <VideoTile 
                    image = "https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" 
                    title = "Manhattan, New York, United States" 
                    
                    channelImage = "https://yt3.ggpht.com/a-/AOh14Gh1C396As470t_gfCS89NFeGGbaiONF26N2gQ=s68-c-k-c0x00ffffff-no-rj-mo"
                /> 
                <VideoTile 
                    image = "https://images.unsplash.com/photo-1505976231433-d7ebe8382bb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" 
                    title = "Street market, food tour, Portland, United States" 
                    
                    channelImage = "https://images.unsplash.com/profile-1502669002421-a8d274ad2897?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff"
                /> 
            </div>

        </div>
    )
}

export default VideoContent;
