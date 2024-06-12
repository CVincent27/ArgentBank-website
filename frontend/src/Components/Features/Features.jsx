import chat from '../../assets/icon-chat.webp';
import money from '../../assets/icon-money.webp';
import security from '../../assets/icon-security.webp';

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
			return chatIcon;
		case 'money':
			return moneyIcon;
		case 'security':
			return securityIcon;
		default:
			return null;
	}
}

export default Features;