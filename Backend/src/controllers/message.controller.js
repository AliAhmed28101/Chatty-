import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"

import { getReceiverSocketId, io } from "../lib/socket.js";


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

       res.status(200).json(messages)

    } catch (error) {

        console.log("Error in getMessages controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
        
    }
}

//sending the message functionality it could be text, it could be image
export const sendMessage = async(req, res)=>{

    try {
            const {text, image}= req.body   
            const {id: receiverId} = req.params    

            const senderId = req.user._id

            let imageUrl
            if(image){
                //upload base64 image to cloudinary
                const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;

            }

            //now message case

            const newMessage = new Message({
                senderId,
                receiverId,
                text,
                image: imageUrl,
            })

            await newMessage.save()


            const receiverSocketId = getReceiverSocketId(receiverId)
            if(receiverSocketId){
                io.to(receiverSocketId).emit("newMessage", newMessage)
            }


            res.status(201).json(newMessage)
            

    } catch (error) {
        console.log("Error in sendMessages controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}