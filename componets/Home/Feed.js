import { BsStars } from "react-icons/bs";
import TweetBox from './TweetBox'
import Post from '../Post'
import { useContext } from "react";
import { TwitterContext } from "../../context/TweetContents";


const style = {
    wrapper: `flex-[3] boeder-r border-l border-[#38444d]`,
    header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
    headerTitle: `text-xl font-bold`,
}

// const tweets = [
//     {
//         displayName: 'refuge',
//         userName: '0x673456329289216jhdsdhjcwq7w6w7q90ww8q9wqwq67kc',
//         avator: 'https://avatars.githubusercontent.com/u/11345727?v=4',
//         text: 'gm',
//         isProfileImageNft: true,
//         timestamp: '2020-06-01T2:00:00:000Z'
//     },
//     {
//         displayName: 'wise',
//         userName: '0x566656329289216jhdsdhjcwq7w6w7q90ww8q9wqwq67kc',
//         avator: 'https://avatars.githubusercontent.com/u/11345727?v=4',
//         text: 'gm',
//         isProfileImageNft: true,
//         timestamp: '2020-06-01T2:00:00:000Z'
//     },
// ]

function Feed() {
    const { tweets } = useContext(TwitterContext)
    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <div className={style.headerTitle}>Home</div>
                <BsStars />
            </div>
            <TweetBox />
            {tweets.map((tweet, index) => (
        <Post
          key={index}
          displayName={
            tweet.author.name === 'Unnamed'
              ? `${tweet.author.walletAddress.slice(
                  0,
                  4,
                )}...${tweet.author.walletAddress.slice(41)}`
              : tweet.author.name
          }
          userName={`${tweet.author.walletAddress.slice(
            0,
            4,
          )}...${tweet.author.walletAddress.slice(41)}`}
          text={tweet.tweet}
          avatar={tweet.author.profileImage}
          isProfileImageNft={tweet.author.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
            ))}
        </div>

    )
}

export default Feed;


