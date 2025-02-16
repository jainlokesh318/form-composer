import { Route, Routes, Link } from 'react-router'

function App() {
  return (
      <div className="p-4">
        <nav className="mb-4 flex gap-4 w-full items-center justify-center">
          <Link to="/builder" className="text-blue-500">Create New Form</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Welcome to Form Builder App</h1>} />
        </Routes>
      </div>
  )
}

export default App
