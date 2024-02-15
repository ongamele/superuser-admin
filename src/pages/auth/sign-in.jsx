import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

import logoBig from "../../images/logoBig.png";


export function SignIn() {
  const navigate = useNavigate();
  const[username, setUsername] = useState("")
  const[password, setPassword] = useState()

  function handleLogin(){
    if(username == "superuser" && password == '123456'){
      navigate("/dashboard/home");
    }else{
      alert("Incorrect login details!")
    }
  }
  

  const extractCallingCodeAndNumber = (phoneNumber) => {
    const callingCodeRegex = /^\+(\d+)\s/
    const trimmedNumber = phoneNumber.trim()
    const callingCodeMatch = trimmedNumber.match(callingCodeRegex)
    const callingCode = callingCodeMatch ? callingCodeMatch[1] : ''

    const usersNumber = trimmedNumber.replace(/^\+\d+\s*/, '')

    return { callingCode, usersNumber }
  }
  const callingCodeRegex = /^\+(\d+)\s/
  var phoneNo = ' 0788415424'
  const trimmedNumber = phoneNo.trim()
  
  const callingCodeMatch = trimmedNumber.match(callingCodeRegex)
  const callingCode = callingCodeMatch ? callingCodeMatch[1] : ''

  //const usersNumber = trimmedNumber.replace(/^\+\d+\s*/, '')

  const { usersNumber } = extractCallingCodeAndNumber(phoneNo)
  
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button onClick={() => handleLogin()} className="mt-6" fullWidth style={{backgroundColor: "#3855E5"}}>
            Sign In
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
          
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Forgot Password
              </a>
            </Typography>
          </div>
       
         
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src={logoBig}
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
