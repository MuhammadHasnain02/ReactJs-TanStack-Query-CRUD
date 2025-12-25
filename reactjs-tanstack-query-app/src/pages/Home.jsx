import { UserPlus, Edit2, Trash2, Mail, User, RotateCcw, Users as UsersIcon } from 'lucide-react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { getUsers, createUser, updateUser, deleteUser } from "../hooks/useUsers";
import { createUser, deleteUser, getUsers, updateUser } from "../hooks/useUsers";
import { useState } from 'react';


function Home() {
  
  // ======== State ===========
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);

  const queryClient = useQueryClient();

  // ======== Get User (Save Btn) ===========

  const { data = [] , isLoading , isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  })

  // ======== Create User (Save Btn) ===========

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] })
  })

  // ======== Update User (Save Btn) ===========

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] })
  })

  // ======== Delete User (Delete Btn) ===========

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] })
  })

  // ======== Handle Edit State (Edit Btn) ===========

  const handleEditStates = (user) => {
    setUserId(user.id);
    setName(user.name)
    setEmail(user.email)
  }

  // ======== Handle Submit (Save Btn) ===========

  const handleSubmit = (e) => {
    
    e.preventDefault()
    if (!name || !email) return;

    if (userId) {
      updateMutation.mutate({
        id: userId , name , email
      })
    }
    else {
      createUserMutation.mutate({ name , email })
    }

    setName("")
    setEmail("")
    setUserId(null);

  }

  // ======== Handle Clear (Clear Btn) ===========

  const handleClear = () => {
    setName("");
    setEmail("");
    setUserId(null);
  };


  return (

    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* ============ Header ============ */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Management</h1>
            <p className="text-slate-500 mt-1">Manage your team members and their account permissions.</p>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
            <UsersIcon size={18} />
            {data.length} Total Users
          </div>

        </div>

        {/* ============ UserForm ============ */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12 transition-all hover:shadow-md">
          
          {/* Heading */}
          <div className="flex items-center gap-2 mb-6 text-slate-800">
            
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <UserPlus size={20} />
            </div>
            <h3 className="text-xl font-bold">Add / Update User</h3>
            
          </div>

          {/* Inputs */}
          <div className="grid gap-6 sm:grid-cols-2">
            
            {/* Name Input */}
            <div className="space-y-2">
              
              <label htmlFor='name' className="text-sm font-semibold text-slate-700 cursor-pointer ml-1">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input required type="text" id='name'
                  placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

            </div>

            {/* Email Input */}
            <div className="space-y-2">

              <label htmlFor='email' className="text-sm font-semibold text-slate-700 cursor-pointer ml-1">
                Email Address
              </label>
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input required type="email" id='email'
                  placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            
            <button onClick={(e) => handleSubmit(e)} disabled={createUserMutation.isLoading}
              className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200 cursor-pointer">
              {
                createUserMutation.isLoading || updateMutation.isLoading
                ? "Saving..." : userId ? "Update User" : "Save User"
              }

            </button>

            <button onClick={handleClear}
              className="flex items-center gap-2 bg-slate-100 text-slate-600 px-6 py-2.5 rounded-xl font-medium hover:bg-slate-200 transition-all cursor-pointer">
              <RotateCcw size={18} />
              Clear
            </button>

          </div>

        </div>

        {/* ============ Users Grid ============ */}

        {/* Show Loading */}
        {isLoading ? (
          
          <div className="flex flex-col items-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 text-sm font-medium animate-pulse">Loading Users...</p>
          </div>

        ) : (

          // Show No data
          data.length === 0 ? (

            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon size={32} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No users found</h3>
              <p className="text-slate-500 mt-2">Get started by creating your first user above.</p>
              
            </div>

          ) : (
            
            // Users Grid
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              
              {data.map((user, idx) => (
              
                <div key={idx}
                  className="group bg-white rounded-2xl border border-slate-200 p-6 transition-all hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5">
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      
                      <div className="h-12 w-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                        {user.name.slice(0 , 1)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {user.name}
                        </h3>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                          <Mail size={14} /> {user.email}
                        </p>
                      </div>

                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg">
                      Active
                    </span>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-50">
                    
                    <button onClick={() => handleEditStates(user)}
                      className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-slate-700 font-semibold py-2.5 rounded-xl hover:bg-indigo-100 hover:text-indigo-600 transition-all cursor-pointer">
                      <Edit2 size={16} />
                      Edit
                    </button>

                    <button onClick={() => deleteMutation.mutate(user.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-slate-700 font-semibold py-2.5 rounded-xl hover:bg-red-100 hover:text-red-600 transition-all cursor-pointer">
                      <Trash2 size={16} />
                      Delete
                    </button>
                    
                  </div>

                </div>

              ))}

            </div>

          )

        )}
      </div>
    </div>

  );
};

export default Home;