import { useState, useEffect } from "react"
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Header from './Header'
import reset from './assets/reset.png'
import pause from './assets/pause.png'
import play from './assets/play.png'
import CheckUser from './CheckUser' 

function Home() {
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [control, setControls] = useState(play)
    const [name, setName] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const [hours, setHours] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        const checkUser = onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.href = "/"
            } else {
                console.log("User is signed in:", user);
                setName(user.displayName);
                setPhotoUrl(user.photoURL);
            } 
        })
    }, [])

        useEffect(() => {
        if (!isRunning) return;

        console.log('running')
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
            if (prevSeconds === 59) {
                setMinutes((prevMinutes) => {
                if (prevMinutes === 59) {
                    setHours((prevHours) => prevHours + 1);
                    return 0;
                }
                return prevMinutes + 1;
                });
                return 0;
            }
            return prevSeconds + 1;
            });
        }, 1000);

        return () => clearInterval(interval);
        }, [isRunning]);

        function timerFlex() {
        setIsRunning((prev) => !prev);
        }

        async function calcBreak() {
            timerFlex();
            setSeconds(0);
            setMinutes(0);
            setHours(0);
            setControls(play)
            const token = localStorage.getItem('google_token');
            const totalMs = (hours * 3600000 + minutes * 60000 + seconds * 1000)/5;
            const date = new Date (Date.now() + totalMs)
            const breakHours = date.getHours();
            const breakMinutes = date.getMinutes();
            const breakSeconds = date.getSeconds();
            alert(`Your break will end at ${breakHours.toString().padStart(2, '0')}:${breakMinutes.toString().padStart(2, '0')}:${breakSeconds.toString().padStart(2, '0')}`)
                const user = auth.currentUser;
                if (!user) return;
                try {
                sendEvent(totalMs);
                } catch (err) {
                    console.error("Failed to get token:", err);
    }
        }

        async function sendEvent(totalMs) {
            const refreshToken = localStorage.getItem('google_token'); 
            const now = Date.now();
            const startDate = new Date(now);
            const endDate = new Date(now + totalMs);

            const event = {
                summary: 'Flomo Break',
                start: { dateTime: startDate.toISOString() },
                end: { dateTime: endDate.toISOString() },
            };

            const response = await fetch("/api/create-event", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken, eventDetails: event })
            });

            const data = await response.json();
            console.log("Serverless response:", data);
        }

        function playState() {
        if (isRunning) {
            setControls(play);
        } else {
            setControls(pause);
        }
    }

    return(
        <>
        <CheckUser action={sendEvent}/>
        <div className="h-screen font-[Space_Grotesk] w-screen flex flex-col items-center justify-center gap-10 text-black">
            <Header />
        <div className="flex absolute top-5 right-5 flex-col items-center gap-2">
            <div className="aspect-square rounded-md overflow-hidden border-1 border-black"
            style={{width: "calc(10vw + 0.9rem)"}}> <img 
            src={photoUrl || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} 
            alt="Profile" 
            className="w-full h-full object-cover" 
            style={{
                filter: "brightness((100%)) grayscale(100%) contrast(100%)"
            }}
        /></div>
            <p className="">{name || "User"}</p>
        </div>
            {/* timer container */}
            <div className="border-1 flex justify-center items-center rounded-md border-black"
            style={{paddingTop: "calc(2vh + 0.5rem)", paddingBottom: "calc(2vh + 0.5rem)", paddingLeft: "calc(8vw + 1rem)", paddingRight: "calc(8vw + 1rem)", fontSize: "calc(1vw + 1.5rem)", boxShadow:"5px 5px 0px 0px black"}}>
                {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}    
            </div>
            {/* timer controls */}
            <div className="flex gap-4 items-center ">
                <div onClick={() => timerFlex()} id="pauseandcontinue">
                    <img src={control} alt="pause or continue" style={{width: "calc(7vw + 0.5rem)"}} onClick={playState}/>
                </div>
                <div onClick={() => calcBreak()} id="resetorend">
                    <img src={reset} alt="reset or end" style={{width: "calc(4vw + 0.5rem)"}} onMouseOver={(e) => e.currentTarget.src = reset} onMouseOut={(e) => e.currentTarget.src = reset}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home