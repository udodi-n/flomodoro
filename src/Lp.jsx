import { signInWithGoogle } from './firebase'
import { useState, useEffect } from "react"
import google from './assets/google.png'
import { useNavigate } from 'react-router-dom'
import CheckUser from './CheckUser'
import Header from './Header'
import Footer from './Footer'

function Lp() {
    const navigate = useNavigate()
    async function handleSignUp() {
            try{
                const { user, token } = await signInWithGoogle();
                navigate('/home');   
            } catch(error) {
                console.error('Error signing in with Google:', error);
            }
        }

    return (
        <>
        <CheckUser navOne="/home"/>
        <div className="font-[Space_Grotesk] h-screen w-full flex flex-col gap-8 justify-center items-center"> 
            <Header />
            <div className="flex flex-1 flex-col gap-8 justify-center items-center">
                <h2 style={{
                    fontSize: "calc(4vw + 1.5vh + 1.5vmin)"
                }}>Uhh...<strong className="font-bold underline">study</strong></h2>
                <button className='flex border-1 border-black p-3 items-center gap-2' onClick={handleSignUp}><img src={google} alt="Google Logo" className="w-6 h-auto" />Continue with Google</button>
            </div>
            <Footer />
        </div>
        </>
    )    
}

export default Lp