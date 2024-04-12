import { NavLink, Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="fixed left-0 top-2/4 -translate-y-2/4">
                <nav className="flex flex-col p-5">
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'font-bold text-xl' : 'text-xl')}>
                        Three Ways
                    </NavLink>
                    <NavLink to="/messy-react" className={({ isActive }) => (isActive ? 'font-bold text-xl' : 'text-xl')}>
                        Messy React
                    </NavLink>
                    <NavLink to="/fancy-form" className={({ isActive }) => (isActive ? 'font-bold text-xl' : 'text-xl')}>
                        Fancy Form
                    </NavLink>
                </nav>
            </div>
            <Outlet />
        </div>
    )
}

export default Layout
