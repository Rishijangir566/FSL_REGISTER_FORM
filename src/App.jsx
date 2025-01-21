import { useState } from "react"

function App() {
  const [ischecked, setIschecked] = useState(false);
  const [showPopup , setShowPopup]=useState(false)
  const [change , setChange]=useState(false)
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    aadharFront: null,
    aadharBack: null,
    parentName: "",
    parentPhone: "",
    localAddress: "",
    permanentAddress: "",
    sameAsLocal: false,
    status: "student",
    qualification: "",
    year: "",
    college: "",
    company:"",
    course: "",
    source: "",
    friendName: "",
  });

  const [aadharPreview,setAadharPreview]=useState({
    front:null,
    back:null
  })

  function handleToggleChange(){
    setShowPopup(true)
    setIschecked(!ischecked)
  }

  function handleInputChange(e) {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "file" && files?.length) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setAadharPreview((prev) => ({
          ...prev,
          [name === "aadhaarFront" ? "front" : "back"]: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }


    if (type === "checkbox") {
      setFormValues((prev) => ({
        ...prev,
        [name]: checked,
        ...(name === "sameAsLocal" && checked && { permanentAddress: prev.localAddress }),
      }));
    } else if (type === "file") {
      setFormValues((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }
  
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log("Form Values :",formValues)
  }
  
  function handlePopupAgree() {
     setIschecked(true);
     setShowPopup(false)
     setChange(!change);
  }

  function handlePopupCancel() {
    setIschecked(false);
    setShowPopup(false)
    setChange(false)
  }



  return (
    <>
      <h2 className="text-center text-3xl font-bold my-4"> FSL Registeration Form</h2>
      <form onSubmit={handleFormSubmit} className="mx-16">

        <div className="personalDetail " >
          <h1 className="text-2xl font-medium bg-gray-600 pl-8 py-2 font-serif"> Personal Detail</h1>
          <div className="name flex gap-6 my-4 mx-6">
            <label className="w-40 ml-4 font-medium" >Name  </label>
            <input type="text"
              name="name"
              placeholder="Enter your Name"
              className="border w-[50rem] px-2 "
              value={formValues.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="name flex gap-6 my-4 mx-6">
            <label className="w-40 ml-4 font-medium" >E-mail  </label>
            <input type="email"
              name="email"
              placeholder="Enter your E-mail"
              className="border w-[50rem]  px-2 "
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>

          <div className=" flex gap-6 my-4 mx-6">
            <label className="w-40 ml-4 font-medium" >Phone  </label>
            <input type="number"
              name="phone"
              placeholder="Enter your Phone Number"
              className="border w-[50rem] px-2 "
              value={formValues.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className=" flex gap-6 my-4 mx-6">
            <label className="w-40 ml-4 font-medium"  >Date of birth </label>
            <input type="date"
              name="dob"
              placeholder="Enter your Date of birth"
              className="border w-[50rem] px-2 "
              value={formValues.dob}
              onChange={handleInputChange}
            />
          </div>

          <div className=" flex gap-6 my-4 mx-6">
            <label className="w-40 ml-4 font-medium"  >Gender </label>
            <div className="flex gap-4  ml-2">
              <span className="flex gap-4 ">
                <input type="radio"
                  name="gender"
                  value="male"
                  checked={formValues.gender === "male"}
                  onChange={handleInputChange}
                />
                <label>Male</label>
              </span>
              <span className="flex gap-4 ">
                <input type="radio"
                  name="gender"
                  value="female"
                  checked={formValues.gender === "female"}
                  onChange={handleInputChange}
                />
                <label>Female</label>
              </span>
              <span className="flex gap-4 ">
                <input type="radio"
                  name="gender"
                  value="other"
                  checked={formValues.gender === "other"}
                  onChange={handleInputChange}
                />
                <label>Other</label>
              </span>

            </div>
          </div>

          <div className="flex gap-6 mx-6 my-4">
            <label className="w-40 ml-4 font-medium"> Aadhar Card</label>
            <span className="flex gap-4 ">
            <div>
              <input
                type="file"
                name="aadharFront"
                className="border w-[24.5rem]"
                // value={formValues.aadharBack} // ye glti nhi krnii
                onChange={handleInputChange}
              />
               {aadharPreview.front && (
                <img
                  src={aadharPreview.front}
                  alt="Aadhaar Front Preview"
                  className="mt-2  w-[150px] h=[150px] border"
                />
               )}
              </div>

              <div>
              <input type="file"
                name="aadharBack"
                className="w-[24.5rem] border "
                // value={formValues.aadharBack} // ye glti nhi krnii
                onChange={handleInputChange}
              />
              {aadharPreview.back && (
                <img src={aadharPreview.back} 
                alt="Aadhar Back Preview"
                className="mt-2 w-[150px] h=[150px] border " />
              )}

              </div>
            </span>

          </div>


          {/* //////////// Parent/Guardian Details  ////////// */}
          <div className="parent/gaurdian-details  mt-8">
            <h1 className="text-2xl font-medium bg-gray-600 pl-8 py-2 font-serif"> Parent/ Guardian Details</h1>

            <div className="flex gap-6 mx-6 my-6">
              <label className="w-40 ml-4  font-medium">
                Parent/ Guardian Name
              </label>
              <input
                type="text"
                name="parentName"
                placeholder="Enter your parent's name"
                className="border w-[50rem] px-2 h-7"
                value={formValues.parentName}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-6 mx-6 my-6">
              <label className="w-40 font-medium ml-4">
                Parent/ Guardian Phone
              </label>
              <input
                type="number"
                name="parentPhone"
                placeholder="Enter parent's phone number"
                className="border w-[50rem] px-2 h-7"
                value={formValues.parentPhone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Residential Details */}
          <div className="Residential-details mt-8">
            <h1 className="text-2xl font-medium bg-gray-600 pl-8 py-2 font-serif">
              Residential Details</h1>

            <div className="flex gap-6 my-6 ml-6">
              <label className="w-40 font-medium  ml-4">
                Local Address
              </label>
              <textarea
                name="localAddress"
                placeholder="Enter your Local address"
                className="border w-[50rem] px-2"
                value={formValues.localAddress}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="ml-[14rem] flex gap-2">
              <input
                type="checkbox"
                name="sameAsLocal"
                checked={formValues.sameAsLocal}
                onChange={handleInputChange}
              />
              <label htmlFor="sameAsLocal">
                Permanent address is the same as local address
              </label>
            </div>
            <div className="flex gap-6 ml-6 my-6">
              <label className="w-40 font-medium ml-4">
                Permanent Address
              </label>
              <textarea
                name="permanentAddress"
                placeholder="Enter your permanent address"
                className="border w-[50rem] px-2"
                value={formValues.permanentAddress}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>


          {/* Education Details */}
          <div className="Education-details mt-8 ">
            <h1 className="text-2xl font-medium bg-gray-600 pl-8 py-2 font-serif">Education Details</h1>
            <hr />
            <div className="flex gap-6 mx-6 my-6">
              <label className="w-40 font-medium ml-4">
                Are you a:
              </label>
              <div className="flex gap-10">
                <span className="flex gap-4">
                  <input
                    type="radio"
                    name="status"
                    value="student"
                    checked={formValues.status === "student"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="student">Student</label>
                </span>
                <span className="flex gap-4">
                  <input
                    type="radio"
                    name="status"
                    value="WorkingProfessional"
                    checked={formValues.status === "workingProfessional"}
                    onChange={handleInputChange}
                  />
                  <label>Working Professional</label>
                </span>
              </div>
            </div>
            {formValues.status === "student" && (
              <>
            <div className="flex gap-6 mx-6 my-4">
              <label className="w-40 font-medium ml-4">
                Last Attended Qualification
              </label>
              <input
                type="text"
                name="qualification"
                placeholder="Enter your qualification"
                className="border w-[50rem] px-2 h-7"
                value={formValues.qualification}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-6 mx-6 my-6">
              <label className="w-40 font-medium ml-4">
                Year
              </label>
              <input
                type="number"
                name="year"
                placeholder="Enter your completion year"
                className="border w-[50rem] px-2"
                value={formValues.year}
                onChange={handleInputChange}
              />
            </div>

            
              <div className="flex gap-6 my-6 mx-6">
                <label htmlFor="college" className="w-40  font-medium ml-4">
                  College / University
                </label>
                <input
                  type="text"
                  name="college"
                  placeholder="College / University"
                  className="border w-[50rem] px-2"
                  value={formValues.college}
                  onChange={handleInputChange}
                />
              </div>
              </>
            )}

          {formValues.status === "WorkingProfessional" && (
              <>
            <div className="flex gap-6 mx-6 my-6">
              <label className="w-40 font-medium ml-4">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                placeholder="Enter your Company Name"
                className="border w-[50rem] px-2 h-7"
                value={formValues.company}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-6 mx-6 my-6">
              <label className="w-40 font-medium ml-4">
                Years Exprince
              </label>
              <input
                type="number"
                name="year"
                placeholder="Enter years of Exprince"
                className="border w-[50rem] px-2"
                value={formValues.year}
                onChange={handleInputChange}
              />
            </div>
              </>
            )}
           
          </div>



          {/* Course Details */}
          <div className="Course-details my-8">
            <h1 className="text-2xl font-medium bg-gray-600 pl-8 py-2 font-serif">Course Details</h1>
            <hr />
            <div className="flex gap-6 my-6 mx-6">
              <label className="w-40 font-medium ml-4">
                Course
              </label>
              <select
                name="course"
                className="w-[50rem] border py-2"
                value={formValues.course}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="Full-Stack">Full-Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="UI/UX">UI/UX</option>
                <option value="UI/UX">Other</option>
              </select>
            </div>
            <div className="flex gap-6 my-6 mx-6">
              <label className="mx-2 w-40 font-medium ml-4">
                How did you come to know about us?
              </label>
              <div className="flex gap-10">
                <span className="flex gap-4">
                  <input
                    type="radio"
                    name="source"
                    value="google"
                    checked={formValues.source === "google"}
                    onChange={handleInputChange}
                  />
                  <label className="pt-3">Google</label>
                </span>
                <span className="flex gap-4 ">
                  <input
                    type="radio"
                    name="source"
                    value="linkdin"
                    checked={formValues.source === "linkdin"}
                    onChange={handleInputChange}
                  />
                  <label className="pt-3">LinkedIn</label>
                </span>
                <span className="flex gap-4">
                  <input
                    type="radio"
                    name="source"
                    value="instagram"
                    checked={formValues.source === "instagram"}
                    onChange={handleInputChange}
                  />
                  <label className="pt-3">Instagram</label>
                </span>
                <span className="flex gap-4">
                  <input
                    type="radio"
                    name="source"
                    value="friend"
                    checked={formValues.source === "friend"}
                    onChange={handleInputChange}
                  />
                  <label className="pt-3">Friend</label>
                </span>
                <span className="flex gap-4">
                  <input
                    type="radio"
                    name="source"
                    value="other"
                    checked={formValues.source === "other"}
                    onChange={handleInputChange}
                  />
                  <label className="pt-3">Other</label>
                </span>
              </div>
            </div>

            <div>
              {formValues.source === "friend" && (
                <span className="flex  gap-6 mx-6 my-6 py-4">
                  <label className="w-40 font-medium ml-4 ">
                    Friends Name
                  </label>
                  <input
                    type="text"
                    name="friendName"
                    placeholder="Enter your friend's name"
                    className="border w-[50rem]  h-7 pl-2"
                    value={formValues.friendName}
                    onChange={handleInputChange}
                  />
                </span>
              )}
            </div>
          </div>

          {/* term and condition  */}

          <div className='flex gap-6 ml-6'>
            <p className="mx-2  font-medium ml-4">Do you agree to the terms and conditions?</p>


            <label className=" relative w-16 h-8 mb-2">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                className="opacity-0 w-0 h-0"
                checked={ischecked}
                onChange={handleToggleChange}
              />
              <span
                className={`absolute top-0 left-0 w-full h-full rounded-full transition-all duration-300 ${change ? 'bg-green-500' : 'bg-gray-400'
                  }`}
              ></span>
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${change ? 'transform translate-x-8' : ''
                  }`}
              ></span>
            </label>
          </div>

          {showPopup && (
          <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="popup bg-white p-6 rounded shadow-lg text-center">
              <h2 className="text-3xl font-semibold mb-4">Terms and Conditions</h2>
              <p className=" text-xl my-1  text-left">
                You agree to the following :-
              </p>
              <div className='w-50 my-10 text-left'>
                
                  <li>You have understood the course content.</li>
                  <li>You have understood the course duration.</li>
                  <li>You have cleared all your doubts regarding the course,the content,and the duration.</li>
                  <li>Fees once paid is not refundable.</li>
                  <li>In case of uninformed leave, I will not be eligible for a backup.</li>
                  <li>7 days or more of leave without prior permission would result in termination of registration.</li>
        
              </div>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={handlePopupAgree}
                >
                  Agree
                </button>
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={handlePopupCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}






        </div>



        {/* Submit Button */}


        <button type="submit" className="py-2 text-center bg-blue-700 text-white my-4 rounded text-xl w-full font-medium">
          Submit
        </button>


      </form>

    </>
  )
}

export default App
