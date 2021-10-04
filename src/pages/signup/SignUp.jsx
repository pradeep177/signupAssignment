import React,{useState,useEffect} from 'react'
import Logo from '../../images/logoName.jpg'
import validator from 'validator'
import {Link} from "react-router-dom";
import './signUp.css'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

function SignUp() {
    let history = useHistory();
    const [nameError, setnameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setpasswordError] = useState('')
    const [newUser, setnewUser] = useState({
        fullName:"",
        email:"",
        password:"",
        Cpassword:"",
        securityAnswer:"",
        data1:[],
        data2:[]
    })



    useEffect(() => {
        const ARRAY_LENGTH = 3
        const randomArray = []
        const randomArray1 = []
        for(let i = 0; i<ARRAY_LENGTH; i++) {
            randomArray.push(Math.floor(Math.random() * (100 - 10 + 1)))
            randomArray1.push(Math.floor(Math.random() * (100 - 10 + 1)))
        }
        newUser.data1 = randomArray
        newUser.data2 = randomArray1
        setnewUser({...newUser})
    }, [])
    
    const handleNewUserChange = e => {
        console.log(e,"new user")
        var value = e.target.value

        if(e.target.name === "fullName"){
            if (validator.isEmpty(value)) {
                setnameError('Name cannot be an empty')
              } else {
                setnameError('')
              }
        }
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
        setnewUser({
            ...newUser,
            [e.target.name] : e.target.value
        })
    }

    const hadleSignUp = (e) => {
        e.preventDefault()

        if(newUser.fullName === "" || newUser.email === "" && newUser.password === "" || newUser.Cpassword === "" || newUser.securityAnswer === ""){
            toast.warning("All the fields are compulsory");
        }

        else if(emailError === "" && passwordError === "" && nameError === ""){
            console.log(newUser,"newUser")

            axios.post("http://localhost:2000/signup",newUser)
                .then(res => {
                    console.log(res)
                    if(res.data.message === "Signup Successful"){
                        history.push("/");
                        toast.success("Signup Successful");
                    }
                    else{
                        toast.error("Signup Failed");
                    }
                })
                .catch(err => {
                    toast.error("Signup Failed");
                    console.log(err)
                })
        }
        
    }

    return (
        <div className="login">
            {console.log(newUser,"newUser")}
            <div className="login-header">
                <img src={Logo} alt="logo" />
            </div>
            <div className="login-body">
                <div className="login-body-title">Sign Up</div>
                <form>
                    <>
                        <label for="Email">Full Name</label>
                        <input 
                            type="text" 
                            id="fullName" 
                            name="fullName"
                            placeholder="Enter Your Full Name"
                            value={newUser.fullName}
                            onChange={(e) => handleNewUserChange(e)}
                        />
                        <span style={{fontWeight: 'bold',color: 'red'}}>{nameError}</span>
                    </>
                    <>
                        <label for="Email">Email</label>
                        <input 
                            type="text" 
                            id="Email" 
                            name="email"
                            placeholder="Enter Your Email"
                            value={newUser.email}
                            onChange={(e) => handleNewUserChange(e)} 
                        />
                        <span style={{fontWeight: 'bold',color: 'red'}}>{emailError}</span>
                    </>
                    <>
                        <label for="Password">Enter Password</label>
                        <input 
                            type="text" 
                            id="password" 
                            name="password"
                            placeholder="Enter Your Password"
                            value={newUser.password}
                            onChange={(e) => handleNewUserChange(e)}
                        />
                        <span style={{fontWeight: 'bold',color: 'red'}}>{passwordError}</span>
                    </>
                    <><label for="RePassword">Confirm Password</label>
                    <input 
                        type="text" 
                        id="Cpassword" 
                        name="Cpassword"
                        placeholder="Confirm Your Password"
                        value={newUser.Cpassword}
                        onChange={(e) => handleNewUserChange(e)}
                    /></>
                    <><label for="securityAnswer">What is your pet name</label>
                    <input 
                        type="text" 
                        id="securityAnswer" 
                        name="securityAnswer"
                        placeholder="Security Answer"
                        value={newUser.securityAnswer}
                        onChange={(e) => handleNewUserChange(e)}
                    /></>
                    <button className="button3" onClick={hadleSignUp}>Sign up</button>
                </form>
                <div className="default-user">
                    <span style={{marginRight:"10px"}}>Already A user?</span>
                    <Link to="/">Log In</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp