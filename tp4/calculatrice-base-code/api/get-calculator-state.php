<?php

try{
    //ouverture du fichier en mode lecture
    $file = fopen("etat.json", "r");
    echo fread($file, filesize("etat.json"));
    fclose($file);
}catch(Exception $e){
    http_response_code(500);
    throw new Exception("erreur en lecture du fichier"+ $e->getMessage());
}
?>