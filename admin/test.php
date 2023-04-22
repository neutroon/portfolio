<?php
include_once('../config.php');

$q_skills = $db->prepare("SELECT * FROM skills_section");
$q_skills->execute();
$result_skills = $q_skills->fetchAll();

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="../assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <title><?= $_GET['name'] ?> Skill</title>
</head>

<body>
    <div class="container">
        <form action="" method="post">
            <input type="hidden" name="skill_id" value="<?= $_GET['id'] ?>">

            <label for="skill_name">Skill Name</label>
            <input id="skill_name" type="text" name="skill_name" class="form-control align-content-center" value="<?= $_GET['name'] ?>">

            <label for="add_skill_value">Skill Value</label>
            <input id="add_skill_value" type="range" name="skill_value" class="form-range" oninput="showSkillValue()" value="<?= $_GET['value'] ?>">
            <span id="valueOfSkill"></span>

            <button type="submit" class="btn btn-outline-success w-100 mt-4" name="edit_skills-section">Save changes</button>
        </form>

        <?php
        // if(isset($_GET['submit_skills-section'])){}
        if (isset($_POST['edit_skills-section'])) {
            // echo '<hr>';
            // print_r($_POST['skill_id']);
            // echo '<hr>';
            // print_r($_POST['skill_name']);
            // echo '<hr>';
            // print_r($_POST['skill_value']);

            $sql = $db->prepare("UPDATE 
        skills_section
        SET
        name = :name,
        value = :value
        WHERE 
        id = :id
        ");
            $sql->bindParam("name", $_POST['skill_name']);
            $sql->bindParam("value", $_POST['skill_value']);
            $sql->bindParam("id", $_POST['skill_id']);
            $sql->execute();
            header("location: index.php?skillssection=true");
        }
        ?>
    </div>

    <script src='script.js'></script>
</body>

</html>