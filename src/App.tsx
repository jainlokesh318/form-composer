import { Route, Routes, Link } from 'react-router'
import FormBuilder from './pages/FormBuilder'
import Button from './components/core/Button'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import HomePage from './pages/HomePage'
import ExistingFormBuilder from './pages/ExistingFormBuilder'

function App() {
 

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
        <Routes>
          <Route path="/builder" element={<FormBuilder />} />
          <Route path="/builder/:id" element={<ExistingFormBuilder />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
  )
}

export default App
