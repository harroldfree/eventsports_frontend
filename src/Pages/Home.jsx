// import Announcement from "../Components/MyEvents"
// import BestEvent from "../Components/DescriptionEvent"
import Filter from "../Components/Filter"
import Header from "../Components/Header"
import ProtectedSection from "../Components/ProtectedSection"
// import MyEvents from "../Components/MyEvents"
// import Footer from "../Components/Footer"



function Home () {
    return (
        
            
           <div>
                <Header />
                <ProtectedSection>
                    <Filter />
                    
                    {/* <BestEvent /> */}
                </ProtectedSection>
                {/* <MyEvents /> */}
                {/* <Footer /> */}
           </div>

        
    )


}


export default Home