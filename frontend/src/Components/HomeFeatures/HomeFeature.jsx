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
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
};

export default HomeFeature;