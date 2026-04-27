import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../store/useAuthStore"
import { toast } from "react-hot-toast"
const INITIAL_FORM_DATA = {
  username: "",
  email: "",
  password: "",
}
const Register = () => {
  // handling navigation
  const navigate = useNavigate()
  // getting register action from store
  const register = useAuthStore((state) => state.register)
  // Terms acceptance state
  const [termsAccepted, setTermsAccepted] = useState(false)
  // handling error state
  const [error, setError] = useState(null)
  // form data state
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  // handling input changes
  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  async function handleSubmit(e) {
    e.preventDefault()
    if (!termsAccepted) {
      alert("Please accept the terms and conditions.")
      return
    }
    try {
      await register(formData)
      toast.success("Account Created")
      navigate("/auth/login")
      setError(null)
      setFormData(INITIAL_FORM_DATA)
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Registration failed",
      )
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50/30 p-15 xl:p-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Visual/Image Section */}
        <div className="relative md:w-5/12 h-48 md:h-auto">
          <img
            src="/register.jpg"
            alt="Spices and Curry"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
            <h2 className="text-3xl font-serif font-bold">
              Start Your Chapter
            </h2>
            <p className="text-sm opacity-90 mt-2 italic">
              "Join our community for exclusive recipes and birthday treats."
            </p>
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="md:w-7/12 p-8 md:p-10">
          <div className="mb-6 text-center md:text-left">
            <h1 className="text-3xl font-serif font-bold text-slate-800">
              Curry <span className="text-orange-600">Chapter</span>
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Create your account to start ordering.
            </p>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            {/* Username */}
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                placeholder="curry_lover99"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                placeholder="chef@currychapter.com"
              />
            </div>

            {/* Password */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Terms */}
            <div className="md:col-span-2 flex items-center py-2">
              <input
                type="checkbox"
                className="rounded text-orange-600 focus:ring-orange-500 h-4 w-4"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <span className="ml-2 text-xs text-slate-600">
                I agree to the{" "}
                <a href="#" className="text-orange-600 underline">
                  Terms & Conditions
                </a>
              </span>
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 space-y-3 pt-2">
              <button className="w-full bg-slate-900 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors duration-300 shadow-lg">
                Create Account
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-amber-600 hover:text-white font-bold py-3 rounded-lg transition-colors duration-300"
              >
                Continue as Guest
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Already have a chapter with us?{" "}
            <button
              onClick={() => navigate("/auth/login")}
              className="text-orange-600 font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
