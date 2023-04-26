<!doctype html>
<html>

<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <link href='https://use.fontawesome.com/releases/v5.7.2/css/all.css' rel='stylesheet'>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js" integrity="sha384-+sLIOodYLS7CIrQpBjl+C7nPvqq+FbNUBDunl/OZv93DB7Ln/533i8e/mZXLi/P+" crossorigin="anonymous"></script>
    <!-- -->
    <link rel="stylesheet" href="css/login.css">
    <title>Admin Login</title>
</head>

<body className='snippet-body'>
    <div class="wrapper">
        <div class="logo">
            <img src="../assets/img/profile-img.jpg" alt="">
        </div>
        <div class="text-center mt-4 name">
            Admin Login
        </div>
        <form class="p-3 mt-3" method="post">
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input type="text" name="userName" id="userName" placeholder="Username">
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="Password">
            </div>
            <button class="btn mt-3" type="submit" name="submit">Login</button>
        </form>

    </div>
    <?php
    if (isset($_POST['submit'])) {
        include('../config.php');
        $q = $db->prepare("SELECT * FROM
                users
                WHERE
                email = :email 
                AND 
                password = :password
                ");
        $q->bindParam("email", $_POST['userName']);
        $q->bindParam("password", $_POST['password']);
        $q->execute();
        if ($q->rowCount() === 1) {
            $user = $q->fetchObject();
            session_start();
            $_SESSION['user'] = $user;
            header('location:dashboard');
        } else {
    ?>

            <div classs="hideAfter3s container p-5 pop-con fixed-top">

                <div class="hideAfter3s row no-gutters fixed-top">

                    <div class="hideAfter3s col-lg-5 col-md-12 ">

                        <div class="alert alert-danger fade show d-flex flex-row-reverse w-75" role="alert">
                            <div class="col-2 position-relative">
                                <svg width="3em" height="3em" style="color:#afafaf" viewBox="0 0 16 16" class="m-1 bi bi-exclamation-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                            </div>
                            <button type="button" class="popuperr close position-absolute" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="True">&times;</span>
                            </button>

                            <p class="alert-heading position-absolute">Invalid Email or Password</p>

                        </div>
                    </div>
                </div>
            </div>

            <style>
                .hideAfter3s {
                    visibility: hidden;
                    animation-name: hide;
                    animation-duration: 3s;
                }

                @keyframes hide {
                    from {
                        visibility: visible;
                    }

                    to {
                        visibility: hidden;
                    }
                }

                .alert {
                    padding: 0;
                    border-radius: 0.85rem;
                }

                .alert-heading {
                    top: 13px;
                    left: 3vw;
                }
            </style>

    <?php
        }
    }
    ?>

</body>

</html>