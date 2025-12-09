import {sampleUsers} from "../../../../database/SampleData.js"
import "./SideBar.css"

const ShowPFP = ({ user_id }) => {
    const user = sampleUsers.find(user => user.user_id === user_id);
    
    if (!user) {
        return <div>Error: User not found</div>;
    }
    
    return (
        <div>
            <img 
                className= "pfp"
                src={user.profileImage || "/empty-pfp.png"} 
                alt={user.name}
            />
        </div>
    )
};

export default ShowPFP