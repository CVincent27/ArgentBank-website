import PropTypes from "prop-types";

function HomeFeature({ img, title, text }) {
	return (
		<div className="feature-item">
			<img src={img} alt="Chat Icon" className="feature-icon" />
			<h3 className="feature-item-title">{title}</h3>
			<p>{text}</p>
		</div>
	);
}

HomeFeature.propTypes = {
	/**
	 * Image string (required) to be displayed
	 */
	img: PropTypes.string.isRequired,
	/**
	 * Title (required) to be displayed
	 */
	title: PropTypes.string.isRequired,
	/**
	 * Text string (required) to be displayed
	 */
	text: PropTypes.string.isRequired,
};

export default HomeFeature;