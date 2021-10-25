import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
    return (
        <FontAwesomeIcon icon={faSpinner} className="mb-3 p-5 text-center" />
    )
}

export default Loading