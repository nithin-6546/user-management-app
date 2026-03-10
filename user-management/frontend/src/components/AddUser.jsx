import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const { 
    register, 
    handleSubmit, 
    setError, // Added to manually set errors on fields
    formState: { errors } 
  } = useForm();

  let [loading, setLoading] = useState(false);
  let [serverError, setServerError] = useState("");
  let navigate = useNavigate();

  const onUserCreate = async (newUser) => {
    setLoading(true);
    setServerError(""); 
    
    try {
      let res = await fetch("http://127.0.0.1:8080/user-api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (res.status === 201) {
        navigate("/users-list");
      } else if (res.status === 409 || data.message.includes("exists")) {
        // Highlight the specific field using setError
        setError("email", { 
          type: "manual", 
          message: "This email is already registered" 
        });
      } else {
        setServerError(data.message || "An error occurred");
      }
    } catch (err) {
      setServerError("Connection failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Create Account</h1>

        {/* Generic Server Error (e.g., Connection issues) */}
        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-2">
             <span>⚠️</span>
             <p className="font-medium text-sm">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onUserCreate)} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Full Name</label>
            <input 
              type="text" 
              {...register("name", { required: "Name is required" })} 
              className={`w-full p-3 border rounded-lg outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
              placeholder="Nithin" 
            />
            {errors.name && <span className="text-red-500 text-xs mt-1 italic">{errors.name.message}</span>}
          </div>

          {/* Email Field - Now handles "Existing Email" error */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Email Address</label>
            <input 
              type="email" 
              {...register("email", { 
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
              })} 
              className={`w-full p-3 border rounded-lg outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
              placeholder="nithin@example.com" 
            />
            {errors.email && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-red-500 text-xs italic font-medium">{errors.email.message}</span>
              </div>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Date of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth", { required: "Date of birth is required" })}
              className={`w-full p-3 border rounded-lg outline-none focus:ring-2 transition-all ${errors.dateOfBirth ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
            />
            {errors.dateOfBirth && <span className="text-red-500 text-xs mt-1 italic">{errors.dateOfBirth.message}</span>}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Mobile Number</label>
            <input
              type="number"
              {...register("mobileNumber", { 
                required: "Mobile number is required",
                minLength: { value: 10, message: "Must be at least 10 digits" }
              })}
              className={`w-full p-3 border rounded-lg outline-none focus:ring-2 transition-all ${errors.mobileNumber ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
              placeholder="9876543210"
            />
            {errors.mobileNumber && <span className="text-red-500 text-xs mt-1 italic">{errors.mobileNumber.message}</span>}
          </div>

          {/* Submit Button with Loading Spinner */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full text-white font-bold py-4 rounded-lg shadow-lg transition-all mt-4 flex justify-center items-center gap-2
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Registering...</span>
              </>
            ) : (
              "Register User"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;