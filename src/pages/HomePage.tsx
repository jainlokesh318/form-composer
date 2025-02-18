import FormsList from "./FormsList"
import heroImage from '../images/hero.svg'

function HomePage() {
    return (
        <div className="flex flex-col items-center gap-8 sm:gap-12">
            {/* Hero Section */}
            <div className="w-3/4 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
                <div className="text-center lg:text-left lg:flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Welcome to Form Builder App
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto lg:mx-0">
                        Create, share, and analyze forms with ease. Our intuitive form builder helps you gather the information you need.
                    </p>
                </div>
                <div className="w-full sm:w-2/3 lg:w-1/2 xl:w-2/5">
                    <img 
                        src={heroImage} 
                        alt="Form Builder App" 
                        className="w-full h-auto"
                    />
                </div>
            </div>

            {/* Forms List Section */}
            <div className="w-full">
                <FormsList />
            </div>
        </div>
    )
}

export default HomePage