import AddEvent from "../Components/CreateEvent/AddEvent"
import ListEvent from "../Components/CreateEvent/ListEvent"
import ProtectedSection from "../Components/ProtectedSection"


function CreateEvent () {
    return (
        <div>
            <ProtectedSection>
                <AddEvent />
                <ListEvent />
            </ProtectedSection>
        </div>
    )

}


export default CreateEvent