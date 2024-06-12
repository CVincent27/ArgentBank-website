import chatIcon from '../../assets/icon-chat.webp';
import moneyIcon from '../../assets/icon-money.webp';
import securityIcon from '../../assets/icon-security.webp';
import featuresData from '../../Components/Features/FeaturesData.json';

const iconMap = {
    "chat": chatIcon,
    "money": moneyIcon,
    "security": securityIcon
};

function Features() {
    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {featuresData.features.map((feature, index) => (
                <div className="feature-item" key={index}>
                    <img src={iconMap[feature.icon]} alt={`${feature.title} Icon`} className="feature-icon" />
                    <h3 className="feature-item-title">{feature.title}</h3>
                    <p>{feature.description}</p>
                </div>
            ))}
        </section>
    );
}

export default Features;
