import React, { useState, useContext } from  'react'
import { TwitterContext } from '../../context/TweetContents'
import { useRouter } from 'next/router'
import { client } from '../../lib/client'
import { contractABI, contractAddress } from '../../lib/constants'
import { ethers } from 'ethers'
import InitialState from './InitialState'
import LoadingState from './LoadingState'
import FinishedState from './FinishedState'
import { pinJSONToIPFS, pinFileToIPFS } from '../../lib/pinata'


let metamask
if(typeof window !== 'undefined'){
    metamask = window.ethereum
}

const getEthereumContract = async () => {
    if(!metamask) return
    const provider = new ethers.providers.Web3Provider(metamask)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
        )
    return transactionContract
}

const ProfileImageMinter = () => {
    const { currentAccount, setAppStatus } = useContext(TwitterContext)
    const router = useRouter()
    const [name, setName ] = useState('')
    const [description, setDescription ] = useState('')
    const [ status, setStatus ] = useState('initial') // Make it initial
    const [ profileImage, setprofileImage ] = useState()

    const mint = async () => {
        if(!name || !description || !profileImage) return
        setStatus('loading')

        const pinatametadata = {
            name: `${name} - ${description}`
        }

        const ipfsImageHash = await pinFileToIPFS(profileImage, pinatametadata) 

        await client
            .patch(currentAccount)
            .set({profileImage: ipfsImageHash})
            .set({ isProfileImageNft: true})
            .commit()

    
        const imageMatadata = {
            name: name,
            description: description,
            image: `ipfs://${ipfsImageHash}`,
        }

        const ipfsJsonHash = await pinJSONToIPFS(imageMatadata, pinatametadata)

        const contract  = await getEthereumContract()

        const transactionParamenters = {
            to: contractAddress,
            from: currentAccount,
            data: await contract.mint(currentAccount, `ipfs://${ipfsJsonHash}`)
        }
        await metamask.request({
            method: 'eth_sendTransanction',
            params: [transactionParamenters],
        })
        setStatus('finished')

    }

    const modalChildren = (modelStatus = status) => {
        switch (modelStatus) {
            case 'initial':
                return(
                    <InitialState
                        profileImage={profileImage}
                        setProfileImage={setprofileImage}
                        name={name}
                        setName={setName}
                        description={description}
                        setDescription={setDescription}
                        mint={mint}
                    />
                )
            case 'loading':
                return <LoadingState />
            
            case 'finished':
                return <FinishedState />

            default:
              router.push('/')
              setAppStatus('error')
              break 
        }
    }

    return (
        <>
        {modalChildren(status)}
        </>
    )

}

export default ProfileImageMinter
