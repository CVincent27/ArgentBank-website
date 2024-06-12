import { Link } from "react-router-dom";
import './error.css';

function Error() {
    return (
        <div className="error-page">
            <main className="body">
                <h2 className="error-404">Error 404</h2>
                <p className="text-error">Sorry.. <br></br>
                    The requested page does not exist.</p>

                < Link to="/">
                    <button className="button-404">Back to Homepage</button>
                </Link>
            </main>
        </div>
    )
}

export default Error