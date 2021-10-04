import React,{useState, useEffect} from 'react'
import Logo from '../../images/logoName.jpg'
import './login.css'
import {Link} from "react-router-dom";
import validator from 'validator'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../../actions/data'

function Login() {
    const dispatch = useDispatch()
    let history = useHistory();
    const [emailError, setEmailError] = useState('')
    const [passwordError, setpasswordError] = useState('')
    const [disableButton, setdisableButton] = useState(true)
    const [user, setuser] = useState({
        email:"",
        password:""
    })

    useEffect(() => {
        if(user.email !== "" && user.password !== ""){
            setdisableButton(false)
        }
    }, [user])

    const handleUserChange = (e) => {
        var value = e.target.value
        if(e.target.name === "email"){
            
            if (validator.isEmail(value)) {
                setEmailError('')
              } else {
                setEmailError('Enter valid Email!')
              }
        }
        if(e.target.name === "password"){
            //password
            if (validator.isStrongPassword(value, {
                minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
            })) {
                setpasswordError('')
            } else {
                setpasswordError('Password must contain atleast 1 capital, 1 small, 1integer, 1 special char')
            }
        }

        setuser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleLogIn = e => {
        console.log("eneterd button login")
        e.preventDefault()
        if(user.email === "" || user.password === "") {
            toast.warning("All the fields are compulsory");
        }
        else if(emailError === "" && passwordError === ""){
            console.log("user",user)

            axios.post("http://localhost:2000/signin",user)
            .then(res => {
                console.log(res)
                console.log(res.data.message === "Signed In Successfully")
                localStorage.setItem("token",res.data.token)
                console.log(("token",res.data.token))
                localStorage.setItem("email",res.data.savedUser.email)
                console.log(("email",res.data.savedUser.email))
                localStorage.setItem("fullName",res.data.savedUser.fullName)
                console.log(("email",res.data.savedUser.email))
                // dispatch(getData([0, 1, 2]))
                dispatch(getData(res.data.data1))
                if(res.data.message === "Signed In Successfully"){
                    history.push("/dashboard");
                    toast.success("Signed In Successfully");
                }
                else{
                    toast.error("Failed to SignIn");
                }
            })
            .catch(err => {
                console.log(err)
                toast.error("Failed to SignIn");
            })
        }
    }

    // const handleUserChange = (e) => {
    //     console.log(e.target.value)
    //     setuser({
    //         ...user,
    //         [e.target.name] : e.target.value
    //     })
    // }

    return (
        <div className="login">
            {console.log("user",user)}
            <div className="login-header">
                <img src={Logo} alt="logo" />
            </div>
            <div className="login-body">
                <div className="login-body-title">Log in</div>
                <form>
                    <>
                        <label for="Email">Email</label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email"
                            value={user.email}
                            // onChange={handleUserChange}
                            onChange={(e) => handleUserChange(e)}
                            placeholder="Enter Your Email" 
                        />
                        <span style={{fontWeight: 'bold',color: 'red'}}>{emailError}</span>
                    </>
                    <>
                        <label for="Password">Password</label>
                        <input 
                            type="text" 
                            id="password" 
                            name="password"
                            value={user.password}
                            // onChange={handleUserChange}
                            onChange={(e) => handleUserChange(e)}
                            placeholder="Enter Your Password"
                        />
                        <span style={{fontWeight: 'bold',color: 'red'}}>{passwordError}</span>
                    </>
                    <button className="button3" onClick={handleLogIn}>Log In</button>
                </form>
                <div className="register">
                    <span style={{marginRight:"10px"}}>Don't have an Account? </span>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </div>
            {console.log("disableButton",disableButton)}
        </div>
    )
}

export default Login
