import FormsList from "./FormsList"
import heroImage from '../images/hero.svg'

function HomePage() {
    return <div className="flex flex-col items-center gap-12">
        <h1 className="text-2xl font-bold">Welcome to Form Builder App</h1>
        <img src={heroImage} alt="Form Builder App" className="w-1/4 mx-auto" />
        <FormsList />
    </div>
}

export default HomePage