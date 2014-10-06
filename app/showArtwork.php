<?php

/* what kind of pictures are we getting? */
$q=$_GET["q"];

/* read in the artwork file */
$filestring = "./artworks.json";
$filecontents = file_get_contents($filestring);
$json = json_decode($filecontents, true);

/* populate the site with the desired subset */
echo "<ul class = 'gallery'>";
foreach($json as $val){
    if($val[$q] && $val["display"]){
       /* echo "<li><div class='artpiece'><div class='artpiece__image'><img src='images/" . $val[imagename] . "_480.jpg' alt='Artwork depicting: " . $val[title] . "'/></div>";*/
        echo "<li><div class='artpiece'><a class='artpiece__image' href='images/" . $val[imagename] . ".jpg' ><img src='images/" . $val[imagename] . "_480.jpg' alt='Artwork depicting: " . $val[title] . "' title='" . $val[title] . "'/></a>";
        echo "<div class='artpiece__title'>" . $val[title] . "</div>";
        if(is_numeric($val[price])){
            echo "<span class='artpiece__price'>$" . $val[price] . "</span>";
        } else {
            echo "<span class='artpiece__price'>" . $val[price] . "</span>";
        }
        echo "<span class='artpiece__medium'>" . $val[medium] . "</span>";
        echo "<span class='artpiece__size'>" . $val[size] . "</span></div></li>\r\n ";
    }
}
echo "<li class='placeholder'></li> <li class='placeholder'></li>\r\n </ul>";

?>