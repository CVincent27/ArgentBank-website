import chat_Icon from '../../assets/icon-chat.webp';
import money_Icon from '../../assets/icon-money.webp';
import security_Icon from '../../assets/icon-security.webp';
import featuresData from '../../Components/Features/FeaturesData.json';

function Features() {
	return (
		<section className="features">
			<h2 className="sr-only">Features</h2>
			{/* Utilisez map pour itérer sur les données et générer dynamiquement les éléments */}
			{featuresData.features.map((feature, index) => (
				<div className="feature-item" key={index}>
					{/* Utilisez des variables importées pour charger les images */}
					<img src={getIcon(feature.icon)} alt={`${feature.title} Icon`} className="feature-icon" />
					<h3 className="feature-item-title">{feature.title}</h3>
					<p>{feature.description}</p>
				</div>
			))}
		</section>
	);
}

// Fonction utilitaire pour obtenir l'icône correspondante
function getIcon(iconName) {
	switch (iconName) {
		case 'chat':
			return chat_Icon;
		case 'money':
			return money_Icon;
		case 'security':
			return security_Icon;
		default:
			return null;
	}
}

export default Features;