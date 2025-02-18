import { Route, Routes, Outlet, Link } from 'react-router'
import FormComposer from './pages/FormComposer'
import HomePage from './pages/HomePage'
import FormView from './pages/FormView'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Button from './components/core/Button'
import FormBuilder from './pages/FormComposer/FormBuilder'

function AuthLayout() {
    return (
        <div className="p-4">
            <nav className="mb-4 flex gap-4 w-full items-center justify-between">
                <Link to="/" className="text-blue-500">
                    <ArrowLeftIcon className="w-6 h-6 cursor-pointer" />
                </Link>
                <Link to="/builder" className="text-blue-500">
                    <Button variant="outline">Create New Form</Button>
                </Link>
            </nav>
            <Outlet />
        </div>
    )
}

function PublicLayout() {
    return (
        <div className="p-4">
            <Outlet />
        </div>
    )
}

function App() {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/form/:id" element={<FormView />} />
            </Route>

            <Route element={<AuthLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/builder" element={<FormBuilder />} />
                <Route path="/builder/:id" element={<FormComposer />} />
            </Route>
        </Routes>
    )
}

export default App
