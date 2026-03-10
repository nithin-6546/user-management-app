import { useLocation, useNavigate } from "react-router-dom";

function User() {
  let { state } = useLocation();
  let navigate = useNavigate();

  // Safety check: If state is null (on refresh), redirect or show message
  if (!state?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-red-50 p-8 rounded-2xl border border-red-100 text-center shadow-sm">
          <p className="text-2xl text-red-600 font-semibold mb-4">User data missing!</p>
          <p className="text-gray-600 mb-6">It looks like you refreshed the page or accessed it directly.</p>
          <button 
            onClick={() => navigate("/users-list")} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all shadow-md"
          >
            ← Back to Users List
          </button>
        </div>
      </div>
    );
  }

  const { name, email, dateOfBirth, mobileNumber } = state.user;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Navigation Shortcut */}
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 text-blue-600 font-medium hover:underline flex items-center gap-2"
        >
          ← Go Back
        </button>

        {/* Profile Card */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
          {/* Top Banner/Header Color */}
          <div className="h-32 bg-gradient from-blue-500 to-indigo-600"></div>

          <div className="px-8 pb-10">
            {/* Avatar Section */}
            <div className="relative -mt-16 mb-6 flex justify-center">
              <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold text-gray-500 border-4 border-gray-50">
                  {name[0].toUpperCase()}
                </div>
              </div>
            </div>

            {/* User Info Section */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold text-gray-800">{name}</h2>
              <p className="text-blue-600 font-medium">{email}</p>
            </div>

            <hr className="mb-8 border-gray-100" />

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Date of Birth</p>
                <p className="text-lg text-gray-700 font-semibold">{dateOfBirth || "N/A"}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Mobile Number</p>
                <p className="text-lg text-gray-700 font-semibold">{mobileNumber || "N/A"}</p>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;