import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useUser, setEditProfile, editUser, setProfileImge } from "../../features"
import {toast} from "react-toastify"

export const Modal =()=>{
    
    const {isEditProfile,user} = useUser()
    const [userData,setUserData] = useState({bio:null,portfolio:null})
    const [newImage, setNewImage] = useState(null)

    const dispatch=useDispatch()

    useEffect(()=>{
        setUserData({bio:user.bio,portfolio:user.portfolio})
    },[user])

    const changeHandlder = (e) => {
        setUserData(userData => ({
            ...userData,
            [e.target.id] :e.target.value
        }))
    }

    const handleUploadPhoto = (e) => {
        setNewImage(e.target.files[0])
    }

    const handleEditProfile = () => {
        dispatch(editUser(userData)).unwrap()
        .then(()=>toast.success("Profile Updated"))
        .catch((error)=>{
            toast.error("Error occured, profile update failed")
        })
        dispatch(setProfileImge(newImage))
        dispatch(setEditProfile())
    }
    
    return (
        <>
            {isEditProfile && (<div id="modal-wrapper" className="absolute z-10 w-full h-full flex justify-center items-center bg-[#00000061]">
            <main id="content" className="border w-96 h-96 bg-white rounded-lg flex flex-col items-center p-6">
                <div className="relative">
                    {!newImage && <img className="rounded-full border-2 border-white w-20 h-20" src={user.profileImg} alt={user.username} />}
                    {newImage && <img className="rounded-full border-2 border-white w-20 h-20" src={URL.createObjectURL(newImage)} alt={user.username} />}
                    <span className="material-icons-outlined absolute object-cover rounded-full cursor-pointer top-[3.5rem] left-[3rem] bg-green-200">add_a_photo</span>
                    <input className="border opacity-0 cursor-pointer absolute w-6 top-[3.5rem] left-[3rem]" type="file" accept="image/" onChange={handleUploadPhoto} />
                </div>
                <div>{user?.username}</div>
                <div className="flex flex-col w-full h-16 ">
                    <span className="mr-auto">PORTFOLIO</span>
                    <input id="portfolio" type="text" webkitdirectory multiple className="w-full h-8 border rounded border-blue-400 outline-blue-400" value={userData.portfolio} 
                        onChange={changeHandlder}
                    />
                </div>
                <div className="flex flex-col w-full my-2 h-28">
                    <span className="mr-auto">BIO</span>
                    <textarea  id="bio" type="text" className="border-blue-400 border h-28 w-full rounded outline-blue-400" value={userData.bio} 
                        onChange={changeHandlder}
                    />
                </div>
                <div className="ml-auto">
                    <button className="border rounded-lg hover:bg-blue-400 px-4 py-1 font-semibold text-sm"
                        onClick={handleEditProfile}
                    >UPDATE</button>
                    <button className="border ml-2 rounded-lg hover:bg-blue-400 px-5 font-semibold py-1 text-sm"
                        onClick={()=>dispatch(setEditProfile())}
                    >CLOSE</button>
                </div>
                
            </main>
        </div>)}
        </>
        
    )
}