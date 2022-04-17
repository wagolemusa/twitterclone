import React from 'react'
import Sidebar from '../componets/Sidebar'
import Widgets from '../componets/Widgets'
import ProfileHeader from '../componets/profile/ProfileHeader'
import ProfileTwitte from '../componets/profile/ProfileTwitte'

const style = {
    wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
    content: `max-w-[1400px] w-2/3 flex justify-between`,
    mainContent: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll`,
  }

function Profile () {
    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <Sidebar/>
                <div className={style.mainContent}>
                    <ProfileHeader />
                    <ProfileTwitte />

                </div>
            </div>
            <Widgets />
        </div>
    )
}


export default Profile;
