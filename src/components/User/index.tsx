import "./index.css"
const User = ({image}: {image?:string}) => {


    return (
        <div className="user-image__container">
            <img src={image} alt="user image" className="user__image" />
        </div>
    );
}

export default User;