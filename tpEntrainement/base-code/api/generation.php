<?php
	// Classe pour stocker les mots avec leur nombre d'essais autorisés
	class mat 
	{
		public $mot; // Mot à trouver
		public $nb_essais; // Nombre d'essais autorises
		
		function __construct($m,$n)
		{
			$this->mot=$m;
			$this->nb_essais=$n;
		}
	}
	
	// Liste des noms d'animaux
	$animaux = array(
		new mat("ELEPHANT",6), new mat("ZEBRE",4),
		new mat("GAZELLE",6), new mat("TIGRE",5),
		new mat("TORTUE",5), new mat("CROCODILE",7),
		new mat("PANTHERE",7), new mat("GUEPARD",6),
		new mat("OKAPI",6), new mat("LION",4),
		new mat("SINGE",5), new mat("GIRAFE",6),
		new mat("LEOPARD",6), new mat("ALIGATOR",7),
		new mat("GORILLE",6), new mat("PERROQUET",7),
		new mat("ANTILOPE",7), new mat("HIPPOPOTAME",7),
		new mat("FENNEC",5), new mat("CHACAL",5),
		new mat("BABOUIN",6), new mat("IMPALA",5),
		new mat("MANGOUSTE",7), new mat("RHINOCEROS",7)
	);
	
	// Tirage au sort d'un animal
	$i = rand(0, count($animaux)-1); 

	// Renvoie au format JSON d'un nom d'animal
	// (avec le nombre d'erreurs permises pour celui-ci)
	echo '{"mot":"'.$animaux[$i]->mot.'", "nb_essais":'.$animaux[$i]->nb_essais.'}';

?>