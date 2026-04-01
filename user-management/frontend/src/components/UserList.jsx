import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function UserList() {
  let [users, setUsers] = useState([]);
  let [err, setErr] = useState("");
  let [isLoading, setIsLoading] = useState(true); // Added loading state
  let navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      setIsLoading(true);
      try {
        let res = await fetch("https://user-management-app-2-0oav.onrender.com/user-api/users");
        if (res.status === 200) {
          let resObj = await res.json();
          setUsers(resObj.payload || []); 
        } else {
          setErr("Failed to fetch users from the server.");
        }
      } catch (error) {
        setErr("Connection Error. Is the backend running on 8080?");
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getUsers();
  }, []);

  const gotoUser = (userObj) => {
    navigate("/user", { state: { user: userObj } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-10 text-center tracking-tight">
          Registered Users
        </h1>

        {/* Error Message Display */}
        {err && (
          <div className="max-w-md mx-auto mb-10 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 shadow-sm">
            <p className="font-bold">Error</p>
            <p>{err}</p>
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-48 bg-gray-200 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : (
          /* Responsive Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {users.length > 0 ? (
              users.map((userObj) => (
                <div 
                  key={userObj.email} 
                  className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 cursor-pointer transition-all duration-300 transform hover:-translate-y-2"
                  onClick={() => gotoUser(userObj)}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span className="text-xl font-bold">{userObj.name[0].toUpperCase()}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 truncate mb-1">
                    {userObj.name}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium mb-4 italic">
                    {userObj.email}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">View Profile</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-2xl text-gray-400">No users found in the database.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;