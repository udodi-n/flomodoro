import logo from './assets/full_logo.png'

function Header() {
    return(
        <div className="w-full invert h-16 absolute top-0 left-0 p-5 pt-7">
            <img src={logo} alt="Flomodoro logo" style={{width: "calc(20vw + 0.5rem)"}}/>
        </div>
    )
}

export default Header