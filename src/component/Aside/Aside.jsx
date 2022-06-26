import { LeftSidebar, RightSidebar } from "../../component"
import { usePost } from "../../features"

export const Aside = (sidebar) =>{
    const { sidebar :aside } = sidebar ;
    const { posts } = usePost()
    const userList = [...posts.reduce((a,c)=>{
        a.set(c.username, c);
        return a;
      }, new Map()).values()];

    if(aside === "left"){
        return (
            <aside className="left-aside md:border w-6/12">
                <LeftSidebar />
            </aside>
        )
    }else if(aside === "right"){
        return (
            <aside className="right-aside border-l w-6/12 py-2 px-2 relative">
            <div className="fixed p-4 w-80">
                <h4 className="font-semibold my-4 text-center h-max md:mt-[4.2rem]">Your might know</h4>
                {userList.map((post,id)=>(
                    <RightSidebar post={post} id={id}/>
                ))}
            </div>
        </aside>
        )
    }return (
        <></>
    )
}