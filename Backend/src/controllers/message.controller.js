import User from "../models/user.model.js"
import Message from "../models/message.model.js"


export const getUsersForSidebar  = async(req, res) =>{

    try {
        //bec protect route is used we can grab the user from req
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)

        
    } catch (error) {
        console.error("Error in getUsersForSidebars: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }


    
}

//id is in the route we have passed dynamic id for cleaner code we are renaming that here 
export const getMessages = async(req, res)=>{
    try {
       const {id: userToChatId} = req.params

       //currently authenticated User
       const myId = req.user._id

       //finding all the messages where I am the sender or the other user is the sender, getting the messages between two users
       const messages = await Message.find({
        $or:[

            {
                senderId:myId, receiverId: userToChatId
            },

            {
                senderId:userToChatId, receiverId: myId
            }
        ]
       })

       res.status(200).json({messages})

    } catch (error) {

        console.log("Error in getMessages controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
        
    }
}