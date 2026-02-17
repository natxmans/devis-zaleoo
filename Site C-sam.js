let selectedProducts = [];

function selectItem(element) {
    const title = element.querySelector('h3').innerText;
    element.classList.toggle('selected');

    if (element.classList.contains('selected')) {
        selectedProducts.push(title);
    } else {
        selectedProducts = selectedProducts.filter(item => item !== title);
    }

    updateUI();
}

function updateUI() {
    const counter = document.getElementById('counter');
    const cartItems = document.getElementById('cart-items');
    
    // Mise à jour du compteur
    counter.innerText = selectedProducts.length;
    counter.style.display = selectedProducts.length > 0 ? 'flex' : 'none';

    // Mise à jour de la liste dans le panier
    cartItems.innerHTML = selectedProducts.length === 0 
        ? '<p style="color: #888;">Aucune solution sélectionnée.</p>' 
        : selectedProducts.map(item => `<div style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; font-weight: 500;">✓ ${item}</div>`).join('');
}

function togglePanel() {
    const panel = document.getElementById('side-panel');
    const overlay = document.getElementById('overlay');
    const isOpen = panel.style.right === "0px";

    panel.style.right = isOpen ? "-400px" : "0px";
    overlay.style.display = isOpen ? "none" : "block";
}

// Lier le bouton "Demander un devis" à l'ouverture du panneau
document.querySelector('.btn-booking').addEventListener('click', (e) => {
    e.preventDefault();
    togglePanel();
});

// Simulation d'envoi
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Merci ! Votre demande pour " + selectedProducts.join(', ') + " a bien été envoyée.");
    togglePanel();
});
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const adminEmail = "ton-adresse@outlook.com"; // Remplace par ton mail Outlook
    const nom = document.querySelector('input[placeholder="Nom complet"]').value;
    const projet = document.querySelector('textarea').value;
    
    // Construction du corps du mail
    const sujet = `Demande de devis C-SAM : ${nom}`;
    const corps = `Bonjour,\n\n` +
                  `Une nouvelle demande a été générée via le site C-SAM.\n\n` +
                  `Client : ${nom}\n` +
                  `Produits sélectionnés : ${selectedProducts.join(', ')}\n\n` +
                  `Détails du projet :\n${projet}\n\n` +
                  `--------------------------\n` +
                  `Fin du récapitulatif.`;

    // Ouverture d'Outlook
    window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
    
    alert("Votre logiciel Outlook va s'ouvrir pour confirmer l'envoi.");
});