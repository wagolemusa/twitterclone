import React, { useContext } from 'react'
import Post from '../Post'
import { TwitterContext } from '../../context/TweetContents'

const style = {
  wrapper: `no-scrollbar`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}


const tweets = [
    {
        displayName: 'refuge',
        userName: '0x673456329289216jhdsdhjcwq7w6w7q90ww8q9wqwq67kc',
        avator: 'https://avatars.githubusercontent.com/u/11345727?v=4',
        text: 'gm',
        isProfileImageNft: true,
        timestamp: '2020-06-01T2:00:00:000Z'
    },
    {
        displayName: 'wise',
        userName: '0x566656329289216jhdsdhjcwq7w6w7q90ww8q9wqwq67kc',
        avator: 'https://avatars.githubusercontent.com/u/11345727?v=4',
        text: 'gm',
        isProfileImageNft: true,
        timestamp: '2020-06-01T2:00:00:000Z'
    },
]


function ProfileTwitte () {

    const { currentAccount, currentUser } = useContext(TwitterContext)

    return (
     <div className={style.wrapper}>
         {currentUser.tweets?.map((tweet, index) => (
             <Post 
                key={index}
                displayName={currentUser.name === 'Unnamed' ? currentUser.walletAddress : currentUser.name}
                userName={`${currentAccount.slice(0, 4)}...${currentAccount .slice(-4)}`}
                text={tweet.tweet}
                avatar={currentUser.profileImage}
                isProfileImageNft={tweet.isProfileImageNft}
                timestamp={tweet.timestamp}
            />
         ))}
     </div>
    )
}
export default ProfileTwitte;


