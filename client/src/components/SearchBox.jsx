import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../BASE_URL';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce effect to detect when typing stops
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredUsers([]); // Clear results if query is empty
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    const timer = setTimeout(() => {
      fetchFilteredUsers(query);
      setIsTyping(false);
    }, 500); // Wait 500ms after typing stops

    return () => clearTimeout(timer); // Cleanup the timer
  }, [query]);

  // Fetch filtered users from API
  const fetchFilteredUsers = async (searchQuery) => {
    setIsLoading(true);
    try {
      const response = await axios.get(BASE_URL+`/api/users/search/?query=${searchQuery}`);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, email, or college..."
        className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Results List */}
      {isTyping || query.trim() ? (
        <div className="mt-4 bg-white shadow-md rounded-lg divide-y divide-gray-200">

          {isLoading ? (
            <p className="text-blue-500 p-4">Loading...</p>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user._id} className="p-4 hover:bg-gray-100 cursor-pointer">
                <Link to={"/admin/"+user._id}>
                <div className="font-semibold text-lg">{user.name}</div>
                <div className="text-gray-500">{user.email}</div>
                <div className="text-sm text-gray-400">College: {user.college}</div>
                <div className="text-sm text-gray-400">Contact: {user.contact}</div>
                <div className="text-sm text-gray-400 flex gap-3">Team Members: {user.teamMember.map((e)=>{
                    return(
                        <>
                            <div className=''>
                                {e.name}
                            </div>
                        </>
                    )
                })}</div>

                
                </Link>
                
              </div>
            ))
          ) : (
            <p className="text-gray-500 p-4">No results found.</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBox;
