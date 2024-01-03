<?php
$path_origin = ".";
$ignore_files = [".", "..", "structure.js"];

$components = [];
$css_links = [];

$components_path = "$path_origin/components";
$all_component_sets = array_diff(scandir("$components_path"), $ignore_files);

foreach ($all_component_sets as $folder) {
    find_components("$components_path/$folder");
}

function find_components($path)
{
    if (!is_dir($path)) return;
    global $components, $css_links, $ignore_files;


    $files = array_diff(scandir("$path"), $ignore_files);
    foreach ($files as $file) {
        if (substr($file, -2) === "js") {
            $components[] = [
                "name" => substr($file, 0, -3),
                "path" => "$path/$file"
            ];
        }

        if (substr($file, -3) === "css") {
            $css_links[] = [
                "html" => "<link rel='stylesheet' href='$path/$file'>",
                "href" => "$path/$file"
            ];
        }

        if (is_dir("$path/$file")) {
            find_components("$path/$file");
        }
    }
}

function echo_static_import_lines()
{
    global $components;
    foreach ($components as $component) {
        $path = $component["path"];
        $name = $component["name"];
        echo "    import * as $name from '$path';\n";
    }
}

function get_component_names($type = "initial")
{
    global $components;
    $names = [];
    foreach ($components as $component) {
        if ($component["type"] != $type) continue;
        $names[] = $component["name"];
    }
    return $names;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php foreach ($css_links as $link) {
        echo $link["html"];
    } ?>
    <title>Document</title>
</head>

<body>
    <script type="module" id="app_script">
        import * as structure from "./components/components_common/structure/structure.js";
        import * as component_manager from "./components/component_manager.js";
        <?php echo_static_import_lines(); ?>

        let components = [];

        <?php
        foreach (get_component_names() as $component_name) {
            echo "components.push($component_name.component); \n";
        }
        ?>
        components = [...structure.get_components(), ...components]

        component_manager.render(components)


    </script>


</body>

</html>