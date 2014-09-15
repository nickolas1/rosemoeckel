<?php

/* what kind of pictures are we getting? */
$q=$_GET["q"];


/* read in the artwork file */
$filestring = "./artworks.json";
$filecontents = file_get_contents($filestring);
$json = json_decode($filecontents, true);

/* populate the site with the desired subset */
$counter = 0;
echo "<div id = 'gallery'>";
foreach($json as $val){
    if($val[$q] && $val["display"]){
        if($counter % 4 == 0){
            echo "<div class='row flush'>";
        }
        if($counter % 2 == 0){
            echo "<div class='6u'><div class='row no-collapse-1 flush'>";
        }
        $counter++;
        echo "<div class='6u'><div class='artpiece__picture-box'><div class='artpiece'><div class='artpiece__image'>";
        echo "<a class='art-link' href='img/" . $val[imagename] . ".jpg'><img class='image artwork' src='img/" . $val[imagename] . "_480.jpg' alt='' title='" . $val[title] . "'/></a></div>";
        echo "<div class='artpiece__title'>" . $val[title] . "</div>";
        if(is_numeric($val[price])){
            echo "<span class='artpiece__price'>$" . $val[price] . "</span>";
        } else {
            echo "<span class='artpiece__price'>" . $val[price] . "</span>";
        }
        echo "<span class='artpiece__medium'>" . $val[medium] . "</span>";
        echo "<span class='artpiece__size'>" . $val[size] . "</span></div></div></div>";
        
        if($counter % 2 == 0){
            echo "</div></div>";
        }
        if($counter % 4 == 0){
            echo "</div>";
        }
    }
}

/* make sure divs are closed */
if($counter % 2 != 0){
    echo "</div></div></div>";
}
echo "</div>";

?>