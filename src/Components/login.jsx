import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1512px] h-[982px]">
        <div className="relative w-[1250px] h-[750px] top-[116px] left-[131px] rounded-[36px] overflow-hidden">
          <div className="absolute w-[625px] h-[750px] top-0 left-0 bg-[url(https://c.animaapp.com/hED8FcSK/img/rectangle-4.svg)] bg-[100%_100%]">
            <div className="relative w-[412px] h-[524px] top-[113px] left-[107px] bg-[#ffffff36] rounded-[46px] border border-solid border-[#ffffff85] backdrop-blur-[13.6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(13.6px)_brightness(100%)]">
              <div className="absolute w-[60px] h-[60px] top-[404px] left-[-31px] bg-white rounded-[86px]">
                <img
                  className="absolute w-[30px] h-[30px] top-[15px] left-[15px] object-cover"
                  alt="Thunderbolt"
                  src="https://c.animaapp.com/hED8FcSK/img/thunderbolt-1@2x.png"
                />
              </div>
              <div className="absolute w-[393px] h-[229px] top-[147px] left-[9px]">
                <div className="absolute w-[393px] h-44 top-3 left-0 [font-family:'Spartan',Helvetica] font-medium text-white text-[90px] text-center tracking-[0] leading-[88.2px]">
                  Todo
                  <br />
                  Sync
                </div>
                <p className="absolute h-5 top-52 left-7 [font-family:'Spartan',Helvetica] font-medium text-white text-lg text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  Manage day to day tasks efficiently
                </p>
              </div>
            </div>
          </div>
          <div className="absolute w-[625px] h-[750px] top-0 left-[625px] bg-[#7662f114]">
            <div className="inline-flex flex-col items-center gap-16 relative top-[84px] left-[88px]">
              <div className="inline-flex flex-col items-center gap-9 relative flex-[0_0_auto]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Spartan',Helvetica] font-semibold text-[#2f2f2f] text-7xl tracking-[-1.44px] leading-[normal] whitespace-nowrap">
                  Login
                </div>
                <img
                  className="relative w-[381px] h-[200px] ml-[-1.00px]"
                  alt="Frame"
                  src="https://c.animaapp.com/hED8FcSK/img/frame-11.svg"
                />
              </div>
              <div className="relative w-[450px] h-[142px]">
                <div className="absolute w-[450px] h-[54px] top-0 left-0 bg-white rounded-2xl overflow-hidden flex items-center">
                  <img
                    className="w-5 h-5 ml-6"
                    alt="Frame"
                    src="https://c.animaapp.com/hED8FcSK/img/frame.svg"
                  />
                  <input
                    type="text"
                    className="ml-4 w-[200px] h-5 bg-transparent border-none focus:shadow-none focus:outline-none text-[#735ff1] text-sm"
                    placeholder="Enter your Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="absolute w-[450px] h-[54px] top-16 left-0 bg-white rounded-2xl overflow-hidden flex items-center">
                  <img
                    className="w-5 h-5 ml-6"
                    alt="Frame"
                    src="https://c.animaapp.com/hED8FcSK/img/frame.svg"
                  />
                  <input
                    type="password"
                    className="ml-4 w-[200px] h-5 bg-transparent border-none focus:shadow-none focus:outline-none text-[#735ff1] text-sm"
                    placeholder="Enter your Password"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => {
                    if (name == "") {
                      seterror("Please enter name!");
                      return;
                    } else {
                      seterror("");
                    }
                    if (password !== "1234") {
                      seterror("Password is invalid!");
                      return;
                    } else {
                      seterror("");
                    }
                    localStorage.setItem("name", name);
                    navigate("/dashboard");
                  }}
                  className="flex w-[222px] h-[52px] items-center justify-around gap-2.5 px-16 py-4 absolute top-[150px] left-[111px] rounded-2xl [background:linear-gradient(180deg,rgb(138,121,243)_0%,rgb(88,65,238)_100%)]"
                >
                  <p className="relative w-[94px] h-4 [font-family:'Spartan',Helvetica] font-semibold text-white text-base tracking-[0] leading-[normal] whitespace-nowrap">
                    Login Now
                  </p>
                </button>
                {error && (
                  <p className="relative top-28 mt-2 text-center text-red-700">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
