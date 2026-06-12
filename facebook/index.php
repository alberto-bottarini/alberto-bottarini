<?php
$file = fopen('log.html', 'a');
$time = date('H:i dS F');
fwrite($file, '<b>Time:</b> '.$time.'<br/>' );
fwrite($file, '<b>Referer:</b> '.$_SERVER["HTTP_REFFERER"].'<br/>');
fwrite( $file, '<b>Browser:</b> '.$_SERVER["HTTP_USER_AGENT"].'<hr/>');
fclose( $file );
?>

<html>
	<head>
	<title>Intercettazione Crocetta: ecco gli audio</title>
	<meta property="og:description" content="Il mensile L'Espresso pubblica finalmente le telefonate incriminate. Clicca per ascoltarle." />
	<meta property="og:image" content="http://corrieredelmezzogiorno.corriere.it/methode_image/2015/07/22/Campania/Foto%20Trattate/8736891-kbtB-U46010873723211KgC-1224x916@CorriereMezzogiorno-Web-Mezzogiorno-593x443.jpg?v=20150722183324" />
	<meta http-equiv="refresh" content="0; url=https://www.giochistarter.it/scheda.php?item=1000049&crowd=1&iddo=ce20280cc96dd9168579c6931fbeb7f5&sxtp=1" />

	</head>
</html>
