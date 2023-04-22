<?php
include_once('../config.php');
$q_about = $db->prepare("SELECT * FROM about_section");
$q_about->execute();
$result_about = $q_about->fetch(PDO::FETCH_BOTH);

$q_skills = $db->prepare("SELECT * FROM skills_section");
$q_skills->execute();
$result_skills = $q_skills->fetchAll();

$q_resume = $db->prepare("SELECT * FROM resume_section");
$q_resume->execute();
$result_resume = $q_resume->fetch(PDO::FETCH_BOTH);

$q_services = $db->prepare("SELECT * FROM services_section");
$q_services->execute();
$result_services = $q_services->fetch(PDO::FETCH_BOTH);

$q_secControl = $db->prepare("SELECT * FROM section_control");
$q_secControl->execute();
$result_secControl = $q_secControl->fetch(PDO::FETCH_BOTH);

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href='../assets/vendor/boxicons/css/boxicons.min.css' rel='stylesheet'>
    <link href='style.css' rel='stylesheet'>
    <!-- <script src="https://code.jquery.com/jquery-3.6.4.min.js" integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=" crossorigin="anonymous"></script> -->
    <title>dashboard</title>
</head>

<body style="overflow-x: hidden;">

    <div id="sidBarContainer">
        <button id="sidBarBtn" onclick="openSidBar();"></button>
        <form action="" method="">
            <div id="sidBar">
                <a class="list ms-4 fw-bolder font-monospace fs-4" href="../admin/"><i class='bx bxs-wrench'></i>Section Control</a>
                <a class="list ms-4 fw-bolder font-monospace fs-4" href="?homesection=true">Home Picture</a>
                <a class="list ms-4 fw-bolder font-monospace fs-4" href="?aboutsection=true">About Section</a>
                <a class="list ms-4 fw-bolder font-monospace fs-4" href="?skillssection=true">Skills Section</a>
                <a class="list ms-4 fw-bolder font-monospace fs-4" href="?resumesection=true">Resume Section</a>
                <a class="list ms-4 fw-bolder font-monospace fs-4" href="?portfoliosection=true">Portfolio Section</a>
                <a class="list ms-4 fw-bolder font-monospace fs-4" href="?servicessection=true">Services Section</a>
            </div>
        </form>
    </div>
    <div id="mainDiv">

        <!-- edit home section -->
        <?php if (isset($_GET['homesection'])) { ?>
            <div class="container fullHight d-flex flex-column align-items-center">
                <h1 class="">Home Picture</h1>

                <img class="img-thumbnail w-75" src="../assets/img/hero-bg.jpg" alt="Hero Img">
                <form method="post" class="w-75" enctype="multipart/form-data">
                    <input name="hero-img" type="file">
                    <button type="submit" class="btn btn-outline-success w-100 m-4" name="submit_hero-img">Submit</button>
                </form>
                <?php
                if (isset($_POST['submit_hero-img'])) {
                    // uploud hero img
                    $heroImgTmpName = $_FILES['hero-img']['tmp_name'];
                    $heroImgUpload_dir = 'assets/img/hero-bg.jpg';
                    move_uploaded_file($heroImgTmpName, $heroImgUpload_dir);
                }
                ?>
            </div>

            <!-- edit about section -->
            <?php } else if (isset($_GET['aboutsection'])) { ?>
            <div class="container fullHight d-flex flex-column align-items-center">

                <h1 class="">About</h1>

                <form method="post" class="w-75" enctype="multipart/form-data">

                    <img class="img-thumbnail" src="../assets/img/profile-img.jpg" alt="Profile Img">
                    <input type="file" name="profile-img">

                    <label for="birthday">birthday</label>
                    <input id="birthday" class="form-control align-content-center" value="<?= $result_about['birthday']; ?>" name="birthday" type="text">

                    <label for="website">website</label>
                    <input id="website" class="form-control align-content-center" value="<?= $result_about['website']; ?>" name="website" type="text">

                    <label for="phone">phone</label>
                    <input id="phone" class="form-control align-content-center" value="<?= $result_about['phone']; ?>" name="phone" type="text">

                    <label for="city">city</label>
                    <input id="city" class="form-control align-content-center" value="<?= $result_about['city']; ?>" name="city" type="text">

                    <label for="email">email</label>
                    <input id="email" class="form-control align-content-center" value="<?= $result_about['email']; ?>" name="email" type="text">

                    <label for="freelance">freelance</label>
                    <input id="freelance" class="form-control align-content-center" value="<?= $result_about['freelance']; ?>" name="freelance" type="text">

                    <button type="submit" class="btn btn-outline-success w-100 mt-4" name="submit_profile-section">Submit</button>
                </form>

                <?php
                if (isset($_POST['submit_profile-section'])) {
                    $sql = $db->prepare("UPDATE
                    about_section
                    SET
                    birthday = :birthday,
                    website = :website,
                    phone = :phone,
                    city = :city,
                    email = :email,
                    freelance = :freelance
                    ");
                    $sql->bindParam("birthday", $_POST['birthday']);
                    $sql->bindParam("website", $_POST['website']);
                    $sql->bindParam("phone", $_POST['phone']);
                    $sql->bindParam("city", $_POST['city']);
                    $sql->bindParam("email", $_POST['email']);
                    $sql->bindParam("freelance", $_POST['freelance']);
                    $sql->execute();
                    // uploud profile img               
                    $profileImgTmpName = $_FILES['profile-img']['tmp_name'];
                    $profileImgUpload_dir = 'assets/img/profile-img.jpg';
                    move_uploaded_file($profileImgTmpName, $profileImgUpload_dir);

                    header("refresh:0.01;");
                }
                ?>

            </div>

            <!-- edit skill section -->
        <?php } elseif (isset($_GET['skillssection'])) { ?>
            <div class="container fullHight d-flex flex-column align-items-center">
                <h1>Skills</h1>
                <form>

                    <?php foreach ($result_skills as $skill) { ?>
                        <div class="skill_container">
                            <label for="skill_name">Skill Name</label>
                            <input id="skill_name" type="text" name="skill_name" class="form-control align-content-center" value="<?= $skill['name'] ?>" disabled>

                            <label for="skill_range">Skill Value</label>
                            <input id="skill_range" type="range" name="skill_value" class="form-range" value="<?= $skill['value']; ?>" disabled>
                            <span></span>

                            <a href="test.php?id=<?= $skill['id'] ?>&name=<?= $skill['name'] ?>&value=<?= $skill['value']; ?>" class="btn btn-outline-success w-100 mt-4" name="edit_skills-section">Edit skill</a>
                            <a href="?id=<?= $skill['id'] ?>" class="btn btn-outline-danger w-100 mt-4" name="delete_skills-section">Delete</a>
                        </div>
                    <?php } ?>

                </form>
                <?php
                if (isset($_GET['id'])) {
                    $sql = $db->prepare("DELETE FROM
                                skills_section
                                WHERE
                                skills_section.id = :id
                                ");
                    $sql->bindParam("id", $_GET['id']);
                    $sql->execute();
                    echo '<script>window.location.href = "index.php";</script>';
                }

                ?>

                <h5>Add skill</h5>
                <form method="post">
                    <label for="skill_name">Skill Name</label>
                    <input id="skill_name" type="text" name="skill_name" class="form-control align-content-center">

                    <label for="add_skill_value">Skill Value</label>
                    <input id="add_skill_value" type="range" name="skill_value" oninput="showSkillValue();" min="0" max="100" step="5" value="50" class="form-range">
                    <span id="valueOfSkill"></span>

                    <button type="submit" class="btn btn-outline-success w-100 mt-4" name="add_skill">Add skill</button>
                </form>
                <?php
                if (isset($_POST['add_skill'])) {
                    $sql = $db->prepare("INSERT
                    INTO 
                    skills_section
                    (name,value)
                    VALUE
                    (:name,:value)
                    ");
                    $sql->bindParam("name", $_POST['skill_name']);
                    $sql->bindParam("value", $_POST['skill_value']);
                    $sql->execute();
                    echo '<script>window.location.href = "index.php?skillssection=true";</script>';
                }
                ?>

            </div>

            <!-- edit resume section -->
            <?php } elseif (isset($_GET['resumesection'])) { ?>
            <div id="reDiv" class="container fullHight d-flex flex-column align-items-center">

                <h1 class="mt-5">Resume</h1>
                <iframe name='dummyframe' id='dummyframe' style='display: none;'></iframe>
                <h5 class="mt-4">Sammary</h5>
                <form method="post" class="w-75" target="dummyframe">
                    <label for="name">name</label>
                    <input id="name" class="form-control align-content-center" value="<?= $result_resume['name']; ?>" type="text" name="name">

                    <label for="summary">summary</label>
                    <textarea rows="10" id="summary" class="form-control align-content-center" type="text" name="summary"><?= $result_resume['summary']; ?></textarea>

                    <label for="location">location</label>
                    <input id="location" class="form-control align-content-center" value="<?= $result_resume['location']; ?>" type="text" name="location">

                    <label for="phone2">phone2</label>
                    <input id="phone2" class="form-control align-content-center" value="<?= $result_resume['phone2']; ?>" type="text" name="phone2">

                    <label for="email2">email2</label>
                    <input id="email2" class="form-control align-content-center" value="<?= $result_resume['email2']; ?>" type="text" name="email2">

                    <h5 class="mt-4">Education</h5>
                    <label for="time">time</label>
                    <input id="time" class="form-control align-content-center" value="<?= $result_resume['time']; ?>" type="text" name="time">

                    <label for="facts-about-education">facts-about-education</label>
                    <textarea rows="10" id="facts-about-education" class="form-control align-content-center" type="text" name="facts_about_education"><?= $result_resume['facts_about_education']; ?></textarea>

                    <h5 class="mt-4">Professional Experience</h5>
                    <h6 class="mt-3">UDACITY</h6>
                    <label for="facts-about-udacity">facts-about-udacity</label>
                    <textarea rows="10" id="facts-about-udacity" class="form-control align-content-center" type="text" name="facts_about_udacity"><?= $result_resume['facts_about_udacity']; ?></textarea>

                    <h6 class="mt-3">EGYPTIAN CHINESE UNIVERSITY</h6>
                    <label for="facts-about-university">facts-about-university</label>
                    <textarea rows="10" id="facts-about-university" class="form-control align-content-center" type="text" name="facts_about_university"><?= $result_resume['facts_about_university']; ?></textarea>

                    <h6 class="mt-3">ROUTE</h6>
                    <label for="facts-about-route">facts-about-route</label>
                    <textarea rows="10" id="facts-about-route" class="form-control align-content-center" type="text" name="facts_about_route"><?= $result_resume['facts_about_route']; ?></textarea>
                    <button type="submit" class="btn btn-outline-success w-100 mt-4" name="submit_resume-section">Submit</button>
                </form>
                <?php
                if (isset($_POST['submit_resume-section'])) {
                    $sql = $db->prepare("UPDATE
                    resume_section
                    SET
                    name = :name,
                    summary = :summary,
                    location = :location,
                    phone2 = :phone2,
                    email2 = :email2,
                    time = :time,
                    facts_about_education = :facts_about_education,
                    facts_about_udacity = :facts_about_udacity,
                    facts_about_university = :facts_about_university,
                    facts_about_route = :facts_about_route
                    ");
                    $sql->bindParam("name", $_POST['name']);
                    $sql->bindParam("summary", $_POST['summary']);
                    $sql->bindParam("location", $_POST['location']);
                    $sql->bindParam("phone2", $_POST['phone2']);
                    $sql->bindParam("email2", $_POST['email2']);
                    $sql->bindParam("time", $_POST['time']);
                    $sql->bindParam("facts_about_education", $_POST['facts_about_education']);
                    $sql->bindParam("facts_about_udacity", $_POST['facts_about_udacity']);
                    $sql->bindParam("facts_about_university", $_POST['facts_about_university']);
                    $sql->bindParam("facts_about_route", $_POST['facts_about_route']);
                    $sql->execute();

                    // echo '<script>update();</script>';
                }
                ?>
                <!-- -------------- -->
            </div>

            <!-- edit portfolio section -->
            <?php } elseif (isset($_GET['portfoliosection'])) { ?>
            <div class="container fullHight d-flex flex-column align-items-center">
                <h1 class="mt-5">Portfolio</h1>
                <!-- its need some hard work -->
            </div>

                <!-- edit service section -->
            <?php } elseif (isset($_GET['servicessection'])) { ?>
            <div class="container fullHight d-flex flex-column align-items-center">


                <h1 class="">Services</h1>
                <form method="post" class="w-75">
                    <label for="services-1">services-1</label>
                    <input id="services-1" class="form-control align-content-center" value="<?= $result_services['services_1']; ?>" type="text" name="services_1">
                    <label for="services-1-facts">services-1-facts</label>
                    <textarea rows="10" id="services-1-facts" class="form-control align-content-center mb-4" type="text" name="services_1_facts"><?= $result_services['services_1_facts']; ?></textarea>

                    <label for="services-2">services-2</label>
                    <input id="services-2" class="form-control align-content-center" value="<?= $result_services['services_2']; ?>" type="text" name="services_2">
                    <label for="services-2-facts">services-2-facts</label>
                    <textarea rows="10" id="services-2-facts" class="form-control align-content-center mb-4" type="text" name="services_2_facts"><?= $result_services['services_2_facts']; ?></textarea>

                    <label for="services-3">services-3</label>
                    <input id="services-3" class="form-control align-content-center" value="<?= $result_services['services_3']; ?>" type="text" name="services_3">
                    <label for="services-3-facts">services-3-facts</label>
                    <textarea rows="10" id="services-3-facts" class="form-control align-content-center mb-4" type="text" name="services_3_facts"><?= $result_services['services_3_facts']; ?></textarea>

                    <label for="services-4">services-4</label>
                    <input id="services-4" class="form-control align-content-center" value="<?= $result_services['services_4']; ?>" type="text" name="services_4">
                    <label for="services-4-facts">services-4-facts</label>
                    <textarea rows="10" id="services-4-facts" class="form-control align-content-center mb-4" type="text" name="services_4_facts"><?= $result_services['services_4_facts']; ?></textarea>

                    <label for="services-5">services-5</label>
                    <input id="services-5" class="form-control align-content-center" value="<?= $result_services['services_5']; ?>" type="text" name="services_5">
                    <label for="services-5-facts">services-5-facts</label>
                    <textarea rows="10" id="services-5-facts" class="form-control align-content-center mb-4" type="text" name="services_5_facts"><?= $result_services['services_5_facts']; ?></textarea>

                    <label for="services-6">services-6</label>
                    <input id="services-6" class="form-control align-content-center" value="<?= $result_services['services_6']; ?>" type="text" name="services_6">
                    <label for="services-6-facts">services-6-facts</label>
                    <textarea rows="10" id="services-6-facts" class="form-control align-content-center mb-4" type="text" name="services_6_facts"><?= $result_services['services_6_facts']; ?></textarea>

                    <button type="submit" class="btn btn-outline-success w-100 mt-4" name="submit_services-section">Submit</button>
                </form>
                <?php
                if (isset($_POST['submit_services-section'])) {
                    $sql = $db->prepare("UPDATE
                    services_section
                    SET
                    services_1 = :services_1,
                    services_1_facts = :services_1_facts,
                    services_2	= :services_2,
                    services_2_facts = :services_2_facts,
                    services_3 = :services_3,
                    services_3_facts = :services_3_facts,
                    services_4 = :services_4,
                    services_4_facts = :services_4_facts,
                    services_5 = :services_5,
                    services_5_facts = :services_5_facts,
                    services_6 = :services_6,
                    services_6_facts = :services_6_facts
                    ");
                    $sql->bindParam("services_1", $_POST['services_1']);
                    $sql->bindParam("services_1_facts", $_POST['services_1_facts']);
                    $sql->bindParam("services_2", $_POST['services_2']);
                    $sql->bindParam("services_2_facts", $_POST['services_2_facts']);
                    $sql->bindParam("services_3", $_POST['services_3']);
                    $sql->bindParam("services_3_facts", $_POST['services_3_facts']);
                    $sql->bindParam("services_4", $_POST['services_4']);
                    $sql->bindParam("services_4_facts", $_POST['services_4_facts']);
                    $sql->bindParam("services_5", $_POST['services_5']);
                    $sql->bindParam("services_5_facts", $_POST['services_5_facts']);
                    $sql->bindParam("services_6", $_POST['services_6']);
                    $sql->bindParam("services_6_facts", $_POST['services_6_facts']);
                    $sql->execute();
                }
                ?>
            </div>
        <?php } else {
            ?>
            <div class="container fullHight d-flex flex-column align-items-center">

            <h1>Section control</h1>
            
            <form action="" class="form-switch d-flex flex-column justify-content-around" style="white-space: nowrap;" method="post">
            
            <div>
            <input name="home" class="form-check-input" type="checkbox" id="checkboxHomeSection" <?php if($result_secControl['home']) echo 'checked'?>>
            <label class="form-check-label" for="checkboxHomeSection">Home Section</label>
            </div>
            <div>  
            <input name="about" class="form-check-input" type="checkbox" id="checkboxAboutSection"<?php if($result_secControl['about']) echo 'checked'?>>
            <label class="form-check-label" for="checkboxAboutSection">About Section</label>
            </div>
            <div>  
            <input name="facts" class="form-check-input" type="checkbox" id="checkboxFactsSection"<?php if($result_secControl['facts']) echo 'checked'?>>
            <label class="form-check-label" for="checkboxFactsSection">Facts Section</label>
            </div>
            <div>  
            <input name="skills" class="form-check-input" type="checkbox" id="checkboxSkillsSection"<?php if($result_secControl['skills']) echo 'checked'?>>
            <label class="form-check-label" for="checkboxSkillsSection">Skills Section</label>
            </div>
            <div>
            <input name="resume" class="form-check-input" type="checkbox" id="checkboxResumeSection"<?php if($result_secControl['resume']) echo 'checked'?>>
            <label class="form-check-label" for="checkboxResumeSection">Resume Section</label>
            </div>
            <div>
            <input name="portfolio" class="form-check-input" type="checkbox" id="checkboxPortfolioSection"<?php if($result_secControl['portfolio']) echo 'checked'?>>
            <label class="form-check-label" for="checkboxPortfolioSection">Portfolio Section</label>
            </div>
            <div>
            <input name="services" class="form-check-input" type="checkbox" id="checkboxServicesSection"<?php if($result_secControl['services']) echo 'checked'?>>
            <label class="form-check-label" for="checkboxServicesSection">Services Section</label>
            </div>
            <div>
            <input name="testimonials" class="form-check-input" type="checkbox" id="checkboxTestimonialsSection"<?php if($result_secControl['testimonials']) echo 'checked'?>>
            <label class="form-check-label" for="checkboxTestimonialsSection">Testimonials Section</label>
            </div>
            <div>
            <input name="contact" class="form-check-input" type="checkbox" id="checkboxContactSection"<?php if($result_secControl['contact']) echo 'checked'?>>
            <label class="form-check-label" for="checkboxContactSection">Contact Section</label>
            </div>
            
            <button type="submit" class="btn btn-outline-success w-100 mt-4" name="submit_control_section">Submit</button>
            </form>
            </div>
            
            <?php
            $home = $_POST['home'] ?? 0;
            $about = $_POST['about'] ?? 0;
            $facts = $_POST['facts'] ?? 0 ;
            $skills = $_POST['skills'] ?? 0;
            $resume = $_POST['resume'] ?? 0;
            $portfolio = $_POST['portfolio'] ?? 0;
            $services = $_POST['services'] ?? 0;
            $testimonials = $_POST['testimonials'] ?? 0;
            $contact = $_POST['contact'] ?? 0;
            if(isset($_POST['submit_control_section'])){
                $sql = $db->prepare("UPDATE
                section_control
                SET
                home = :home,
                about = :about,
                facts = :facts,
                skills = :skills,
                resume = :resume,
                portfolio = :portfolio,
                services = :services,
                testimonials = :testimonials,
                contact = :contact
                ");

                $sql->bindParam("home", $home);
                $sql->bindParam("about", $about);
                $sql->bindParam("facts", $facts);
                $sql->bindParam("skills", $skills);
                $sql->bindParam("resume", $resume);
                $sql->bindParam("portfolio", $portfolio);
                $sql->bindParam("services", $services);
                $sql->bindParam("testimonials", $testimonials);
                $sql->bindParam("contact", $contact);
                $sql->execute();
            }


            
        } ?>
    </div>

    <script src="../assets/vendor/bootstrap/js/bootstrap.js"></script>
    <script type="../text/javascript" src="assets/js/main.js"></script>
    <script src='script.js'></script>

</body>

</html>