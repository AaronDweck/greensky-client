import { useParams } from "react-router"

export default function Post() {
    const { postId } = useParams()

    return(
        <>
            <h1>Post</h1>
            <h2>{postId}</h2>
        </>
    )
}