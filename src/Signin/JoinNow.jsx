
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import lanGuage from '../assets/Language.png';
import muSic from '../assets/Music & Arts.png';
import techNology from '../assets/Technology2.png';
import cooKing from '../assets/Cooking & Baking.png';
import Business from '../assets/Business & Management.png';
import Sciense from '../assets/Science & General Knowledge.png';
import myImageG from '../assets/GlowTogather logo.png';
import myImageE from '../assets/Email.png';
import myImageO from '../assets/OTP.png';
import myImageP from '../assets/Personal.png';
import myImageK from '../assets/Know.png';
import myImageEm from '../assets/Email2.png';
import myImageOt from '../assets/OTP2.png';
import myImagePe from '../assets/Personal2.png';
import myImageKn from '../assets/Know2.png';
import myImageY from '../assets/YourProfile.jpg';
import myImageI from '../assets/iconProfile.png';
import { FaCalendarAlt } from 'react-icons/fa';

const JoinNow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
    personal: '',
    username: '',
    aboutMe: '',
    dateOfBirth: '',
  });
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [displayDate, setDisplayDate] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [interests, setInterests] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const dateInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('registerEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (step === 4) {
      const fetchCategories = async () => {
        setIsLoadingCategories(true);
        try {
          const response = await fetch(
            'https://35420d9f0ddb.ngrok-free.app/moment/categories',
            {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
            }
          );
          const contentType = response.headers.get('Content-Type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
          }
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch categories');
          }
          setCategories(data || []);
        } catch (error) {
          console.error('Error fetching categories:', error);
          setErrors({ ...errors, personal: error.message || 'Failed to load categories. Please try again.' });
          setCategories([]);
        } finally {
          setIsLoadingCategories(false);
        }
      };
      fetchCategories();
    }
  }, [step]);

  const sendOtp = async () => {
    setLoading(true);
    setErrors({
      email: '',
      password: '',
      confirmPassword: '',
      otp: '',
      personal: '',
      username: '',
      aboutMe: '',
      dateOfBirth: '',
    });
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email');
      }
      const response = await fetch(
        'https://35420d9f0ddb.ngrok-free.app/auth/register-step1',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, confirmPassword }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }
      localStorage.setItem('registerEmail', email);
      console.log('OTP sent successfully');
      setStep(2);
    } catch (error) {
      setErrors({ ...errors, email: error.message });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndRegister = async () => {
    setLoading(true);
    setErrors({
      email: '',
      password: '',
      confirmPassword: '',
      otp: '',
      personal: '',
      username: '',
      aboutMe: '',
      dateOfBirth: '',
    });
    const storedEmail = localStorage.getItem('registerEmail') || email;
    try {
      const response = await fetch(
        'https://35420d9f0ddb.ngrok-free.app/auth/register-step2',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: storedEmail, otp }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed');
      }
      console.log('OTP verification successful');
      setStep(3);
    } catch (error) {
      setErrors({ ...errors, otp: error.message || 'Invalid OTP. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const PersonalProfile = async () => {
    setLoading(true);
    setErrors({
      email: '',
      password: '',
      confirmPassword: '',
      otp: '',
      personal: '',
      username: '',
      aboutMe: '',
      dateOfBirth: '',
    });
    const storedEmail = localStorage.getItem('registerEmail') || email;
    try {
      const formData = new FormData();
      formData.append('email', storedEmail);
      formData.append('username', username);
      formData.append('about_me', aboutMe);
      formData.append('date_of_birth', dateOfBirth);
      if (profilePicture) formData.append('profile_picture', profilePicture);

      console.log('Sending data:', { email: storedEmail, username, aboutMe, dateOfBirth });

      const response = await fetch(
        'https://35420d9f0ddb.ngrok-free.app/auth/register-step3',
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit personal information');
      }
      console.log('Personal profile submitted successfully:', data);
      setStep(4);
    } catch (error) {
      console.error('Error in PersonalProfile:', error);
      setErrors({ ...errors, personal: error.message || 'Failed to submit personal information.' });
    } finally {
      setLoading(false);
    }
  };

  const ResendOtp = async () => {
    setLoading(true);
    setErrors({
      email: '',
      password: '',
      confirmPassword: '',
      otp: '',
      personal: '',
      username: '',
      aboutMe: '',
      dateOfBirth: '',
    });
    const storedEmail = localStorage.getItem('registerEmail') || email;
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(storedEmail)) {
        throw new Error('Invalid email in storage');
      }
      const response = await fetch(
        'https://35420d9f0ddb.ngrok-free.app/auth/resend-otp',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: storedEmail }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to send new OTP');
      }
      console.log('New OTP sent successfully');
      alert('New OTP sent successfully. Please check your email.');
    } catch (error) {
      setErrors({ ...errors, otp: error.message || 'Unable to send new OTP. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const completeRegistration = async (interestsToSend = interests) => {
    setLoading(true);
    setErrors({
      email: '',
      password: '',
      confirmPassword: '',
      otp: '',
      personal: '',
      username: '',
      aboutMe: '',
      dateOfBirth: '',
    });
    const storedEmail = localStorage.getItem('registerEmail') || email;
    try {
      console.log('Sending interests:', interestsToSend);
      const response = await fetch(
        'https://35420d9f0ddb.ngrok-free.app/auth/register-step4',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: storedEmail, interests: interestsToSend }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate token');
      }
      const token = data.token;
      localStorage.setItem('authToken', token);
      console.log('Registration completed, Token stored:', token);
      localStorage.removeItem('registerEmail');
      navigate('/Homepost');
    } catch (error) {
      console.error('Error in completeRegistration:', error);
      setErrors({ ...errors, personal: error.message || 'Failed to complete registration.' });
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    setErrors({
      email: '',
      password: '',
      confirmPassword: '',
      otp: '',
      personal: '',
      username: '',
      aboutMe: '',
      dateOfBirth: '',
    });
    if (step === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrors({ ...errors, email: 'Please enter a valid email' });
        return;
      }
      if (!password) {
        setErrors({ ...errors, password: 'Please enter your password' });
        return;
      }
      if (!confirmPassword) {
        setErrors({ ...errors, confirmPassword: 'Please confirm your password' });
        return;
      }
      if (password !== confirmPassword) {
        setErrors({ ...errors, confirmPassword商家: 'Passwords do not match' });
        return;
      }
      sendOtp();
    } else if (step === 2) {
      if (!otp) {
        setErrors({ ...errors, otp: 'Please enter the OTP' });
        return;
      }
      verifyOtpAndRegister();
    } else if (step === 3) {
      if (!username) {
        setErrors({ ...errors, username: 'Please enter your full name' });
        return;
      }
      if (!dateOfBirth) {
        setErrors({ ...errors, dateOfBirth: 'Please select your date of birth' });
        return;
      }
      PersonalProfile();
    } else if (step === 4) {
      if (interests.length === 0) {
        setErrors({ ...errors, personal: 'Please select at least one interest' });
        return;
      }
      completeRegistration(interests);
    }
  };

  const handleStepClick = (stepNumber) => {
    console.log('Clicked step:', stepNumber, 'Current step:', step);
    if (stepNumber <= step) {
      setStep(stepNumber);
    }
  };

  const handleBackStep = () => {
    if (step > 1 && step !== 4) {
      setStep(step - 1);
      setErrors({
        email: '',
        password: '',
        confirmPassword: '',
        otp: '',
        personal: '',
        username: '',
        aboutMe: '',
        dateOfBirth: '',
      });
    } else if (step === 4) {
      setInterests([]);
      completeRegistration([]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      const [year, month, day] = selectedDate.split('-');
      setDisplayDate(`${year}/${month}/${day}`);
      setDateOfBirth(selectedDate);
    } else {
      setDisplayDate('');
      setDateOfBirth('');
    }
  };

  const handleInputClick = () => {
    dateInputRef.current.showPicker();
  };

  const handleInterestToggle = (interest) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
    console.log('Toggled interest:', interest, 'New interests:', interests);
  };

  return (
    <div
      className={`bg-white relative min-h-screen ${
        step === 3 ? 'Register-container no-curve' : 'Register-container'
      }`}
    >
      <nav className="bg-white p-4 sm:p-6 md:p-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center text-black font-bold text-3xl sm:text-4xl md:text-5xl hover:text-gray-900"
            aria-label="Go to homepage"
          >
            <img src={myImageG} alt="GlowTogather Logo" className="h-5 sm:h-10 md:h-12 object-contain" />
          </Link>
          <button
            className="sm:hidden text-[#333333] text-2xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>
          <div
            className={`flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-0 absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent ${
              isOpen ? 'flex' : 'hidden sm:flex'
            }`}
          >
            <Link
              to="/"
              className="text-[#333333] w-[68px] h-[32px] px-4 py-2 rounded-lg hover:bg-gray-100 text-lg font-normal"
              style={{ fontWeight: 300 }}
            >
              Home
            </Link>
            <Link
              to="/Login"
              className="bg-[#C53678] text-white w-[150px] sm:w-[175px] h-[40px] sm:h-[50px] flex items-center justify-center rounded-[20px] font-medium text-lg hover:bg-[#A12C5F]"
              style={{ fontWeight: 400 }}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
      <div className="bg-white p-10">
        <div className="bg-white p-4 rounded-2xl shadow w-fit mx-auto border border-[#BBBBBB] border-[2px] flex flex-row gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              step === 1 ? 'bg-[#FF6250]' : 'bg-[#FEF4F4]'
            }`}
          >
            <Link className="hover:bg-white-100 cursor-pointer rounded-full" onClick={() => handleStepClick(1)}>
              <img
                src={step === 1 ? myImageE : myImageEm}
                alt="Email-password"
                className="w-6 h-6 rounded-full flex items-center"
              />
            </Link>
          </div>
          {step === 1 && (
            <div className="flex flex-col translate-y-1">
              <p className="text-[13px] font-medium text-[#FF6250] poppins-font">Step 1/4</p>
              <p className="text-[14px] font-normal text-[#333537] poppins-font">Email and Password</p>
            </div>
          )}
          <div className="bg-gray-300">
            <div className="w-px h-10"></div>
          </div>
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              step === 2 ? 'bg-[#FF6250]' : 'bg-[#FEF4F4]'
            }`}
          >
            <Link className="hover:bg-white-100 cursor-pointer rounded-full" onClick={() => handleStepClick(2)}>
              <img
                src={step === 2 ? myImageOt : myImageO}
                alt="OTP Verification"
                className="w-6 h-6 rounded-full flex items-center"
              />
            </Link>
          </div>
          {step === 2 && (
            <div className="flex flex-col translate-y-1">
              <p className="text-[13px] font-medium text-[#FF6250] poppins-font">Step 2/4</p>
              <p className="text-[14px] font-normal text-[#333537] poppins-font">OTP Verification</p>
            </div>
          )}
          <div className="bg-gray-300">
            <div className="w-px h-10"></div>
          </div>
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              step === 3 ? 'bg-[#FF6250]' : 'bg-[#FEF4F4]'
            }`}
          >
            <Link className="hover:bg-white-100 cursor-pointer rounded-full" onClick={() => handleStepClick(3)}>
              <img
                src={step === 3 ? myImagePe : myImageP}
                alt="Personal Information"
                className="w-6 h-6 rounded-full flex items-center"
              />
            </Link>
          </div>
          {step === 3 && (
            <div className="flex flex-col translate-y-1">
              <p className="text-[13px] font-medium text-[#FF6250] poppins-font">Step 3/4</p>
              <p className="text-[14px] font-normal text-[#333537] poppins-font">Personal Information</p>
            </div>
          )}
          <div className="bg-gray-300">
            <div className="w-px h-10"></div>
          </div>
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              step === 4 ? 'bg-[#FF6250]' : 'bg-[#FEF4F4]'
            }`}
          >
            <Link className="hover:bg-white-100 cursor-pointer rounded-full" onClick={() => handleStepClick(4)}>
              <img
                src={step === 4 ? myImageKn : myImageK}
                alt="Knowledge Interests"
                className="w-6 h-6 rounded-full flex items-center"
              />
            </Link>
          </div>
          {step === 4 && (
            <div className="flex flex-col translate-y-1">
              <p className="text-[13px] font-medium text-[#FF6250] poppins-font">Step 4/4</p>
              <p className="text-[14px] font-normal text-[#333537] poppins-font">Knowledge Interests</p>
            </div>
          )}
        </div>
        {step === 1 && (
          <div className="container mx-auto flex justify-center items-center p-1 flex-col translate-y-1 pr-4">
            <div className="container mx-auto flex justify-center items-center p-7 flex-col translate-y-1 pr-18 pl-10">
              <div className="text-[#333333] poppins-font">
                <p className="text-[32px] font-semibold">Create Your Account</p>
                <p className="text-[15px] font-normal">Enter your email and password to begin. We'll send a code.</p>
              </div>
            </div>
            <div className="text-[#333333] poppins-font p-1 pl-13">
              <p className="text-base font-medium pl-2">Please enter your email</p>
              <div className="p-2 pr-10 pl-1 relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-[#7E7E7E] bg-[#FEF4F4] p-2 rounded-2xl w-full max-w-lg mx-auto flex flex-row pr-77 pl-5 font-normal text-base"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 text-center">{errors.email}</p>}
              </div>
            </div>
            <div className="text-[#333333] poppins-font p-1 pl-13">
              <p className="text-base font-medium pl-2">Please enter your Password</p>
              <div className="p-2 pr-10 relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-[#7E7E7E] bg-[#FEF4F4] p-2 rounded-2xl w-full max-w-lg mx-auto flex flex-row pr-77 pl-5 font-normal text-base"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1 text-center">{errors.password}</p>}
              </div>
            </div>
            <div className="text-[#333333] poppins-font p-1 pl-13">
              <p className="text-base font-medium pl-2">Please enter your Confirm Password</p>
              <div className="p-2 pr-10 relative">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="text-[#7E7E7E] bg-[#FEF4F4] p-2 rounded-2xl w-full max-w-lg mx-auto flex flex-row pr-77 pl-5 font-normal text-base"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1 text-center">{errors.confirmPassword}</p>
                )}
              </div>
              <div className="p-3 flex justify-center items-center space-x-3 pl-72">
                <button
                  onClick={handleNextStep}
                  disabled={loading}
                  className="bg-[#C53678] text-white w-[150px] sm:w-[175px] h-[40px] sm:h-[50px] flex items-center justify-center rounded-[20px] font-medium text-lg hover:bg-[#A12C5F] disabled:bg-gray-400"
                  style={{ fontWeight: 400 }}
                >
                  {loading ? 'Sending...' : 'Next Step'}
                </button>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="container mx-auto flex justify-center items-center p-1 flex-col translate-y-1">
            <div className="container mx-auto flex justify-center items-center p-7 flex-col translate-y-1 pr-9">
              <div className="text-[#333333] poppins-font">
                <p className="text-[32px] font-semibold">Verification Code</p>
                <p className="text-[15px] font-normal">We have sent the verification code to your email address</p>
              </div>
            </div>
            <div className="text-[#333333] poppins-font p-1 pl-12">
              <p className="text-base font-medium pl-2">Code</p>
              <div className="p-2 pr-10 relative">
                <input
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  maxLength={6}
                  className="text-[#7E7E7E] bg-[#FEF4F4] p-3 rounded-2xl w-full max-w-lg mx-auto flex flex-row pr-65 pl-5 font-normal text-base"
                />
                <button
                  onClick={ResendOtp}
                  disabled={loading}
                  className="text-[#FF6250] text-base font-medium absolute right-2 top-1/2 transform -translate-y-1/2 border-none bg-transparent outline-none no-style hover:underline pr-11"
                  style={{ fontWeight: 400 }}
                >
                  Resend the code
                </button>
              </div>
              {errors.otp && <p className="text-red-500 text-sm mt-1 text-center">{errors.otp}</p>}
            </div>
            <div className="p-3 flex justify-center items-center space-x-3 pl-50">
              <button
                onClick={handleBackStep}
                className="text-[#7E7E7E] text-base font-medium p-5 border-none bg-transparent outline-none no-style hover:underline"
                style={{ fontWeight: 400 }}
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                disabled={loading || otp.length !== 6}
                className="bg-[#C53678] text-white w-[150px] sm:w-[175px] h-[40px] sm:h-[50px] flex items-center justify-center rounded-[20px] font-medium text-lg hover:bg-[#A12C5F] disabled:bg-gray-400"
                style={{ fontWeight: 400 }}
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="container mx-auto flex justify-center items-center p-1 flex-col translate-y-1 no-curve">
            <div className="container mx-auto flex justify-center items-center p-7 flex-col translate-y-1 pr-18">
              <div className="text-[#333333] poppins-font">
                <p className="text-[32px] font-semibold">Your Profile</p>
                <p className="text-[15px] font-normal">Tell us a bit about yourself to personalize your experience</p>
              </div>
            </div>
            {errors.personal && <p className="text-red-500 text-sm mt-1 text-center">{errors.personal}</p>}
            <div className="text-[#333333] poppins-font p-1">
              <div className="p-2 pr-1 relative">
                <div className="w-30 h-30 rounded-full overflow-hidden opacity-70">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                  ) : (
                    <img src={myImageY} alt="Default Profile" className="w-full h-full object-cover" />
                  )}
                </div>
                {!previewUrl && (
                  <div className="absolute inset-0 flex items-center justify-center pl-1">
                    <img src={myImageI} alt="Profile Icon" className="w-8 h-8 opacity-100" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div className="text-[#333333] poppins-font p-1 pl-16">
              <span className="text-base font-medium pl-2">Username</span>
              <span className="text-[#FF0000] text-base font-medium">*</span>
              <div className="p-2 pr-13 relative">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-[#333333] bg-[#FEF4F4] p-2 rounded-2xl w-full max-w-lg mx-auto flex flex-row pr-75 pl-5 font-normal text-base"
                />
                {errors.username && <p className="text-red-500 text-sm mt-1 text-center">{errors.username}</p>}
              </div>
            </div>
            <div className="text-[#333333] poppins-font p-1 pr-42 pl-53">
              <p className="text-base font-medium pl-2">About Me</p>
              <div className="p-2 pr-10">
                <div className="relative w-full max-w-2xl mx-auto">
                  <textarea
                    placeholder="About Me..."
                    value={aboutMe}
                    onChange={(e) => {
                      const words = e.target.value.trim().split(/\s+/).filter((word) => word.length > 0);
                      if (words.length <= 300) {
                        setAboutMe(e.target.value);
                      } else {
                        const limitedText = words.slice(0, 300).join(' ');
                        setAboutMe(limitedText);
                      }
                    }}
                    className="text-[#333333] bg-[#FEF4F4] p-4 rounded-2xl w-full pr-74 pl-5 font-normal text-base resize-y"
                    style={{ minHeight: '150px', verticalAlign: 'top' }}
                  />
                  <p className="absolute bottom-2 right-101 text-sm text-[#BBBBBB]">
                    {300 - aboutMe.trim().split(/\s+/).filter((word) => word.length > 0).length}/300
                  </p>
                </div>
              </div>
            </div>
            <div className="text-[#333333] poppins-font p-1 pl-14">
              <p className="text-base font-medium pl-2">Date of Birth</p>
              <div className="p-2 pr-10 relative">
                <div className="relative flex items-center bg-[#FEF4F4] p-2 pr-69 rounded-2xl w-full cursor-pointer" onClick={handleInputClick}>
                  <FaCalendarAlt className="text-[#BBBBBB] ml-4 text-xl" />
                  <input
                    id="dob-input"
                    type="text"
                    value={displayDate}
                    readOnly
                    placeholder="Choose Date"
                    className="flex-grow bg-transparent outline-none text-[#BBBBBB] font-normal text-base pl-2"
                    style={{ appearance: 'none' }}
                  />
                  <input
                    type="date"
                    ref={dateInputRef}
                    onChange={handleDateChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    aria-hidden="true"
                    tabIndex="-1"
                  />
                </div>
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1 text-center">{errors.dateOfBirth}</p>}
              </div>
            </div>
            <div className="p-3 flex justify-center items-center space-x-3 pl-83">
              <button
                onClick={handleBackStep}
                className="text-[#7E7E7E] text-base font-medium p-5 border-none bg-transparent outline-none no-style hover:underline"
                style={{ fontWeight: 400 }}
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                disabled={loading}
                className="bg-[#C53678] text-white w-[150px] sm:w-[175px] h-[40px] sm:h-[50px] flex items-center justify-center rounded-[20px] font-medium text-lg hover:bg-[#A12C5F] disabled:bg-gray-400"
                style={{ fontWeight: 400 }}
              >
                {loading ? 'Submitting...' : 'Next Step'}
              </button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="container mx-auto flex justify-center items-center p-1 flex-col translate-y-1">
            <div className="container mx-auto flex justify-center items-center p-10 flex-col translate-y-1 pr-35">
              <div className="text-[#333333] poppins-font">
                <p className="text-[32px] font-semibold">Explore Your Interests</p>
                <p className="text-[15px] font-normal">Pick topics you love to personalize your experience</p>
              </div>
            </div>
            <div className="text-[#333333] poppins-font p-1 text-xs font-normal">
              <div className="p-0 pr-10 pl-10 max-h-[300px] overflow-y-auto grid grid-cols-3 gap-4">
                {isLoadingCategories ? (
                  <p className="text-center text-gray-500 col-span-3">Loading categories...</p>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <div
                      key={category.id}
                      className={`border-2 rounded-2xl p-3 w-[150px] h-[140px] flex flex-col items-center justify-center cursor-pointer ${
                        interests.includes(category.name) ? 'border-[#FF6250]' : 'border-[#BBBBBB]'
                      }`}
                      onClick={() => handleInterestToggle(category.name)}
                    >
                      <img
                        src={
                          category.name === 'Language and Communication'
                            ? lanGuage
                            : category.name === 'Music and Arts'
                            ? muSic
                            : category.name === 'Technology and Innovation'
                            ? techNology
                            : category.name === 'Cooking and Baking'
                            ? cooKing
                            : category.name === 'Business and Management'
                            ? Business
                            : category.name === 'Science and General Knowledge'
                            ? Sciense
                            : lanGuage
                        }
                        alt={category.name}
                        className="w-16 h-16 mx-auto"
                      />
                      <p className="text-center mt-2 overflow-wrap">{category.name}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-3">No categories available</p>
                )}
              </div>
              {errors.personal && <p className="text-red-500 text-sm mt-1 text-center">{errors.personal}</p>}
            </div>
            <div className="p-3 flex justify-center items-center space-x-4 pl-59">
              <div className="relative">
                <button
                  onClick={handleBackStep}
                  disabled={interests.length > 0 || loading}
                  className="text-[#7E7E7E] text-base font-medium p-5 border-none bg-transparent outline-none no-style hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                  style={{ fontWeight: 400 }}
                >
                  Skip
                </button>
                {interests.length > 0 && (
                  <span className="absolute top-full left-0 text-sm text-red-500">
                    Deselect all interests to skip
                  </span>
                )}
              </div>
              <button
                onClick={handleNextStep}
                disabled={loading}
                className="bg-[#C53678] text-white w-[150px] sm:w-[175px] h-[40px] sm:h-[50px] flex items-center justify-center rounded-[20px] font-medium text-lg hover:bg-[#A12C5F] disabled:bg-gray-400"
                style={{ fontWeight: 400 }}
              >
                {loading ? 'Submitting...' : 'Complete'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinNow;