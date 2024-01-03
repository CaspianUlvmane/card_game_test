<?php
$path_origin = ".";
$ignore_files = [".", ".."];

$components = [];
$css_links = [];

$components_path = "$path_origin/components";
$all_component_sets = array_diff(scandir("$components_path"), $ignore_files);

foreach( $all_component_sets as $folder){
    find_components("$components_path/$folder");
}

function find_components ($path){
    if(!is_dir($path)) return;
    global $components, $css_links, $ignore_files;


    $files = array_diff(scandir("$path"), $ignore_files);
    foreach($files as $file){
        if(substr($file, -2) === "js"){
            $components[] = [
                "name" => substr($file, 0, -3),
                "path" => "$path/$file"
              ];
        }

        if (substr($file, -3) === "css")
        {
          $css_links[] = [
            "html" => "<link rel='stylesheet' href='$path/$file'>",
            "href" => "$path/$file"
          ];
        }
        
        if(is_dir("$path/$file")){
            find_components("$path/$file");
        }
    }

}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>