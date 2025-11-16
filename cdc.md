## Objectifs spécifiques

1. **Visualisation du trafic réseau**

   * Afficher en temps réel les paquets et connexions circulant sur le réseau.
   * Fournir des informations détaillées sur chaque paquet : adresse IP source/destination, protocole, port, taille, timestamp.

2. **Analyse et filtrage**

   * Permettre le filtrage du trafic par protocole (TCP, UDP, HTTP, HTTPS, etc.).
   * Permettre le filtrage par adresse IP, port ou plage d’adresses.
   * Offrir des options de tri et de regroupement pour faciliter l’analyse.

3. **Capture et export des paquets**

   * Autoriser la capture des paquets sur une durée définie ou jusqu’à un certain nombre de paquets.
   * Permettre l’enregistrement des données capturées pour analyse ultérieure (format PCAP ou JSON).
   * Fournir des options d’export des données filtrées pour utilisation dans d’autres outils.

4. **Interface utilisateur conviviale**

   * Proposer une interface web claire et interactive.
   * Afficher les données sous forme de tableau, graphique ou diagramme en temps réel.
   * Inclure des options de recherche et de filtrage accessibles facilement.

5. **Extensibilité et modularité**

   * Architecture modulaire permettant d’ajouter de nouveaux filtres ou modules d’analyse.
   * Backend séparé du frontend pour faciliter l’évolution et la maintenance.



## Idées détaillées : 

- Bandeau latéral rétractable à gauche  affiche les ports disponibles pour récupérer des paquets
  - Au sommet : nom du logiciel 
  - En dessous : ports disponibles pour récupérer des paquets + quelques fonctionnalitées au clic droit (renommer, passer par défault etc...)
  - En bas : paramètres généraux

- Sur la page principale :
  - Bandeau supérieur : 
   -  Possibilité de créer et ajouter des filtres personnalisés 
   -  Barre de recherche textuelle au sein des paquets
  - Page principale : 
   - Grand tableau avec tous les paquets colonnes : No, time, delta, Source, Destination, Protocol, Length, Info
   - Filtrage possible en cliquant sur le nom des colonnes

- Bandeau latéral droite : 
  - contient le détail héxa du paquet selectionné
  - contient une explication claire comme dans wireshark
  


# TODO : Créer les premiers composants permettant l'affichage 
   - Bandeau latéral gauche
   - Page principale
   - Bandeau latéral droite