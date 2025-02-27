import Forms from "../components/Forms";
import Hero from "../components/Hero";
import Working from "../components/Working";

const Home = () => {
    return (
        <div className="w-full h-full ">
            <Hero />
            <Forms />
            <Working />
        </div>
    )
}

export default Home;