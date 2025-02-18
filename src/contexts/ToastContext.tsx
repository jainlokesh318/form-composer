import { createContext, useContext, useState, ReactNode } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
    id: string
    message: string
    type: ToastType
}

interface ToastContextType {
    showToast: (message: string, type: ToastType) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = (message: string, type: ToastType) => {
        const newToast: Toast = {
            id: crypto.randomUUID(),
            message,
            type,
        }
        setToasts(prev => [...prev, newToast])

        // Auto remove after 5 seconds
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== newToast.id))
        }, 5000)
    }

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`
                            flex items-center justify-between gap-2 p-4 rounded-lg shadow-lg 
                            animate-slide-up min-w-[300px] max-w-md
                            ${toast.type === 'success' ? 'bg-green-500 text-white' : ''}
                            ${toast.type === 'error' ? 'bg-red-500 text-white' : ''}
                            ${toast.type === 'info' ? 'bg-blue-500 text-white' : ''}
                        `}
                    >
                        <p className="flex-1">{toast.message}</p>
                        <button 
                            onClick={() => removeToast(toast.id)}
                            className="text-white hover:text-gray-200"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}