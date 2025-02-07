
import Filter from "../Components/Filter"
import Header from "../Components/Header"
import ProtectedSection from "../Components/ProtectedSection"




function Home () {
    return (
        
            
           <div>
                <Header />
                <ProtectedSection>
                    <Filter />  
                </ProtectedSection>
              
           </div>

        
    )


}


export default Home