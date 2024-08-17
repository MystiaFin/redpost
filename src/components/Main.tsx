import HeaderPost from "./HeaderPost"
import PostCard from "./PostCard"

function Main() {
    return(
        <>
        <div className="p-2 lg:px-8 md:px-0 sm:px-0 lg:max-w-2xl md:max-w-xl sm:max-w-xl">
            <HeaderPost/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
        </div>
        </>
    )
}

export default Main