import { Outlet } from 'react-router-dom'
import { AppNavbar } from '../../Components/AppNavbar/AppNavbar'

export const Root = () => {
  return (
    <>
      <div className="min-h-full">
        <AppNavbar />
        <Outlet />
      </div>
    </>
  )
}
