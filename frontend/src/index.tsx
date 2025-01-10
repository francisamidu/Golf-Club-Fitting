import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'App'
import { AuthProvider } from 'context/AuthContext'
import ScheduleProvider from 'context/ScheduleContext'
import { ToastContainer } from 'react-toastify'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.css'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <>
    <ScheduleProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ScheduleProvider>
    <ToastContainer />
  </>
)
