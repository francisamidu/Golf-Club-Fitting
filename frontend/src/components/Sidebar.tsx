import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
  return (
    <aside className="w-1/4 bg-gray-100 p-6 mt-4 fixed left-0 h-full">
      <ul className="space-y-6">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.to}
              className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300 ease-in-out transform hover:scale-105"
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
