import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers)
    var author = users.find(user => user.id === parseInt(userId));
    return <span className="author">by {author ? author.name : userId}</span>
}
export default PostAuthor