import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar: React.FC = () => {
  const [links, setLinks] = useState([
    {
      to: '/dashboard',
      text: 'Home'
    },
    {
      to: '/dashboard/getting-started',
      text: 'Getting Started'
    },
    {
      to: '/dashboard/schedule/schedule-swing-analysis',
      text: 'Schedule a Swing Analysis'
    },
    {
      to: '/dashboard/schedule/schedule-fitting',
      text: 'Schedule a Fitting'
    },
    {
      to: '/dashboard/fitting-progress',
      text: 'Fitting Progress'
    },
    {
      to: '/dashboard/account-history',
      text: 'Account History'
    },
    {
      to: '/dashboard/my-profile',
      text: 'My Profile'
    }
  ])
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem('user') || '')?.role
    if (role === 'admin') {
      setLinks([
        {
          to: '/dashboard',
          text: 'Home'
        },
        {
          to: '/dashboard/getting-started',
          text: 'Getting Started'
        },
        {
          to: '/dashboard/fitting-requests',
          text: 'Fitting Requests'
        },
        {
          to: '/dashboard/fitting-tasks',
          text: 'Fitting Tasks'
        },
        {
          to: '/dashboard/fitting-schedule',
          text: 'Fitting Schedule'
        },
        {
          to: '/dashboard/fitting-history',
          text: 'Fitting History'
        },
        {
          to: '/dashboard/customer-profiles',
          text: 'Customer Profiles'
        }
      ])
    }
  }, [])
  const location = useLocation()
  return (
    <aside className="w-64 bg-white shadow-lg p-4 fixed left-0 h-full border-r border-gray-200 mt-4">
      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.to}
              className={`block px-4 py-2 rounded-md font-medium transition duration-200 ${
                location.pathname === link.to
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
