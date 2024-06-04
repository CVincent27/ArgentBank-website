export const setWithExpiry = (key, value, TTL) => {
	const now = new Date();
	const item = {
		value: value,
		/* Ajout du TTL au temps actuel pour obtenir l'heure d'expiration. */
		expiry: now.getTime() + TTL,
	};
	/* Enregistrement de la clé/valeur dans localStorage. */
	localStorage.setItem(key, JSON.stringify(item));
};


// Récupère la valeur de la clé dans localStorage, vérifie si l'heure actuelle est > à l'heure d'expiration pour supp ou non l'élément de localStorage.

export const getWithExpiry = (key) => {
	/* Récupération valeur de la key dans localStorage. */
	const itemStr = localStorage.getItem(key);
	/* Si itemStr n'est pas défini */
	if (!itemStr) {
		return null;
	}
	/* parse chaine en json */
	const item = JSON.parse(itemStr);
	const now = new Date();
	/* Vérification si l'heure actuelle est > à l'heure d'expiration. Si oui supprime
	l'élément de localStorage et retourne null. */
	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}
	// Return value
	return item.value;
};
