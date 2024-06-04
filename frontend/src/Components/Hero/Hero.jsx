import heroData from '../../data/HeroData.json';

function Hero() {
    return (
        <div className="hero">
            <section className="hero-content">
                <h2 className="sr-only">Promoted Content</h2>
                {heroData.hero['hero-content'].subtitle.map((subtitle, index) => (
                    <p key={index} className="subtitle">{subtitle}</p>
                ))}
                <p className="text">{heroData.hero['hero-content'].text}</p>
            </section>
        </div>
    );
}

export default Hero;